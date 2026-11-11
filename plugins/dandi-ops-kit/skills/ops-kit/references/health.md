# ⑤ 헬스체크 · 장애 알림

서비스가 죽었다는 것을 사용자 신고보다 먼저 아는 장치다. 1인 운영에서 중요한 것은 **시끄럽지 않은 것**이다 — 한 번 튄 실패마다 알림이 오면 알림을 끄게 되고, 그러면 장치가 없는 것과 같다. 그래서 연속 실패에만 알리고, 복구되면 한 번 알린다.

## 진단 신호

| 판정 | 조건 |
| --- | --- |
| 필요 | 상시 실행되는 서버·Worker·봇(웹훅 수신 포함)이 있다 |
| 불필요 | 정적 사이트·로컬 CLI·배치 스크립트뿐이다(정적 호스팅의 가용성은 호스팅이 책임진다) |
| 판단 보류 | 상시 실행은 있는데 주기 점검 수단(호스팅 cron·GitHub Actions)이나 알림 채널 후보가 하나도 없다 → 무엇을 쓸지 묻는다 |

함께 적는다: 이미 `/health`(또는 `/healthz`·`/status`) 엔드포인트가 있는지(있으면 응답 형식을 대조) · 쓸 수 있는 스케줄러 · 알림 채널 후보(봇·메일·웹훅 — 이름만).

## 만들 것

1. **`/health` 엔드포인트** — 앱 서버 코드.
   - DB가 있으면 가장 싼 쿼리(`SELECT 1` 수준) 한 번까지 확인한다. 외부 API까지 부르지 않는다(남의 장애로 내 알림이 울리고 호출 비용이 든다).
   - 정상: 200 `{"ok":true,"checks":{"db":"ok"}}`. 실패: 503 `{"ok":false,"checks":{"db":"fail"}}` — **구성요소 이름만** 내고 오류 메시지·연결 문자열·버전은 내지 않는다.
   - `Cache-Control: no-store`. 차단·인증 미들웨어 바깥(점검기가 닿아야 한다).
2. **주기 점검** — 무료 범위의 스케줄러 하나.
   - **GitHub Actions `schedule`**(저장소가 GitHub에 있을 때 기본): 워크플로가 `/health`를 부르고 실패하면 job을 실패시킨다. 최소 간격·실행 지연·저장소 비활성 시 스케줄 중지 조건은 **작성하는 날 GitHub 공식 문서로 확인**해 런북에 적는다(못 하면 `[재확인]`).
   - **호스팅 cron**(예: Workers Cron Triggers): 앱이 자기 `/health` 로직을 직접 돌린다. 무료 플랜의 cron 개수·간격 제한은 공식 문서로 확인한다.
3. **알림 — 연속 실패 N회(기본 2)에 한 번, 복구 시 한 번**.
   - **Actions라면 상태를 저장하지 않는다**: 직전 실행 결과를 `gh run list --workflow <파일> --limit <N+1> --json conclusion`(권한: `actions: read`)으로 읽어 판정한다 — 이번 실패 + 직전 N-1회 실패면 "장애" 알림, 이번 성공 + 직전 실패면 "복구" 알림, 그 밖은 조용히. 별도 저장소가 필요 없다. `gh` 플래그·필드는 작성하는 날 `gh run list --help`로 확인한다.
   - **호스팅 cron이라면** 앱의 KV·DB에 `health_state(consecutive_failures, alerted)` 한 행만 둔다.
   - 알림 보내기는 채널 하나(봇 메시지·메일·웹훅). 토큰·웹훅 URL은 시크릿(Actions secrets 또는 호스팅 시크릿). **연결(토큰 입력)은 이 스킬이 하지 않는다** — 운영 런북 단계로만 둔다.

## 형식·템플릿

GitHub Actions 골격(값·버전은 작성하는 날 확인해 채운다):

```yaml
name: health
on:
  schedule:
    - cron: "*/30 * * * *"   # 간격은 공식 문서의 최소 간격·무료 사용량을 확인해 정한다 [재확인]
  workflow_dispatch: {}
permissions:
  actions: read
  contents: read
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - id: probe
        run: |
          code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$HEALTH_URL" || echo 000)
          echo "code=$code" >> "$GITHUB_OUTPUT"
          [ "$code" = "200" ]
        env:
          HEALTH_URL: ${{ vars.HEALTH_URL }}
        continue-on-error: true
      - name: decide
        env:
          GH_TOKEN: ${{ github.token }}
          NOW: ${{ steps.probe.outcome }}
        run: |
          # 직전 완료 실행들의 결론(이번 실행 제외)으로 연속 실패·복구를 판정한다
          prev=$(gh run list --workflow health.yml --limit 3 --json conclusion,status \
                 --jq '[.[] | select(.status=="completed") | .conclusion] | .[0:1] | join(",")')
          echo "now=$NOW prev=$prev"
          # NOW=failure, prev=failure → 장애 알림(연속 2회) / NOW=success, prev=failure → 복구 알림
          # 알림 단계는 채널 시크릿이 설정된 뒤에만 켠다 — 연결은 운영 런북에서 사용자가 한다
      - if: steps.probe.outcome == 'failure'
        run: exit 1
```

- 판정 로직과 알림 단계는 채널(봇 API·메일·웹훅)에 맞춰 채운다. 알림 문구에는 URL·상태 코드·시각(UTC)만 넣는다.
- 이 워크플로 자체가 job을 실패시키므로 GitHub의 기본 실패 메일도 온다 — 그것으로 충분하면 별도 채널 없이 끝낼 수 있다고 사용자에게 알린다(가장 싼 선택지).

**운영 런북에 넣을 단계**: `HEALTH_URL` 변수 등록 · 알림 채널 시크릿 등록(SKILL.md §4 형식) · `workflow_dispatch`로 한 번 수동 실행해 성공 확인 · 일부러 실패시키는 리허설(잘못된 URL로 두 번 → 알림 → 되돌려 복구 알림) · `다음 헬스체크 리허설: YYYY-MM경`.

## 검증

- `/health` 테스트: DB 정상 200 / DB 실패 모의 503, 응답에 오류 메시지가 없는지.
- 워크플로 YAML을 파싱해 본다(`python -c "import yaml,sys;yaml.safe_load(open(sys.argv[1]))" <파일>` 또는 `actionlint`가 있으면 그것).
- 연속 실패 판정을 표로 검산한다: (실패,실패)→알림 · (실패,성공)→조용 · (성공,실패)→복구 · (성공,성공)→조용.
- 상태 파일 표에 ⑤ 행을, 허브 `ops.health`에 "켜짐 (날짜~)" 또는 "연결 대기"를 반영한다.
