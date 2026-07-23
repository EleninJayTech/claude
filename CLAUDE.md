# CLAUDE.md — 클로드 구성 문서 저장소

> 프로젝트 **사실**만 적는다. 행동 규칙은 글로벌 `~/.claude/CLAUDE.md`가 담당(중복 금지).

## 무엇인가
Claude Code 셋업·운영을 위한 **드롭인 지시 문서** 저장소. 코드·빌드·테스트 없음(문서 전용).
다른 프로젝트에 이 문서를 넣고 "학습해서 적용해줘"라고 하면 Claude가 환경을 판별해 구성을 생성한다.
모든 문서의 기본 원칙: **1순위 = 최적의 결과물, 토큰 절약 = 품질 유지 전제의 2순위.** ([[DEC-20260723-bsjeong87-02]])

## 구성물
| 파일 | 역할 | 버전 |
| --- | --- | --- |
| `00_통합-설치.md` | 01~03 통합 설치 셀렉터 — 문서 확보→감지→선택 목록→해당 문서 프로토콜로 위임 | v1.0 (2026-07-23) |
| `01_Claude-Code-통합구성-범용마스터.md` | 글로벌+프로젝트 셋업 마스터(§D 글로벌·§E 환경별·§F SSOT 블록) | v1.7 (2026-07-23) |
| `02_모델분담-범용-플레이북.md` | 상위/하위 모델 자동 분담, `.claude/agents/` 로스터 템플릿 | v1.6 (2026-07-23) |
| `03_확장기능-설치-체크리스트.md` | 확장 3종(claude-hud·svg-design·frontend-design) 체크리스트 설치 — 감지→확인→선택 설치 | v1.0 (2026-07-23) |
| `사용법.html` | 사람용 안내 페이지(입문자 대상 저장소 사용법) — 드롭인 아님, 설치 무관 | 2026-07-23 |
| `global-config/` | `~/.claude` 백업(화이트리스트 4종) — 새 PC 복원용 | 2026-07-21 스냅샷 |

## 문서 관리 규칙 (이 repo 고유)
- **md 단일 관리**: 드롭인 지시서는 md만 유지. 지시서의 html 미러는 2026-07-23 폐기(git 히스토리에서 복구 가능). ([[DEC-20260723-bsjeong87-01]], DEC-20260720-bsjeong87-01 대체) — 예외: `사용법.html`은 md 미러가 아닌 **사람용 안내 페이지**라 이중 관리에 해당하지 않음(md 내용 변경 시 동기화 의무 없음, 문서 목록이 바뀔 때만 갱신).
- **드롭인 문서(01·02)는 얇게 유지**: 공백 보완은 한두 줄 **경량 반영(A안)** 만 — 드롭인 문서가 길어질수록 적용 정확도가 떨어진다. 세션 운영 상세는 별도 문서 없이 **공식 문서 직접 참조**((구)02 진단 가이드는 2026-07-23 제거). ([[DEC-20260723-bsjeong87-03]], DEC-20260720-bsjeong87-05 일부 대체)
- **최신화는 기억이 아니라 당일 공식 문서 조회로만**. 확인 못 한 항목은 🟡로 남긴다(00 §L 원칙). ([[DEC-20260720-bsjeong87-02]])
- 문서 갱신 시: 최상단 버전 표에 한 줄 + 하단 "문서 정보" 날짜 수정 + §L 재검증 체크리스트.

## global-config/ 백업 규칙
- **화이트리스트만** 커밋: `CLAUDE.md`·`settings.json`·`skills/`·`commands/`. 통째 커밋 금지 — `.credentials.json`·`history.jsonl`·`projects/`·`sessions/`는 시크릿·대화기록. ([[DEC-20260720-bsjeong87-04]])
- 원본(`~/.claude`)을 고쳐도 **자동 갱신되지 않는다** — 수동으로 다시 복사해 커밋.
- `theme` 등 개인 취향 키는 문서 예시에서 제외하되 개인 설정에 남는 건 무방. ([[DEC-20260720-bsjeong87-03]])

## 환경
- 단일 git repo(00 §B의 **B형**). remote: `github.com/EleninJayTech/claude`, 기본 브랜치 `main`.
- 작성자 1인(@bsjeong87)이나 **여러 PC에서 작업** → `docs/` append 충돌 대비로 `.gitattributes` merge=union 유지.
- 커밋 양식: `<타입>: <요약> — <상세>` (타입 `docs`·`fix`·`chore`). 예) `docs: 공식 문서 재검증 — 01 v1.5, 02 v1.4`

---

## 문서·기록 규칙 (Claude가 자동 적용)

### 작업 기록 구조
- 기록(PROGRESS·DECISIONS)은 flat(docs/) 또는 단위 분할(docs/<단위>/, MSA 정책). 마스터 PROJECT_PLAN.md만 docs/ 루트.
- /resume·/wrap은 대상(repo+단위)을 PWD>브랜치>질문 순으로 판별.
- 기록 항목 양식: [단위][상태(Done/Pending/Blocked)] 설명 — @작성자 (브랜치). 최상단 append.

### 동시편집 충돌
- PROGRESS·DECISIONS는 append 전용(기존 줄 수정 금지). .gitattributes의 merge=union이 동시 append를 자동 합침.
- DECISIONS id는 동시 발번 충돌을 피해 날짜+작성자 포함(예: DEC-20260703-min).

### 여러 대상 동시 변경 (방법 A)
- 주 대상 docs에 본문, 함께 바뀐 대상엔 [공통] 교차 한 줄 + 링크.
- 다른 repo는 접근 가능(cwd 또는 additionalDirectories)하면 자동 교차기록, 불가하면 "○○에 기록 필요" 알림.

### 세션 워크플로 규율
- 작업 요청엔 **성공 기준·검증 명령**(테스트/빌드/재현 스크립트)을 함께 받는다. 구현 후 그 검증을 실행해 **증거(출력)로 보고** — "됐다"는 말로 끝내지 않는다.
- append-only(과거 수정·삭제 금지). 결정이 바뀌면 새 DEC + 기존에 "Superseded by DEC-…" 표시. 상호참조는 [[DEC-…]]·날짜.
- /resume: **먼저 git status·브랜치로 미커밋(진행 중) 작업 발견** → 그다음 PROGRESS 최상단 + PROJECT_PLAN 현재 Phase + 최근 DEC 3건.
- /wrap: PROGRESS append + 새 DEC + PROJECT_PLAN 체크박스 갱신 + **미커밋이면 경고**(커밋 전엔 다음 /resume가 git status로만 발견).

### 길이 관리
- PROGRESS가 약 800줄/분기 경계를 넘으면 가장 오래된 분기를 docs/archive/로 옮기고 활성 파일 맨 아래 포인터 한 줄.

### 공유 vs 개인 / 시크릿
- 공유(커밋): CLAUDE.md·.claude/skills·.claude/settings.json·.gitattributes·docs/·.mcp.json(팀 MCP 서버 — 각자 첫 실행 때 승인).
- 개인(커밋 금지): .claude/settings.local.json·CLAUDE.local.md. 개인 노트는 auto-memory(~/.claude/projects/<proj>/memory, 머신 로컬·200줄/25KB).
- 시크릿(.env·키·비밀번호)은 읽지도 커밋하지도 않는다.

### 토큰 참고
- docs/는 자동 선로딩되지 않고 필요 시만 읽힌다. 분할은 토큰이 아니라 정리·타겟 정확도용.
