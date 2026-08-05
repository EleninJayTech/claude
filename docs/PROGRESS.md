# PROGRESS (최상단 append)

- [docs][Done] 02 v1.12 — **적용 대상 가드 추가**(적합성 점검에서 발견한 약점 해결): 02를 단독 드롭인하면 비개발·문서 전용 repo에도 로스터 생성을 시도할 수 있었음(가드가 00 §B 의존 표기에만 존재) → STEP 1 선두에 "코드·빌드 없는 repo면 고지 후 중단(필요한 건 보통 01·04)" 명시. + **공유 URL 3종 노출**: README 상단 링크 3줄을 "공유 링크" 표(URL 원문 표시)로 교체, index.html에 후원 앞 "공유 링크" 섹션 신설(intro·demo·사용법 주소 원문). CLAUDE.md 구성물 표 02 v1.12 반영 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `intro.html` v6 — 배경 데코 전면 확장(사용자 피드백: 밀도 부족): ① 단어 비트 배경을 블록 2개→**6~7개로 증량**(화면 8구역 — 모서리 4+변 4 — ~80% 커버: 파일 리스트·cmd 창 3종·git 명령·거대 글리프 ❯_·☑·7장 등) ② **나머지 화면에도 배경 신설** — 명령 비트(파일 리스트+거대 ❯+00), 체크리스트(거대 ?+문서 요약+프로필), 설치(deny 스니펫+로스터 배정+⚙), CTA·포스터(파일 리스트+☑+GitHub URL). addBG(container,key) 헬퍼로 통합, 포스터에도 정적 적용. 공통 소재는 상수(F_A·F_B·W_*)로 재사용 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `intro.html` v5 — 단어 비트 배경 데코 레이어 추가(사용자 요청): 거대 단어 뒤에 비트별로 다른 디자인이 연하게(opacity .075~.12) 깔림 — "문서를"=문서 리스트(00~06 파일명), "넣는다"=폴더 트리, "한 문장"=cmd 창 목업(●●● 크롬+프롬프트), "말한다"=적용 대사, "끝"=☑☑☑+dropin-applied 주석, "증거"=테스트 출력(42/42), "그날 확인"=공식 문서 체크 목록. 블록별 미세 드리프트 애니메이션(7~9s alternate, paused 동기화·RM 제외), 템플릿은 BG 객체로 데이터화 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `intro.html` v4 — 속도·기술 밀도 보강(사용자 피드백): ① 전 비트 단축(20→18초, 슬램 .3→.24s) ② **CLI 체크리스트 장면 신설** — 설치 항목 4행이 커서 스윕(노랑 하이라이트가 행을 훑음)과 함께 ☐→☑ 팝+글로우로 체크됨(03은 skip 회색), 항목마다 기술 설명(CLAUDE.md·.claude/agents/·hooks 게이트) ③ **설치 출력 장면 신설** — 생성 파일 5종(settings.json deny·skills·agents·hooks)이 ✓ 팝으로 찍히고 진행 바 채워진 뒤 "검증 통과 — 증거 출력 확인" ④ 4연타 단어 비트를 "말 대신 증거./그날 확인." 2비트로 압축. CSS 지연 기반이라 일시정지에도 동기화 유지 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `intro.html` v3 — 컨셉 교체(사용자 선택: 4개 후보 제시 → **키네틱 타이포**) — 흑백 고대비+노랑 1색, 거대 한글 단어가 박자 단위 컷 편집으로 슬램/슬라이드/플래시(15비트 ≈20초 + CTA): "문서를→넣는다→한 문장→말한다→끝." → 명령어 타이핑 → 감지·선택·설치·검증 클러스터 → 기억/잠금/분담/검사 4연타 → "전부, 공식 문서로, 그날 확인." → CTA(URL 복사·링크·다시 보기). 엔진을 DOM 장면에서 JS 비트 배열로 교체(배경 반전 컷·연속 진행 바 시킹·화면 클릭 일시정지). reduced-motion 대응 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `intro.html` v2 전면 재작성(사용자 피드백: 서론 김·느림·AI 룩) — ① 압축: 7장면 1분 → **5장면 25초**, 핵심 선언("넣는다→말한다→끝")을 첫 장면으로 ② frontend-design 원칙 적용: 중앙 정렬 AI 기본값 룩 탈피 — 에디토리얼 좌측 정렬·거대 배경 숫자·모눈종이 질감·하드섀도 스탬프·형광펜 스와이프 장면 전환(skewX 마커 와이프) ③ 인터랙션 추가: 스탬프 호버 리프트, URL 복사 버튼(clipboard), CTA 장면의 실제 링크·다시 보기, 포스터 버튼 펄스. reduced-motion 대응 유지 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `intro.html` 1분 소개 영상 페이지 신설([[DEC-20260805-bsjeong87-02]]) — 유튜브 소개용 시네마틱 프레젠테이션: 16:9 스테이지, 7장면 자동 전환(후킹→문제→해법(goo 블롭 병합)→방법(프롬프트 타이핑)→얻는 것(스탬프 6종)→신뢰→CTA), 포스터/엔딩 오버레이·장면 막대 시킹·일시정지·스페이스바·reduced-motion 대응. index.html 히어로 CTA 1순위로, demo.html·README 상호 링크. 검증: node --check 통과, Pages HTTP 200 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `demo.html` 설치 시연 페이지 신설([[DEC-20260805-bsjeong87-01]]) — 소개·사용법을 영상처럼 보여주는 인터랙티브 시연(7챕터: 소개→한 문장→고르기→설치와 증거→매일 루틴→업데이트→끝). 터미널 재생 엔진(타이핑 효과·체크리스트 애니메이션·재생/일시정지/챕터 점프/진행 바 시킹/배속 1~2×/자막, 스페이스바 단축키, prefers-reduced-motion 대응), index.html 디자인 토큰 재사용. index.html 히어로에 "▶ 설치 시연 보기" 버튼·README에 🎬 링크 추가, CLAUDE.md 구성물 표 반영. 검증: script 블록 node --check 통과, Pages 배포 확인 — @bsjeong87 (main) 2026-08-05

