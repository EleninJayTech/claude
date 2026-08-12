# 글로벌 .claude 구성 백업

`C:/Users/<계정>/.claude` 의 **안전한 구성 파일만** 복사한 백업(화이트리스트 5종 — 최신 미러 날짜는 repo `CLAUDE.md` 구성물 표 참조).

| 항목 | 원본 위치 |
| --- | --- |
| `CLAUDE.md` | `~/.claude/CLAUDE.md` (글로벌 행동 규칙) |
| `settings.json` | `~/.claude/settings.json` (deny·hooks·statusline 등) |
| `skills/` | `~/.claude/skills/` (resume·wrap·dropin-check·dropin-update·humanizer·frontend-design·svg-design — 실물 폴더가 정본, 늘면 폴더째 미러) |
| `commands/` | `~/.claude/commands/` (skill-setup만 — 스킬과 이름이 겹치는 구형 커맨드는 중복 등록되므로 제거, [[DEC-20260810-bsjeong87-04]]) |
| `output-styles/` | `~/.claude/output-styles/` (커스텀 출력 스타일 — settings.json `outputStyle` 키가 가리키는 파일, [[DEC-20260810-bsjeong87-10]]) |

**복원**: 새 PC에서 위 표의 원본 위치로 그대로 복사. (플러그인 설치 상태는 백업 경로가 없어 `/plugin` 재설치 필요 — DEC-20260810-bsjeong87-10 미해결 항목.)

**제외한 것(커밋 금지)**: `.credentials.json`(로그인 토큰) · `history.jsonl`·`projects/`·`sessions/`(대화 기록) · 캐시·로그류.

> 원본을 수정하면 이 백업은 자동 갱신되지 않는다 — 갱신 시 다시 복사해서 커밋.
