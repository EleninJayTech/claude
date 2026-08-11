---
name: wrap
description: 세션 종료 시 사용. 건드린 repo마다 docs/PROGRESS.md 최상단에 오늘 작업을 append하고, 새 결정은 docs/DECISIONS.md에 추가하며, docs/PROJECT_PLAN.md 체크박스와 (있으면) 파생 뷰 WBS를 갱신한다. 미커밋이 남으면 경고한다.
---

# /wrap — 세션 마무리

오늘 세션 마무리. docs/PROGRESS.md 최상단에 오늘 작업 항목을 append,
새 결정은 docs/DECISIONS.md에 DEC-NNN으로 추가, docs/PROJECT_PLAN.md 체크박스 갱신.
마지막에 변경 파일 목록을 보고하고, 미커밋 변경이 남으면 경고하라
(커밋 전엔 다음 /resume가 git status로만 발견 가능).
append 후 **PROGRESS 총 줄 수를 확인**해(약 800줄/분기 경계 — /resume는 앞 40줄만 읽어 감지 못 함)
넘었으면 "가장 오래된 분기를 `docs/archive/`로 이동 + 활성 파일 **최상단(제목 바로 아래)** 포인터 한 줄" 아카이브를 안내한다
(이동은 승인 후 — 포인터가 최상단이어야 /resume의 40줄 읽기에 보인다. 과거 이력 검색은 `docs/` 폴더 단위로).

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