# dandi-kb-dashboard

Two skills for a Markdown knowledge base — a repository of notes classified by frontmatter that Claude files and searches for you. **kb-init** creates one in an empty folder; **kb-dashboard** shows it as a single local HTML page.

One local HTML page for a Markdown knowledge base — a repository of notes classified by frontmatter. A bundled Node script reads the notes and builds the page: todos by status with overdue items on top, published artifact links and local outputs, tips, records by type, tag and project filters, search, and each note's text expandable in place. The page is **view-only** and is written **outside the repository** (`~/.claude/kb-dashboard/`), so no copy of your notes ends up in git or on an external service.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-kb-dashboard@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi` to refresh the listing, then `claude plugin update dandi-kb-dashboard@dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-kb-dashboard:kb-init` | Creates a knowledge base in an empty folder: a root `CLAUDE.md` with the classification table, target and type folders, a todo file, four project skills (`/log`, `/find`, `/todo`, `/report`), a README, `.gitignore`, and the dashboard config. Existing files are never overwritten; no remote repository is created | optional folder path |
| `/dandi-kb-dashboard:kb-dashboard` | Builds the dashboard page and opens it in the browser | none (build and open), `아티팩트 <URL> <title>` (record one published artifact link; no commit), `설정` (create or edit the config), `점검` (check the config and note formats) |

Manual invocation only — Claude never starts it on its own.

The first run creates `<repo>/.claude/kb-dashboard.json` with you: target folders, record types, todo states and the page language (`ko` or `en`). The script follows that file only. A knowledge base made by kb-init already has this file, so the dashboard opens without the setup step.

## Requirements

Node.js 18 or later. Built-in modules only — nothing to `npm install`. Tested on Windows 11; macOS and Linux open the page with `open` / `xdg-open` (not yet verified).

## Uninstall

```
/plugin uninstall dandi-kb-dashboard@dandi
```

Uninstalling removes the skill only. Delete the generated pages in `~/.claude/kb-dashboard/` yourself. The config `.claude/kb-dashboard.json` and any artifact list file belong to your repository and stay there. A knowledge base created by kb-init (folders, notes, `CLAUDE.md`, the four project skills) belongs to your repository and stays.

## Already installed via the Dandi drop-in docs?

If `kb-init` or `kb-dashboard` also exists in `~/.claude/skills/` (or this project’s `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §18), both copies show up. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in. The page itself is Korean or English, set by `lang` in the config.

## License

MIT — see `LICENSE`.
