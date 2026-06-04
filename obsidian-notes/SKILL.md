---
name: obsidian-notes
description: "Use for creating, reading, appending, prepending, moving, renaming, deleting, opening, templating, or editing frontmatter properties on Obsidian notes via the `obsidian` CLI."
---

# Obsidian Notes

Use the `obsidian` CLI for the note lifecycle: create, read, append, prepend, delete, move, rename, open, frontmatter properties, and templates.

Use `obsidian-cli` for shared syntax, vault targeting, and quoting rules. Use `obsidian-formatting` when deciding what markdown elements to put inside the note (callouts, embeds, block refs, tables, Mermaid, etc.) so content is structured rather than a wall of plain text.

## Rules

- Prefer `path=` for writes and exact reads.
- Confirm before `overwrite`, `delete permanent`, or `property:remove`.
- Use `obsidian help <command>` if a flag or output shape is uncertain.
- For multi-line generated content, use the temp-file plus direct `obsidian` pattern from `obsidian-cli`; do not spawn Obsidian from Node.

## Create

```bash
obsidian create path="folder/note.md" content="Initial content"
obsidian create name="My Note" content="# My Note\nBody"
obsidian create path="existing.md" content="Replacement" overwrite
obsidian create path="daily/from-template.md" template="Daily Note"
obsidian create path="note.md" content="..." open newtab
```

- `path=` controls folder placement.
- `name=` creates by note name and may use the vault root or configured default new-note folder.
- `template=` creates from a configured Obsidian template.
- `open` and `newtab` reveal the result in Obsidian.

## Read

```bash
obsidian read path="folder/note.md"
obsidian read file="My Note"
```

- `read` prints full note contents.
- Use `file=` when the user gives a wikilink-style note name and ambiguity is unlikely.

## Append And Prepend

```bash
obsidian append path="note.md" content="- list item"
obsidian append path="note.md" content="inline fragment" inline
obsidian prepend path="note.md" content="---\ntags: [new]\n---"
```

- Default behavior inserts a newline separator.
- `inline` suppresses the separator.

## Delete, Move, Rename, Open

```bash
obsidian delete path="folder/note.md"
obsidian delete path="folder/note.md" permanent

obsidian move path="inbox/note.md" to="archive/"
obsidian move path="inbox/note.md" to="projects/active/note.md"

obsidian rename path="folder/old.md" name="new-name"
obsidian open path="folder/note.md" newtab
```

- Plain `delete` uses trash where available.
- `to=` can be a folder path or full destination path.
- `rename` changes only the filename.

## Frontmatter Properties

```bash
obsidian property:set path="note.md" name="status" value="in-progress"
obsidian property:set path="note.md" name="due" value="2026-03-20" type=date
obsidian property:set path="note.md" name="tags" value="[project, active]" type=list
obsidian property:set path="note.md" name="priority" value="5" type=number
obsidian property:set path="note.md" name="completed" value="true" type=checkbox

obsidian property:read path="note.md" name="status"
obsidian property:remove path="note.md" name="old-field"

obsidian properties
obsidian properties path="note.md"
obsidian properties counts sort=count
obsidian properties format=json
obsidian properties active
```

- Supported property types include `text`, `list`, `number`, `checkbox`, `date`, and `datetime`.
- Set `type=` when creating or materially changing a property.

## Templates

```bash
obsidian templates
obsidian template:read name="Daily Note"
obsidian template:read name="Daily Note" resolve title="2026-03-24"
obsidian template:insert name="Daily Note"
obsidian create path="folder/note.md" template="Daily Note"
```

- To create a note from a template, use `create ... template=`.
- `template:insert` affects the active file; confirm the target if it is not obvious.
