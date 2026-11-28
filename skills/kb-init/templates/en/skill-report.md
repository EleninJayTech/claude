---
name: {{NAME_REPORT}}
description: Collect records into an md or html output
argument-hint: "<topic> [md|html]"
---

Build an output on the topic `$ARGUMENTS`.

1. Collect related records with the "Search protocol" in the root `CLAUDE.md`. **If there are none, do not build anything — report that there are none.**
2. If no format was given, ask whether it should be md or html.
3. Save it as `{{P}}{{OUT_DIR}}/<YYYY-MM-DD>-<topic>.<extension>`.
4. Give the paths of the files you used in the reply.

## Writing rules
- Do not fill in anything that is not in the records. Mark gaps as `no record`.
- For html, **do not reference external CDNs or web fonts** — it must open locally with a double-click.
  Put styles and scripts inside the file.
- Prefer tables and lists; avoid long prose paragraphs.
