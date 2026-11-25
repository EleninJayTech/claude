# dandi-agent-guard

Keeps parallel subagents within what this PC can handle. At session start Claude is told how many subagents can run at once right now, computed from the PC's logical cores, total RAM and currently available memory, so it splits parallel work into batches from the start. A `PreToolUse` hook on the `Agent` tool denies spawns beyond the limit; Claude launches them again after running agents finish.

The hooks never call a model. They only write small "running" markers under `~/.claude/agent-guard/`.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-agent-guard@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi` to refresh the listing, then `claude plugin update dandi-agent-guard@dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-agent-guard:agent-guard` | Shows the PC spec, current free memory and CPU, the limit and how many agents are running, and explains how to adjust or turn off the guard | none |

## How the limit is set

The spec limit is `min(logical cores / 2, total GB / 4, 8)`. On every spawn the hook checks again: it denies when the spec limit is reached, when available memory minus a 1.5 GB reserve can't hold another agent (1 GB each by default), or when CPU usage is 85% or higher. Each session is always allowed one running agent, so a session never gets stuck behind others. Workflow agents (the `Workflow` tool) don't go through the `Agent` tool and are not denied — Claude is told the same limit at session start. Values can be changed in `~/.claude/agent-guard/config.json` (the skill lists the keys).

## Requirements

Node.js 18 or later on `PATH`. Without it, do not install this plugin: the hooks fail with a `hook error` notice each time they run, and on Windows without Git Bash a failing hook can block `Agent` spawns. The `PreToolUse` hook is set to continue on failure, but keep Node installed before enabling it.

## What is stored

One marker file per running or just-allowed subagent (session id, agent id, agent type, time) under `~/.claude/agent-guard/run/`, plus the optional `~/.claude/agent-guard/config.json`. No prompts or file contents. Markers are removed when the agent stops or the session ends, and expire after 45 minutes otherwise.

## Uninstall

```
/plugin uninstall dandi-agent-guard@dandi
```

The hooks go away with the plugin. Delete `~/.claude/agent-guard/` too. If you added `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` to `env` in `~/.claude/settings.json`, remove it yourself.

## Already installed via the Dandi drop-in docs?

If `agent-guard` also exists in `~/.claude/skills/` and its hooks are in `~/.claude/settings.json` (added by `03_확장기능-설치-체크리스트.md` §19), every spawn is counted twice and the limit is effectively halved. Keep one.

## Language

Skill instructions and hook messages are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
