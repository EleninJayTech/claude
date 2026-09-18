# dandi-refactor

Behavior-preserving refactoring and optimization — merge duplicates, tidy structure, adapt to new language/runtime versions, improve performance — followed by side-effect verification.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-refactor@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-refactor:refactor` | Refactor the recent work (default), the whole repo, a path, or a commit range, then verify side effects. `check` verifies without changing code | `[all \| path \| commit..commit \| check [range]] [nocheck]` |

Reports are saved to `docs/refactor/`. The skill never commits — you do.

## Requirements

None beyond a git repository. If `dandi-feature-docs` is installed and `docs/features/` exists, affected features are re-tested with `/dandi-feature-docs:feature-test`.

## Uninstall

```
/plugin uninstall dandi-refactor@dandi
```

No hooks to remove. `docs/refactor/` reports stay.

## Already installed via the Dandi drop-in docs?

If `refactor` also exists in `~/.claude/skills/` (copied by `03_확장기능-설치-체크리스트.md` §8), both copies show up and both are candidates for automatic invocation. Keep one.

## Language

Skill instructions are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
