# PROJECT_PLAN — 클로드 구성 문서 저장소

> 마스터 로드맵. 완료 항목은 체크하고 상세는 `PROGRESS.md`에, 결정 근거는 `DECISIONS.md`에 남긴다.

## 현재 Phase — **Phase 4 유지보수 (2026-08-10 첫 수행)**
드롭인 5종(00 셀렉터·01 통합구성·02 모델분담·03 확장기능·04 검증 자동화) + 사람용 index.html(GitHub Pages). 설계 원칙: 2단계 선택형·중복 제거·회사 업무용 고려([[DEC-20260728-bsjeong87-01]]).

---

## Phase 1 — 문서 통합·정리 ✅
- [x] 8개 소스를 00 통합 마스터로 병합
- [x] 01 모델분담 플레이북 일반화(WAVE 전용 → 범용)
- [x] 문서 슬림화 — 따라하기·WAVE 전용 문서 삭제, 초점을 00+01로 확정
- [x] 역할 분담 확정 — 00·01 드롭인 지시서, 02 세션 운영 상세 ([[DEC-20260720-bsjeong87-05]])

## Phase 2 — 공식 문서 재검증 ✅
- [x] 2026-07-20 전면 재검증 → 00 v1.3, 01 v1.2
- [x] 02 진단·확장활용 가이드 신설(공백 진단 + 신입 3주 로드맵)
- [x] 02 진단 경량 반영(A안) → 00 v1.4, 01 v1.3
- [x] `global-config/` 백업 추가(화이트리스트 4종) ([[DEC-20260720-bsjeong87-04]])

## Phase 3 — 구성 배포·검증 🔄
- [x] sfa-project·wave-project에 v1.4/v1.3 델타 적용(8개 repo 커밋·푸시)
- [x] **새 PC(YOGASLIM7) 글로벌 복원** — `global-config/` → `~/.claude` (2026-07-21)
- [x] **이 repo 자체에 §E-1 적용** — CLAUDE.md·PROJECT_PLAN.md·.claude/settings.json·.gitattributes (2026-07-21)
- [x] `global-config/` 백업 재동기화 (2026-07-21) — `~/.claude`와 완전 일치 확인. 반영분: `PowerShell(Get-Content *.env*)` deny, `statusLine.refreshInterval`, `enabledPlugins`, `autoUpdatesChannel`, claude-hud 마켓플레이스 소스 형식(github→git url), `model`(fable-5→opus), `theme`(dark-daltonized→dark)
- [ ] 01 플레이북의 `.claude/agents/` 로스터 — 스택별로 다르므로 각 프로젝트 셋업 시 적용(이 문서 repo엔 불필요)

## Phase 3.5 — 문서 체계 개편 (2026-07-23) ✅
- [x] html 미러 폐기 → md 단일 관리 ([[DEC-20260723-bsjeong87-01]])
- [x] 공식 문서 재검증(v2.1.218) + 범용성 정리(프로젝트명·개인 취향 키 제거)
- [x] 기본 원칙 명문화 — 최적 결과 1순위·토큰 절약 2순위 ([[DEC-20260723-bsjeong87-02]])
- [x] (구)02 진단 가이드 제거 + 번호 재편: 통합구성→01, 모델분담→02 ([[DEC-20260723-bsjeong87-03]])
- [x] 03 확장기능 설치 체크리스트 신설(claude-hud·svg-design·frontend-design)
- [x] 00 통합-설치 셀렉터 신설(01~03 선택 설치, GitHub raw 폴백)
- [x] README + index.html(사람용, 비개발자 눈높이, frontend-design·svg-design 적용) ([[DEC-20260723-bsjeong87-04]])
- [ ] GitHub Pages 활성화 확인 — 저장소 Settings→Pages에서 main/root 지정(사용자 수동, eleninjaytech.github.io/claude)

