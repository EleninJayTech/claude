# Claude Code 통합 구성 — 범용 마스터 (드롭인 적용)

> **문서 버전: v1.34** · 최종 갱신: **2026-08-13** · **최근 재검증: 2026-08-04** · 기준: Claude Code v2.1.226 (Opus 5 · Sonnet 5 · Fable 5)
>
> | 버전 | 날짜 | 변경 내용 |
> | --- | --- | --- |
> | v1.0 | 2026-07-03 | 8개 소스 통합 초판 (setup-followalong v8 반영) |
> | v1.1 | 2026-07-03 | 공식 문서 재검증: deny 파일명령 감지(v2.0.22+) 반영, `includeCoAuthoredBy`→`attribution` 교체, PowerShell deny 패턴(`type`/`Get-Content`/`gc`) 추가, Windows sandbox 미지원 명시, deny→ask→allow 우선순위 명시 |
> | v1.2 | 2026-07-08 | 추론 강도 제어 `/effort` §D-6 추가 (xhigh=high보다 깊고 max 바로 아래; Fable 5·Opus 4.7+·Sonnet 5; 값은 새 세션 기본값으로 저장). §L 재검증 항목 반영 |
> | v1.3 | 2026-07-20 | 공식 문서 전면 재검증: 샌드박스 **Linux·WSL2 지원** 반영(네이티브 Windows만 미지원, §J), Read deny의 Edit 차단(v2.1.208+), PowerShell 규칙 **별칭 자동 정규화**, 에이전트·스킬 frontmatter **`effort:` 키 확정**(§D-6 🟡 해소), `/effort auto`·`ultracode`·`ultrathink` 추가, `sandbox.credentials`, `.claude/rules/` 소개, 스킬=커맨드 통합 반영 |
> | v1.4 | 2026-07-20 | 경량 보완(02 가이드 연동): §F-1에 **검증 기준 규칙**(성공 기준·검증 명령 동봉), §E에 `/init`, 공유 목록에 `.mcp.json`, §G 루틴에 **plan mode·`/clear`** 습관. 상세 기법은 02 진단·확장활용 가이드 참조 |
> | v1.5 | 2026-07-23 | 공식 문서 재검증(v2.1.218 기준, 기존 서술 전부 유효 확인): 샌드박스 기본 읽기 정책 표현 정정(홈 전체→**컴퓨터 전체**), `sandbox.filesystem.disabled`(v2.1.216) 추가, `Tool(param:value)` deny/ask 매칭 한 줄 추가(§J). **범용성 정리**: 특정 프로젝트명 사례 일반화, D-3 예시에서 개인 취향 키(`extraKnownMarketplaces`) 제거 |
> | v1.6 | 2026-07-23 | **기본 원칙 명문화**(§0): 1순위 = 최적의 결과물, 토큰 절약 = 품질을 해치지 않는 범위의 2순위 |
> | v1.7 | 2026-07-23 | **(구)02 진단·확장활용 가이드 제거** — 세션 운영 상세는 공식 문서(best-practices 등) 직접 참조로 전환(§0·§G). **문서 번호 재편**: 이 문서 00→**01**, 모델분담 01→**02** (00 슬롯은 신규 문서 예약) |
> | v1.8 | 2026-07-28 | **Opus 5 출시 반영**(v2.1.219+, 당일 공식 문서 조회): §D-6 effort 지원표에 Opus 5 추가(전 단계), effort 기본값 hold 차이(Opus 5는 hold 없음) 명시 |
> | v1.9 | 2026-07-28 | **부분 선택 도입**(STEP 3: 구성 항목을 선택 목록으로 확인 후 생성) + **§J-1 auto mode 신설**(권한 분류기 — 안전 요건·회사 정책 우선·스코프 제한, 당일 공식 문서 조회) |
> | v1.10 | 2026-07-28 | **절약 프로필 추가**(§D-6): Pro·한도 관리 사용자용 effort 운용 — medium 시작·필요 시만 상향, ultracode/max 비권장, 컨텍스트 절약 습관. 품질 불변 지점 명시 |
> | v1.11 | 2026-08-04 | **적용 기록 한 줄 추가**(STEP 4: 대상 CLAUDE.md에 `dropin-applied` 버전 기록 — 재적용 시 버전 비교용, 형식·재적용 규칙은 00 §A) |
> | v1.12 | 2026-08-04 | **전면 재검증**(당일 공식 문서 조회, v2.1.221): §C-7·D-3·D-6·J·J-1 전 서술 유효 확인 — 샌드박스 네이티브 Windows 여전히 미지원, `attribution` 스키마·auto-memory 한도(200줄/25KB)·hooks 스키마·`.mcp.json` 승인 플로우·effort 단계/frontmatter `effort:` 키 모두 현행 일치. **"최근 재검증" 표기 분리** |
> | v1.13 | 2026-08-10 | **`/resume`에 원격 최신화 선행 추가**(§F-1 규칙·§F-2 템플릿 A/B/C): remote 있고 워킹트리 clean이면 `git pull --ff-only` 먼저, 아니면 `git fetch` 후 뒤처짐만 보고 — 여러 PC·팀원 커밋을 못 보면 끝난 작업을 다음 할 일로 오판(DEC-20260810-bsjeong87-01) |
> | v1.14 | 2026-08-10 | **중복 재판정 경량 반영**(당일 조회, v2.1.226 — DEC-20260810-bsjeong87-02): §E `/init`에 대화형 플로우(`CLAUDE_CODE_NEW_INIT=1` — CLAUDE.md+스킬+hooks 제안형) 한 줄, §K 트러블슈팅에 `/doctor`(셋업 진단+수정, CLAUDE.md 트림 제안 v2.1.206+) 행 추가. 커스텀 `/resume`·`/wrap`+docs/ 기록 체계는 내장 Tasks(세션·휘발) 대비 정본 유지 재확인 |
> | v1.15 | 2026-08-10 | **스킬 중복 등록 방지**(DEC-20260810-bsjeong87-04): §F-2에 설치 전 같은 이름 구형 `commands/` 제거 규칙(방치 시 `/` 자동완성 2개·구형 내용 실행 위험 — 실제 발생 사례), §K에 증상 행 추가 |
> | v1.16 | 2026-08-10 | **`/dropin-check` 배포 + 점검 안내 내장**(DEC-20260810-bsjeong87-05): §D-4에 dropin-check 글로벌 스킬 설치(저장소 global-config 복사 또는 raw), §F-2 /resume 템플릿 A/B/C에 조건부 안내 단계(dropin-applied 30일 경과 시 /dropin-check, PROJECT_PLAN 예정일 경과 항목) — 매 세션 hook 안내 대신 resume 시 해당할 때만 |
> | v1.17 | 2026-08-10 | **`/dropin-update` 신설·배포**(DEC-20260810-bsjeong87-06): 문서 사본 최신화 스킬(버전 비교 보고 → 사용자 승인한 문서만 raw 최신본으로 교체, 원본 repo 안에선 git pull 안내 후 중단) §D-4 추가, §F-2 안내에 병기. 안내에서 /reverify 언급 제거(문서 저장소 관리자 전용) |
> | v1.18 | 2026-08-10 | **적용 기록 표기 자기 참조화**(DEC-20260810-bsjeong87-07, 00~06 공통): STEP 4의 하드코딩(`01 v1.12` — v1.13~17 동안 미동기 실버그)을 "최상단 문서 버전 표기에서 읽어 기록"으로 교체 + STEP 3 ⓒ에 점검 스킬 병기 |
> | v1.19 | 2026-08-10 | **/resume의 PROGRESS 부분 읽기 명시**(DEC-20260810-bsjeong87-08): §F-1 규칙·§F-2 템플릿 A/B/C에 "최상단 ~40줄만 Read limit" — 800줄 상한 근접 시 통째 읽기(수만 토큰)를 차단 |
> | v1.20 | 2026-08-12 | **점검·최신화 스킬의 설치 유형 전 지원 명시**(§D-4): dropin-check·update가 사본/클론 참조/raw 세 유형 모두 지원(판별 근거는 00 v1.10 `출처=` 필드) — 클론 참조 설치에서 update가 "사본 없음"만 보고하던 공백 해소(스킬 본문도 동일 개정) |
> | v1.21 | 2026-08-12 | **조건부 안내 2건 보강**(DEC-20260812-bsjeong87-03, §F-2 A/B/C+글로벌 스킬 동기화): ① /resume — dropin-applied 괄호의 조치 대기 메모 안내(DEC-20260810-bsjeong87-08 "다음 세션이 발견" 취지의 배선 완성, 추가 조회 0) ② /wrap — append 후 PROGRESS ~800줄 경계 감지·아카이브 안내(길이 관리 규칙의 감지 주체 부재 해소 — /resume는 앞 40줄만 읽음) |
> | v1.22 | 2026-08-12 | **아카이브 포인터 최상단 이동 + 폴더 단위 검색 규칙**(DEC-20260812-bsjeong87-04, §F-1): 포인터 "맨 아래"는 통째 읽기 시절 설계 — /resume 40줄 읽기(v1.19)와 어긋나 아카이브 존재가 영영 안 보임 → 최상단(제목 바로 아래)으로. 과거 이력 검색은 활성 파일이 아니라 `docs/` 폴더 단위(아카이브 포함) 명시. 부수: 버전 표 v1.20·v1.21 행 삽입 위치 오류(v1.17 뒤) 정정 |
> | v1.23 | 2026-08-12 | **스킬 스코프 우선순위 정정**(/audit S1, 당일 공식 문서 확인): "프로젝트 `.claude/skills/`가 글로벌 기본형을 덮어씀"은 **정반대** — 공식 우선순위는 **enterprise > personal > project**(개인이 프로젝트를 이김, 스킬>커맨드). §D-4·§E-3·§E-4·§F-2 B/C 통일 — B·C는 글로벌 기본형(A) **교체** 방식으로 설치(동명 방치 시 B·C가 실행되지 않음). §E-4에 중첩 스킬 디렉터리-한정 이름 로드(v2.1.203+) 반영 |
> | v1.24 | 2026-08-12 | **/audit 중·하 등급 일괄 반영**(docs/audit-20260812.md): §D-3 deny 예시 실물 동기화 3건(M5: `Get-Content *.pem`/`*.key`·`coverage`)+선택 확장 예 `sessionUrl`·`startup` 매처(h23), §F-2 A/C resume 템플릿에 최근 DEC 3건(M6), §G git pull 이중 실행 제거 — /resume에 위임(M9), §F-1 길이 관리에 append는 포인터 아래부터(M10), §B에 비-git 폴더 행(M26), §K에 push 권한 없음 행(h10), §F-2 A wrap 템플릿에 파생 뷰 동기화(h19), 푸터 변경 요약을 버전 표 참조로 교체(h3) |
> | v1.25 | 2026-08-12 | **글로벌 정본 ↔ 백업 미러 대조를 /wrap에 배선**(DEC-20260812-bsjeong87-06, §F-2 A/B/C): `~/.claude`와 `global-config/`는 자동 동기화가 없어 한쪽만 고치면 갈라지는데 **감지 주체가 없었다**(양방향 실사례 2건 — 2026-08-10 백업 누락·08-12 정본 미반영). 세션 중 어느 쪽이든 고쳤을 때만 5종 해시 대조(약 0.5초, 클론 없으면 생략) → 방향 판정+복사 안내. `settings.json`은 키 단위·머신 종속 키 제외 |
> | v1.26 | 2026-08-12 | **B·C 교체의 PC 전역 전파 경고 + 폴백 의무화**(§F-2): 글로벌은 PC당 하나라 한 프로젝트에서 B·C로 교체하면 **같은 PC의 다른 프로젝트도 그것을 실행**한다(v1.23이 확정한 personal>project의 부작용 — 단일 repo에서 B의 단위 판별이 헛돈다). 주의 문구에 전파 경고 한 줄 + B·C의 resume·wrap 템플릿 4곳에 **폴백**(단위 없음·단일 repo·비-git) 한 줄씩 — 실제 배포된 글로벌 스킬엔 이미 있던 폴백이 문서 템플릿엔 빠져 있어 신규 설치자만 위험을 떠안던 공백 |
> | v1.27 | 2026-08-12 | **/audit 2차 반영**(docs/audit-20260812-2.md): §D-2에 **"정본은 `global-config/CLAUDE.md`" 포인터**(M8 — 골격만 보고 재구성해 스킬·§9를 누락한 2026-07-21 실사례 재발 차단), §D-1 폴더 생성 4종으로(L1 — §D-4·§D-5와 어긋나 있던 것), §A STEP 3에 **00 모드별 ⓐ~ⓕ 기본값 매핑**(M10 — "최소=필수만"의 필수가 미정의였음), §F-2 A wrap 템플릿의 `§D-1` 오참조를 DEC-20260721-bsjeong87-02로 교체(M2), §D-3 hooks 예시를 실물 문구로(L11), 축약 DEC id 정식화(L6), 버전 표 v1.25↔v1.26 순서 복구(M5) |
> | v1.28 | 2026-08-12 | **/audit 3차(회귀 감사) 반영**(docs/audit-20260812-3.md): §F-2 A wrap 템플릿의 판정 기준을 **4키+포함 기준 정본**으로(M1 — 2차가 사본 4곳만 통일하고 **그 사본들을 만들어내는 원본 템플릿**을 빠뜨려, 01로 설치한 신규 PC만 2키로 돌던 회귀), §F-2 A/B/C resume 템플릿 3곳에 **`게이트 차단(사유)` 소비자 배선**(M3 — 04·06이 생산을 시작했는데 신규 설치자의 /resume은 소비하지 않던 것), §A STEP 3 **최소 모드 = ⓑⓒⓓ**로 정정(M14 — ⓑⓓ면 §F-1이 전제하는 스킬이 없고 §D-5 4종 검증이 구조적으로 실패), §D-3에 `startup` 매처 예시 문구(L15)·deny 배열 **순서 무관** 명시(L16) |
> | v1.29 | 2026-08-12 | **/audit 4차(앵커 없는 전수조사) 반영**(docs/audit-20260812-4.md): §F-2 **A 템플릿에 비-git 폴백**(M7 — v1.26이 B·C만 고쳐 단일 repo 신규 설치자가 쓰는 A에 그대로 남아 있던 것)+**B·C wrap에 4키 판정 기준 참조**(M8 — v1.28이 A만 고친 대칭 회귀)+A/B/C 전부에 **`docs/` 부재 폴백**(M29), §L 점검 범위를 **A·B·C 전 템플릿**으로 확대(M7 — 문구가 A를 명시 제외해 다음 재검증에서도 안 걸리던 것)·자기 버전 하드코딩 제거(L5), §A STEP 3에 **대상=글로벌이면 ⓓⓔ 제외**(M28), §F-1에 **`[Pending]`·`[Blocked]`의 PROJECT_PLAN 승격 규칙**(L21 — 40줄 창 밖으로 밀리면 소실)·**정기 항목 `다음 ○○: YYYY-MM경` 형식**(/resume 예정일 안내의 생산자 부재), §B 비-git 행의 면제 범위를 git 의존 전부로(L27), §F-2 주의에 **역방향 교체 경고**(L28), §D-4 타 문서 버전 하드코딩 제거(L4) |
> | v1.30 | 2026-08-12 | **/audit 5차(회귀 감사) 반영**(docs/audit-20260812-5.md): v1.29가 만든 편방향 갱신 정리 — §F-2 **A/B/C resume 템플릿 3곳에 `소스없음`/`확보 실패` 어휘 + 글로벌 `CLAUDE.md` 읽기**(R2 — 배포 스킬만 고치고 원본 템플릿을 빠뜨려, §L에 "그 반대 방향"을 경고해 놓고 같은 커밋에서 그 반대를 저질렀다), **A wrap 템플릿에 줄바꿈 정규화**(R3), B·C의 `docs/` 부재 폴백을 **미러 대조 줄에서 append 자리로 이동**(R20 — 처방이 진단 자리에 있어야 한다, DEC-20260812-13 ③), §L 점검 축에 **조건부 안내 어휘 동기화** 추가 |
> | v1.31 | 2026-08-12 | **실적용 검증(playground) 발견 반영**: §B에 **혼합형** 행 신설(F3 — 상위 폴더 아래 독립 repo와 비-git 폴더가 섞인 형태가 미정의였다. 실측: `bubble_memo`는 비-git인데 CLAUDE.md·docs 완비 → 단위별로 git 여부를 따로 판정), §F-2 C wrap 템플릿의 `docs/` 부재 폴백에 **루트 라우터 예외**(F4 — v1.30이 넣은 폴백이 통합 루트에서 오탐. 루트는 `docs/INDEX.md`만 있는 것이 정상인데 "01 §E-1 미설치"로 잘못 알린다)+A 템플릿에 세션 기록 소실 고지 |
> | v1.32 | 2026-08-12 | **실적용 2회차 발견 반영**: §A STEP 1의 **유형 열거 제거**(G4 — "§B의 유형(B / A-1 / A-2 / +MSA)"이라 못박아, v1.31이 신설한 **혼합형**도 기존 **비-git 폴더**도 판별에서 빠져 있었다. 표에 행이 늘면 이 문장만 낡는 구조라 열거 대신 **§B 표를 가리키게** 바꿈 — 02의 "개수를 고정하지 말 것"과 같은 처방), §F-2 C 템플릿의 루트 라우터 예외 조건을 **"`INDEX.md`만 있음"→"PROGRESS·DECISIONS·PROJECT_PLAN이 없음"**으로 정정(G1 — 실측 루트 `docs/`엔 워크스페이스 레이어 산출물 9개가 함께 있어 조건이 실물과 반대였다. `wrap` 스킬 실물도 동일 정정) |
> | v1.33 | 2026-08-13 | **신규 설치 경로 실행에서 발견 반영**: §A STEP 4에 **§검증 신설**(H3 — 이 문서의 유일한 검증(§D-5)이 글로벌 스킬 자동완성뿐이라, **01이 만드는 프로젝트 산출물**(`docs/` 3종·`CLAUDE.md` §F-1 블록·`.gitattributes`·`.claude/settings.json`)을 확인하라는 지시가 0이었다. 재적용에서는 파일이 이미 있어 증상이 없고, 빈 repo에 처음 깔 때만 드러난다 — 02가 v1.18에서 고친 것과 같은 결함이 31개 버전 남아 있었다), §F-3에 **`additionalDirectories` 조건 경고**(H2 — JSON 블록의 `../<자주 함께 고치는 repo>` 플레이스홀더를 지우지 않고 적용하면 존재하지 않는 경로가 **팀 공유 파일에 커밋**된다. JSON엔 주석을 못 달아 블록 밖 줄이 정본) |
> | v1.34 | 2026-08-13 | **적용 시나리오 검증 반영**: §D 서두에 OS 주석(명령 블록=Windows 기준, macOS·Linux 대체 명령 — §D만 Windows 하드코딩이던 것)+D-2·D-3 경로 `~/.claude` 표기, §E-4에 **팀원 층위 혼재 공존 규칙**(루트 설치자·하위 repo 설치자 공존 — 상위 폴더가 팀 공유 repo면 루트 산출물 커밋 전 팀 합의. 이 시나리오가 어디에도 없던 것) |
>
> ※ 갱신 시: 이 표에 한 줄 추가 + 하단 "문서 정보" 날짜 수정 + §L 재검증 체크리스트 수행.

