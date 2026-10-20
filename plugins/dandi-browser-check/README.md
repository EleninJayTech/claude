# dandi-browser-check

A rule set for looking at pages when Claude verifies or debugs in a browser. It picks the observation by the question: an HTTP fetch when nothing needs rendering, the page text, element tree, console and network when the DOM is the question, and a screenshot — required, not optional — when the look itself is the question. Repeated checks become scripts.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-browser-check@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-browser-check:browser-check` | Loaded automatically when Claude checks or debugs a page; tells it which observation to use and when to escalate | — |

## Requirements

Any one of Claude in Chrome, the Claude Desktop browser, or Playwright CLI. With none, the skill stops at HTTP checks and says the screen was not checked. Launching your app is out of scope — that's the built-in `/run` and `/verify`.

## Uninstall

```
/plugin uninstall dandi-browser-check@dandi
```

No hooks to remove.

## Already installed via the Dandi drop-in docs?

If `browser-check` also exists in `~/.claude/skills/` (or this project’s `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §5), both copies show up and both are candidates for automatic invocation. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
