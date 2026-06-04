---
name: obsidian-daily
description: "Use for today's Obsidian daily note: open, locate path, read, append, prepend, or add journal, standup, daily log, or today-scoped content via the `obsidian` CLI."
---

# Obsidian Daily

Use the `obsidian` CLI for today's daily note. Daily commands respect the vault's configured daily-note folder, filename format, and template.

Use `obsidian-cli` for shared syntax, vault targeting, and content-escaping rules. Use `obsidian-formatting` when deciding what markdown elements to author into the daily note (callouts for highlights, foldable callouts to keep the note tidy, tables for standups, etc.).

## Rules

- Daily commands target today's note according to the vault configuration.
- Use `daily:path` when another command needs the note path.
- For tasks in the daily note, use `obsidian-tasks-tags`.
- If the user refers to another date, do not assume daily commands can target it; resolve the note path from vault conventions or ask.

## Commands

```bash
obsidian daily
obsidian daily paneType=tab

obsidian daily:path
obsidian daily:read

obsidian daily:append content="- standup item"
obsidian daily:append content="inline fragment" inline
obsidian daily:append content="..." open paneType=tab

obsidian daily:prepend content="# Today's Focus"
obsidian daily:prepend content="..." inline open paneType=split
```

## Common Workflows

- Read today's note: `obsidian daily:read`
- Add a new item to the bottom: `obsidian daily:append content="..."`
- Add priority content to the top: `obsidian daily:prepend content="..."`
- Get today's path for another command: `obsidian daily:path`
- Open today's note in Obsidian: `obsidian daily`

## Task Workflows

Use:

```bash
obsidian tasks daily
obsidian tasks daily verbose
obsidian task daily line=<n> done
```

Use `tasks daily verbose` first when you need the line number for a specific task.