> **사용법**: 이 파일을 아무 프로젝트 루트(또는 `docs/`)에 넣고 Claude에게
> **"이 문서를 학습해서 이 프로젝트에 적용해줘"** 라고 하면 된다.
> Claude는 ① 환경(단일/통합/MSA)을 스스로 판별 → ② 모르는 것만 질문 → ③ 이 프로젝트에 맞는 구성만 골라 생성 → ④ 동작 확인 한다.
>
> **정직한 고지**: Claude Code는 자주 바뀐다. 이 문서는 완벽하지 않으며, 🔴🟡 표시·보안 설정은 본인 환경/공식 문서로 검증한다. (§L 재검증)

---

## 0. 이 문서가 하는 일
- **기본 원칙**: 이 구성(과 02 모델분담 문서)의 1순위 목표는 **최적의 결과물**이다. 토큰 절약은 품질을 해치지 않는 범위에서 얹는 **2순위 부가 효과** — 절약을 위해 검증·기록·상위 모델 라우팅을 빼지 않는다.
- **무엇**: Claude Code를 (1인 단일 repo ~ 다중 repo 통합 ~ 여러 팀원 MSA)까지 **환경에 맞게** 세팅하고, 세션 기록(PROGRESS/DECISIONS/PROJECT_PLAN)을 자동 관리하게 한다.
- **왜**: 프로젝트마다 repo 수·팀 규모·동시성이 다르므로 고정 템플릿이 아니라 **판별 + 필요한 부분만** 적용한다.
- **결과**: 글로벌 셋업(PC당 1회) + 프로젝트 셋업(환경별) + `/resume`·`/wrap` 루틴이 동작.
- **참고**: 세션 안 운영 기법(검증 루프·plan mode·컨텍스트 관리·worktree 병렬·헤드리스·MCP)의 상세는 공식 문서(`code.claude.com/docs`의 best-practices·common-workflows·worktrees·headless·mcp)를 따른다 — 이 문서는 얇게 유지하고 핵심 습관만 §G에 둔다.

