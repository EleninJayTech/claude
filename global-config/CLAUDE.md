# CLAUDE.md (Global)

## 1. Think Before Coding
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.

## 2. Simplicity First
- No features beyond what was asked.
- No abstractions for single-use code.
- If you write 200 lines and it could be 50, rewrite it.

## 3. Surgical Changes
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken. Match existing style.
- Remove only the imports/vars YOUR changes made unused.

## 4. Goal-Driven Execution
- Define a verifiable check before editing.
- For multi-step tasks, state a brief plan: 1. step → verify: check

## 5. Output Style
- 요청 없으면 긴 설명 없이 구현만. 간결하게.
- 전체 파일 재출력 금지. 변경 라인 ± 앞뒤 3줄만 diff 형식으로.

## 6. File Reference
- 파일을 다룰 때는 `@경로/파일명` 형식으로 참조하라.
  Claude는 검색을 생략하고 바로 컨텍스트에 가져온다.

## 7. Compaction Priority (auto-compact 시 보존 우선순위)
When compacting, always preserve:
- The list of files modified in this session
- Pending tasks (what was about to be done)
- Recent decisions (last 3 DECs — DEC-YYYYMMDD-<author>, if any)
- Open issues / errors encountered

## 8. Secret Safety
- 절대 .env, 인증서, 키 파일을 읽거나 cat/type/Get-Content(gc)하지 마라.
- 시크릿이 필요한 작업은 사용자에게 환경변수로 제공받아라.

<!-- claude-skill-setup:start -->
## 9. 적용 범위 지침이 필요한 스킬 (개인·전 프로젝트)
> 전체 설치 목록이 아니다 — **언제 쓰고 언제 안 쓰는지**를 정해둬야 하는 것만 적는다(설치 인벤토리는 `~/.claude/skills/` 실물, 현재 7종).
- **humanizer** (`~/.claude/skills/humanizer`, 사용자 스코프) — 한국어 AI 문체 패턴(쉼표 과다·번역투·구조 단조 등 40종) 감지·교정.
  - 호출: `/humanizer` 또는 한국어 글을 "자연스럽게 다듬어줘".
  - 적용 권장: **외부 공유·사용자 노출 한국어 문서**(주간보고·온보딩 docs·공지). 개인 기록(PROGRESS/DECISIONS 등 내부 로그)엔 강제하지 않음.
  - 우선순위: 프로젝트 `CLAUDE.md` 규칙(간결 출력 등)이 humanizer 지침보다 우선.
<!-- claude-skill-setup:end -->

<!-- dropin-applied(글로벌 · 머신=YOGASLIM7): 2026-08-12 · 모드=권장(어긋난 곳만)+응답스타일+무인자동화 · 프로필=표준 · 01 v1.26(글로벌 — /audit 수정분 반영: CLAUDE.md §7 DEC id 양식·§8 type/Get-Content(gc), 스킬 4종 resume/wrap/dropin-check/dropin-update 저장소 최신본 교체[해시 일치], commands/skill-setup.md BOM 제거+frontmatter — deny 27종·hooks·attribution은 기적용 일치. **2차 재적용 2026-08-12**: 타 PC 커밋으로 미러가 앞서 있던 wrap[미러 대조 절]·dropin-check[줄바꿈 정규화] 2종을 실구성에 반영 — 스킬 4종 해시 일치, ⓐⓑⓓⓔⓕ 어긋남 0. **2026-08-12 /audit 4·5차**: 스킬 4종+`commands/skill-setup.md`을 감사 수정분으로 갱신 — 미러 정규화 해시 일치 재확인, 문서 기준은 01 v1.30 시점) · 03 v1.8(변경 없음 — 재구성 불요) · 05 v1.2(~~korean-evidence-report~~ → **2026-08-12 내장 Explanatory 복귀**[사용자 결정 2026-08-12 — 저장소 DEC 미발번, outputStyle의 PC별 값 수용은 DEC-20260812-bsjeong87-11] — 스킬 파일은 `output-styles/`에 보존, `/output-style` 명령은 CLI 2.1.228에 없어 settings.json 직접 수정) · 04 v1.6(gh 설치, **인증 대기** — 2026-08-06부터 미완 / **glab은 이 PC 미설치** — 2026-08-12 실측) · 06 v1.3(프로젝트 대상 — claude repo에 §2·§4 준비물 설치, **루틴 생성은 계정 GitHub 연결 확인 대기**) · 미선택: 02(프로젝트 대상 — playground `.claude/agents/` 4종 기적용) · 출처=클론 D:\workspace\claude · ※ 이 줄은 **이 PC 기준**이다 — 프로젝트 repo의 dropin-applied는 머신 로컬 구성을 보증하지 못한다(2026-08-11 실증) -->