- [docs][Done] `/reverify` 프로젝트 스킬 신설(`.claude/skills/reverify/SKILL.md`, 수동 호출 전용) — 오늘 수행한 전면 재검증+확장 조사를 한 명령으로 재실행 가능하게 절차화: ① 조사 에이전트 4종 병렬(모델·권한·소스 생존·신규 후보) ② 정정 수술 반영+날짜 규칙(최근 재검증은 전 문서, DEC-0804-02) ③ 확장 후보는 보고만(신설은 승인 후) ④ PROGRESS/DEC/커밋+증거 보고. CLAUDE.md 관리 규칙에 포인터 한 줄 — @bsjeong87 (main) 2026-08-04

- [docs][Done] 문서 확장 2차 — 신규 드롭인 2종 신설(당일 공식 문서 조회 기반, [[DEC-20260804-bsjeong87-03]]): **05_출력스타일.md v1.0**(내장 4종 전환+커스텀 `output-styles/*.md` 생성 — (구)`/output-style` 명령 제거(v2.1.91)·현행 `/config`/`outputStyle` 키, `keep-coding-instructions` 기본 false 함정, 세션 중 변경 미적용, 서브에이전트 미적용 명시) · **06_루틴-자동화.md v1.0**(클라우드 스케줄 에이전트 — research preview·Pro+, 트리거 3종(스케줄 `/schedule`·API·GitHub), repo 준비물(.mcp.json 프로젝트 스코프), 정의는 계정 저장이라 docs/ROUTINES.md 기록 패턴, 회사 게이트 🔴). 동기화: 00 v1.6(§B·§C·STEP 2), CLAUDE.md 구성물 표, README·index.html(문서 목록 변경 — DEC-0723-04 의무) — @bsjeong87 (main) 2026-08-04

