# 판단 기준 — agent-tune

## 1. 조사할 자리
① `.claude/agents/*.md`(프로젝트) · `~/.claude/agents/*.md`(개인) — frontmatter의 `name`·`description`·`model`·`effort`·`tools`·`isolation`·`maxTurns`와 본문 첫 단락(맡은 일).
② 플러그인 에이전트 — `/agents` 목록에서 플러그인 이름이 붙은 것. 고치지 않고 표에만 올린다.
③ 워크플로 스크립트 — `.claude/workflows/*.js`·`~/.claude/workflows/*.js`의 `agent(` 호출과 단계에 적힌 모델 이름. 스크립트가 정한 단계 모델은 호출 지정과 같은 순위라 frontmatter보다 앞선다 — 보고만 하고 스크립트는 고치지 않는다.
④ 역할 문서 — 프로젝트 `CLAUDE.md`, 핸드오프 규약(`docs/핸드오프-규약.md`·`docs/handoff-protocol.md`, 또는 `dropin-applied` 괄호의 `핸드오프=` 값), `docs/모델-운용표.md`·`docs/model-usage-table.md`. 단계 순서와 "호출할 때 model·effort를 지정한다" 같은 문장을 찾는다(호출 지정은 frontmatter를 덮는다).
⑤ 덮어쓰는 설정 — `~/.claude/settings.json`·`.claude/settings.json`·`.claude/settings.local.json`(`env` 블록 포함)과 현재 셸 환경변수에서 **아래 이름만** 본다:
  - `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` — `1`이면 frontmatter `model:`이 무시된다.
  - `CLAUDE_CODE_SUBAGENT_MODEL` — `model:`이 없는 에이전트의 기본값.
  - `CLAUDE_CODE_EFFORT_LEVEL` — frontmatter `effort:`보다 앞선다(고쳐도 이 값으로 돈다).
  - `CLAUDE_CODE_SUBAGENT_EFFORT` — `effort:`가 없는 에이전트의 기본값.
  - `maxEffortLevel` — 상한. 넘는 제안은 상한에서 돈다.
  - `availableModels` — 허용 목록. 밖의 모델은 제안하지 않는다.
  - `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` — 켜져 있으면 이름 붙인 스폰이 팀원으로 떠 역할 분담이 무력화될 수 있다고 알린다.
  관리형(managed) 설정은 읽지 못할 수 있다 — 그 사실을 적는다. 위 동작은 0)에서 조회한 문서로 확인한 것만 단정한다.
⑥ 기록 — `~/.claude/CLAUDE.md`·프로젝트 `CLAUDE.md`의 `<!-- dropin-applied: … -->` 줄(`프로필=`·`형태=`·`언어=`), 배정 기록 파일(`record.md` §1).

## 2. 추정하는 속성 (확인받는다)
| 속성 | 값 | 무엇으로 추정하나 |
| --- | --- | --- |
| 성격 | 탐색·판단 / 분석·설계 / 정형 실행 / 검증·테스트 / 문서·요약 | description·본문·도구(쓰기 도구가 없으면 판단·분석·검증 쪽) |
| 판단 무게 | 불변(틀리면 하류 전체 재작업) / 보통 / 가벼움 | 단계 순서에서 앞쪽인지, 산출물을 다른 에이전트가 입력으로 쓰는지, 최종 리뷰인지 |
| 난도 | 높음 / 보통 / 낮음 | 다루는 대상(설계·동시성·보안·외부 연동 규약은 높음, 정형 변환·목록화는 낮음) |

## 3. 운용 프로필 (제약 — 모델 열만)
| 프로필 | 모델 제약 |
| --- | --- |
| 절약 | 불변이 아닌 에이전트는 §4 표보다 한 단계 낮은 모델을 기본으로(정형 실행·검증은 `haiku` 적극, 분석·구현은 `sonnet`). 불변은 상위 모델 유지. `fable`은 제안하지 않는다 |
| 표준 | §4 표 그대로 |
| 여유 | §4 표 그대로. 불변 에이전트에 한해 `fable`을 **선택지로** 병기 — 요금제에 포함될 때만(SKILL 3)의 질문). 워커는 올리지 않는다(품질이 같으면 싼 쪽) |
| 종량 | §4 표 그대로. 비용 지수가 청구액의 직접 근거라 빈도 높은 에이전트부터 본다. 긴 자율 실행 에이전트에 `maxTurns`를 권할 수 있으나 이 스킬은 넣지 않는다(제안만) |
- **effort는 프로필로 바꾸지 않는다.**
- 사용 형태(`병렬`·`조직`·`무인`)는 배정을 바꾸지 않는다 — 병렬·조직이면 동시에 여러 에이전트가 돌아 비용 지수가 그만큼 커진다는 것만 알린다.
- `availableModels`가 막은 모델은 어느 프로필에서도 제안하지 않는다.