---

## A. Claude 실행 프로토콜 (적용하면 이 순서대로)

**STEP 1 — 환경 자동 판별.** 코드/폴더로 아래를 확인해 **§B 표의 유형**을 정한다 — 유형 이름을 여기 열거하지 않는다(표에 행이 늘면 이 문장만 낡아 새 유형이 판별에서 통째로 빠진다. 실제로 **혼합형**과 **비-git 폴더**가 그렇게 빠져 있었다).
- 현재 루트 아래 **독립 git repo가 몇 개**인가(각 폴더의 `.git` 유무)?
- 상위 폴더가 git인가? 하위 repo들이 한 폴더 아래 모여 있나, 흩어져 있나?
- 빌드/스택 감지(`package.json`·`pom.xml`·`build.gradle`·`composer.json`·`go.mod`·`Cargo.toml`…).
- 기존 `CLAUDE.md`·`docs/`·`.claude/` 유무, git 브랜치·미커밋.

**STEP 2 — 부족분 질문(모르는 것만, §I).** 특히: (a) 환경 유형 확정, (b) **여러 팀원이 같은 단위를 동시 편집**하는가(→ MSA 단위분할 필요 판단), (c) 커밋 양식, (d) 자주 함께 고치는 repo(→ `additionalDirectories`). 이미 코드로 안 것은 "이렇게 이해했다"로 확인만.

**STEP 3 — 구성 항목 선택 확인 → 필요한 것만 생성.** 감지 결과를 바탕으로 아래 항목을 **선택 목록(다중 선택)으로 제시**하고, 체크된 것만 생성한다(전부 기본 체크, 이미 있는 항목은 "유지/재구성" 표기):
- ⓐ 글로벌 행동 규칙(§D-2 CLAUDE.md) ⓑ 글로벌 보안(§D-3 deny·hooks) ⓒ `/resume`·`/wrap`·점검 스킬 dropin-check/update(§D-4·F-2) ⓓ 프로젝트 기록 체계(§E·F-1: docs/·CLAUDE.md·.gitattributes) ⓔ 프로젝트 권한(§F-3 settings.json) ⓕ effort 가이드(§D-6, 안내만)
- **00의 모드별 기본값**(00 STEP 3에서 왔을 때 — 사용자 모드가 아니면 이 매핑으로 자동 확정하고 질문 생략): **최소 = ⓑⓒⓓ**(보안+스킬+기록 체계 — ⓒ를 빼면 §F-1 블록이 전제하는 `/resume`·`/wrap`이 없고 §D-5의 4종 자동완성 검증도 통과 불가라, "기반"이 성립하지 않는다) / **권장·전체 = ⓐ~ⓕ 전부**. 어느 쪽이든 ⓑ는 빼지 않는다.
- **대상이 글로벌(PC)뿐이면 ⓓⓔ는 빼고 ⓐⓑⓒ(+ⓕ)만 적용한다** — ⓓ 프로젝트 기록 체계·ⓔ 프로젝트 권한은 대상 repo가 있어야 의미가 있는데, 00 §C-1의 "새 PC → 01(글로벌)+03"으로 들어오면 모드가 질문을 생략하므로 그대로 두면 claude를 띄운 임의 폴더에 `docs/`·`.gitattributes`·`.claude/settings.json`이 말없이 생긴다(00 STEP 5의 기록 예시 `01 vX.Y(글로벌만)`이 가리키는 상태가 이것이다).
- §D~F에서 **해당 시나리오 부분만** 골라 생성. 불필요한 것(단일 repo에 MSA 단위분할 등)은 만들지 않는다. 단 **ⓑ 보안(deny·시크릿 차단)은 해제를 권하지 않는다** — 사용자가 명시적으로 빼는 경우에만 제외하고 위험을 고지한다.

**STEP 4 — 확인.** 무엇을 만들었는지 요약 보고 → **§검증** → 승인 후 커밋 안내(§E 커밋 규칙).
**§검증** — 두 축을 **둘 다** 증거로 낸다. ① **글로벌**: `/` 자동완성으로 `/resume`·`/wrap`·`/dropin-check`·`/dropin-update`(§D-5) ② **프로젝트 산출물**: 이번에 만든 것의 **파일 경로를 실제로 조회해** 보고 — ⓓ `docs/PROJECT_PLAN.md`·`PROGRESS.md`·`DECISIONS.md`(단위 분할이면 그 경로)·`CLAUDE.md`의 §F-1 블록·`.gitattributes`(`git check-attr merge docs/PROGRESS.md` = `union`) / ⓔ `.claude/settings.json`(JSON 파싱 성공 + `deny`에 시크릿 차단 존재). **①만 보면 검증이 통과한다** — 그 넷은 글로벌 스킬이라 이 프로젝트에 아무것도 안 만들어도 뜬다. 신규 설치에서 `docs/`가 통째로 빠져도 "검증 OK"가 나오던 자리다(2026-08-13 신규 설치 실행에서 발견 — 02가 v1.18에서 고친 것과 같은 결함이 01에 남아 있었다). **적용 기록**: 대상 `CLAUDE.md` 맨 아래 `<!-- dropin-applied: … -->` 한 줄에 이 문서의 **현재 버전**(최상단 "문서 버전" 표기에서 읽음)을 `01 vX.Y` 형식으로 추가/갱신한다(형식·재적용 규칙은 00 §A — 00 없이 단독 적용해도 남긴다).

> 원칙: **승인 없이 대량 변경·커밋하지 않는다.** 시크릿(.env·키·인증서)은 읽지도 커밋하지도 않는다.

---

## B. 내 환경은? (판별표)

| 유형 | 언제 | 프로젝트 셋업 |
| --- | --- | --- |
| **🅱️ 단일 repo (B)** | 독립 repo 1개 | §E-1 |
| **🅰️ 통합 A-1** | 여러 repo가 **한 상위 폴더 아래** 나란히 | §E-2 + §E-4(루트 레이어) |
| **🅰️ 통합 A-2** | 여러 repo가 **흩어져** 있음 | §E-2 + §E-4 (단 `--add-dir` 필요) |
| **➕ MSA 단위분할** | 위에 더해 **여러 팀원이 한 repo의 같은 단위를 동시 편집** | §E-3 를 각 repo에 추가 적용 |
| **혼합형** | 상위 폴더 아래에 **독립 repo와 비-git 폴더가 섞여** 있음 | 통합 레이어(§E-4)는 그대로 두고, **단위별로 git 여부를 따로 판정**한다 — 비-git 단위엔 아래 면제를 개별 적용하고 커밋은 상위 repo에서 수행. `/resume`·`/wrap`의 "루트+하위 각각 git status"도 git 단위에만 돌린다 |
| **비-git 폴더** | `.git` 없음 | `git init` 권장(기록·재개 체계의 전제) — 원치 않으면 docs 체계만 적용하고 **git에 의존하는 것 전부**를 건너뛴다: /resume·/wrap의 git 단계(pull·status·커밋 안내), §E-1의 `git add`·커밋 절차, §F-4 `.gitattributes`(merge=union — git 없이는 아무 효과가 없다), 00 STEP 5의 커밋 안내 |

> MSA 단위분할은 **동시성 대응**이지 repo 수 문제가 아니다. 1인/저동시성이면 flat docs로 충분(단위분할 불필요).

---

## C. 불변 원칙 (모든 환경 공통) 🟢
1. **2층 모델** — repo *간*(cross-repo, `additionalDirectories`, 방법 A) 과 repo *안*(단위 분할) 은 별개 층. 독립 적용.
2. **폴더 분할 = 정책 / `merge=union` = 충돌 안전망** — 폴더로 쪼개도 같은 파일에 몰리면 충돌은 그대로다. 분할은 정리·타겟팅용, 동시 append 충돌은 `merge=union`이 자동 병합.
3. **토큰 진실** — `docs/`는 자동 선로딩 안 됨(필요 시만 읽힘). "구조로 토큰 절감"은 사실 아님. 분할 기준은 정리·타겟 정확도.
4. **방법 A** — 한 작업이 여러 대상(repo/단위)을 건드리면 **각 대상에 기록**(주 대상 본문 + 나머지 `[공통]` 교차 한 줄 + 링크).
5. **git-status 우선 재개(v8)** — `/resume`는 커밋 히스토리 전에 **미커밋 변경·현재 브랜치**로 "진행 중 작업"을 먼저 발견한다. 미커밋을 방치하면 다음 세션이 놓친다 → `/wrap` 후 커밋 습관화.
6. **커밋은 repo별로 따로**(독립 git). 루트 개인 레이어는 개인 소유, 팀 repo는 공유.
7. **시크릿 분리가 근본** — Read/Edit deny 규칙은 파일 도구뿐 아니라 Bash 안의 "인식되는 파일 명령"(`cat`·`head`·`tail`·`sed` 등)에도 적용된다. Read deny는 같은 경로의 **Edit도 차단**(v2.1.208+; Write·NotebookEdit는 별도 Edit deny 필요). 그러나 **임의의 서브프로세스**(python/node 스크립트가 파일을 직접 여는 경우)는 못 막는다(부분 안전망) — OS 수준 차단은 **샌드박스**(§J, macOS·Linux·WSL2)의 `denyRead`·`sandbox.credentials`가 담당. 진짜 비밀은 레포에 두지 않는다.

---

## D. 글로벌 셋업 (PC당 1회) — 전 환경 공통

> 아래 명령 블록은 Windows(PowerShell) 기준이다 — macOS·Linux는 홈을 `~`로 읽고 D-1을 `mkdir -p ~/.claude/skills/{resume,wrap,dropin-check,dropin-update}`로 대체한다(만드는 내용물 D-2~D-4는 OS 무관. OS별 CLI 설치 분기는 04 §2와 같은 방식).

### D-1. 폴더
```powershell
cd C:/Users/<내계정>
New-Item -ItemType Directory -Path .claude/skills/resume -Force
New-Item -ItemType Directory -Path .claude/skills/wrap -Force
New-Item -ItemType Directory -Path .claude/skills/dropin-check -Force
New-Item -ItemType Directory -Path .claude/skills/dropin-update -Force
```
> 4종이다 — §D-4가 뒤 2종을 복사해 넣고 §D-5가 4종 자동완성을 성공 기준으로 삼는다.

