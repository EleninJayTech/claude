# CLAUDE.md — {{TITLE}}

A knowledge base: Claude classifies and stores what the user hands over, and searches it to answer when asked.
Nobody is expected to open these files and read them — the user asks and gets answers.

## Where to run and where to store
<!--if:multi-->
- Run from the repository root by default.
- Storage folders: {{TARGET_LIST}}. Decide by what is checked out — if only one is present, use that one.
<!--endif-->
<!--if:many-->
- If more than one is present, **ask which one.** Do not guess.
<!--endif-->
<!--if:!multi-->
- Run from the repository root and store records in the type folders under the root.
<!--endif-->

## Classification (this table is the source of truth for the types in use)

| type | what | where | file name | example |
| --- | --- | --- | --- | --- |
{{TYPE_TABLE}}

- **If the type is unclear, ask.** Do not drop it into `{{REF}}` on your own.
<!--if:shared-->
- Things every target shares go in {{SHARED_DIRS}}.
<!--endif-->

### Changing types (they can grow or shrink)

Types change as records pile up. But **the only way to change them is to edit the table above.**

- A type that is not in the table **does not exist.** Do not create new folders ad hoc.
- Add, remove or rename a type **only after the user approves**, by editing the table.
- **When Claude should propose a change first**
  1. Three or more documents of the same kind have piled up in `{{REF}}/` → propose splitting them into a new type
  2. A type has stayed empty for a long time → propose removing it and folding it into `{{REF}}`
  3. The user keeps handing over the same kind of thing and no type fits → propose one on the spot
- When proposing, report **how many files would have to move.**
- Changing a type means **moving the folder and fixing each file's frontmatter `type:` together.**
  There is no index, so these two are all the type information there is — **fix only one and search breaks.**
- After editing the table, **also update `types` in `.claude/kb-dashboard.json`.** The dashboard (`{{CMD_DASH}}`) reads only that file — otherwise records of a new type drop out of the page as "format warnings".

## Frontmatter — required in every record file

```yaml
---
type: {{REF}}
project: blog-redesign    # related project; omit if none
tags: [search, words]     # words you would search for; one-line array
created: {{TODAY}}
updated: {{TODAY}}
---
```

There is no index file in this repository. **Search works only on file names and this frontmatter.**
A document with empty `tags` is practically unfindable.

## Recording protocol (when the user hands over information)

1. **Decide the type** (one from the table above).
2. **First look for an existing file on the same subject** — Glob for file names, Grep for `tags` and text.
   Creating a new file without looking scatters one subject across files and breaks search.
3. If one exists, **add to that file** and update `updated`. Otherwise create a new one.
4. Do not paste the original as is — **rewrite it following "Writing principles" below.**
5. After saving, **report only the path, in one line.** Do not repeat what you saved.

## Search protocol (when the user asks)

1. Glob for file names → 2. Grep for `tags` and text → 3. Read the candidate files and answer.
4. **If nothing is found, answer "no record".** Do not make up an answer from general knowledge.
5. Give the paths of the files you based the answer on.

<!--if:todo-->
## Todos

Write **one item per line** in `{{P}}{{TODO_FILE}}`.

```text
- [doing] Draft the blog post — project:blog-redesign · due:2026-01-20 · added:2026-01-15
```

- There are only four states: `todo` `doing` `hold` `done`. To change a state, **replace only the word inside the brackets.**
- Query with something like `grep "\[doing\]"`.
- When `[done]` passes 20 lines, move them to `{{P}}{{ARCHIVE_DIR}}/done-YYYY.md`.
- If an item needs a longer explanation, make it a record file and keep one line plus the file path in the todo file.

<!--endif-->
## Writing principles — the reader is Claude, not a person

The user does not read these files directly. They ask and get answers. So write **for search and recombination.**

- **Absolute dates.** `2026-01-15`. Never "last week" or "yesterday" — read later, the reference point is gone.
- **Repeat proper nouns instead of pronouns.** No "it" or "that one" — they never match a search.
- **Each file stands on its own.** If another document is needed, write its path.
- **Keep facts and judgments apart.** Give each judgment a one-line reason.
- Steps as numbered lists, conditions and branches as tables. No long prose.
- Mark what is unconfirmed or guessed as such. Do not mix it with confirmed facts.
- No decoration for humans (greetings, summary intros, emoji).

## Secrets
- Never write passwords, tokens or certificates **in any file.** Record only where they are managed.
- Do not put confidential originals (contracts, customer data, personal data) in the repository. Record only their location.
- A private repository limits access; it is not protection against leaks.

## Per-PC settings
- Values that differ per PC — paths, accounts, tool names — are read from `CLAUDE.local.md` (example: `CLAUDE.local.md.example`).
- Never commit it. If a value is needed and missing, **ask instead of guessing.**

## Scope
- **Do not look into other repositories or folders unless asked.**
