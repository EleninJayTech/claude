# 글로벌 .claude 구성 백업

`C:/Users/<계정>/.claude` 의 **안전한 구성 파일만** 복사한 백업 (2026-07-20).

| 항목 | 원본 위치 |
| --- | --- |
| `CLAUDE.md` | `~/.claude/CLAUDE.md` (글로벌 행동 규칙) |
| `settings.json` | `~/.claude/settings.json` (deny·hooks·statusline 등) |
| `skills/` | `~/.claude/skills/` (resume·wrap·humanizer) |
| `commands/` | `~/.claude/commands/` (구형 커맨드 — 스킬로 통합됨, 참고용) |

**복원**: 새 PC에서 위 표의 원본 위치로 그대로 복사.

**제외한 것(커밋 금지)**: `.credentials.json`(로그인 토큰) · `history.jsonl`·`projects/`·`sessions/`(대화 기록) · 캐시·로그류.

> 원본을 수정하면 이 백업은 자동 갱신되지 않는다 — 갱신 시 다시 복사해서 커밋.
