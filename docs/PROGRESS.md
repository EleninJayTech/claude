# PROGRESS (최상단 append)

- [docs][Done] 확장기능 설치 체크리스트 번호 이동 00→**03** — 00 슬롯은 다른 신규 문서용으로 재예약. CLAUDE.md 구성물 표 갱신 — @bsjeong87 (main) 2026-07-23

- [docs][Done] 00 신규 문서 신설 — `00_확장기능-설치-체크리스트.md` v1.0. 드롭인하면 감지(기존/유사 구성)→체크리스트 확인 요청(AskUserQuestion: 항목·유지/재구성/교체·스코프 글로벌/프로젝트·호출 방식 자동/수동)→선택 항목만 설치→검증 증거 보고. 초기 3종: claude-hud(사용량 HUD, github.com/jarrodwatts/claude-hud)·svg-design 스킬(SVG 필터 가이드 분석을 SKILL.md로 증류 — useId·Safari 클리핑·numOctaves≤3·a11y·DOMPurify 규칙 + 4대 레시피)·frontend-design(Anthropic 공식 스킬). 원문(temp/)은 .gitignore로 커밋 제외. 이후 항목 추가는 §4 규약(무엇/스코프/감지/설치/검증/제거) — @bsjeong87 (main) 2026-07-23

- [docs][Done] (구)02 진단·확장활용 가이드 제거 + 문서 번호 재편 — 02는 진단부(반영 완료된 역사 기록)와 사람용 운영 가이드로, 범용 구성 적용(드롭인)에 불필요 판단. 00·01의 02 포인터를 공식 문서 직접 참조로 전환(통합구성 v1.7, 모델분담 v1.6). 번호 재편: 통합구성 00→01, 모델분담 01→02, 00 슬롯은 신규 문서 예약. [[DEC-20260723-bsjeong87-03]] — @bsjeong87 (main) 2026-07-23

- [docs][Done] 기본 원칙 명문화 — "1순위 = 최적의 결과물, 토큰 절약 = 품질 유지 전제의 2순위"를 00 §0(v1.6)·01 왜(v1.5)·CLAUDE.md에 반영, [[DEC-20260723-bsjeong87-02]] — @bsjeong87 (main) 2026-07-23

- [docs][Done] 공식 문서 재검증·최신화(v2.1.212→v2.1.218) + 범용성 검사 — 00 v1.5·01 v1.4·02 v1.2. 기존 서술은 전부 유효 확인(whats-new·changelog·model-config·sub-agents·sandboxing·advisor·memory·permissions 당일 조회). 정정 1건: 샌드박스 기본 읽기 정책(홈 전체→컴퓨터 전체). 신규 반영: `sandbox.filesystem.disabled`(v2.1.216)·`Tool(param:value)` deny/ask·worktree 기본 분기점(기본 브랜치)·서브에이전트 동시 상한 20/중첩 기본 비활성(v2.1.217)·Fable 5 메인은 advisor 없이 동작·`/checkup` 별칭. 범용성 정리: 00의 wave-project 사례 일반화, D-3 예시에서 `extraKnownMarketplaces`(개인 취향 키) 제거 — @bsjeong87 (main) 2026-07-23

- [docs][Done] html 전면 폐기 → md 단일 관리 전환 — 문서 용도가 드롭인 지시서로 확정되며 사람용 html 불필요 판단. 02를 md로 변환(v1.1, 내용 동일 — HTML만 존재하던 미해결 항목 해소) 후 html 3종 삭제. CLAUDE.md 문서 관리 규칙·PROJECT_PLAN 갱신, [[DEC-20260723-bsjeong87-01]](DEC-20260720-bsjeong87-01 대체) — @bsjeong87 (main) 2026-07-23

- [backup][Done] `global-config/` 백업 재동기화 — 새 PC 복원 후 바뀐 `~/.claude/settings.json`을 백업에 반영(화이트리스트 4종 중 settings.json 1건만 실제 변경). 추가: `PowerShell(Get-Content *.env*)` deny(00 v1.4 §D-3)·`statusLine.refreshInterval`·`enabledPlugins`·`autoUpdatesChannel`. 변경: claude-hud 소스 형식(github repo→git url)·`model`(fable-5[1m]→opus)·`theme`(dark-daltonized→dark). 무결성 검증: 화이트리스트 밖 파일 0건·토큰류 문자열 0건. 커밋 8cd1514 — @bsjeong87 (main) 2026-07-21

