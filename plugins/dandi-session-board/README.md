# dandi-session-board

Lets Claude Code sessions that run in the same folder (same git top-level) know about each other. Hooks record each session's title, branch and edited files under `~/.claude/session-board/`. When another active session exists, Claude is told at session start and on the next prompt, and it gets one warning before editing a file another session just changed. Nothing is blocked — you decide whether to keep going, move the work to `claude --worktree <name>`, or ask the other session.

The hooks never call a model. When no other session is active, nothing is added to the conversation.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-session-board@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-session-board:session-board` | Shows the active sessions per folder with their branch and edited files, and suggests moving overlapping work to a worktree | none |

## Requirements

Node.js 18 or later on `PATH`. Without it the hooks do nothing (they never fail a session).

## What is stored

Per session: id, folder, branch, title (or the first 80 characters of the first prompt), and edited file paths. No file contents. Sessions idle for 3 hours or ended are ignored; records older than 24 hours are deleted at the next session start.

## Uninstall

```
/plugin uninstall dandi-session-board@dandi
```

The hooks go away with the plugin. Delete `~/.claude/session-board/` if you want the leftover records gone too — they are only session metadata.

## Already installed via the Dandi drop-in docs?

If `session-board` also exists in `~/.claude/skills/` and its hooks are in `~/.claude/settings.json` (added by `03_확장기능-설치-체크리스트.md` §12), every event runs twice. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
