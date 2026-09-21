# dandi-kr-ui-guide

UI/UX, icon, color, typography, spacing, motion and design-token guidelines for web, app and game products aimed at Korean users — distilled from benchmarking research on Korean services.

## Install

```
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-kr-ui-guide@dandi
```

Third-party marketplaces don't auto-update by default — enable it in `/plugin` → Marketplaces, or run `/plugin marketplace update dandi`.

## Skills

| Command | What it does | Arguments |
|---|---|---|
| `/dandi-kr-ui-guide:kr-ui-guide` | Loads the required rules (contrast, touch targets, labels, free-to-use fonts, …) plus the references for the task at hand, proposes a design, and self-checks the result | — |

Claude also invokes it automatically when you design screens, pick icons or colors, or write design tokens for Korean users.

## Requirements

None.

## Font licenses

If your `CLAUDE.md` has no `## 폰트 라이선스 정책` (font license policy) section, the skill uses free-to-use fonts only.

## Uninstall

```
/plugin uninstall dandi-kr-ui-guide@dandi
```

## Already installed via the Dandi drop-in docs?

If `kr-ui-guide` also exists in `~/.claude/skills/` (or this project’s `.claude/skills/`) (copied by `03_확장기능-설치-체크리스트.md` §9), both copies show up and both are candidates for automatic invocation. Keep one.

## Language

Skill instructions and references are written in Korean. Claude follows them the same way whatever language you chat in.

## License

MIT — see `LICENSE`.