### D-2. 글로벌 `CLAUDE.md` (행동 규칙) — `~/.claude/CLAUDE.md`
> ⚠️ 아래는 **최소 골격**이지 실제 구성의 전부가 아니다. 문서 저장소 클론이 있으면 **정본은 `global-config/CLAUDE.md`** — 그걸 복사하고 이 블록은 대조용으로만 쓴다([[DEC-20260721-bsjeong87-01]]: 골격만 보고 재구성했다가 `skills/humanizer`와 스킬 카탈로그 절을 통째로 누락한 실사례). 클론이 없을 때만 이 블록으로 시작한다. **복사할 때 맨 아래 `dropin-applied` 줄은 빼거나 이 PC 기준으로 다시 쓴다** — 그 줄은 미러를 마지막에 커밋한 PC의 기록이라, 그대로 옮기면 새 PC가 하지도 않은 설치를 했다고 주장하고 `/dropin-check`가 그것을 1차 근거로 믿는다.
```markdown
# CLAUDE.md (Global)
## 1. Think Before Coding — 가정 명시, 불확실하면 질문, 해석 갈리면 제시.
## 2. Simplicity First — 요청 이상 금지, 1회용 코드 추상화 금지.
## 3. Surgical Changes — 범위 외 코드 손대지 않기, 기존 스타일 따르기.
## 4. Goal-Driven Execution — 수정 전 검증 기준 먼저, 다단계는 짧은 계획.
## 5. Output Style — 간결하게, 전체 파일 재출력 금지(변경분만).
## 6. File Reference — 파일은 @경로/파일명으로 참조.
## 7. Compaction Priority — 압축 시 보존: 수정 파일·대기 작업·최근 결정·미해결.
## 8. Secret Safety — .env·키·인증서 읽거나 cat 금지, 시크릿은 환경변수로.
```
> 팁: CLAUDE.md가 200줄을 넘보면 **`.claude/rules/*.md`** 로 주제별 분리(전역 `~/.claude/rules/`도 지원). rules 파일에 `paths:` frontmatter(glob)를 주면 **해당 경로 파일을 다룰 때만 로드**돼 컨텍스트를 아낀다. HTML 주석(`<!-- -->`)은 로드 시 제거되므로 유지보수 메모용으로 사용 가능.

### D-3. 글로벌 `settings.json` (deny + hooks) — `~/.claude/settings.json`
```json
{
  "autoMemoryEnabled": true,
  "attribution": { "commit": "", "pr": "" },
  "permissions": {
    "deny": [
      "Read(**/.env)", "Read(**/.env.*)", "Read(**/*.pem)", "Read(**/*.key)", "Read(**/*.p12)",
      "Bash(cat *.env)", "Bash(cat *.env.*)", "Bash(cat *.pem)", "Bash(cat *.key)",
      "Bash(type *.env*)", "Bash(Get-Content *.env*)", "Bash(gc *.env*)",
      "PowerShell(Get-Content *.env*)", "PowerShell(Get-Content *.pem)", "PowerShell(Get-Content *.key)",
      "Read(**/node_modules/**)", "Read(**/.next/**)", "Read(**/dist/**)", "Read(**/build/**)",
      "Read(**/out/**)", "Read(**/target/**)", "Read(**/.gradle/**)", "Read(**/vendor/**)", "Read(**/coverage/**)",
      "Read(**/*.jar)", "Read(**/*.class)", "Read(**/*.log)"
    ]
  },
  "hooks": {
    "PreCompact": [ { "matcher": "auto", "hooks": [
      { "type": "command", "command": "echo \"[PreCompact] auto-compact 임박 - 작업 끊고 /wrap 권장\" 1>&2", "async": true } ] } ],
    "SessionStart": [ { "matcher": "compact", "hooks": [
      { "type": "command", "command": "echo 'compact 후 컨텍스트 복구: docs/PROGRESS.md 최상단과 docs/PROJECT_PLAN.md를 다시 읽고 현재 상태를 재확인하라.'" } ] } ]
  }
}
```
> 🔴 **deny 현행 동작(2026-08-04 재검증)**: ① Read/Edit deny는 파일 도구 + Bash 안의 인식되는 파일 명령(`cat`/`head`/`tail`/`sed` 등)까지 적용. Read deny는 같은 경로 **Edit도 차단**(v2.1.208+). ② `cat`·`ls`·`head`·`grep` 등은 **기본 무프롬프트 읽기전용 내장 명령**(목록 비설정)이라, 특정 명령에 프롬프트를 강제하려면 위처럼 ask/deny 규칙이 필요. ③ python/node 스크립트가 파일을 직접 여는 **서브프로세스 우회는 여전히 가능** → **근본은 시크릿을 레포에서 분리**(§C-7), OS 수준 차단은 샌드박스(§J). ④ **PowerShell 툴 규칙은 별칭을 자동 정규화** — `PowerShell(Get-Content *)` 하나로 `gc`·`type`·별칭까지 매칭(대소문자 무관). `Bash(...)` 문자열 매칭엔 정규화가 없으므로 Git Bash 병용 환경은 기존 3종(type/Get-Content/gc)도 유지. ⑤ deny는 **집합**이라 배열 순서는 무관하다(실물과 순서가 달라도 차이 아님). ⑥ 경로 규칙 참고: 맨 파일명은 gitignore 의미로 **모든 깊이에 매칭**(`Read(.env)` ≡ `Read(**/.env)`), Windows 경로는 POSIX 정규화(`//c/**/.env`). hooks 매처(`"auto"`/`"compact"`)는 정확 문자열/정규식 — 철자 엄격.
> 🟡 `includeCoAuthoredBy`는 deprecated → `attribution` 객체로 대체(빈 문자열 `""` = 표기 숨김).
> 🟡 테마(dark/light)는 settings.json 문서화 키가 아님(2026-07-20 확인) — 세션에서 **`/config`**(또는 `/theme`)로 설정.
> 선택 확장(실사용 예): `attribution`에 `"sessionUrl": false`(세션 URL 표기 제어), `SessionStart`에 `"startup"` 매처(새 세션 시작 시 안내 한 줄 — 예: `echo '[시스템] 통합 워크스페이스 초기화 완료'`) — 위 예시와 같은 자리에 추가해 쓸 수 있다.

### D-4. 기본 `/resume`·`/wrap` + 점검·최신화 스킬 (단일 repo용 기본형) — §F-2 A 참조. (통합/MSA는 §F-2 B·C — 동명 스킬은 **개인(글로벌)이 프로젝트를 이기므로** 글로벌 쪽을 교체한다, §F-2 주의)
- **`/dropin-check`**(적용 상태 점검, 읽기 전용)·**`/dropin-update`**(문서 사본 최신화, 승인 후 교체)는 환경 무관 **글로벌 스킬** — 문서 저장소의 `global-config/skills/<이름>/SKILL.md`를 `~/.claude/skills/<이름>/`로 복사한다(로컬 클론 없으면 raw: `https://raw.githubusercontent.com/EleninJayTech/claude/main/global-config/skills/dropin-check/SKILL.md` · 같은 경로의 `dropin-update`). 설치 전 같은 이름 구형 `commands/`가 있으면 제거(§F-2 주의). 두 스킬은 **설치 유형 무관 동작 보장** — 프로젝트 사본 / 로컬 클론 참조 / raw 직접(사본·클론을 나중에 지워도 계속 동작), 판별 근거는 00 STEP 5 기록의 `출처=` 필드(그 필드가 도입된 이후 기록 — 없으면 두 스킬이 사본→클론→raw 순으로 판별한다).

### D-5. 확인 — `claude` → `/` → `/resume`·`/wrap`·`/dropin-check`·`/dropin-update` 자동완성되면 성공.

### D-6. 추론 강도(effort) 제어 — `/effort` 🟢
세션의 **사고(reasoning) 깊이**를 조절하는 슬래시 명령. 고른 값은 settings.json **`effortLevel`** 키에 저장돼 **새 세션 기본값**이 된다.
- **단계(낮음→높음)**: `low` → `medium` → `high` → `xhigh` → `max`. **기본값은 `high`**(Opus 4.7만 `xhigh`).
- **모델별 지원**: Fable 5 · Opus 5 · Sonnet 5 · Opus 4.8 · Opus 4.7 = 전 단계(`xhigh` 포함). Opus 4.6 · Sonnet 4.6 = `xhigh` 없음(low/medium/high/max). 미지원 단계를 지정하면 **바로 아래 지원 단계로 자동 폴백**(예: Opus 4.6에서 xhigh→high).
- **기본값 hold 차이**: Fable 5·Opus 4.8·4.7은 첫 실행 시 그 모델의 기본 effort를 강제 적용하고 명시적으로 바꿀 때까지 유지(hold)하지만, **Opus 5는 hold가 없어 이전에 설정한 값이 그대로 승계**된다.
- **`/effort xhigh`**: high보다 깊은 추론, **최대(max) 바로 아래**. (안내문: *"Deeper reasoning than high, just below maximum"*)
- **`/effort` (인자 없이)**: 대화형 슬라이더. `/effort auto`는 모델 기본값으로 리셋. `/model` 화면에서도 좌우 화살표로 effort 조절 가능.
- **저장 제한**: `effortLevel`에 저장되는 건 `low`~`xhigh`뿐. **`max`는 세션 한정**(단 `CLAUDE_CODE_EFFORT_LEVEL`로는 지속 지정 가능).
- **`ultracode`**: `/effort ultracode` — effort 단계가 아니라 Claude Code 설정. 모델엔 `xhigh`를 보내면서 굵직한 작업마다 **동적 워크플로(멀티에이전트 오케스트레이션)** 를 얹는다. 세션 한정, 토큰 소모 큼.
- **`ultrathink`**: 프롬프트에 이 단어를 넣으면 **그 턴만** 깊은 추론 요청(세션 설정 불변). "think hard" 류는 키워드가 아님.
- **스코프**: `effortLevel`은 **User·Project·Local** 지원, 우선순위 **Managed > CLI > Local > Project > User**. 세션 1회 오버라이드는 `--effort` 플래그·`CLAUDE_CODE_EFFORT_LEVEL` 환경변수(환경변수가 최우선).
- **절약 프로필** (Pro 요금제·한도 관리 사용자 — 00 STEP 3에서 선택): 절약은 품질 유지 전제의 2순위이므로 **기본값 하향 + 낭비 제거**로만 아낀다.
  - 세션을 `/effort medium`으로 시작하고, 어려운 작업(설계·동시성·상태머신 등)에 들어갈 때만 그때 `/effort high`↑ — 작업이 끝나면 되돌린다. `ultracode`·`max`는 비권장(토큰 소모 큼).
  - 컨텍스트 절약 습관: 무관한 작업 전 `/clear`, 긴 세션은 `/compact <초점>`, CLAUDE.md 200줄 이하 + `.claude/rules/` 경로 스코프(§D-2 팁) — 매 턴 실려가는 고정 비용을 줄이는 게 가장 큰 절약.
  - **줄이지 않는 것**(품질 불변): 트리아지·최종 리뷰의 상위 모델(02 §F), 검증 게이트(04) — 여기서 아끼면 재작업이 더 비싸다.
  - 한도 가시화: claude-hud(03) 설치를 권장 — 측정 없는 절약은 감이다.
