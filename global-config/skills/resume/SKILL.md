---
name: resume
description: 세션 시작 시 사용. remote가 있으면 원격 최신화(clean이면 git pull --ff-only) 후 git status로 미커밋(진행 중) 작업을 확인하고, 글로벌·프로젝트 CLAUDE.md와 docs/PROGRESS.md 최상단, docs/PROJECT_PLAN.md를 읽고 지난 세션 마지막 상태와 다음 작업을 확인한다.
---

# /resume — 세션 재개

0. remote가 있고 워킹트리가 clean이면 `git pull --ff-only`로 먼저 최신화한다
   (미커밋이 있거나 ff 불가면 pull 대신 `git fetch`로 뒤처짐만 보고 — 병합은 사용자 결정).
1. `git status`·현재 브랜치로 미커밋(진행 중) 작업을 발견하고,
2. CLAUDE.md, docs/PROGRESS.md(최상단), docs/PROJECT_PLAN.md를 읽어
   "지난 작업은 X, 다음은 Y로 진행할까요?" 형태로 요약 보고하라.
