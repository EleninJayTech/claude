# PROJECT_PLAN — 클로드 구성 문서 저장소

> 마스터 로드맵. 완료 항목은 체크하고 상세는 `PROGRESS.md`에, 결정 근거는 `DECISIONS.md`에 남긴다.

## 현재 Phase — **Phase 6 완료 → Phase 4 대기(유지보수)**
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

## Phase 4 — 유지보수 (예정)
- [ ] **다음 재검증: 2027-01경** (00 §L, 6개월 주기)
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
- [ ] **00 v1.7 실적용에서 나온 경량 반영 후보 2건**(2026-08-06, 승인 대기) — ① 06 §1 사전 확인에 "claude.ai 계정 GitHub 연결" 한 줄 추가(없으면 루틴 생성이 마지막에 401로 막힘) ② `dropin-applied`에 "부분 완료/사용자 조치 대기" 표기 허용(gh CLI 설치됨+미인증이 재적용까지 방치된 사례). 상세는 PROGRESS 2026-08-06 항목.