- [docs][Done] 전면 재검증(v2.1.221, 당일 공식 문서 조회 — 조사 에이전트 4종 병렬: 모델·effort·advisor / 권한·샌드박스·hooks / 외부 소스 생존 / 신규 구성 후보) — 00 v1.5·01 v1.12·02 v1.11·03 v1.5·04 v1.3. **정정 1건**: 서브에이전트 중첩 스폰 기본 깊이 3(v2.1.219+, (구)"기본 비활성"). **갱신**: 03 frontend-design 플러그인 마켓플레이스 설치 병기·플러그인 즉시 활성화(v2.1.221)·Chrome 표기(GA→전 유료 플랜), 02 §E에 /code-review ultra·/simplify 한 줄. 나머지 전 서술 유효 확인(샌드박스 Windows 미지원·attribution·auto-memory 200줄/25KB·hooks·advisor −11.9%/+2.7%p·1M 정책·외부 소스 5종 생존·raw URL 200). **"최근 재검증" 표기 분리**([[DEC-20260804-bsjeong87-02]]). 신규 범용 문서 후보 조사: Output Styles·Routines(클라우드 스케줄 에이전트) 유력, statusline 커스텀은 claude-hud와 중복 — 채택 여부는 사용자 결정 대기 — @bsjeong87 (main) 2026-08-04

- [docs][Done] 적용 기록(dropin-applied) 도입 — 문서 업데이트 후 재적용 시 버전 비교가 가능하도록, 적용 시 대상 CLAUDE.md 맨 아래 한 줄(`<!-- dropin-applied: 적용일 · 프로필 · 문서별 버전 · 미선택 -->`)을 남기게 5종 갱신([[DEC-20260804-bsjeong87-01]]): 00 v1.4(STEP 5 기록 형식 정의 + STEP 2 기록 우선 확인 + STEP 3 재적용 분기 — 버전 diff 요약, 버전 동일해도 기존 재구성/미선택 추가 질문) · 01 v1.11 · 02 v1.10 · 03 v1.4 · 04 v1.2(각 STEP 4에 기록 한 줄, 단독 적용 시에도). CLAUDE.md 구성물 표 갱신 — @bsjeong87 (main) 2026-08-04

- [docs][Done] 00 단독 설치 경로 실증 검증 — "00_통합-설치.md 하나만으로 전체 설치 가능한가" 질문에 증거로 확인: §B 등재 5개 문서(00~04)의 GitHub raw URL(한글 파일명 URL 인코딩) HEAD 요청 전부 HTTP 200, §A STEP 1 폴백(로컬 없으면 저장소 원본 WebFetch) 경로 유효. 문서 변경 없음(검증만). 전제: 인터넷(WebFetch) 가능 환경 — @bsjeong87 (main) 2026-07-28

- [docs][Done] 절약 프로필(Pro·한도 관리) 도입 — 별도 Pro 문서 대신 기존 문서 선택지로([[DEC-20260728-bsjeong87-02]]). 00 v1.3(STEP 3 운용 프로필 표준/절약 + §C Pro 행) · 01 v1.10(§D-6 절약 운용: medium 시작·필요 시만 상향, ultracode/max 비권장, 품질 불변 지점 명시) · 02 v1.9(§F 절약 배정: Sonnet+상위 advisor 1순위 패턴, haiku 적극, 로스터 축소 — 트리아지·최종 리뷰 불변) · 03 v1.3(절약이면 claude-hud 기본 체크) · 04 v1.1(게이트는 절약에서도 유지). README·index.html에 Pro 안내 추가 — @bsjeong87 (main) 2026-07-28