## Phase 5 — 문서 확장 1차 (2026-07-28) ✅
- [x] Opus 5 출시 반영 — 01 v1.8·02 v1.7·00/03 v1.1 (v2.1.220 당일 재검증)
- [x] 커뮤니티·공식 기능 조사 → 공백 리스트업 → 설계 원칙 확정 ([[DEC-20260728-bsjeong87-01]])
- [x] 04_검증-자동화.md v1.0 신설 (hooks 게이트·gh/glab·CI 통합, 호스트 감지 분기)
- [x] 01 v1.9 — §J-1 auto mode + 부분 선택 / 02 v1.8 — reviewer 중복 정리·/goal / 03 v1.2 — MCP·브라우저 검증·플러그인 부록
- [x] 00 v1.2 — 2단계 선택 + README·index.html 동기화(04 반영)
- [x] 절약 프로필(Pro·한도 관리) — 00 v1.3·01 v1.10·02 v1.9·03 v1.3·04 v1.1 ([[DEC-20260728-bsjeong87-02]])

## Phase 5.5 — 적용 기록 도입 (2026-08-04) ✅
- [x] `dropin-applied` 한 줄 기록 + 재적용 분기(버전 diff·미선택 재질문) — 00 v1.4·01 v1.11·02 v1.10·03 v1.4·04 v1.2 ([[DEC-20260804-bsjeong87-01]])

## Phase 6 — 문서 확장 2차 + 전면 재검증 (2026-08-04) ✅
- [x] 전면 재검증(v2.1.221, 조사 에이전트 4종) — 정정 1건(중첩 스폰 기본 3) + "최근 재검증" 표기 분리 ([[DEC-20260804-bsjeong87-02]])
- [x] 05_출력스타일.md v1.0 신설 (내장 4종 + 커스텀 output-styles, keep-coding-instructions 함정)
- [x] 06_루틴-자동화.md v1.0 신설 (클라우드 스케줄 에이전트 — Pro+·preview·회사 게이트, docs/ROUTINES.md 기록 패턴) ([[DEC-20260804-bsjeong87-03]])
- [x] 00 v1.6·CLAUDE.md·README·index.html 문서 목록 동기화
- [x] `/reverify` 프로젝트 스킬 — 재검증+확장 조사를 한 명령으로 (2026-08-04)
- [x] `demo.html` 설치 시연 페이지 — 터미널 재생형 인터랙티브, Pages 배포 확인 (2026-08-05, [[DEC-20260805-bsjeong87-01]])
- [x] `intro.html` 소개 영상 페이지 — 키네틱 타이포 18초(컨셉 4안 중 사용자 선택), CLI 체크리스트·설치 출력 장면, 전 화면 배경 데코, v6까지 반복 개선 (2026-08-05, [[DEC-20260805-bsjeong87-02]])
- [x] 00 v1.7 설치 모드·번들 2축 도입(최소/권장/전체/사용자 + 목적 번들 합집합) + README·index·demo·intro 동기화 (2026-08-05, [[DEC-20260805-bsjeong87-03]])
- [x] `options.html` 설치 옵션 사전 — 00~06 전 선택지를 입문자 눈높이로 설명(용어 8개·공통 질문 4종·문서별 항목·추천 조합·FAQ) (2026-08-06, [[DEC-20260806-bsjeong87-01]])
- [x] 사람용 페이지 `pages/` 분리(index만 루트 유지, 공유 URL 변경) + 4페이지 최신화(index 문서 7장 반영·상호 링크·intro 날짜 정정) (2026-08-09, [[DEC-20260809-bsjeong87-01]])
- [x] pages/ 3종 리디자인 — 글씨체 Pretendard·Noto Serif KR 교체+`keep-all` 가독성, 격자·그레인 질감, 파비콘·og·`:active`·`↑ 목차` (2026-08-09)

