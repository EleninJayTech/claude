---
name: resume
description: 세션 시작 시 사용. remote가 있으면 원격 최신화(clean이면 git pull --ff-only) 후 git status로 미커밋(진행 중) 작업을 확인하고, 글로벌·프로젝트 CLAUDE.md와 docs/PROGRESS.md 최상단, docs/PROJECT_PLAN.md를 읽고 지난 세션 마지막 상태와 다음 작업을 확인한다. 구성 점검·문서 최신화 시기가 됐으면 안내한다.
---

# /resume — 세션 재개

0. remote가 있고 워킹트리가 clean이면 `git pull --ff-only`로 먼저 최신화한다
   (미커밋이 있거나 ff 불가면 pull 대신 `git fetch`로 뒤처짐만 보고 — 병합은 사용자 결정).
1. `git status`·현재 브랜치로 미커밋(진행 중) 작업을 발견하고,
2. CLAUDE.md, docs/PROGRESS.md(최상단 — **Read limit으로 앞 ~40줄만**, 통째 읽기 금지), docs/PROJECT_PLAN.md를 읽어
   "지난 작업은 X, 다음은 Y로 진행할까요?" 형태로 요약 보고하라.
3. 점검 안내(조건부 — 해당할 때만 보고 말미에 한 줄):
   - CLAUDE.md의 `dropin-applied` 적용일이 **30일 이상 경과** → "`/dropin-check`(적용 상태 점검)·`/dropin-update`(문서 최신화) 권장".
   - PROJECT_PLAN에 **예정일이 지난 항목**(예: "다음 재검증") → 해당 항목 안내.
