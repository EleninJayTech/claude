# Dandi — Claude Code Setup Documents

> **English** · [한국어](README.ko.md)

> **Dandi** (단디) is a Korean dialect word for *"properly, without gaps."* That is the whole promise of these documents: detect → install → verify — and always a way back.

> **Claude Code** is Anthropic's tool that writes and runs code on your own machine while you just talk to it.
> The Dandi documents are **an instruction manual that executes itself** — they configure Claude Code for your machine and your project.
> Think of furniture instructions that also assemble the furniture: drop a file in, say one sentence, and setup is done.

## Share links (copy these when introducing Dandi)

| Page | URL |
| --- | --- |
| ▶️ **Intro video** — YouTube-style; screen-record it and you have a video | https://eleninjaytech.github.io/claude/pages/intro.html |
| 🎬 **Install walkthrough** — an interactive terminal replay that plays like a film | https://eleninjaytech.github.io/claude/pages/demo.html |
| 🧭 **Install options dictionary** — every choice the installer asks, explained for beginners | https://eleninjaytech.github.io/claude/pages/options.html |
| 🎓 **Install options course** — an interactive course where you click through the choices yourself | https://eleninjaytech.github.io/claude/pages/learn.html |
| 🧰 **Skill catalog** — every skill the documents install, explained for a first-week developer | https://eleninjaytech.github.io/claude/pages/skills.html |
| 🖥️ **Windows terminal intro** — why and what of a Claude Code terminal setup whose sessions outlive the window (introduction; installation is the separate [`terminal-setup.md`](terminal-setup.md)) | https://eleninjaytech.github.io/claude/pages/terminal.html |
| 📝 **Latest release notes** — what changed in the newest release | https://github.com/EleninJayTech/claude/releases/latest |
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
- **A first install suggests "minimal"** — security locks, the work log and the resume/wrap commands. You don't need to know up front what else you will want: in a folder you have set up, when your work starts needing more (adding tests or CI, starting front-end work and so on), Claude suggests the matching item in one line — once the current task is done, or when you start a session with `/resume` — and installs only what you accept. You can also ask at any time with `/dropin-apply 추천`. A suggestion you decline is not repeated.
- **Would you rather install everything that fits right away? Pick "recommended"** and the installer inspects your project and checks the fitting combination for you. You can add purpose **bundles** (design, stronger verification, unattended automation and more) on top — "minimal + design", for example.

<details><summary>More</summary>

- **If something is already installed**, you are asked whether to **keep / reconcile / replace** it first. Nothing is overwritten silently. Run 00 again later (or `/dropin-apply`, once 01 is installed) and it asks both what to **add** and what to **remove** — removing takes out only what the install created; for the work logs you have built up it asks first, and the default is to keep them.
- **To update every project on this PC at once**, open `claude` in a clone of this repository and run `/dropin-rollout`. It gathers the questions for one approval, applies the update in a separate workspace made from each project's default branch, and commits to a work branch. Folders you are working in stay untouched and merging is up to you. Items you did not answer are reported and left alone, and `/dropin-rollout 점검` shows the table without changing anything. Some of its paths have not been exercised in real runs yet, so review each branch before merging.
- **On a PC you have already set up**, installing into a **new project** starts with a **quick path** — This PC's defaults / Same as another project / Recommended mode / One by one — that answers the common questions (mode, bundles, operating profile and so on) in one go. The values it carries over are shown for you to confirm, and safety questions (overwriting, company policy) still appear. With This PC's defaults, the usage pattern question is still asked, because that answer belongs to each project.
- **Teams and multi-repository setups are supported.** Teammates who install from different places (a parent folder vs. an individual repository) do not collide, and a personal folder holding company repositories is checked **per repository**. Settings shared with the team (committed) and settings that stay yours are also asked about separately. The first time you install into a repository that already holds a Claude setup your team has committed, you are asked **Team setup first / Decide item by item** (re-runs show your earlier answer to confirm); with Team setup first (recommended) the team's files are not edited — an item that would have to edit a team file is skipped and not suggested again unless you switch to item by item, and an item that only adds new files is flagged as needing the team's agreement before you commit it. The one exception is the single install-record line in the repository's `CLAUDE.md`, which stays uncommitted until the team agrees. In a company repository you are also asked about company-deployed managed settings; items they block are not installed, and you are told why. If you answer "not sure" when asked whether it is a company repository, it is treated as one, and items that need company approval (external tool connections, browser checks and so on) still go through their approval questions.
- **If your site uploads the working folder straight to the live server** (common with PHP and static sites), the files the installer creates — `CLAUDE.md`, `.claude/`, the work logs in `docs/` — become readable by URL. When the installer sees the signs (a front-page file like `index.php`/`index.html` or a server config like `.htaccess` in that folder), it warns you in the install report and the commit guidance, with three ways to close it (leave them out of the live deploy / block those paths on the server / keep them uncommitted, local only) and a check (after deploying, `https://<your domain>/CLAUDE.md` should return 404 or 403). The choice and any server settings are yours — the installer does not write server configuration. Review and test servers are not affected.
- **On the Pro plan (lower usage allowance)**, choose the **thrift** operating profile during install — quality-critical moments (hard judgment calls, final review) stay untouched while everyday consumption drops. There is **one thing you do yourself** after install: start everyday work with `/model sonnet` (the choice sticks), and open a **fresh session** on the higher model — for example `claude --model opus` — for quality-critical work such as reviews. On a larger plan or pay-per-use, answer the same question with **standard** (the default), **ample** or **metered** instead.
- **If you run many agents at once or unattended**, tick **parallel**, **role team** or **unattended** at the "usage pattern" question (per project, several allowed; tick none for one conversation at a time) — the matching items come pre-checked or suggested, and if a document that suits the pattern was not picked this time, adding it is suggested too (for unattended, scheduled routines and the automatic checks, for example). To change either answer later, run `/dropin-pick profile`: nothing new is installed; it shows what would change in your current setup and what becomes suggested, and changes only what you approve.
- Every question and checkbox the installer shows is documented item by item in the [**install options dictionary**](pages/options.html). To learn it from the ground up, take the [**install options course**](pages/learn.html) — you click through a simulator as you go.
- Hit a term you don't know? Just ask Claude to "explain it simply".

