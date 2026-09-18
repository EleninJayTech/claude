# dandi-feature-docs

Verify every feature against the code and the running app, keep AI-reproducible feature specs in `docs/features/`, and run them as regression tests.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-feature-docs@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-feature-docs:feature-docs` | Create (`init`) or update (`sync`) the feature specs in `docs/features/` | `init \| sync [base commit/tag]` |
| `/dandi-feature-docs:feature-test` | Run the spec's test cases on the real screen and classify failures | `[F-id or TC-id]` |
| `/dandi-feature-docs:feature-doc-audit` | Report stale or inconsistent specs without running tests | `[commits-behind threshold, default 5]` |
| `/dandi-feature-docs:feature-doc-guard` | Install a guard that blocks commits changing code without its spec | `install \| uninstall \| check` |
| `/dandi-feature-docs:test-to-script` | Convert test cases into Playwright (web) or Maestro (Android/iOS) scripts | `[F-id or TC-id]` |
| `/dandi-feature-docs:release-notes` | Build feature-grouped release notes between two tags or commits | `[start] [end, default HEAD]` |

Start with `feature-docs init`; the other five read the `docs/features/` layout it creates.

## Requirements

- Chrome MCP (web) or an emulator/simulator (app) for screen verification
- Python 3 for `feature-doc-audit` and `feature-doc-guard` (standard library only)
- Playwright or Maestro for scripts made by `test-to-script`

## Uninstall

**Run `/dandi-feature-docs:feature-doc-guard uninstall` first** in each project where you installed the guard — the hooks live in the project, not in the plugin. Then:

```
/plugin uninstall dandi-feature-docs@dandi
```

`docs/features/` and `tests/e2e/` are your data and stay.

## Already installed via the Dandi drop-in docs?

If the same skills also exist in `~/.claude/skills/` (copied by `03_확장기능-설치-체크리스트.md` §7), both copies show up and both are candidates for automatic invocation. Keep one — remove the copies with §7's removal steps, or skip this plugin.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
