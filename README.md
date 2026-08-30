# Claude Code Setup Documents

> **English** · [한국어](README.ko.md)

> **Claude Code** is Anthropic's tool that writes and runs code on your own machine while you just talk to it.
> The documents in this repository are **an instruction manual that executes itself** — they configure Claude Code for your machine and your project.
> Think of furniture instructions that also assemble the furniture: drop a file in, say one sentence, and setup is done.

## Share links (copy these when introducing the repo)

| Page | URL |
| --- | --- |
| ▶️ **1-minute intro** — YouTube-style; screen-record it and you have a video | https://eleninjaytech.github.io/claude/pages/intro.html |
| 🎬 **Install walkthrough** — an interactive terminal replay that plays like a film | https://eleninjaytech.github.io/claude/pages/demo.html |
| 🧭 **Install options dictionary** — every choice the installer asks, explained for beginners | https://eleninjaytech.github.io/claude/pages/options.html |
| 🎓 **Install options course** — an interactive course where you click through the choices yourself | https://eleninjaytech.github.io/claude/pages/learn.html |
| 📖 **How to use** — start here; no development background needed | https://eleninjaytech.github.io/claude/ |

## How to use it (three lines)

```text
1. Copy 00_통합-설치.md into your working folder
2. Open Claude Code and say:
   "Read 00_통합-설치.md and apply it to this project"
   (for a whole-machine setup: "... apply it to this PC")
3. Pick an install mode — minimal / recommended / full, and you're done
   (choose "custom" if you want to pick every item yourself)
```

- **You only need to copy `00`.** Claude fetches the rest from this repository on its own.
- **The documents are written in Korean, and that is fine** — Claude reads and executes them the same way in any language. During install you are asked which language the *generated files* should use, so an English answer gives you an English `CLAUDE.md`, English work logs, and English commit messages.
- **Pick "recommended"** and the installer inspects your project and checks the fitting combination for you. You can add purpose **bundles** (design, stronger verification, unattended automation) on top — "minimal + design", for example.
- **If something is already installed**, you are asked whether to **keep / reconcile / replace** it first. Nothing is overwritten silently.
- **Teams and multi-repository setups are supported.** Teammates who install from different places (a parent folder vs. an individual repository) do not collide, and a personal folder holding company repositories is checked **per repository**. Settings shared with the team (committed) and settings that stay yours are also asked about separately.
- **On the Pro plan (lower usage allowance)**, choose the **thrift** operating profile during install — quality-critical moments (hard judgment calls, final review) stay untouched while everyday consumption drops.
- Every question and checkbox the installer shows is documented item by item in the [**install options dictionary**](pages/options.html). To learn it from the ground up, take the [**install options course**](pages/learn.html) — you click through a simulator as you go.
- Hit a term you don't know? Just ask Claude to "explain it simply".

## What the seven documents do

| Document | What it does |
| --- | --- |
| [`00_통합-설치.md`](00_통합-설치.md) | **The entry point.** Pick an install mode (minimal/recommended/full/custom) and bundles; it installs only the matching subset below |
| [`01_Claude-Code-통합구성-범용마스터.md`](01_Claude-Code-통합구성-범용마스터.md) | **Memory and safety.** AI forgets everything when the chat closes, so this builds a work-log system that lets you **resume tomorrow where you stopped today**, and locks passwords and key files away from the AI. Ships the setup check (`/dropin-check`) and doc refresh (`/dropin-update`) commands too |
| [`02_모델분담-범용-플레이북.md`](02_모델분담-범용-플레이북.md) | **Splitting the work across models.** Hard judgment goes to the smart (expensive) model, routine work to the fast (cheap) one — a small AI team that keeps quality and cuts the bill |
| [`03_확장기능-설치-체크리스트.md`](03_확장기능-설치-체크리스트.md) | **Convenience add-ons.** Live usage meter (claude-hud) · animated graphics techniques (svg-design) · UI that doesn't look AI-generated (frontend-design) · external tool connections (MCP) · letting the AI open and check the screens it built (browser verification) |
| [`04_검증-자동화.md`](04_검증-자동화.md) | **The automatic inspector.** Checkers run every time the AI edits code, and again before code is merged — you get **proof the checks passed** instead of the AI saying "done" |
| [`05_출력스타일.md`](05_출력스타일.md) | **Changing tone and role.** Answers the way you want them — explanation-first, diagram-first, learning mode. Coding ability stays; only the style changes |
| [`06_루틴-자동화.md`](06_루틴-자동화.md) | **Scheduled runs.** Work happens in the cloud at set times even while your machine is off (nightly code review, weekly doc checks) — Pro plan or above, and with approval at companies |
| [`index.html`](index.html) | **The human-facing guide** (GitHub Pages landing) — [view on the web](https://eleninjaytech.github.io/claude/) |
| [`pages/`](pages/) | The rest of the human-facing pages — [intro](pages/intro.html) · [walkthrough](pages/demo.html) · [options dictionary](pages/options.html) · [options course](pages/learn.html) |

## Principles behind this repository

- **Output quality comes first.** Saving on AI usage (tokens) is second, and only within what quality allows.
- **Checked, not remembered.** Every technical claim records the date it was verified against Anthropic's official documentation, and is re-checked every six months.
- **Same behavior everywhere.** Nothing that only works in one project or on one machine goes in.

---

## ☕ Support

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/eleninjaytech)

If these documents helped you, a coffee is always appreciated 😊

---
