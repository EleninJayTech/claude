---
name: {{NAME_FIND}}
description: Search the stored records and answer
argument-hint: "<question>"
---

Answer `$ARGUMENTS` **from the stored records only.**

Follow the "Search protocol" in the root `CLAUDE.md` exactly — the rules live there.

- Glob (file names) → Grep (`tags` and text) → read the candidates → answer.
- **Always give the paths of the files you used.**
- If nothing is found, **answer "no record".** Do not fill the gap from general knowledge.
  Add one line: "Tell me and I will record it."
- If a record you found is old (`updated` more than a year ago), say so.