- ✅ **권장 — 프로젝트 `.claude/settings.json`엔 `effortLevel`을 넣지 않는다(기본값 사용)**. 이유 3가지:
  1. **세션 단위 값이라 작업별 최적이 될 수 없다.** 같은 프로젝트에서도 상태머신 설계는 xhigh가, 문서 수정·조회는 medium이 맞다. 한 값으로 고정하면 둘 중 하나는 항상 틀린다. 작업에 맞추는 건 `/effort` 한 번이면 된다.
  2. **서브에이전트 차등에 쓸 수 없다.** effort를 에이전트별로 다르게 주려면 `.claude/agents/*.md`(또는 스킬 SKILL.md) **frontmatter의 `effort:` 키**에 적는다(`model:` 핀과 같은 자리, 공식 확정 — 값: low/medium/high/xhigh/max, 세션 값을 오버라이드하되 환경변수엔 밀림). 프로젝트 `effortLevel`을 올려도 에이전트별로 갈라지지 않는다 — 아래 함정 참고.
  3. **repo에 커밋돼 팀원 전원에게 적용된다.** 개인 취향·PC 성능·요금제가 다른데 한 값이 강제된다.
- ⚠️ **함정 — 프로젝트 값이 `/effort` 선택을 조용히 덮어쓴다** (2026-07-20 실측): `/effort`로 고른 값은 **User 스코프**에 저장되는데, 그 프로젝트 `.claude/settings.json`에 `effortLevel`이 있으면 Project가 이겨서 **새 세션마다 프로젝트 값으로 되돌아간다**. 경고 메시지는 없다. "왜 자꾸 xhigh로 시작하지?" 싶으면 `.claude/settings.json`부터 확인할 것.
  - 실제 사례: 서브에이전트를 강하게 돌릴 의도로 프로젝트에 `"effortLevel": "xhigh"`를 박아둔 경우 — **서브에이전트엔 아무 영향이 없고 메인 세션만 계속 xhigh로 시작**하는 상태가 된다. 키를 제거해 사용자 `/effort`를 따르도록 정리하는 게 맞다.
- **그래도 프로젝트에 고정할 만한 경우**: 팀 전원이 같은 성격의 작업만 하는 repo(예: 대량 정형 마이그레이션 전용)에서 매번 올리는 걸 잊는 게 더 큰 손해일 때. 이때도 `xhigh`보다 **`high`가 무난**하다(품질 차이 대비 토큰·지연 부담이 급하게 커지는 구간이 xhigh 이상).
- **트레이드오프**: 높일수록 복잡한 설계·디버깅·마이그레이션 판단 품질↑, 대신 **토큰·지연 증가**. 어려운 전환/설계/리버스는 `high`~`xhigh`, 단순 편집·조회는 `low`~`medium` 권장. 상시 `max`는 비용 대비 비권장.
- `/model`(모델 선택)과 짝 명령: 모델에 따라 사용 가능한 단계가 다르다(위 모델별 지원 참고). 모델을 처음 바꾸면 **그 모델의 기본 effort가 적용**되니(이전 선택 무시) 필요하면 `/effort`를 다시 실행.
- Enterprise 조직은 역할별 **effort 상한**을 걸 수 있다(상한 초과 지정 시 상한으로 클램프).
> ✅ 확정(2026-07-20, code.claude.com/docs/en/model-config·/sub-agents·/skills 재검증): 단계 명칭 low~max + ultracode(설정), 서브에이전트·스킬 frontmatter 키는 **`effort:`**, `effortLevel` 저장은 low~xhigh만. 이전 판의 🟡 2건(단계 명칭·frontmatter 키 미확정)은 해소됨.

---

## E. 프로젝트 셋업 (환경별)

> 공통: 각 repo `CLAUDE.md`(프로젝트 사실 = **본체**) + `docs/` + §F-1 규칙블록 + §F-3 프로젝트 settings + §F-5 `.gitignore`.
> `CLAUDE.md` 사실은 스택·DB·아키텍처·제약. 행동 규칙(글로벌)과 중복 금지, 30~200줄. **없으면 `/init`으로 초안 생성 후 다듬기**(코드베이스 분석해 빌드·테스트 명령을 채워줌. `CLAUDE_CODE_NEW_INIT=1`이면 대화형 다단계 — CLAUDE.md+스킬+hooks까지 제안 후 승인받아 생성).

### E-1. 🅱️ 단일 repo (B)
- `docs/` **flat**: `PROJECT_PLAN.md` · `PROGRESS.md` · `DECISIONS.md` (§F-6 양식).
- 스킬: 글로벌 기본형(§F-2 A) 사용. `.gitattributes` merge=union(§F-4)은 다인 협업이면 권장.
- 커밋: `git add CLAUDE.md docs .claude .gitignore` → 한 repo에서 커밋.

### E-2. 🅰️ 통합 멀티레포 (A-1 공통상위 / A-2 흩어짐)
- **레포를 물리적으로 합치지 말 것**(독립 git이면 깨짐). 각 repo는 E-1(또는 +E-3)을 각자 적용.
- **A-1**(한 폴더 아래): 상위 폴더에서 `claude` 한 번 → 전 repo 인식(`--add-dir` 불필요). 상위 폴더는 보통 git 아님.
- **A-2**(흩어짐): `claude --add-dir ../repoB --add-dir ../repoC` (세션 한정) 또는 IDE 멀티루트/attach.
- **루트 통합 레이어**는 §E-4.
- 커밋: **repo별로 따로**. "변경한 repo별로 각각 add/commit" (한 번에 커밋 불가).

### E-3. ➕ MSA 단위 분할 (여러 팀원 동시편집 시, 각 repo에 추가)
그 repo의 1차 단위로 docs를 쪼갠다(프론트=app, 백엔드=module, RAG=domain 등).
```text
<repo>/docs/
├── PROJECT_PLAN.md        # [공통] 마스터 로드맵 + 활성 단위 인덱스 (루트 공유)
├── README.md              # 색인
├── <unitA>/               # 📂 단위별 폴더 (정책)
│   ├── PROGRESS.md        #   append 전용 + 메타데이터, 충돌은 merge=union
│   └── DECISIONS.md
└── <unitB>/ ...
```
- `.gitattributes`(§F-4) + **솔루션-aware 스킬**(§F-2 B)로 대상 단위 판별(동명 우선순위 주의 — §F-2).
- 주제 문서는 평면(`docs/<unit>/이름.md`)으로 시작 → 한 단위 3개+면 하위 폴더 승격. 빈 폴더 금지.

### E-4. 🅰️ 루트 통합 레이어 (A-1/A-2에 얹는 개인 영역)
하위 repo는 **손대지 않는다.** 루트(상위 폴더)에만 추가:
- 루트 `CLAUDE.md` = **짧은 라우터**(§F-2 D). 50줄 안팎, repo 사실은 넣지 않음(각 repo가 본체).
- 루트 통합 `/resume`·`/wrap` = §F-2 C(**개인 글로벌 교체 방식** — 동명 우선순위 주의 §F-2). 하위 repo 스킬은 루트 실행 시 디렉터리-한정 이름(`<하위>:resume`)으로 함께 로드된다(v2.1.203+) — 비한정 `/resume`가 실행하는 건 개인/루트 쪽이므로 통합 절차는 거기 둔다.
- (선택) 루트 `docs/INDEX.md` = **얇은 크로스-repo 인덱스**(§F-2 E). 크로스-repo 세션만 한 줄+링크.
- 루트를 개인 git repo로 둘 수도 있음(백업용) → 하위 repo들을 `.gitignore`로 제외.
- **팀원마다 설치 층위가 달라도 공존한다** — 어떤 팀원은 루트(이 레이어)에서, 어떤 팀원은 하위 repo 하나(§E-1)에서 적용해도 충돌 지점이 없다: 루트 레이어는 하위 repo를 손대지 않고, 하위 적용은 그 repo 안에만 산출물을 만든다. 단 **상위 폴더 자체가 팀 공유 git repo면** 루트 라우터·INDEX가 커밋되어 하위 repo만 쓰는 팀원에게도 도착하므로, 커밋 전에 팀 합의를 받는다(기본 전제는 루트 레이어=개인 소유·비공유).

---

## F. 단일 출처 블록 (SSOT · 복붙)

### F-1. 문서·기록 규칙 블록 ⭐ (각 repo `CLAUDE.md` 끝에 추가 — **이 블록 하나가 정본**)
```markdown
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
- /resume: **remote 있고 워킹트리 clean이면 `git pull --ff-only` 먼저**(아니면 `git fetch` 후 뒤처짐만 보고 — 병합은 사용자 결정) → **git status·브랜치로 미커밋(진행 중) 작업 발견** → 그다음 PROGRESS 최상단(**Read limit으로 앞 ~40줄만** — 통째 읽기 금지) + PROJECT_PLAN 현재 Phase + 최근 DEC 3건.
- /wrap: PROGRESS append + 새 DEC + PROJECT_PLAN 체크박스 갱신 + **미커밋이면 경고**(커밋 전엔 다음 /resume가 git status로만 발견).
- **미해소 `[Pending]`·`[Blocked]`는 PROJECT_PLAN "미해결/관찰 중"에 한 줄로 올려 닫힐 때까지 유지**한다. PROGRESS는 append 전용이고 /resume은 앞 ~40줄만 읽으므로, 그 항목이 40줄 창 밖으로 밀리는 순간 어느 절차도 다시 보지 않는다.
- 정기 항목(재검증·점검 주기)은 PROJECT_PLAN에 **`다음 ○○: YYYY-MM경`** 형식으로 남긴다 — /resume의 "예정일 경과" 안내가 읽는 형식이라, 안 적으면 그 안내는 발화하지 않는다.

### 길이 관리
- PROGRESS가 약 800줄/분기 경계를 넘으면 가장 오래된 분기를 docs/archive/로 옮기고 활성 파일 **최상단(제목 바로 아래) 포인터 한 줄**("이전 분기: docs/archive/…"). 맨 아래가 아니라 최상단인 이유 — /resume가 앞 ~40줄만 읽어 아래 포인터는 보이지 않는다. 이후 append는 **포인터 줄 아래부터**(포인터 최상단 고정). **과거 이력 검색은 활성 파일이 아니라 `docs/` 폴더 단위로**(아카이브 자동 포함) — 파일만 검색하면 "기록 없음"으로 오판한다.

### 공유 vs 개인 / 시크릿
- 공유(커밋): CLAUDE.md·.claude/skills·.claude/settings.json·.gitattributes·docs/·.mcp.json(팀 MCP 서버 — 각자 첫 실행 때 승인).
- 개인(커밋 금지): .claude/settings.local.json·CLAUDE.local.md. 개인 노트는 auto-memory(~/.claude/projects/<proj>/memory, 머신 로컬·200줄/25KB).
- 시크릿(.env·키·비밀번호)은 읽지도 커밋하지도 않는다.

### 토큰 참고
- docs/는 자동 선로딩되지 않고 필요 시만 읽힌다. 분할은 토큰이 아니라 정리·타겟 정확도용.
```