- [repo][Done] 이 repo 자체에 00 §E-1(단일 repo B형) 적용 — 그동안 PROGRESS·DECISIONS만 있고 `CLAUDE.md`·`PROJECT_PLAN.md`·`.claude/settings.json`·`.gitattributes`가 없던 공백을 메움. CLAUDE.md는 프로젝트 사실(문서 3종 역할·md/html 이중관리·백업 화이트리스트 규칙·커밋 양식) + §F-1 규칙블록 정본. PROJECT_PLAN은 기존 기록에서 Phase 1~4 역산. `.gitattributes` merge=union은 1인이지만 **여러 PC 작업**이라 채택. 커밋 7e1c13a — @bsjeong87 (main) 2026-07-21

- [setup][Done] 새 PC(YOGASLIM7) 포맷 후 글로벌 `~/.claude` 정본 복원 — `global-config/` → `~/.claude`. 복원분: `skills/humanizer/`(15개 파일, 그동안 전무)·`commands/`(resume·wrap·skill-setup, 전무)·`CLAUDE.md`(축약 8절→정본 9절)·`skills/resume`·`wrap`(1줄 축약→상세판). `settings.json`은 덮어쓰기가 아니라 **병합**(문서 반영분만 적용, 머신 현재값 보존 — [[DEC-20260721-bsjeong87-02]]). 최초엔 낡은 v1.2 문서 기준으로 수기 재구성했다가 `global-config/` 정본의 존재를 뒤늦게 발견해 교체 — [[DEC-20260721-bsjeong87-01]] — @bsjeong87 (main) 2026-07-21

- [공통][Done] sfa-project·wave-project에 v1.4/v1.3 델타 적용 점검·업데이트 — 기존 v1.3분(deny·effort 키)은 이미 적용 확인, 신규분(검증 기준 규칙·reviewer 지적 범위·implementer worktree 주석)을 12개 파일에 반영, 8개 repo 커밋·푸시. 본문 기록: sfa-project/docs/PROGRESS.md(07-20 2차) · wave-project/docs/INDEX.md — @bsjeong87 (main) 2026-07-20

- [docs][Done] 02 진단의 경량 보완(A안) 반영 — 00 v1.3→**v1.4**(F-1 검증 기준 규칙·`/init`·`.mcp.json` 공유목록·§G plan mode·`/clear`·교정 2회 룰), 01 v1.2→**v1.3**(`isolation: worktree`·`claude --worktree` 병렬, `claude -p` 팬아웃 대안, reviewer 지적 범위 제한). md+html 동기화, 상세는 02 가이드가 담당(00·01은 얇게 유지) — @bsjeong87 (main) 2026-07-20

- [docs][Done] `02_진단-확장활용-가이드.html` 신설 — 00·01 공백 진단(검증 루프·plan mode·컨텍스트 관리·worktree 병렬·헤드리스 팬아웃·MCP 부재) + 확장 활용 가이드(신입 3주 로드맵 포함). 근거: code.claude.com/docs best-practices·common-workflows·worktrees·headless·mcp 당일 검증. 00·01 HTML 내비게이션에 02 링크 추가 — @bsjeong87 (main) 2026-07-20

- [docs][Done] 문서 슬림화 — `00_01_99_통합_따라하기.html`·`99_WAVE전용*`(md+html) 삭제, 00·01 HTML 내비게이션에서 99 링크 제거. 이 repo의 초점은 **범용 통합구성(00) + 모델분담(01)** 으로 확정. 삭제본은 git 히스토리(62d5abe 이전)에서 복구 가능 — @bsjeong87 (main) 2026-07-20

- [docs][Done] 공식 문서 전면 재검증·최신화 — 마스터 v1.2→v1.3, 플레이북·WAVE·따라하기 v1.1→v1.2 (md 3종+html 4종 동기화). 주요 정정: 샌드박스 macOS·Linux·WSL2 지원(네이티브 Windows만 미지원), 내장 Explore=메인 모델 상속, opusplan×availableModels(v2.1.205+), frontmatter `effort:` 키 확정(🟡 2건 해소), advisor 수치 출처 확정, API 기본 1M 컨텍스트, theme 키 예시 제거. 커밋 55d0ae6·c7e4fe6 — @bsjeong87 (main) 2026-07-20
- [backup][Done] 글로벌 ~/.claude 구성 백업 `global-config/` 추가 — CLAUDE.md·settings.json·skills(resume/wrap/humanizer)·commands 화이트리스트 4종만. 시크릿(.credentials.json)·대화기록(history.jsonl, projects/) 제외. 커밋 2215127 — @bsjeong87 (main) 2026-07-20
- [repo][Done] .gitignore 신설(개인 .claude 설정 커밋 방지) + 잘못 커밋된 tmp 파일 제거 — @bsjeong87 (main) 2026-07-20