</details>


## Skills as plugins

The skills the installer copies (feature docs, refactor, kr-ui-guide, kr-ui-styles, browser-check, pc-clean, session-board, ops-kit, win-setup, kb-init, kb-dashboard, agent-guard, agent-tune, tool-tune) are also published as Claude Code plugins in the **`dandi`** marketplace:

```text
/plugin marketplace add EleninJayTech/claude
/plugin install dandi-feature-docs@dandi      # also: dandi-refactor@dandi, dandi-kr-ui-guide@dandi, dandi-browser-check@dandi, dandi-pc-clean@dandi, dandi-session-board@dandi, dandi-ops-kit@dandi, dandi-win-setup@dandi, dandi-kb-dashboard@dandi, dandi-agent-guard@dandi, dandi-agent-tune@dandi, dandi-tool-tune@dandi
```

- `dandi-kr-ui-guide` carries kr-ui-styles too, and `dandi-kb-dashboard` carries kb-init too, so there is no separate plugin for either.
- `dandi-session-board` and `dandi-agent-guard` each turn on the hooks they need with the one plugin, and the hooks go away together when you uninstall it.
- Plugin skills are called with the plugin name in front — `/dandi-feature-docs:feature-test`.
- **Use one route per skill** — either the drop-in install or the plugin. Both at once shows every skill twice. If the installer finds the plugin already turned on, it asks whether to keep the plugin (skipping the copy) or replace it with the copy.
- Third-party marketplaces don't auto-update by default; turn it on in `/plugin` → Marketplaces, or fetch a revision with `/plugin marketplace update dandi` (refreshes the listing only) and then `claude plugin update <plugin>@dandi`.
- License: MIT.
- Which channel each teammate used isn't tracked by these documents (drop-in installs are recorded, plugin installs aren't) — check locally with `claude plugin list`.

## What the documents do

