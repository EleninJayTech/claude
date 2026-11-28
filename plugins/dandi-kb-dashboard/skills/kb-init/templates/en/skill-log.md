---
name: {{NAME_LOG}}
description: Classify what the user hands over and store it in the knowledge base
argument-hint: "<text to record>"
---

Store `$ARGUMENTS`. If the argument is empty, use **the conversation just before** as the input.

Follow the "Recording protocol" in the root `CLAUDE.md` exactly — the rules live there.

- Decide the type → **search for an existing file** → add to it or create one → rewrite following "Writing principles" → report the path in one line.
- If the type is unclear, **ask first** instead of saving.
- Do not repeat the saved text in the reply.
- If several types arrive at once, **store them separately by type** and report every path.
