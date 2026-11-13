# dandi-ops-kit

Deploy-and-operate paperwork for a project you run alone. The skill first surveys the repo (deploy commands, hosting config, secret **names**, databases, external APIs, existing ops docs) and shows one diagnosis table — seven possible outputs, each marked needed / not needed / undecided with the file and line it judged from. It builds **only what you pick**, and records why the rest were not needed so it doesn't suggest them again.

The seven outputs: a deploy runbook (first deploy, redeploy, rollback) · an ops runbook (console checks, admin chores, recurring checks) · an admin hub (every console link, account name and where-to-look in one page, rendered from a single `APPS` array, plus a read-only map of the project's own records — policies, feature log, feature specs, progress, decisions, plans — showing what exists and where, at index level) · an `/admin` dashboard served by your app (DAU, new users, D1/D7 return, payments, countries — closed with 503 until a 32+ character token secret is set) · a `/health` check with free scheduled probing that alerts only on consecutive failures and once on recovery · a backup export plus a restore rehearsal into a throwaway database · a free-tier limit table, with an 80% warning on the dashboard when usage is readable by API.

Every runbook step carries a paste-ready command, the success text to look for, what to do on failure, and a one-line report to send back to Claude so the next session can pick up. Secrets are entered through a masked prompt and piped into the CLI after printing their length — never pasted from the clipboard.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-ops-kit@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-ops-kit:ops-kit` | Diagnoses the project and builds or updates the deploy/ops outputs you approve | `init` · `runbook` · `hub` · `dashboard` · `health` · `backup` · `limits` · `sync` · `check` (read-only) |

## Requirements

None beyond the target project's own deploy tooling. HTML outputs use system fonts and no external scripts. If your Claude environment can publish artifacts, runbooks and the hub are published privately; otherwise they stay as local files under `docs/status/`.

## What it never does

It does not deploy, enter secrets, or connect alert channels — you do those by following the runbook. It does not assume any paid monitoring service. It does not read `.env` or key files.

## Uninstall

```
/plugin uninstall dandi-ops-kit@dandi
```

No hooks, settings or scheduled tasks to remove. What it wrote into your project (`docs/status/`, and any `/admin`, `/health` or workflow code you approved) is your project's code and data — revert it with that project's git if you want it gone.

## Already installed via the Dandi drop-in docs?

If `ops-kit` also exists in `~/.claude/skills/` (or this project’s `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §15), both copies show up and both are candidates for automatic invocation. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in, and writes the outputs in your project's output language.

## License

MIT — see `LICENSE`.
