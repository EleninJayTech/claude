# {{TITLE}}

A knowledge base you use through Claude Code.

Hand over information and Claude classifies and stores it; ask and it finds the answer.
Nobody is expected to open the files and read them — **you ask and get answers.**

> **The rules live in `CLAUDE.md`.** Classification, recording and search steps are all there,
> and it is the file Claude reads automatically at the start of a session. This README is for people.

## How to use

Run `claude` in this folder and use the commands below.

| Command | What |
| --- | --- |
| `{{CMD_LOG}} <text>` | Classify and store what you hand over |
| `{{CMD_FIND}} <question>` | Answer from the stored records |
<!--if:todo-->
| `{{CMD_TODO}}` | List, add and change todos |
<!--endif-->
| `{{CMD_REPORT}} <topic>` | Collect related records into an md or html output |
| `{{CMD_DASH}}` | See every record on one local HTML page (when the Dandi `kb-dashboard` skill is installed) |

You can also just talk: "record this", "how did I do that again".

## Folders

| Path | What |
| --- | --- |
| `CLAUDE.md` | **The rules** — classification, recording and search steps, writing principles |
| `.claude/skills/` | The commands above |
| `.claude/kb-dashboard.json` | Dashboard config — update it when you change the classification table |

Layout of the record folder ({{P_LABEL}}):

```text
{{FOLDER_TREE}}
```

<!--if:many-->
## Using it on several PCs

To keep only one side's records on a PC, clone with sparse-checkout.

```bash
git clone --filter=blob:none --sparse <remote URL>
cd <folder>
{{SPARSE_LINES}}
```

Root **files** (`README.md`, `CLAUDE.md`, `.gitignore`) are always checked out, whatever the setting.
**Leave out `.claude/` and the commands never arrive — they silently stop working.**
To get everything, run `git sparse-checkout disable`.

<!--endif-->
## Per-PC settings

Values that differ per PC — paths, accounts, tool names — go in `CLAUDE.local.md`. It is never committed.
Copy `CLAUDE.local.md.example` to `CLAUDE.local.md` in the same folder and fill it in.

> **Do not write passwords or tokens in `CLAUDE.local.md` either.** Write only where they are managed.
