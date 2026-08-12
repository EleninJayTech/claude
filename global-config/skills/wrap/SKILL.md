---
name: wrap
description: 세션 종료 시 사용. 건드린 repo마다 docs/PROGRESS.md 최상단에 오늘 작업을 append하고, 새 결정은 docs/DECISIONS.md에 추가하며, docs/PROJECT_PLAN.md 체크박스와 (있으면) 파생 뷰 WBS를 갱신한다. 미커밋이 남으면 경고한다.
---

# /wrap — 세션 마무리

오늘 세션 마무리. docs/PROGRESS.md 최상단에 오늘 작업 항목을 append,
새 결정은 docs/DECISIONS.md에 **DEC-YYYYMMDD-<작성자>** id로 추가(동시 발번 충돌 방지 — 예: DEC-20260812-min), docs/PROJECT_PLAN.md 체크박스 갱신.
비-git 폴더면 git status·커밋 단계는 건너뛰고 기록 append만 한다.
`docs/`에 PROGRESS·DECISIONS·PROJECT_PLAN이 **없으면** 기록 파일을 새로 만들지 말고
"01 §E-1 기록 체계 미설치 — 필요하면 01을 적용하세요"를 알린다(00 STEP 5의 최소 골격만 있는 repo가 여기 해당).
이때 **"이번 세션 기록은 저장되지 않는다"를 명시하고, 남겼을 내용을 응답에 요약으로 출력**한다 —
나중에 01을 적용해도 이 세션 분은 이미 소실이라, 사용자가 그 자리에서 복사해 둘 기회를 줘야 한다.
**예외 — 통합 워크스페이스의 루트**: 루트가 얇은 라우터(01 §E-4)면 기록이 각 단위 `docs/`에 있고
루트엔 `docs/INDEX.md`만 있는 것이 정상이다. 이 경우 "미설치"로 알리지 말고 **대상 단위의 `docs/`에 기록**한다
(판별: 루트 `CLAUDE.md`가 단위로 라우팅하거나 `docs/INDEX.md`가 있으면 라우터로 본다).
마지막에 변경 파일 목록을 보고하고, 미커밋 변경이 남으면 경고하라
(커밋 전엔 다음 /resume가 git status로만 발견 가능).
append 후 **PROGRESS 총 줄 수를 확인**해(약 800줄/분기 경계 — /resume는 앞 40줄만 읽어 감지 못 함)
넘었으면 "가장 오래된 분기를 `docs/archive/`로 이동 + 활성 파일 **최상단(제목 바로 아래)** 포인터 한 줄" 아카이브를 안내한다
(이동은 승인 후 — 포인터가 최상단이어야 /resume의 40줄 읽기에 보인다. 이후 append는 **포인터 줄 아래부터**(포인터 최상단 고정). 과거 이력 검색은 `docs/` 폴더 단위로).

## 글로벌 구성 ↔ 백업 미러 대조 (건드린 세션만)
이번 세션에 `~/.claude/`(화이트리스트 5종 — CLAUDE.md·settings.json·skills·commands·output-styles)나
문서 저장소의 `global-config/`를 **수정했으면** 둘을 해시로 대조한다(약 0.5초. 저장소 클론이 없으면 건너뛴다).
- 차이가 있으면 **어느 쪽이 최신인지 내용으로 판정**해 방향과 함께 보고하고 복사 명령을 제시한다(복사·커밋은 승인 후).
- `settings.json`은 키 단위로 비교하되 **구성 성격 키(`permissions.deny`·`hooks`·`attribution`·`autoMemoryEnabled`)의 차이만**
  실제 차이로 본다 — 그 밖은 전부 머신 종속으로 제외한다(model·theme·outputStyle·enabledPlugins·statusLine·effortLevel·
  autoUpdatesChannel·마켓플레이스 소스 형식 등, DEC-20260721-bsjeong87-02). **제외 목록을 늘려 맞추지 말 것** —
  포함 기준 한 줄이 정본이고 괄호는 예시일 뿐이다(목록으로 관리하면 사본마다 갈라진다).
- **글로벌 `CLAUDE.md`의 `dropin-applied`로 시작하는 줄은 차이로 치지 않는다** — 그 줄은 PC별 적용 기록이라
  갈라져 있는 것이 정상이다(00 §A STEP 5 · DEC-20260812-bsjeong87-11). 이 예외가 없으면 글로벌을 건드린 세션마다
  "CLAUDE.md 다름"이 뜨고, 방향 판정을 거쳐 **다른 PC의 적용 기록을 덮어쓰는 복사**를 권하게 된다.
- **줄바꿈을 정규화한 뒤 비교한다** — 저장소에 EOL 지시(`.gitattributes`의 `text`/`eol`)가 없으면 워킹트리 줄바꿈이
  **그 PC의 git 설정(`core.autocrlf`)에 좌우**되므로, 내용이 같아도 해시가 갈릴 수 있다. 실제로 Claude Code가 LF로 쓰는
  `settings.json`과 CRLF로 체크아웃된 사본이 상시 갈리는 식이다. 줄바꿈만 다르면 "차이 없음"으로 판정한다.
- 정본은 `~/.claude`, `global-config/`는 복원용 사본이다. 한쪽만 고치면 **새 PC 복원 때 누락**되거나
  **고쳤다고 기록해둔 개선이 실제로는 구버전으로 도는** 실패가 조용히 생긴다(2026-08-10·08-12 양방향 실사례).

## 파생 뷰 동기화 (있는 repo만)
그 repo에 `docs/WBS.md`가 있고 이번 세션에 PROJECT_PLAN 상태가 바뀌었으면 **같은 변화를 WBS 표에도**
반영한다(상태 배지·신규 항목 행·최종 갱신일). `docs/WBS.html`도 있으면 동일하게 맞춘다.
WBS는 **PROJECT_PLAN 파생 뷰**(SSOT=PROJECT_PLAN)이므로 PROJECT_PLAN을 먼저 고치고 WBS를 따라 맞춘다.

## 통합 워크스페이스(상위 폴더 아래 독립 repo 여러 개)
> 같은 이름 스킬은 **개인 스코프가 프로젝트 스코프를 덮으므로**(공식: enterprise > personal > project)
> 프로젝트에 통합형 /wrap을 둬도 실행되는 건 이 파일이다 — 통합형 절차를 여기 둔다.

1. 루트+하위 repo 각각 `git status`로 무엇이 바뀌었는지 확인한다.
2. 변경된 repo마다 그 repo의 PROGRESS 최상단에 append(기존 줄 수정 금지).
3. 여러 repo가 바뀌었으면 **주 대상에 본문, 나머지엔 `[공통] … → 링크` 교차 한 줄**.
4. 크로스-repo 세션이면 루트 `docs/INDEX.md`에 `날짜 [repo …] 요약 → 링크` 한 줄(단일 repo 세션은 생략).
5. 커밋은 **repo별로 따로**(독립 git). 미커밋으로 남는 repo가 있으면 명시적으로 경고한다.