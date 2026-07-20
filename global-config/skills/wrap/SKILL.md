---
name: wrap
description: 세션 종료 시 사용. docs/PROGRESS.md 최상단에 오늘 작업을 append하고, 새 결정은 docs/DECISIONS.md에 추가하며, docs/PROJECT_PLAN.md 체크박스를 갱신한다.
---

# /wrap — 세션 마무리

오늘 세션 마무리. docs/PROGRESS.md 최상단에 오늘 작업 항목을 append,
새 결정은 docs/DECISIONS.md에 DEC-NNN으로 추가, docs/PROJECT_PLAN.md 체크박스 갱신.
마지막에 변경 파일 목록을 보고하고, 미커밋 변경이 남으면 경고하라
(커밋 전엔 다음 /resume가 git status로만 발견 가능).