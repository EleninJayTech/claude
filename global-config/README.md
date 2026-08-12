# 글로벌 .claude 구성 백업

`C:/Users/<계정>/.claude` 의 **안전한 구성 파일만** 복사한 백업(화이트리스트 5종 — 최신 미러 날짜는 repo `CLAUDE.md` 구성물 표 참조).

| 항목 | 원본 위치 |
| --- | --- |
| `CLAUDE.md` | `~/.claude/CLAUDE.md` (글로벌 행동 규칙) |
| `settings.json` | `~/.claude/settings.json` (deny·hooks·statusline 등) |
| `skills/` | `~/.claude/skills/` (resume·wrap·dropin-check·dropin-update·humanizer·frontend-design·svg-design — 실물 폴더가 정본, 늘면 폴더째 미러) |
| `commands/` | `~/.claude/commands/` (skill-setup만 — 스킬과 이름이 겹치는 구형 커맨드는 중복 등록되므로 제거, [[DEC-20260810-bsjeong87-04]]) |
| `output-styles/` | `~/.claude/output-styles/` (커스텀 출력 스타일 자산 — **어느 PC가 내장 스타일을 쓰고 있더라도 보존**한다. settings의 `outputStyle`이 지금 이 파일을 가리키는지와 무관, [[DEC-20260810-bsjeong87-10]]) |

**복원**: 위 표의 원본 위치로 복사하되 **`settings.json`은 통째 덮어쓰지 말고 병합**한다 — 구성 성격 키(`permissions.deny`·`hooks`·`attribution`·`autoMemoryEnabled`)는 적용하고 **그 밖은 전부 머신·계정 종속으로 보고 그 PC의 현재 값을 보존**한다(`model`·`effortLevel`·`theme`·`outputStyle`·`enabledPlugins`·`statusLine`·마켓플레이스 소스 형식·`autoUpdatesChannel` 등 — 괄호는 예시이므로 **제외 목록을 늘려 맞추지 말고 포함 기준으로 판정**한다)([[DEC-20260721-bsjeong87-02]] — 통째 복원은 그 PC에서 동작하지 않는 설정을 되살린다). 나머지 4종은 그대로 복사해도 된다. (플러그인 설치 상태는 백업 경로가 없어 `/plugin` 재설치 필요 — DEC-20260810-bsjeong87-10 미해결 항목.)

> **여러 PC에서 갱신하면 이 백업은 갈라진다.** `settings.json`엔 머신 종속 키가 섞여 있어 **마지막에 커밋한 PC의 값**이 남는다 — 이 파일이 "어느 PC의 상태"인지는 기록되지 않으므로, diff에 머신 종속 키만 보이면 **갈라짐이 아니라 정상**으로 판정한다(`/dropin-check` §3·`/wrap` 미러 대조와 같은 규칙). 구성 성격 키가 다를 때만 실제 차이다.

**제외한 것(커밋 금지)**: `.credentials.json`(로그인 토큰) · `history.jsonl`·`projects/`·`sessions/`(대화 기록) · 캐시·로그류.

> 원본을 수정하면 이 백업은 자동 갱신되지 않는다 — 갱신 시 다시 복사해서 커밋.