## Phase 4 — 유지보수 (진행 중)
- [x] 2026-08-10 `/resume` 원격 최신화 선행 — 01 v1.13 + 글로벌 스킬·global-config/ 백업 + repo CLAUDE.md ([[DEC-20260810-bsjeong87-01]])
- [x] 2026-08-10 과거 중복 판정 전면 재심(v2.1.226 조회) — 정본 교체 0 · 정정 1(02 ultra 가용성) · 보강 4문서(01 v1.14·02 v1.13·03 v1.6·04 v1.4) ([[DEC-20260810-bsjeong87-02]])
- [x] 2026-08-10 `/dropin-check` 점검 전용 글로벌 스킬 신설 + `/reverify` 보강(잔여 인계·중복 재심 축) + 백업 구버전 2건 동기화 ([[DEC-20260810-bsjeong87-03]])
- [x] 2026-08-10 스킬 중복 등록 방지 — 구형 `commands/` 잔재 삭제(로컬·백업), 01 v1.15 설치 전 제거 규칙화 ([[DEC-20260810-bsjeong87-04]])
- [x] 2026-08-10 점검·최신화 스킬 배포 체계 — `/dropin-update` 신설, 01 §D-4 배포(v1.16·v1.17) + /resume 조건부 안내(30일 경과·예정일 경과), /reverify는 관리자 전용으로 안내 제외 ([[DEC-20260810-bsjeong87-05]]·[[DEC-20260810-bsjeong87-06]])
- [x] 2026-08-10 00~06 전수 정합성 점검 — 적용 기록 버전 하드코딩 실버그(01 5개 버전 뒤처짐) 해소, 자기 참조로 교체(00 v1.8·01 v1.18·02 v1.14·03 v1.7·04 v1.5·05 v1.1·06 v1.1), 업데이트 누락 불가 검증 ([[DEC-20260810-bsjeong87-07]])
- [x] 2026-08-10 실적용 공백 3건 반영 — 06 v1.2 계정 GitHub 연결 게이트, 00 v1.9 부분 완료 표기, 01 v1.19 PROGRESS ~40줄 Read limit ([[DEC-20260810-bsjeong87-08]])
- [x] 2026-08-10 index.html 폰트 통일 — 사람용 4페이지 Pretendard·Noto Serif KR 단일화 ([[DEC-20260810-bsjeong87-09]])
- [x] 2026-08-10 00 통합 설치를 이 repo 자체에 적용 — 권장 모드·표준 프로필, 01 v1.19 재구성 점검 어긋남 0건, `dropin-applied` 기록 신설(기록 부재 해소)
- [x] 2026-08-11 설치 옵션 학습 코스 `pages/learn.html` 신설(챕터 11개·선택 시뮬레이터·진행도 저장) — 5페이지 상호 링크·README·CLAUDE.md 동기화 + 03 v1.8 claude-hud 추천 표시 구성 ([[DEC-20260811-bsjeong87-01]])
- [x] 2026-08-12 dropin-check/update 설치 유형 전 지원 — 00 v1.10 `출처=` 필드·01 v1.20·스킬 2종 개정(사본/클론/raw, 삭제돼도 동작), wave 실사례 공백 해소 ([[DEC-20260812-bsjeong87-01]])
- [x] 2026-08-12 STEP 2 흔적 감지 보강(승인 대기 후보 ①②③ 소진) — 00 v1.11 로컬 전용 산출물 조회·/dropin-check 동일·02 v1.15 부분 적용 사유 기록 ([[DEC-20260812-bsjeong87-02]])
- [x] 2026-08-12 /resume·/wrap 조건부 안내 보강 — 조치 대기 메모 안내(DEC-0810-08 취지 배선 완성)·PROGRESS 800줄 경계 감지, 01 v1.21+글로벌 스킬·백업 동기화 ([[DEC-20260812-bsjeong87-03]])
- [x] 2026-08-12 아카이브 포인터 최상단 이동·docs/ 폴더 단위 검색 규칙 — 01 v1.22·repo CLAUDE.md·wrap 스킬 동기화, 버전 표 순서 오류 부수 정정 ([[DEC-20260812-bsjeong87-04]])
- [ ] **다음 재검증: 2027-01경** (00 §L, 6개월 주기)
  - 중복 재심 🟡 잔여: Context7·Caveman 생존, todo-tracking 공식 문서(2026-08-10 404), `/team-onboarding` 재평가 ([[DEC-20260810-bsjeong87-02]])
  - `code.claude.com/docs/en/whats-new` 최신 항목
  - 🔴🟡 항목: deny 서브프로세스 우회, **샌드박스 네이티브 Windows 지원 여부**, `attribution` 스키마, auto-memory 한도, `sandbox.credentials` 스키마
  - `/model` 별칭이 가리키는 실제 모델, `/effort` 단계·`ultracode` 동작, frontmatter `effort:` 키 유지 여부
  - auto mode 요건(플랜·모델·프로바이더)·`disableAutoMode` 유지 여부(01 §J-1)
  - 03 소스 생존: `github.com/jarrodwatts/claude-hud` 설치 명령, `github.com/anthropics/skills`의 frontend-design 위치·설치 CLI, `claude mcp` 명령 체계, 부록 플러그인 생존·중복 재판정
  - 04: hooks 스키마·`claude-code-action` 버전·gh/glab 설치 명령
  - 05: `outputStyle` 키·frontmatter(`keep-coding-instructions` 기본값)·내장 스타일 목록
  - 06: **routines preview→GA 전환 여부(3개월 주기 권장)**·`/schedule` 명령·요금제 범위·시크릿 저장소 신설 여부
  - 00 §B 문서 목록·raw URL이 실제 저장소와 일치하는지
  - 갱신 후 각 문서 "최종 갱신" 날짜 수정

