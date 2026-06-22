---
name: obsidian-cli
description: "Fallback for Obsidian CLI workflows when the `obsidian` MCP server is unavailable, not registered in the current session, or cannot express the needed operation. Use for shared CLI syntax, quoting, vault targeting, safety rules, command discovery, direct-write recovery, sandbox caveats, and destructive-operation warnings."
---

# Obsidian CLI

Prefer the `obsidian` MCP server first. Use this skill only when the MCP server is unavailable, not registered in the current session, or cannot express the needed fallback.

Use MCP tools such as `obsidian_health`, `obsidian_vaults`, and `obsidian_vault_info` before falling back to the local `obsidian` CLI. Relevant MCP resources:

- `obsidian://guidance/cli-safety`
- `obsidian://guidance/error-recovery`
- `obsidian://guidance/read-only-workflows`

When fallback is needed, use the local `obsidian` CLI to work with the user's Obsidian vault through the running Obsidian desktop app.

This is the shared primer for the focused skills:

- `obsidian-notes`: note lifecycle, properties, and templates
- `obsidian-search`: read-only vault exploration and link graph
- `obsidian-daily`: today's daily note
- `obsidian-tasks-tags`: tasks and tags

## Core Rules

- Do not run bare `obsidian`; it launches the GUI. Use `obsidian help` or `obsidian help <command>`.
- The Obsidian app must be running. If commands fail with a connection error, ask the user to open Obsidian.
- Prefer `path=` over `file=` for writes. `path=` is exact from the vault root; `file=` resolves by note name and can be ambiguous.
- Use `vault="<name>"` on every command when multiple vaults are available or the target vault matters.
- Confirm before destructive operations: `delete permanent`, `overwrite`, `property:remove`, plugin/theme uninstall or disable, history/sync restore, or any command that could discard user state.
- If command syntax is uncertain, run `obsidian help <command>` before retrying.
- In Codex, run Obsidian writes directly with `obsidian`; do not spawn `obsidian` from Node or `js_repl`. Node-spawned Obsidian can abort with `SIGABRT` in this environment.
- If read/help commands work but a write exits `-1` or looks sandbox-blocked, immediately rerun the same write with `sandbox_permissions: "require_escalated"` and a narrow prefix rule such as `["obsidian", "create"]`. Do not report that the CLI is unavailable.

## Syntax

```bash
obsidian <command> key=value flag
```

- Options are `key=value`, not `--key value`.
- Subcommands use colons: `daily:append`, `property:set`, `search:context`.
- Boolean flags are bare words: `total`, `verbose`, `inline`, `overwrite`, `active`, `open`, `newtab`.
- Quote values with spaces: `file="My Note"`.
- Inside `content=`, only `
` and `	` are interpreted as escapes. Do not write `"`; it creates literal backslash-quote text in the note.

## Safer Multi-Line Writes

For short content, direct shell quoting is fine:

```bash
obsidian append path="inbox/log.md" content="- item"
```

For multi-line or generated content, avoid hand-escaping. Write the content to a temp file, then pass it to the CLI with command substitution under `/bin/bash` and `login:false`:

```bash
obsidian create vault=Notes path="inbox/example.md" content="$(cat /tmp/example-note.md)"
```

This preserves quotes, backticks, Mermaid fences, and newlines because shell syntax inside the file is not reparsed after command substitution. Add `overwrite` only after explicit confirmation. In Codex this pattern may require escalation because it uses command substitution; request escalation rather than switching to Node.

## Vault Targeting

Useful commands:

```bash
obsidian vault
obsidian vault info=path
obsidian vaults
obsidian vaults verbose
```

- Single vault: commands usually auto-target it.
- Multiple vaults: list vaults, pick the intended one, and include `vault="<name>"`.
- Omitting `vault=` with multiple vaults can target the most recently active vault, which is risky for writes.

## `file=` vs `path=`

- `file="Meeting Notes"`: wikilink-style name lookup anywhere in the vault.
- `path="projects/acme/meeting-notes.md"`: exact vault-relative path.

Use `path=` for creation, updates, deletes, moves, properties, and task edits whenever possible.

## Command Map

Run `obsidian help <command>` for exact flags.

- Notes: `create`, `read`, `append`, `prepend`, `delete`, `move`, `rename`, `open`
- Properties and templates: `property:set`, `property:read`, `property:remove`, `properties`, `templates`, `template:read`, `template:insert`
- Search and structure: `search`, `search:context`, `search:open`, `files`, `folders`, `file`, `folder`, `vault`, `vaults`, `outline`, `wordcount`
- Link graph: `backlinks`, `links`, `orphans`, `deadends`, `unresolved`, `aliases`
- Daily notes: `daily`, `daily:path`, `daily:read`, `daily:append`, `daily:prepend`
- Tasks and tags: `tasks`, `task`, `tags`, `tag`
- Advanced/admin: `bases`, `base:*`, `bookmarks`, `command`, `commands`, `plugins`, `plugin:*`, `sync:*`, `history:*`, `tabs`, `workspace`, `theme:*`, `dev:*`, `eval`

## Error Patterns

- Connection error: Obsidian is not running or the local connection is unavailable.
- Write exits `-1` while `obsidian read/help/vaults` work: Codex sandbox blocked the write; rerun with escalation.
- Node wrapper returns `status: null`, `signal: SIGABRT`: do not debug Obsidian; stop using Node to spawn it and call `obsidian` directly.
- Literal `"` in a note: content was over-escaped; rewrite without escaping double quotes.
- Note created in the wrong folder: `name=` was used where `path=` was needed.
- Unexpected GUI launch: bare `obsidian` was run; stop it and use `obsidian help`.