### F-2. `/resume`·`/wrap` 스킬 (환경에 맞는 것 하나 선택)

> 참고(2026-07 현행): **커스텀 커맨드(`.claude/commands/`)는 스킬로 통합**됐다 — 둘 다 `/이름`을 만들고 동작이 같으며 스킬 쪽이 상위집합(보조 파일·frontmatter 확장). frontmatter에서 `name:`은 이제 선택(폴더명이 기본 명령명), `description:`은 권장(Claude의 자동 로드 판단 기준).
> ⚠️ **중복 등록 방지**: 스킬 설치 전 **같은 이름의 구형 커맨드**(`~/.claude/commands/<이름>.md`·프로젝트 `.claude/commands/`)가 있는지 확인하고 있으면 삭제한다 — 방치하면 `/` 자동완성에 같은 명령이 2개 뜨고, 구형을 고르면 옛 내용이 실행된다(정본은 `skills/`). 필요 시 확장 키: `disable-model-invocation: true`(수동 호출 전용), `user-invocable: false`(Claude 전용), `model:`·`effort:`(스킬 실행 중 오버라이드), `context: fork`(서브에이전트에서 실행), `allowed-tools:`(그 턴 무프롬프트 도구 허용).
> ⚠️ **동명 스킬 우선순위(공식, 2026-08-12 확인)**: **enterprise > personal > project** — 프로젝트 `.claude/skills/`는 글로벌(개인) 동명 스킬을 덮지 **못한다**(같은 이름이면 개인 쪽이 실행. 스킬과 커맨드가 같은 이름이면 스킬 우선). 따라서 **B·C를 선택하면 글로벌 기본형(A)을 그 내용으로 교체(또는 제거)** — 한 이름 한 정의. B를 repo에 커밋해 공유해도 개인 글로벌에 동명 기본형이 있는 PC에선 개인 쪽이 실행되므로 팀에 고지한다.
> ⚠️ **교체는 그 PC의 모든 프로젝트에 전파된다**: 글로벌은 PC당 하나라, 한 프로젝트에서 B·C로 바꾸면 같은 PC의 **다른 프로젝트도 그것을 실행**한다(단일 repo에서 B의 "단위 판별"이 헛도는 식). 그래서 B·C 템플릿은 **대상이 전제와 다를 때의 폴백**(단위 없음·단일 repo·비-git)을 반드시 갖춘다 — 아래 각 템플릿 0)·1)의 폴백 줄. 폴백 없이 교체하지 않는다. **역방향도 같다** — 통합형(C)이 깔린 PC에서 단일 repo에 01을 적용하며 A로 되돌리면 그 PC의 통합 워크스페이스가 A로 돌게 된다. 어느 방향이든 교체 전에 **그 PC의 다른 사용처가 무해한지** 확인하고 고지한다(00 §A STEP 3 불변 ①의 유지/재구성/교체 질문이 이 판단의 자리다).

**A) 기본형** (단일 repo · 글로벌 `~/.claude/skills/`)
```markdown
# resume/SKILL.md
---
name: resume
description: 세션 시작 시 원격 최신화(clean이면 git pull --ff-only)·git status로 미커밋 작업 먼저 확인 후 CLAUDE.md·docs/PROGRESS.md 최상단·PROJECT_PLAN.md를 읽고 지난 상태·다음 작업 보고.
---
# /resume — remote 있고 워킹트리 clean이면 `git pull --ff-only` 먼저(아니면 `git fetch` 후 뒤처짐만 보고) → git status·브랜치로 미커밋(진행 중) 작업 발견 → CLAUDE.md(**프로젝트+글로벌 `~/.claude/CLAUDE.md`** — 글로벌만 적용한 PC에선 글로벌 줄이 유일한 기록), docs/PROGRESS.md(최상단 ~40줄만 Read limit), docs/DECISIONS.md 최근 3건(최상단 Read limit), PROJECT_PLAN.md를 읽고 "지난 X, 다음 Y?" 보고. + 조건부 안내: dropin-applied 30일 경과면 `/dropin-check`·`/dropin-update`, PROJECT_PLAN 예정일 경과 항목, dropin-applied 괄호의 조치 대기 메모·`게이트 차단(사유)`·**`소스없음(사유)`/`확보 실패(사유)`**(예: gh 인증 대기 / 06 게이트 차단(조직 미승인) / 04 소스없음(네트워크 차단) — 해소됐다면 재적용으로 설치+기록 갱신) 안내.
**폴백**: 비-git 폴더면 pull·status 단계를 건너뛰고 docs 체계만 읽는다.
```
```markdown
# wrap/SKILL.md
---
name: wrap
description: 세션 종료 시 docs/PROGRESS.md 최상단에 오늘 작업 append, 새 결정 DECISIONS, PROJECT_PLAN 체크박스, 미커밋 경고, 변경 파일 보고.
---
# /wrap — docs/PROGRESS.md 최상단 append(작업/결정/다음/미해결) + 새 DEC + PROJECT_PLAN 체크박스(+ 있으면 `docs/WBS.md` 등 파생 뷰 동기화 — SSOT=PROJECT_PLAN). 미커밋이면 경고. 변경 파일 보고. append 후 PROGRESS 총 줄 수 확인 — ~800줄/분기 경계 초과면 아카이브(docs/archive/ 이동+최상단 포인터) 안내(/resume는 앞 40줄만 읽어 감지 못 함). + 이번 세션에 `~/.claude/`나 저장소 `global-config/`를 고쳤으면 화이트리스트 5종 해시 대조(클론 없으면 생략) — 차이 시 어느 쪽이 최신인지 판정해 방향 보고+복사 안내(`settings.json`은 키 단위 — **구성 성격 키(`permissions.deny`·`hooks`·`attribution`·`autoMemoryEnabled`)의 차이만** 실제 차이로 보고 나머지는 전부 머신 종속으로 제외. 이 **포함 기준이 정본**이고 괄호는 예시다 — 제외 키를 나열해 맞추면 사본마다 목록이 갈라진다, DEC-20260721-bsjeong87-02. 글로벌 `CLAUDE.md`의 `dropin-applied` 줄도 PC별 값이라 차이로 치지 않는다. **줄바꿈을 정규화한 뒤 비교** — 저장소에 EOL 지시가 없으면 워킹트리 줄바꿈이 그 PC의 `core.autocrlf`에 좌우돼 내용이 같아도 해시가 갈린다).
**폴백**: 비-git 폴더면 git status·커밋 단계를 건너뛰고 기록 append만. `docs/`가 없으면(00 STEP 5의 최소 골격만 있는 repo) 기록을 새로 만들지 말고 "01 §E-1 기록 체계 미설치"를 알린다(이번 세션 기록이 저장되지 않음을 명시하고 요약을 출력).
```

**B) 솔루션-aware** (MSA 단위분할 repo · 각 repo `.claude/skills/`에 커밋해 공유 — 개인 글로벌에 동명 기본형(A)이 있는 PC는 글로벌을 이 내용으로 교체, 위 주의)
```markdown
# resume/SKILL.md
---
name: resume
description: 단위분할 재개. git status로 미커밋 작업 먼저, 대상 단위(app/module/domain)를 PWD>브랜치>질문 순 판별해 docs/<단위>/PROGRESS.md를 읽는다.
---
# /resume (솔루션-aware)
0) remote 있고 clean이면 `git pull --ff-only` 먼저(아니면 fetch 후 뒤처짐 보고) → git status·현재 브랜치 확인 — 미커밋/비-main 브랜치면 그 단위 작업 우선(untracked일 수 있음).
1) 대상 단위 판별: PWD가 <단위> 안 → 그 단위 / 브랜치명(feature/<단위>) / 불명확하면 질문.
   **폴백**: `docs/<단위>/`가 없는 단일 repo면 단위 판별을 건너뛰고 `docs/`(flat) 기준으로 A와 동일하게 진행. 비-git 폴더면 0)도 건너뛴다.
2) docs/<단위>/PROGRESS.md 최상단(~40줄 Read limit) + docs/PROJECT_PLAN.md + 최근 DEC 3건 → "이 단위 지난 X, 다음 Y?" 보고.
3) 조건부 안내: dropin-applied 30일 경과면 /dropin-check·/dropin-update, PROJECT_PLAN 예정일 경과 항목, dropin-applied 괄호의 조치 대기 메모·`게이트 차단(사유)`·`소스없음(사유)`/`확보 실패(사유)` 안내(대상 CLAUDE.md + 글로벌 `~/.claude/CLAUDE.md` 둘 다).
```
```markdown
# wrap/SKILL.md
---
name: wrap
description: 단위분할 마무리. 대상 단위 docs/<단위>/PROGRESS.md에 [상태]+작성자+브랜치 기록, 단위간 변경은 [공통] 교차, 미커밋 경고.
---
# /wrap (솔루션-aware)
대상 단위 판별 후 docs/<단위>/PROGRESS.md 최상단에 [Done]/[Pending]/[Blocked] 병기 기록.
**폴백**: 단위 폴더가 없는 단일 repo면 `docs/PROGRESS.md`에 A와 동일하게. 비-git 폴더면 git status·커밋 단계를 건너뛰고 기록만. `docs/`가 없으면(00 STEP 5 최소 골격만 있는 repo) **append하지 말고** "01 §E-1 기록 체계 미설치"를 알린다.
다른 단위도 바뀌면 그 단위에 [공통] 교차 한 줄. 미커밋이면 경고. 완료 모호 시 확인 후 기록.
append 후 해당 PROGRESS 줄 수 확인 — ~800줄 경계 초과면 아카이브 안내.
이번 세션에 `~/.claude/`나 저장소 `global-config/`를 고쳤으면 화이트리스트 5종 해시 대조(클론 없으면 생략) — 차이 시 방향 판정+복사 안내. **판정 기준은 A와 동일**(구성 성격 4키만 실제 차이·포함 기준이 정본·글로벌 `CLAUDE.md`의 `dropin-applied` 줄 제외·줄바꿈 정규화 후 비교).
```

