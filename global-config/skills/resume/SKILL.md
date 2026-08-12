---
name: resume
description: 세션 시작 시 사용. remote가 있으면 원격 최신화(clean이면 git pull --ff-only) 후 git status로 미커밋(진행 중) 작업을 확인하고, 글로벌·프로젝트 CLAUDE.md와 docs/PROGRESS.md 최상단, docs/PROJECT_PLAN.md를 읽고 지난 세션 마지막 상태와 다음 작업을 확인한다. 구성 점검·문서 최신화 시기가 됐으면 안내한다.
---

# /resume — 세션 재개

> **통합 워크스페이스**(상위 폴더 아래 독립 repo 여러 개)면 0·1을 **루트와 하위 repo 각각**에 수행하고,
> 대상 repo(+단위)를 PWD>브랜치>질문 순으로 판별해 그 repo의 `docs[/<단위>]/`를 읽고,
> (있으면) 루트 `docs/INDEX.md` 최근 항목도 함께 읽는다(크로스-repo 세션 흔적).
> 프로젝트에 같은 이름의 통합형 스킬을 둬도 **개인 스코프가 프로젝트를 덮으므로**(공식 문서:
> enterprise > personal > project) 실제로 실행되는 건 이 파일이다 — 통합형 절차를 여기 둔다.
> **비-git 폴더**면 0·1(git 단계)은 건너뛰고 2부터 진행한다(docs 체계만 있으면 그대로 읽는다).

0. remote가 있고 워킹트리가 clean이면 `git pull --ff-only`로 먼저 최신화한다
   (미커밋이 있거나 ff 불가면 pull 대신 `git fetch`로 뒤처짐만 보고 — 병합은 사용자 결정).
1. `git status`·현재 브랜치로 미커밋(진행 중) 작업을 발견하고,
2. CLAUDE.md, docs/PROGRESS.md(최상단 — **Read limit으로 앞 ~40줄만**, 통째 읽기 금지), docs/DECISIONS.md 최근 3건(최상단 Read limit), docs/PROJECT_PLAN.md를 읽어
   "지난 작업은 X, 다음은 Y로 진행할까요?" 형태로 요약 보고하라.
3. 점검 안내(조건부 — 해당할 때만 보고 말미에 한 줄):
   - CLAUDE.md의 `dropin-applied` 적용일이 **30일 이상 경과** → "`/dropin-check`(적용 상태 점검)·`/dropin-update`(문서 최신화) 권장".
   - PROJECT_PLAN에 **예정일이 지난 항목**(예: "다음 재검증") → 해당 항목 안내.
   - `dropin-applied` 괄호에 **사용자 조치 대기 메모**(예: `gh 설치, 인증 대기`) 또는 **`게이트 차단(사유)`**(예: `06 게이트 차단(조직 미승인)`) → "○○ 대기/차단 중 — 완료·해소됐다면 00 재적용으로 기록 갱신(재적용 질문 ③이 그 메모를 지운다)" 안내(추가 조회 없음 — 이미 읽는 CLAUDE.md 맨 아래 줄). 차단 기록은 조건(조직 승인·요금제·호스트)이 바뀌면 되살아나는 항목이라 "미선택"과 달리 재확인 대상이다.
