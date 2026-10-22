# dandi-pc-clean

A check-then-clean routine for a Windows PC that got slow. The check is read-only: free space on C:, free memory, uptime, orphaned `node.exe` processes (their parent is gone), `claude.exe` sessions started before today, the top memory users, old files in TEMP, the recycle bin and `TEMP\Outlook Logging`. Claude reports one table, proposes only the items over a threshold, and cleans **only what you approve**. Your current Claude session is never a target.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-pc-clean@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-pc-clean:pc-clean` | Runs the read-only check, proposes cleanup candidates and runs only the approved ones | none, or `점검만` (check only) |

## Requirements

Windows and PowerShell 7 (`pwsh`). Without them the skill stops before running anything.

## Uninstall

```
/plugin uninstall dandi-pc-clean@dandi
```

No hooks, settings or scheduled tasks to remove. Files deleted and processes ended by a cleanup you approved cannot be restored — that is why each item asks first.

## Already installed via the Dandi drop-in docs?

If `pc-clean` also exists in `~/.claude/skills/` (or this project’s `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §10), both copies show up and both are candidates for automatic invocation. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
