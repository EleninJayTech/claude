# PROJECT_PLAN — 클로드 구성 문서 저장소

> 마스터 로드맵. 완료 항목은 체크하고 상세는 `PROGRESS.md`에, 결정 근거는 `DECISIONS.md`에 남긴다.

## 현재 Phase — **Phase 3.5 완료 → Phase 4 대기(유지보수)**
문서 체계가 2026-07-23 개편됐다: 드롭인 4종(00 셀렉터·01 통합구성·02 모델분담·03 확장기능) + 사람용 index.html(GitHub Pages). 남은 것은 유지보수 주기.

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

## Phase 4 — 유지보수 (예정)
- [ ] **다음 재검증: 2027-01경** (00 §L, 6개월 주기)
  - `code.claude.com/docs/en/whats-new` 최신 항목
  - 🔴🟡 항목: deny 서브프로세스 우회, **샌드박스 네이티브 Windows 지원 여부**, `attribution` 스키마, auto-memory 한도, `sandbox.credentials` 스키마
  - `/model` 별칭이 가리키는 실제 모델, `/effort` 단계·`ultracode` 동작, frontmatter `effort:` 키 유지 여부
  - 03 소스 생존: `github.com/jarrodwatts/claude-hud` 설치 명령, `github.com/anthropics/skills`의 frontend-design 위치·설치 CLI
  - 00 §B 문서 목록·raw URL이 실제 저장소와 일치하는지
  - 갱신 후 각 문서 "최종 갱신" 날짜 수정

---

## 미해결 / 관찰 중
- ~~**02 가이드는 HTML만 존재**~~ → 해소(2026-07-23): 02를 md로 변환하고 html 3종 전면 폐기, md 단일 관리로 전환 ([[DEC-20260723-bsjeong87-01]]).