## 4. 기본 배정 (성격 × 판단 무게)
| 성격 | 불변 | 보통 | 가벼움 |
| --- | --- | --- | --- |
| 탐색·판단(분류·트리아지·요구 확정) | `opus` / `high` | `opus` / `medium` | `sonnet` / `medium` |
| 분석·설계 | `opus` / `xhigh`(난도 높음) · `opus` / `high`(그 밖) | `sonnet` / `medium`(난도 높음이면 `opus` / `high`) | `sonnet` / `low` |
| 정형 실행(spec 있는 구현·변환) | `sonnet` / `high` | `sonnet` / `medium` | `haiku` / `medium` |
| 검증·테스트(실행·대조 보고) | `opus` / `high`(최종 리뷰) | `haiku` / `low` | `haiku` / `low` |
| 문서·요약 | `sonnet` / `medium` | `sonnet` / `low` | `haiku` / `low` |
- 단디 02 로스터 기본값과 같은 축이다(triage `opus`/`high` · spec-writer `opus`/`high` · analyst-hard `opus`/`xhigh` · implementer `sonnet`/`medium` · reviewer `opus`/`high` · parity-tester `haiku`/`low` · surveyor `sonnet`/`medium`). 02 로스터 이름의 에이전트는 그 값에서 출발한다.
- 위 effort가 그 모델에서 지원되지 않으면(0)의 model-config 조회) 지원되는 바로 아래 단계로 적고 근거에 쓴다.
- `model:`은 별칭으로 적는다. 현재 파일이 전체 ID를 쓰면 의도일 수 있으니 유지를 기본으로 묻는다. `inherit`은 메인 세션 모델을 따른다는 뜻이라 메인이 바뀌면 같이 바뀐다 — 그대로 둘지 묻는다.
- 같은 계열 별칭은 부모가 그 계열의 다른 버전이면 부모 버전으로 돈다 — 버전 고정이 필요하면 전체 ID를 쓴다.

## 5. 조정 규칙 (순서대로)
1. **우선순위**: `비용 우선`이면 불변이 아닌 에이전트를 모델 또는 effort 한 단계 낮춘다(빈도 `매 작업`·`자주`부터). `품질 우선`이면 난도 높음·판단 무게 보통인 에이전트의 effort를 한 단계 올린다. `균형`은 그대로.
2. **문제 경험**: `빠뜨림·대충` → effort 한 단계↑(모델 그대로). `몰라서 틀림` → 모델 한 단계↑(effort 그대로). 덜 애써서 틀렸으면 effort를, 몰라서 틀렸으면 모델을 올린다(Anthropic 블로그 "Choosing a Claude model and effort level in Claude Code").
3. **프로필 제약**(§3) — 부딪히면 프로필이 모델 열을 이긴다. 단 불변은 내리지 않는다.
4. `xhigh`·`max`는 불변이면서 난도 높음일 때만. 그 밖에서 나오면 `high`로 내리고 근거에 적는다.
5. 덮어쓰는 설정(§1-⑤)이 그 에이전트의 값을 무시하게 만들면 제안은 내되 근거에 "지금은 ○○ 때문에 적용되지 않는다"를 적는다.
- 단계: 모델 `haiku` < `sonnet` < `opus`(`fable`은 §3 여유에서만 선택지). effort `low` < `medium` < `high` < `xhigh` < `max`.
- 근거 한 줄 형식: `<성격>·<판단 무게> 기본 → <적용한 조정들>` (예: `정형 실행·보통 기본 → 빠뜨림 effort↑`).

## 6. 비용 지수
지수 = 빈도 가중 × (입력 단가 + 출력 단가) — 단가는 0)의 pricing 조회값($/MTok, 기본 행).
- 빈도 가중: `매 작업` 4 · `자주` 3 · `가끔` 2 · `드묾` 1(상대 순위용 — 실측이 아니다).
- effort는 지수에 넣지 않는다 — 공식 가격표가 effort별 배수를 주지 않는다. 같은 지수면 effort가 높은 쪽을 위에 둔다.
- 비중 = 그 에이전트 지수 ÷ 합계(제안 기준). 가장 큰 행이 "가장 많이 쓰는 에이전트"다.
- `inherit`·`(없음)`인 에이전트는 메인 세션 모델로 계산하고 표에 `(메인 기준)`을 붙인다.