---

## 미해결 / 관찰 중
- ~~**02 가이드는 HTML만 존재**~~ → 해소(2026-07-23): 02를 md로 변환하고 html 3종 전면 폐기, md 단일 관리로 전환 ([[DEC-20260723-bsjeong87-01]]).
- [x] ~~**00 v1.7 실적용에서 나온 경량 반영 후보 2건**(2026-08-06, 승인 대기)~~ → **해소(2026-08-10)**: ① 06 v1.2 §1 계정 GitHub 연결 게이트 ② 00 v1.9 부분 완료 표기 ([[DEC-20260810-bsjeong87-08]])
- [ ] **플러그인 설치 상태는 백업 경로 없음**(2026-08-10 발견, [[DEC-20260810-bsjeong87-10]]) — `plugins/installed_plugins.json`·`known_marketplaces.json`이 화이트리스트 밖이라 새 PC에서 claude-hud는 `/plugin` 수동 재설치. 캐시(수백 KB)와 같은 폴더라 편입 보류 — 다음 재검증에서 선별 백업 가능한지 판단.
- [x] ~~**STEP 2 흔적 감지가 로컬 전용 산출물을 못 본다**~~(2026-08-10 실적용 발견) → **해소(2026-08-12)**: 후보 ①②③ 전부 반영 — 00 v1.11 STEP 2 조회 확장·/dropin-check 동일·02 v1.15 부분 적용 사유 기록 ([[DEC-20260812-bsjeong87-02]]). (이하 원문) nastvad에서 02를 "미설치"로 오판: 산출물이 `.git/info/exclude`(`.claude/agents/`·`hooks/`)와 `.gitignore`(`*.local.md` rubric)로 전부 로컬 전용이라 파일 존재 여부만으로는 적용 범위를 알 수 없었다. 후보 조치 — ① 00 STEP 2 `.claude/agents/` 항목에 "rubric·핸드오프 산출물(`model-routing.local.md` 등)까지 확인, gitignore·`.git/info/exclude`도 조회" 한 줄 ② `/dropin-check`에 동일 감지 ③ 02가 부분 적용될 때 **어느 에이전트를 왜 뺐는지**를 `dropin-applied` 괄호에 남기게 명시([[DEC-20260810-bsjeong87-08]]의 부분 완료 표기 확장). 근본 해법은 기록([[DEC-20260804-bsjeong87-01]])이지만 기록 도입 이전 프로젝트엔 흔적 감지가 유일한 수단이라 보강 가치 있음.
- [ ] **`~/.claude` 수정이 백업에 자동 반영되지 않는 구조**(2026-08-10 재확인) — 오늘 적용한 03·05 산출물이 전부 백업에서 빠져 있었고 `/dropin-check`로만 발견됐다. 수동 복사 규칙([[DEC-20260720-bsjeong87-04]])을 유지할지, 동기화 스킬·hook으로 자동화할지 판단 필요.