**C) 통합형** (루트 통합 레이어 — **개인 글로벌 `~/.claude/skills/`의 기본형(A)을 이 내용으로 교체**. 루트 `.claude/skills/`에만 두면 동명 개인 스킬이 이겨 실행되지 않는다, 위 주의)
```markdown
# resume/SKILL.md
---
name: resume
description: 통합 워크스페이스 재개. 루트+하위 repo git status로 미커밋 먼저, 대상 repo+단위 판별해 <repo>/docs[/<단위>]/PROGRESS.md와 (있으면) 루트 docs/INDEX.md를 읽는다.
---
# /resume (통합)
0) 루트+하위 repo 각각: remote 있고 clean이면 `git pull --ff-only` 먼저(아니면 fetch 후 뒤처짐 보고) → git status·브랜치로 미커밋(진행 중) 작업 발견.
1) 대상 repo(+단위) 판별: PWD > 브랜치 > 질문.
   **폴백**: 하위 repo가 없는 단일 repo면 0)·1)을 그 repo에만 수행하고 INDEX는 생략(=A와 동일). 비-git 폴더면 0)을 건너뛰고 docs 체계만 읽는다.
2) <repo>/docs[/<단위>]/PROGRESS.md 최상단(~40줄 Read limit) + 최근 DEC 3건 + <repo>/PROJECT_PLAN.md + 루트 docs/INDEX.md 최근 항목 → 보고.
3) 조건부 안내: dropin-applied 30일 경과면 /dropin-check·/dropin-update, 예정일 경과 항목, 조치 대기 메모·`게이트 차단(사유)`·`소스없음(사유)`/`확보 실패(사유)` 안내(대상 CLAUDE.md + 글로벌 `~/.claude/CLAUDE.md` 둘 다).
```
```markdown
# wrap/SKILL.md
---
name: wrap
description: 통합 마무리. 건드린 repo마다 <repo>/docs[/<단위>]/PROGRESS.md 기록, 여러 repo면 [공통] 교차, (선택) 루트 INDEX 한 줄, 미커밋 경고, 커밋은 repo별 안내.
---
# /wrap (통합)
1) 각 repo git status로 변경 감지(**폴백**: 단일 repo면 그 repo만 — 3)·4)는 생략해 A와 동일. 비-git 폴더면 git 단계를 건너뛰고 기록만). 2) 변경 repo마다 docs[/<단위>]/PROGRESS.md 최상단 append(**폴백**: 그 단위에 `docs/`가 없으면 append하지 말고 "01 §E-1 기록 체계 미설치"를 알린다. **루트는 예외** — 얇은 라우터의 루트 `docs/`엔 PROGRESS·DECISIONS·PROJECT_PLAN이 없는 것이 정상이니(`INDEX.md`·워크스페이스 레이어 산출물은 함께 있을 수 있다) 미설치로 보지 않는다).
3) 여러 repo면 주 대상 본문 + 나머지 [공통] 교차. 4) (선택) 루트 docs/INDEX.md 크로스-repo 한 줄+링크.
5) repo별 변경 파일 보고 + 미커밋 경고. 커밋은 repo별 따로(팀 양식). append한 PROGRESS가 ~800줄 경계 초과면 아카이브 안내.
6) 이번 세션에 `~/.claude/`나 저장소 `global-config/`를 고쳤으면 화이트리스트 5종 해시 대조(클론 없으면 생략) — 차이 시 방향 판정+복사 안내. **판정 기준은 A와 동일**(구성 성격 4키만 실제 차이·포함 기준이 정본·글로벌 `CLAUDE.md`의 `dropin-applied` 줄 제외·줄바꿈 정규화 후 비교).
```

**D) 루트 라우터 `CLAUDE.md`** (통합 레이어)
```markdown
# 통합 워크스페이스 (개인 라우터)
> 각 repo 사실은 그 repo의 CLAUDE.md가 본체. 여긴 길잡이만(50줄 안팎).

## 모듈 별칭 → repo
- "<프론트 …>" → <repoA> / "<백엔드 …>" → <repoB> / "<RAG …>" → <repoC>

## 통합 워크플로 규칙 (Claude가 자동 적용)
- /resume·/wrap은 대상 repo+단위를 PWD>브랜치>질문 순 판별, 그 repo docs[/<단위>]/에 기록.
- 여러 repo를 건드리면 각 repo에 기록(주 대상 본문 + [공통] 교차). 크로스-repo 세션만 루트 docs/INDEX.md에 한 줄+링크.
- 커밋은 repo별로 따로(독립 git). 루트 개인 레이어는 비공유(또는 개인 repo).
```

**E) 루트 `docs/INDEX.md`** (얇은 크로스-repo 인덱스)
```markdown
# 통합 작업 인덱스 (개인 · 얇게 · 링크 기반)
> 본문은 각 repo docs[/<단위>]/. 여긴 크로스-repo 세션 한 줄 + 링크만. 길어지면 archive.
- 2026-07-03 [<repoB>:<unit> · <repoA>:<unit>] 채널 연동 → <repoB>/docs/<unit>/PROGRESS.md · <repoA>/docs/<unit>/PROGRESS.md
```

