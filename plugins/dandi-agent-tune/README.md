# dandi-agent-tune

Give each subagent in a project the model and effort level that fit its job. The skill surveys `.claude/agents/` (and `~/.claude/agents/`), shows what each agent does and what it runs on today, asks only what the files can't tell (how often it runs, whether its results have had problems, your cost-vs-quality priority), reads your plan profile as a constraint, and proposes a model and effort per agent with a one-line reason and a relative cost trend. Nothing is changed until you approve, and only the `model:` and `effort:` lines of the agents you pick are edited.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-agent-tune@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-agent-tune:agent-tune` | Survey agents, ask, propose model/effort per agent, apply what you approve, and record it. `점검` (check) compares the record with the files read-only; `되돌리기` (revert) restores the previous values | `[점검 \| 되돌리기 [agent…]]` |

Model IDs, prices and effort levels are looked up in the official docs on the day you run it. Applied values and the values they replaced are kept in `docs/에이전트-배정.md` (`docs/agent-assignment.md` when the project's output language is English).

## Requirements

None. Web access is needed for the official lookups; without it the skill asks you to confirm values and skips the cost trend.

## Uninstall

Run `/dandi-agent-tune:agent-tune 되돌리기` first if you want the previous values back, then:

```
/plugin uninstall dandi-agent-tune@dandi
```

No hooks to remove. The assignment record stays — it is project data.

## Already installed via the Dandi drop-in docs?

If `agent-tune` also exists in `~/.claude/skills/` (or this project's `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §20), both copies show up. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
