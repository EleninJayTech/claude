# dandi-tool-tune

Keep the tools Claude works with up to date. The skill finds what is actually installed on this PC — MCP servers, plugins, global npm and Dart tools, and winget or Homebrew packages — sorts them by job (browser and screen control, desktop and app control, verification, docs lookup), looks up today's latest release for each, and shows one table with only what differs. If another tool does the same job better, it suggests installing it alongside, with the official source and the date checked; tools the Dandi docs have rejected are never suggested. Nothing changes until you approve, the old tool is never removed, and every change is logged with a command to undo it.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-tool-tune@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or refresh the listing and then run `claude plugin update dandi-tool-tune@dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-tool-tune:tool-tune` | Detect tools, compare with today's releases, suggest better tools, apply what you approve, and log it. `점검` (check) stops after the table without changing anything; `되돌리기` (revert) puts logged tools back to their previous version | `[점검 \| 되돌리기 [tool…]]` |

The log is `~/.claude/tool-tune/log.md`. Plugins cannot be rolled back — there is no official command to install an older plugin version.

## Requirements

Web access for the release lookups (without it, rows stay unconfirmed and are not offered for update). Windows uses winget and macOS uses Homebrew if present; on Linux, system packages are not checked.

## Uninstall

Run `/dandi-tool-tune:tool-tune 되돌리기` first if you want the previous versions back, then:

```
/plugin uninstall dandi-tool-tune@dandi
```

No hooks to remove. Tools it installed alongside stay — remove them by their own instructions. The log in `~/.claude/tool-tune/` stays unless you delete it.

## Already installed via the Dandi drop-in docs?

If `tool-tune` also exists in `~/.claude/skills/` (or this project's `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §21), both copies show up. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