- [docs][Done] 문서 확장 1차(커뮤니티·공식 기능 조사 기반, [[DEC-20260728-bsjeong87-01]]) — **04_검증-자동화.md v1.0 신설**(hooks 게이트·gh/glab CLI·CI 통합, git 호스트 감지 분기, 회사 정책 게이트) · 01 v1.9(§J-1 auto mode 신설 + STEP 3 부분 선택 ⓐ~ⓕ) · 02 v1.8(로스터 에이전트별 선택, 내장 /code-review 정본화·커스텀 reviewer 선택 강등, /goal·백그라운드 서브에이전트 경량) · 03 v1.2(§4 MCP·§5 브라우저 검증 추가, 플러그인 부록 — 중복 판정 표) · 00 v1.2(§B에 04, 2단계 선택 명시, 회사 repo 추천 조합). 문서 목록 변경으로 README·index.html 동기화(04 카드·블롭 추가, DEC-0723-04 규칙) — @bsjeong87 (main) 2026-07-28

- [docs][Done] Opus 5 출시 반영(당일 공식 문서 조회: whats-new·changelog·model-config·advisor·models-overview) — 01 v1.8(§D-6 effort 지원표에 Opus 5, hold 차이), 02 v1.7(§I 라인업: `opus` 별칭=Opus 5 v2.1.219+, 기본 모델 Max·API=Opus 5, Fable 폴백 분화 바이오→Opus 5·사이버→Opus 4.8, Opus 5 자체 분류기, fast mode=Opus 5·4.8 전용, advisor Opus 4.7+ 동급 규칙), 00·03 v1.1(참조 v2.1.220). CLAUDE.md 구성물 표 갱신. Opus 5: $5/$25 MTok(4.8 동일)·1M/128K·컷오프 2026-05 — @bsjeong87 (main) 2026-07-28

- [docs][Done] index.html 전면 재디자인 + README·index 눈높이 하향 — frontend-design 스킬 원문(anthropics/skills) 원칙 적용: AI 기본값 룩 3종 회피, "종이 문서+형광펜 체크" 방향, 시그니처=03 svg-design 레시피(Gooey feColorMatrix 19 -8·Squiggle feTurbulence+feDisplacementMap)로 그린 대표 이미지(00~03 문서가 하나로 합쳐지는 애니메이션, reduced-motion 대응·aria-label). 이후 요청으로 README·index 카피를 비개발자도 이해하는 수준으로 재작성(Claude Code 정의부터, 용어 풀이·비유) — @bsjeong87 (main) 2026-07-23

- [docs][Done] GitHub Pages 오픈 준비 — `사용법.html`→`index.html` 전환(별도 페이지 신설 대신 단일 페이지 유지). 보강: 히어로에 GitHub 저장소·00 문서 버튼, 카드별 문서 열기 링크(GitHub blob), 후원 섹션(Buy Me a Coffee). README·CLAUDE.md 참조 갱신, Pages URL: eleninjaytech.github.io/claude — @bsjeong87 (main) 2026-07-23

- [docs][Done] README.md 작성 — 저장소 소개(드롭인 개념·빠른 시작 3단계·문서 표 00~03+사용법.html·원칙 3줄) + Buy Me a Coffee 후원 섹션(buymeacoffee.com/eleninjaytech) — @bsjeong87 (main) 2026-07-23

- [docs][Done] `사용법.html` 신설 — 개발 입문자 대상 사람용 안내 페이지(드롭인 개념, 문서 4종 역할, 상황별 명령 문장, 매일 루틴, FAQ). md 미러가 아니라 DEC-0723-01(md 단일 관리)의 이중 관리에 해당하지 않음 — 문서 목록 변경 시에만 갱신. CLAUDE.md 구성물 표·규칙에 예외 명시 — @bsjeong87 (main) 2026-07-23

- [docs][Done] `00_통합-설치.md` v1.0 신설 — 01~03을 선택 목록(AskUserQuestion multiSelect)으로 통합 설치하는 셀렉터. 라우터 원칙(설치 로직 중복 금지, 각 하위 문서가 정본), 로컬에 하위 문서 없으면 GitHub raw 폴백, 기존/유사 구성은 유지/재구성/교체 질문, 상황별 추천 조합(§C), 04~ 추가 시 §B 표만 갱신 — @bsjeong87 (main) 2026-07-23

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
