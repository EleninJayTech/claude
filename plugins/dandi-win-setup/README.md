# dandi-win-setup

A diagnose-then-fix routine that gets a Windows PC ready for Claude Code CLI work. One read-only script checks PowerShell 7, the Windows Terminal settings (broken profile GUIDs, the default profile), the user `Path`, developer mode, long paths, `sudo`, Claude Code's `defaultShell`, `jq`/`fd`/`gh` and free disk space. Claude reports one table and changes **only the items you approve**, backing up first.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-win-setup@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi` to refresh the listing, then `claude plugin update dandi-win-setup@dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-win-setup:win-setup` | Diagnoses the PC, reports a verdict table, applies only the approved fixes, then reports before/after | none (full run), `진단만` or `diagnose` (report only), `검증` or `verify` (final check after a reboot, in a new terminal tab) |

Manual invocation only — Claude never starts it on its own.

## Requirements

Windows (tested on Windows 11 Pro 25H2). The scripts run on Windows PowerShell 5.1 as well, so the diagnosis works before PowerShell 7 is installed. Machine-wide changes (developer mode, long paths, `sudo`) are bundled into one elevated script, so you see a single UAC prompt. The system `Path` (HKLM) is never changed.

## Uninstall

```
/plugin uninstall dandi-win-setup@dandi
```

Uninstalling removes the skill only. Changes you approved stay on the PC; backups are in `%LOCALAPPDATA%\win-setup\backup\` and the skill's `references/fix.md` section 4 lists how to undo each one.

## Already installed via the Dandi drop-in docs?

If `win-setup` also exists in `~/.claude/skills/` (or this project’s `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §17), both copies show up. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
