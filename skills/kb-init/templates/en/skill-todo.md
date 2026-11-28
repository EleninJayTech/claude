---
name: {{NAME_TODO}}
description: List, add and change todos
argument-hint: "[none | state name | add <text> | done <keyword>]"
---

Work on `{{TODO_FILE}}` in the target folder. The line format and states are defined in "Todos" in the root `CLAUDE.md`.

| `$ARGUMENTS` | What to do |
| --- | --- |
| (none) | Show `todo`, `doing` and `hold` grouped by state. Leave `done` out and add only its count in one line |
| one state name | Show only that state |
| `add <text>` | Add a new line. State `[todo]`, added date today. If the text has a due date or project, put them in fields |
| `done <keyword>` | Change the brackets of the line found by the keyword to `[done]`. **If several lines match, let the user pick** |
| `hold <keyword>` / `doing <keyword>` | Change only the state the same way |
| anything else | Ask what the user wants |

- Collect items whose due date has passed at the end of the list under **"Overdue"**.
- When changing a state, **replace only the word inside the brackets.** Do not delete and rewrite the line. Update the frontmatter `updated` to today as well.
- When `[done]` passes 20 lines, ask whether to move them to `{{ARCHIVE_DIR}}/done-YYYY.md`.
