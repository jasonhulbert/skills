---
name: obsidian-tasks-tags
description: "Use for Obsidian tags and Markdown checkbox tasks: list tags, inspect tag usage, list tasks, or update/toggle task status with the `obsidian` CLI."
---

# Obsidian Tasks And Tags

Use the `obsidian` CLI for tag discovery and Markdown checkbox task management.

Use `obsidian-cli` for shared syntax and vault targeting. Tags are passed without the `#` prefix.

## Rules

- Use `tasks verbose` before updating tasks so you have precise file and line references.
- Prefer `ref="<path>:<line>"` for task updates.
- Task update modifiers are mutually exclusive: choose one of `toggle`, `done`, `todo`, or `status="<char>"`.
- Do not infer a task line number from memory if the file may have changed; re-read task output first.

## Tags

```bash
obsidian tags
obsidian tags path="projects/note.md"
obsidian tags file="My Note"
obsidian tags counts sort=count
obsidian tags total
obsidian tags format=json
obsidian tags active

obsidian tag name="project"
obsidian tag name="status/active" total
obsidian tag name="todo" verbose
```

- Omit `#` in `name=`.
- `tags counts sort=count` is a good first command when cleaning up taxonomy.
- Use `tag name="<tag>" verbose` to inspect where a specific tag is used.

## List Tasks

```bash
obsidian tasks
obsidian tasks todo
obsidian tasks done
obsidian tasks status="/"
obsidian tasks path="projects/todo.md"
obsidian tasks file="My Note"
obsidian tasks daily
obsidian tasks active
obsidian tasks verbose
obsidian tasks total
obsidian tasks format=json
```

- `tasks todo` shows incomplete tasks.
- `tasks done` shows completed tasks.
- `status="<char>"` filters custom statuses such as `/`, `-`, or `>`.
- `tasks verbose` groups by file and includes line numbers.

## Update One Task

```bash
obsidian task ref="projects/todo.md:15"
obsidian task ref="projects/todo.md:15" toggle
obsidian task ref="projects/todo.md:15" done
obsidian task ref="projects/todo.md:15" todo
obsidian task ref="projects/todo.md:15" status="/"

obsidian task path="projects/todo.md" line=15 done
obsidian task daily line=3 done
```

## Typical Workflows

- "What's left today?" -> `obsidian tasks todo daily`
- "Mark the third daily task done" -> `obsidian tasks daily verbose`, then `obsidian task daily line=<n> done`
- "Which tags should I clean up?" -> `obsidian tags counts sort=count`, then inspect candidates with `obsidian tag name="<tag>" verbose`