### F-3. 프로젝트 `.claude/settings.json` (allow/ask/deny + 크로스-repo)
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "additionalDirectories": ["../<자주 함께 고치는 repo>"],
    "allow": [
      "Bash(git status:*)", "Bash(git log:*)", "Bash(git diff:*)", "Bash(git add:*)", "Bash(git commit:*)",
      "Bash(git switch:*)", "Bash(git checkout:*)", "Bash(git pull:*)", "Bash(git push:*)",
      "Bash(ls:*)", "Bash(cd:*)", "Bash(pwd)", "Bash(which:*)"
    ],
    "ask": [
      "Bash(git push --force:*)", "Bash(git push -f:*)", "Bash(git reset --hard:*)",
      "Bash(git clean:*)", "Bash(git rebase:*)", "Bash(rm -rf:*)"
    ],
    "deny": [
      "Bash(cat *_secure_config*)", "Bash(cat *.env*)",
      "Bash(type *.env*)", "Bash(Get-Content *.env*)", "Bash(gc *.env*)",
      "PowerShell(Get-Content *.env*)",
      "Bash(dd *)", "Bash(mkfs*)", "Bash(shutdown*)", "Bash(reboot*)",
      "Bash(rm -rf /)", "Bash(rm -rf /*)", "Bash(rm -rf ~*)"
    ]
  }
}
```
> `allow`엔 스택별 빌드/테스트 추가(`./gradlew:*`·`npm run:*`·`pytest:*` 등). 전체허용 `Bash(*)`는 개인 선택(팀 권장 아님).
> ⚠️ **`additionalDirectories`는 크로스-repo 작업이 있을 때만 — 단일 repo면 이 키를 통째로 뺀다.** 위 블록의 `../<자주 함께 고치는 repo>`는 플레이스홀더라, 지우지 않고 그대로 적용하면 **존재하지 않는 경로가 팀 공유 파일에 커밋된다**(2026-08-13 신규 설치 실행에서 발견). JSON엔 주석을 달 수 없어 블록 안에 조건을 적을 수 없으니 이 줄이 정본이다.

### F-4. `.gitattributes` (각 repo 루트 · 동시 append 충돌 자동 병합)
```
docs/PROGRESS.md       merge=union
docs/DECISIONS.md      merge=union
docs/**/PROGRESS.md    merge=union
docs/**/DECISIONS.md   merge=union
```
> ⚠️ `merge=union`은 동시 top-insert 순서가 약간 섞일 수 있음(둘 다 보존). DEC 번호는 날짜+작성자로.

### F-5. `.gitignore` (각 repo)
```
# Claude 런타임
.claude/cache/
.claude/sessions/
.claude/logs/
# Claude 개인 구성 (커밋 금지)
.claude/settings.local.json
.claude/*.local.md
CLAUDE.local.md
```
> A-1 루트를 개인 repo로 둘 때만: 루트 `.gitignore`에 하위 repo 폴더(`<repoA>/` 등)도 제외.

### F-6. 상태 뱃지 · 기록 양식
| 뱃지 | 의미 |
| --- | --- |
| 🚀 `[Done]` | PR/병합 가능한 독립 완결 |
| ⏳ `[Pending]` | 정상 빌드, 잔여 스펙 있어 이어서 |
| 🚨 `[Blocked]` | 컴파일 에러/외부 의존 교착으로 동결 |
```markdown
- [<단위>][Done] 게시판 카테고리 트리 추가 — @작성자 (feature/<단위>)
```

---

## G. 매일 운영 루틴
```text
프로젝트(또는 상위 폴더)에서 claude 실행
  → /resume             (원격 최신화 포함: clean이면 pull-first → git status로 미커밋 먼저 → 대상 판별 → 지난 기록)
  → @경로/파일 작업      (작게 쪼개기 · 여러 파일 건드리면 plan mode(Shift+Tab)로 시작
                         · 무관한 작업으로 넘어갈 땐 /clear)
  → /wrap               (대상 docs에 [상태] 기록 + 미커밋 경고)
  → repo별 git 커밋·푸시 (독립 git이면 각각. 미커밋 두지 말 것)
```
> ⚠️ **기록만 하고 커밋 안 하면 다음 세션이 못 찾는다**(미커밋은 git status로만 발견). 반드시 커밋.
> 💡 같은 문제로 **교정 2회 실패 시** 계속 고치지 말고 `/clear` 후 배운 것을 반영한 새 프롬프트로 — 거의 항상 이쪽이 빠르다.

---

## H. 적응 규칙 (프로젝트마다 다른 것 → Claude가 채움)
| 변수 | 조정 |
| --- | --- |
| repo 수·위치 · 단위별 git 여부 | §B 표에서 유형 결정(이름을 여기 열거하지 않는다 — 표가 정본) |
| 동시성(같은 단위 다인 편집) | 있으면 §E-3 단위분할+merge=union+솔루션aware, 없으면 flat |
| 스택 | `allow`의 빌드/테스트 명령, `deny`의 산출물 경로 |
| 커밋 양식 | 팀 규칙에 맞춤(아래 기본값) |
| 단위 이름 | 프론트=app / 백엔드=module / RAG=domain 등 그 repo 1차 분할축 |

**커밋 양식(기본)**: `<타입>: <스코프> - <설명>` (타입 풀워드 `feature`/`fix`/`hotfix`/`refactor`/`chore`). 팀에 다른 규칙 있으면 그걸 우선.

---

## I. 질문 템플릿 (부족하면 이걸 묻는다 · 추천값 포함)
1. **환경 유형**: 단일 repo(B) / 통합(A-1·A-2) 중 무엇? (코드로 판별했으면 확인만)
2. **동시성**: 여러 명이 같은 단위를 동시에 고치나? → 예면 MSA 단위분할 적용.
3. **크로스-repo**: 자주 함께 고치는 repo가 있나? → `additionalDirectories`에 등록.
4. **커밋 양식**: 팀 표준 커밋 메시지 규칙이 있나? (없으면 §H 기본값)
5. **루트 레이어**: 통합 환경이면 루트를 개인 git repo로 둘까(백업), 비-git로 둘까?
6. **기록 위치**: docs를 repo별로 둘까(권장) 한곳에 모을까?

---

## J. 보안 (셋업 전 최우선) 🔴
- **deny의 현재 커버리지**: Read/Edit deny 규칙은 파일 도구 + Bash 안의 인식되는 파일 명령(`cat`/`head`/`tail`/`sed` 등)까지 감지·차단한다. Read deny는 같은 경로의 **Edit까지 차단**(v2.1.208+; Write·NotebookEdit는 별도 `Edit(...)` deny 필요 — `Write(...)` 규칙은 무효라 시작 시 경고가 뜬다). 심볼릭 링크는 링크·대상 **둘 다** 검사해 하나라도 deny면 차단.
- **남은 구멍 2개**: ① 임의 서브프로세스(python/node 스크립트가 파일을 직접 open) 우회 가능 → OS 수준 차단은 아래 샌드박스. ② `cat`·`ls`·`head`·`grep` 등 읽기전용 내장 명령은 **기본적으로 프롬프트 없이 실행**되므로, 막으려면 명시적 ask/deny 규칙 필요.
- **샌드박스(2026-08-04 재검증)** 🔴: `/sandbox` 또는 `sandbox.enabled`로 켜는 OS 수준 격리(Bash 명령+자식 프로세스의 파일·네트워크 접근을 OS가 강제). 지원: **macOS(Seatbelt) · Linux · WSL2(bubblewrap+socat)**. **네이티브 Windows는 여전히 미지원** → Windows에선 WSL2에서 돌리거나, allow 좁게 + deny 규칙 기반으로 운용. ~~"Windows/Linux 모두 없음"~~은 구버전 서술(Linux·WSL2는 지원됨).
  - 샌드박스 기본 읽기 정책은 **컴퓨터 전체 읽기 허용**(일부 시스템 경로 제외)이라 `~/.ssh`·`~/.aws`는 **`sandbox.credentials`**(v2.1.187+)로 명시 차단하거나 env 토큰은 `mode: "mask"`(v2.1.199+)로 대체. 전 서브프로세스에서 Anthropic·클라우드 자격증명 제거는 `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`. 파일 격리만 끄고 네트워크 격리는 유지하려면 `sandbox.filesystem.disabled`(v2.1.216+, user/managed 스코프만 유효).
- **PowerShell 규칙**: `PowerShell(Get-Content *)` deny 하나로 별칭(`gc`·`type`·`cat`)까지 자동 매칭(대소문자 무관, 파이프·`;`로 나뉜 복합 명령은 **모든 하위 명령**이 규칙을 통과해야 허용). Bash 규칙은 별칭 정규화가 없으므로 Git Bash 병용 시 3종 유지(§D-3·§F-3).
- **규칙 우선순위**: deny → ask → allow 순 첫 매치. 넓은 deny는 더 좁은 allow보다 항상 우선(= deny에 예외를 뚫을 수 없음). 스코프 간에도 동일 — 어느 스코프든 deny가 있으면 다른 스코프 allow로 못 뚫는다.
- **파라미터 매칭**: deny/ask 규칙은 `Tool(param:value)` 형식으로 도구의 최상위 입력 파라미터도 매칭 가능(예: `Agent(model:opus)`, 샌드박스 우회 재시도에 프롬프트를 강제하는 `Bash(dangerouslyDisableSandbox:true)` ask). 단 `command`·`file_path` 등 자체 매칭 문법이 있는 필드는 불가.
- **최선**: 진짜 비밀번호·API 키·인증서를 **작업 레포에 두지 않기**(별도 vault·환경변수·`_secure_config` 등).
- **차선**: 불가피하면 `.env` + deny + (macOS·Linux·WSL2면) 샌드박스 + `sandbox.credentials`. 단 완전 차단 아님을 인지(샌드박스 프록시는 기본적으로 TLS 내용을 검사하지 않음 — 넓은 도메인 allow는 유출 경로가 될 수 있음).
- 글로벌 `CLAUDE.md #8`이 "cat .env 금지"를 행동 규칙으로 보완.

### J-1. 권한 모드 운용 — auto mode 🟢 (2026-07-28 공식 문서 확인)
"매번 승인(manual)"과 "전부 스킵(`--dangerously-skip-permissions`)" 사이의 중간지대. **별도 분류기 모델**(기본 Sonnet 5)이 각 액션을 실행 전 심사해 안전한 것은 통과시키고, 요청 범위를 벗어난 행동·미인식 인프라 대상·읽은 콘텐츠(프롬프트 인젝션)에서 유래한 행동을 차단한다.
- **켜기**: `Shift+Tab` 순환(manual→acceptEdits→plan→auto, 요건 충족 시 등장) 또는 `--permission-mode auto`. 기본 시작 모드로 쓰려면 `defaultMode: "auto"` — 단 **user/managed 스코프만 유효**(프로젝트·로컬 settings에선 무시됨: repo가 스스로 권한을 올리는 걸 막는 설계, v2.1.142+).
- **규칙과의 관계**: 명시적 **ask 규칙은 auto mode에서도 프롬프트 강제**, deny는 그대로 차단(분류기가 deny를 뚫지 못함). `rm -rf /`·`~` 같은 파괴 명령은 분류기가 심사(v2.1.218+), 요청하지 않은 파괴적 git 명령·트랜스크립트 조작은 차단.
- **회사 환경 주의** 🔴: Team·Enterprise는 **Owner가 admin 설정에서 켜야** 사용 가능하고, 관리자가 managed settings `permissions.disableAutoMode: "disable"`로 조직 전체 차단 가능 — **조직 정책이 항상 우선**이며 이 문서로 우회 구성하지 않는다. 프로바이더는 API·Claude Platform on AWS·Bedrock·Google Cloud·Foundry 모두 기본 제공(v2.1.207+), 단 Bedrock 등 서드파티는 Sonnet 5·Opus 4.7+·Fable 5만 지원.
- **한계**: 프롬프트를 줄일 뿐 안전 보장이 아니다 — 방향을 신뢰하는 작업에만 쓰고, 민감 작업(배포·시크릿 인접·대량 삭제)은 manual/plan으로 내려서 검토한다. plan mode 중에도 분류기가 셸 명령을 심사한다(`useAutoModeDuringPlan` 기본 on, v2.1.218+).

---

## K. 트러블슈팅
| 증상 | 확인 |
| --- | --- |
| `/resume`·`/wrap` 자동완성 안 뜸 | IDE 재시작 / 폴더·파일명 / `SKILL.md`의 `name:` |
| `/` 자동완성에 같은 명령이 2개 | 구형 `commands/<이름>.md`와 `skills/<이름>/` 중복 등록 — **commands 쪽 삭제**(스킬이 정본, §F-2 주의) |
| IntelliJ에서 Claude 안 열림 | 플러그인 설치 후 **완전 재시작** / `Ctrl+Esc` |
| hooks 안 도는 듯 | 매처 철자(`auto`/`compact`) 정확히 |
| `/resume`가 진행 중 작업 못 찾음 | 미커밋+다른 브랜치라서 — skill이 `git status` 먼저 보는지 / **`/wrap` 후 커밋** 습관화 |
| 같은 PROGRESS Git 충돌 | `.gitattributes` merge=union 있는지 / append 전용인지 |
| A-1인데 일부 repo 못 읽음 | **상위 폴더**에서 `claude` 실행했는지 |
| A-2에서 IDE엔 보이나 Claude가 못 읽음 | `--add-dir` 빠짐(세션 한정) |
| 여러 repo 한 번에 커밋 안 됨 | 정상 — 독립 git. repo별 따로 |
| 커밋은 됐는데 push가 403·권한 없음 | **로컬 커밋 유지 + 권한자 경유**(PR·패치 전달) — 기록은 커밋에 남아 다음 /resume가 발견한다 |
| `.env`를 Claude가 읽으려 함 | deny + CLAUDE.md #8 / **근본은 시크릿 분리** |
| Windows에서 Bash 없다고 에러 | Claude Code `v2.1.120+`로 업데이트(PowerShell만으로 동작) |
| 셋업이 전반적으로 이상함 | **`/doctor`** — 구성 전체 진단+수정 제안(비대 CLAUDE.md 트림 제안 포함 v2.1.206+, `/checkup` 별칭) |

---

## L. 유지보수 (6개월마다 재검증) ⭐
Claude Code는 매주 바뀐다. 6개월마다 30분:
- `code.claude.com/docs/en/whats-new` 최신 항목 확인.
- 🔴🟡: deny의 서브프로세스 우회, **샌드박스 네이티브 Windows 지원 여부**(현재 macOS·Linux·WSL2만 — sandboxing), `attribution` 스키마 변화, auto-memory 한도(현행 MEMORY.md 200줄/25KB), `sandbox.credentials` 스키마.
- `/model` 최신 정책(별칭이 가리키는 실제 모델·`best`의 해석), `claude --version`.
- `/effort` 단계 명칭·모델별 지원 범위·`ultracode` 동작, 에이전트·스킬 frontmatter `effort:` 키 유지 여부(§D-6, 2026-07-20 확정).
- §F-2 **A·B·C 전 템플릿**의 폴백(비-git·`docs/` 부재·단위 없음·단일 repo)·**조건부 안내 어휘**(조치 대기·`게이트 차단`·`소스없음`/`확보 실패` — 새 어휘가 늘 때마다 템플릿 3곳도 함께 늘려야 한다)·**미러 대조 판정 기준**(구성 성격 4키·포함 기준 정본·`dropin-applied` 줄 제외·줄바꿈 정규화)이 배포된 글로벌 스킬 실물과 일치하는지 — 문서만 고치고 스킬을 빠뜨리면(또는 그 반대로) 같은 공백이 방향만 바꿔 재발한다. **점검 범위에서 A를 빼지 말 것**: 단일 repo 신규 설치자가 쓰는 것이 A다(도입 경위는 버전 표 v1.26·v1.29 행).
- 갱신 후 이 문서 "최종 갱신" 날짜 수정.
- ✅ 해소된 과거 항목(재확인 불필요): CLAUDE.local.md deprecation 우려 → **계속 지원**(2026-07-20 확인, `.gitignore` 추가 권장 유지).

---

## 핵심 출처 🟢
IDE 통합·`--add-dir`(ide-integrations·large-codebases) / permissions·deny 한계 / hooks / skills / memory·auto-memory — 모두 `code.claude.com/docs` 및 `docs.anthropic.com`.

**문서 정보** — 통합 마스터(범용) **v1.34**. 변경 이력은 최상단 버전 표 참조(유래: 8개 소스 통합 초판 — v1.0 행).
최종 갱신: 2026-08-13 · 최근 재검증: 2026-08-04 / 참조: Claude Code v2.1.226, Opus 5(v2.1.219+) · Sonnet 5(v2.1.197+) · Fable 5(v2.1.170+).
