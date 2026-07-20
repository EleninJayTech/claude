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
- Recent decisions (last 3 DEC-NNN if any)
- Open issues / errors encountered

## 8. Secret Safety
- 절대 .env, 인증서, 키 파일을 읽거나 cat하지 마라.
- 시크릿이 필요한 작업은 사용자에게 환경변수로 제공받아라.

<!-- claude-skill-setup:start -->
## 9. 설치된 스킬 (개인·전 프로젝트)
- **humanizer** (`~/.claude/skills/humanizer`, 사용자 스코프) — 한국어 AI 문체 패턴(쉼표 과다·번역투·구조 단조 등 40종) 감지·교정.
  - 호출: `/humanizer` 또는 한국어 글을 "자연스럽게 다듬어줘".
  - 적용 권장: **외부 공유·사용자 노출 한국어 문서**(주간보고·온보딩 docs·공지). 개인 기록(PROGRESS/DECISIONS 등 내부 로그)엔 강제하지 않음.
  - 우선순위: 프로젝트 `CLAUDE.md` 규칙(간결 출력 등)이 humanizer 지침보다 우선.
<!-- claude-skill-setup:end -->