| Document | What it does |
| --- | --- |
| [`00_통합-설치.md`](00_통합-설치.md) | **The entry point.** Pick an install mode (minimal/recommended/full/custom) and bundles; it installs only the matching subset below |
| [`01_Claude-Code-통합구성-범용마스터.md`](01_Claude-Code-통합구성-범용마스터.md) | **Memory and safety.** AI forgets everything when the chat closes, so this builds a work-log system that lets you **resume tomorrow where you stopped today**, and locks passwords and key files away from the AI. Ships the setup check (`/dropin-check`), doc refresh (`/dropin-update`), re-apply (`/dropin-apply`) all-in-order (`/dropin-sync`) and install-only-this-kind (`/dropin-pick` — config only, MCP only, plugins only and so on) commands too, plus `/scope` — declare once what the session is for and Claude stops after that task, its side-effect fixes, verification and required records, listing anything else it noticed instead of fixing it (manual, guidance rather than a hard block) |
| [`02_모델분담-범용-플레이북.md`](02_모델분담-범용-플레이북.md) | **Splitting the work across models.** Hard judgment goes to the smart (expensive) model, routine work to the fast (cheap) one — a small AI team that keeps quality and cuts the bill |
| [`03_확장기능-설치-체크리스트.md`](03_확장기능-설치-체크리스트.md) | **A menu of add-ons** — status line, design, browser checks, feature docs, refactoring, PC cleanup, parallel sessions, operations — install only the ones you need (full list below the table). |
| [`04_검증-자동화.md`](04_검증-자동화.md) | **The automatic inspector.** Checkers run every time the AI edits code, and again before code is merged — you get **proof the checks passed** instead of the AI saying "done" |
| [`05_출력스타일.md`](05_출력스타일.md) | **Changing tone and role.** Answers the way you want them — explanation-first, diagram-first, learning mode. Build your own style and you are also asked whether to keep Claude Code's built-in coding instructions — keep them if you will still write code with that style. You are also asked whether to switch the new style on now |
| [`06_루틴-자동화.md`](06_루틴-자동화.md) | **Scheduled runs.** Work happens in the cloud at set times even while your machine is off (nightly code review, weekly doc checks) — Pro plan or above and a GitHub repository, and with approval at companies |
| [`terminal-setup.md`](terminal-setup.md) | **Not an installer item — a standalone document.** Claude Code reads it, diagnoses your Windows PC read-only, then sets up the terminal configuration (psmux · yazi · zoxide · eza · lazygit · Windows Terminal) item by item with your approval. Intro: [terminal page](pages/terminal.html) |
| [`index.html`](index.html) | **The human-facing guide** (GitHub Pages landing) — [view on the web](https://eleninjaytech.github.io/claude/) |
| [`pages/`](pages/) | The rest of the human-facing pages — [intro](pages/intro.html) · [walkthrough](pages/demo.html) · [options dictionary](pages/options.html) · [options course](pages/learn.html) · [skill catalog](pages/skills.html) · [terminal intro](pages/terminal.html) |
| [`skills/`](skills/) | The skill files document 03 installs (feature docs, refactor, kr-ui-guide and the rest) — the installer copies them from here on its own |
| [`global-config/skills/`](global-config/skills/) | The commands document 01 installs alongside `/resume` and `/wrap` — `/dropin-apply`, `/dropin-check`, `/dropin-update`, `/dropin-sync`, `/dropin-pick`, `/scope` |
| [`plugins/`](plugins/) | The `dandi` plugin marketplace (see [Skills as plugins](#skills-as-plugins)) — built from `skills/`, with the marketplace list in `.claude-plugin/` |
| [`.claude/skills/dropin-rollout/`](.claude/skills/dropin-rollout/) | `/dropin-rollout` — available when you open `claude` in a clone of this repository, to update every project on this PC at once |

<details><summary>03 add-ons — full list</summary>

**Convenience add-ons.** Live usage meter (claude-hud) · animated graphics techniques (svg-design) · UI that doesn't look AI-generated (frontend-design) · external tool connections (MCP) · letting the AI open and check the screens it built — in a background browser that leaves yours alone by default (it needs Node.js; without Node it starts unchecked), plus your own Chrome only when your real sign-in is needed and an optional debugging tool, both off by default (browser verification) · per-feature specs with tests, commit guard and release notes (feature-doc skill set) · behaviour-preserving code cleanup with side-effect verification (refactor) · UI/UX, icon and colour guidance for Korean-audience web, app and game screens, from research on Korean services (kr-ui-guide) · style packs that swap kr-ui-guide's restrained default look for another direction such as editorial monochrome or dark neon, picked per project, asked with kr-ui-guide and off by default (kr-ui-styles) · Windows only: a read-only check of why the PC got slow, then cleanup of only the items you approve (pc-clean) · product rules found during development (status changes, permissions, amount calculations and the like) recorded in the project for the AI and checked first whenever that code comes up, off by default (policy notes) · a board that tells each Claude session about other sessions in the same folder and the files they edited, Node.js 18 or later, off by default (session-board) · a one-line note for each feature added, changed or removed after install (file path and date; for a removal, the reason) that the AI checks first on related work, off by default (feature change log) · Flutter projects only: the AI reads, taps and captures the screens of your app while it runs in debug mode, using Marionette — by default through a development-only package and a separate start file so the real entry point is untouched, suggested when Flutter is detected (also as the app screen check bundle) but off by default (Flutter app screen check) · for a project you deploy: checks what it needs first, then makes only the pieces you pick — deploy and operations runbooks, an admin-site hub with a read-only map of the project's records (what exists where, how many, last updated), an `/admin` dashboard, health checks and alerts, a backup-restore rehearsal, free-tier limit and cost watching — and keeps them up to date; it never deploys or enters secrets itself, suggested when deploy settings are detected (also as the operations bundle) but off by default (ops-kit) · read Claude's code changes in the terminal file by file and hunk by hunk without opening an IDE, keeping the good edits and discarding the wrong ones before you commit — installs lazygit, delta and difftastic on this PC and sets lazygit up so the `|` key cycles between them; installed once for the whole PC, off by default (diff review tools) · Windows only: checks the PC for Claude Code in the terminal without changing anything — PowerShell 7 as the terminal default, a broken user PATH, Developer Mode, long paths, sudo, Claude's shell, jq, fd and gh — then fixes only the items you approve, backing up first; you run it yourself with `/win-setup`, off by default (win-setup) · for a repository of Markdown notes that Claude files and searches for you — makes one in an empty folder (rules, folders, a to-do file, four commands and the dashboard settings; never overwrites a file, never creates a remote) and shows its to-dos, published artifact links, tips and records on one local HTML page — view only, built outside the repository, needs Node.js 18+; you run them yourself with `/kb-init` and `/kb-dashboard`, off by default (knowledge base set: kb-init · kb-dashboard) · limits how many helper AIs (subagents) run at once to what this PC can take — set from its cores and memory, rechecked against free memory and CPU at each launch; a launch over the limit waits until an earlier one finishes, and one per session is always allowed; plugin or copy, installed for the whole PC, needs Node.js 18 or later, off by default (agent-guard) · proposes a model and effort level for each subagent in a project from the job it does — asking only what the files can't tell (how often it runs, recent problems and their cause) — and edits only those two settings of the agents you approve; values come from the official docs on the day it runs, and the new and previous values are recorded in `docs/` so re-applying the model split (02) keeps them, with `점검` to compare and `되돌리기` to restore; you run it yourself with `/agent-tune`, suggested for the role team usage pattern, off by default (agent-tune) · checks the tools Claude works with on this PC (MCP servers, plugins, global command-line tools, and winget or Homebrew packages on Windows and macOS) against that day's official latest and shows only those that differ, suggests a better tool for the same job to install alongside — never one Dandi's own comparison turned down — and changes only what you approve, never removing the tool you had; each previous version and the command to go back are recorded, with `점검` to only check and `되돌리기` to roll back; you run it yourself with `/tool-tune`, off by default (tool-tune). Pick either design skill and you are also asked for a **font licence policy** — freely usable fonts only, the terms first and you decide, or leave it out — which is written into the setup

</details>

## Principles behind Dandi

- **Output quality comes first.** Saving on AI usage (tokens) is second — but where more depth would not buy better work, the cheaper option is simply the right one, not a compromise. A faster way to the same quality becomes the default only when it costs barely any more; if it multiplies the cost, it is offered as an option only.
- **Checked, not remembered.** Every technical claim records the date it was verified against Anthropic's official documentation, and is re-checked every six months.
- **Same behavior everywhere.** Nothing that only works in one project or on one machine goes in. The documents detect your environment first, then generate.
- **Always a way back.** No install step ships without its removal step — a setup you cannot undo never gave you a choice. Existing configuration is never overwritten silently; you are asked to keep, rebuild, or replace.
- **What you received is enough.** Someone who has only this public repository gets the same result as someone with the full development history.
- **The work survives the session.** What was done and why is written to files, so the next session picks up from the record instead of from memory.
- **A beginner can get there alone.** Every choice you meet during setup is explained at beginner level, in English and Korean.

**What Dandi is not** — not code (documents only; no build, no tests), not a replacement or wrapper for Claude Code (it decides how to combine the official features and defers to the official docs where they are authoritative), and not an install-everything bundle (you pick what you need).

---

## ☕ Support

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/eleninjaytech)

If these documents helped you, a coffee is always appreciated 😊

---

<!-- pages-sync-updated: 2026-11-28 -->
