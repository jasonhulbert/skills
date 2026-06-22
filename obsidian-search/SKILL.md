---
name: obsidian-search
description: "Use for read-only Obsidian vault exploration through the `obsidian` MCP server first: full-text search, files, folders, metadata, outlines, word counts, backlinks, outgoing links, unresolved links, orphans, dead ends, aliases, tasks, tags, and daily reads. Fall back to the Obsidian CLI only when MCP is unavailable, not registered, or cannot express the needed read-only workflow."
---

# Obsidian Search

Prefer the `obsidian` MCP server first. Use this skill only when the MCP server is unavailable, not registered in the current session, or cannot express the needed fallback.

Use MCP read tools for search, files, folders, outlines, word counts, link graph, aliases, tasks, tags, and daily reads. Relevant MCP resources:

- `obsidian://guidance/read-only-workflows`
- `obsidian://guidance/cli-safety`
- `obsidian://guidance/error-recovery`

When fallback is needed, use the `obsidian` CLI for read-only vault exploration: search, structure, metadata, outlines, word counts, and link graph analysis.

Use `obsidian-cli` for shared syntax, vault targeting, and command discovery.

## Rules

- Prefer read-only CLI commands before filesystem access.
- Prefer `search:context` when the user needs evidence, snippets, or matching lines.
- Use `path=` to scope searches to a folder when the target area is known.
- Use `format=json` when results need structured parsing.
- If regex is required, first get the vault path with `obsidian vault info=path`, then use read-only filesystem search such as `rg`.

## Search

```bash
obsidian search:context query="deadline"
obsidian search:context query="deadline" path="work/" limit=5
obsidian search:context query="API" case format=json
obsidian search query="TODO" total
obsidian search:open query="meeting notes"
```

- `search:context` returns matching line context.
- `search` is cheaper when filenames or counts are enough.
- `search:open` opens the Obsidian search UI.

## Vault, Files, And Folders

```bash
obsidian vault
obsidian vault info=name
obsidian vault info=path
obsidian vault info=files
obsidian vaults verbose

obsidian files
obsidian files folder="Projects" ext=md
obsidian files folder="Archive" total

obsidian folders
obsidian folders folder="Projects"
obsidian folders total

obsidian file path="folder/note.md"
obsidian folder path="Projects" info=files
```

- `file` returns note metadata such as size, modified time, word count, and tag count.
- `folder` requires `path=`.

## Outline And Word Count

```bash
obsidian outline path="folder/note.md"
obsidian outline path="folder/note.md" format=md
obsidian outline path="folder/note.md" format=json
obsidian outline path="folder/note.md" total

obsidian wordcount path="folder/note.md"
obsidian wordcount path="folder/note.md" words
obsidian wordcount path="folder/note.md" characters
```

## Link Graph

```bash
obsidian backlinks path="folder/note.md"
obsidian backlinks path="folder/note.md" counts
obsidian backlinks path="folder/note.md" total format=json

obsidian links path="folder/note.md"
obsidian links path="folder/note.md" total

obsidian orphans
obsidian orphans total all

obsidian deadends
obsidian deadends total

obsidian unresolved
obsidian unresolved counts verbose format=json

obsidian aliases
obsidian aliases path="folder/note.md"
obsidian aliases verbose active
```

- Use `orphans` and `deadends` to identify disconnected notes.
- Use `unresolved` to find broken wikilinks.
- Use `backlinks` for concept exploration when a canonical note exists.

## When To Use Other Skills

- For note writes, properties, templates, moves, or deletes: use `obsidian-notes`.
- For daily-note content: use `obsidian-daily`.
- For tags and Markdown tasks: use `obsidian-tasks-tags`.
