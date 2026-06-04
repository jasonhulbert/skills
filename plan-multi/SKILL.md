---
name: plan-multi
description: Break a very large task into multiple isolated deliverables, each becoming its own phased plan via plan-create, coordinated by a parent index. Use for multi-service migrations, multi-week features, and work that exceeds a single plan's natural scope. Triggers on "this is an epic", "too big for one plan", "break this into separate plans/workstreams".
---

# Plan Multi

Create a multi-plan implementation artifact for very large tasks that do not fit in a single phased plan.

This skill sits above the pipeline:
`plan-multi` -> (`plan-create` per child) -> (`plan-phase` -> `plan-reflect` per phase)

**Read the plan file contract first:** `/Users/HulbertJ/.claude/skills/plan-shared/PLAN-CONTRACT.md` defines the parent-index format and status values, the child filename convention (`<NN>-<child-slug>.md`, zero-padded), the child frontmatter block (written **with** `---` fences), and the index line-matching grammar that `plan-phase`/`plan-reflect` rely on to keep statuses in sync. The rules below assume that contract. If anything here seems to disagree, the contract wins.

## When to Use

Reach for plan-multi only when the work would **not** fit in a single ~8-phase plan AND has at least one of:

- Multiple distinct deployables or service boundaries
- Clear team / ownership boundaries
- Natural sub-projects with their own validation surfaces

If it fits in one plan, use `plan-create` — even when phases are independently delegable; `plan-create` already supports parallel phase ownership.

## Inputs

Use, in this order:

1. The user's request
2. The current codebase and local docs
3. Only the minimum blocking questions needed to resolve scope and sequencing

## Critical Rules

- Do not implement code.
- Do not write any child plans before the user approves the breakdown.
- Do not use plan-multi for work that fits in a single phased plan.
- Storage is the Obsidian vault. Use the `obsidian` CLI for all reads/writes.
- Each child plan must be fully self-contained — copy the global goal and relevant constraints into each child.
- **Deliverables must be collectively exhaustive and mutually exclusive:** every part of the global goal belongs to exactly one child, and no two children own the same file/module/migration. State this coverage mapping in the draft so the user can spot gaps and overlaps before approval.
- Validate the `depends_on` graph for cycles before writing anything.
- If the parent directory already exists, do not silently overwrite: list its contents and report which children are already present, so the user can complete a partial run or edit manually.

## Workflow

### 1. Build context

- Inspect the repo, relevant code paths, integration points, and constraints.
- Identify seams: deployability, ownership, validation isolation, migration boundaries.
- Separate what is known from what is assumed.

### 2. Resolve only blocking ambiguity

Same ethos as `plan-create`. Ask decision-oriented questions only when the answer changes the breakdown or sequencing. Prefer:

- "I recommend splitting into A, B, C because Y. Does that match your intent?"
- "If we merge B and C, the dep graph collapses; if we keep them separate, B can ship independently."

### 3. Draft the breakdown

Produce:

- A 2-3 sentence overview of the whole effort.
- Global constraints that apply to every child.
- An ordered list of children. For each: slug, goal, one-line scope, `depends_on` (bare sibling slugs).
- A coverage mapping: which child owns each major part of the global goal, confirming no part is unassigned (gap) and no two children share ownership (overlap).
- A Mermaid dependency graph derived from the `depends_on` edges (nodes are bare slugs).

### 4. Get user approval (required)

Present the draft to the user and wait for approval or edits. Do not generate children until approved. Revising the breakdown before generation is cheap; after generation is expensive.

### 5. Resolve paths

- Get the vault root: `obsidian vault info=path`
- Parent directory (relative to vault): `plans/<YYYY-MM-DD>-<parent-slug>/`
- Check whether it exists: `obsidian folder path="plans/<YYYY-MM-DD>-<parent-slug>"`. If it exists, do not overwrite — list its contents, report which children are already present, and ask the user whether to complete the missing children or edit manually.
- Assign each child its number `<NN>` from its 1-based position in topological order, zero-padded to two digits (`01`, `02`, …). The `<NN>-<child-slug>` token is identical in the filename, the index link, and the dependency graph (contract §1, §4).

### 6. Validate the dependency graph

- Every `depends_on` slug must reference another child's bare slug in this artifact.
- No cycles. If a cycle exists, refuse and ask the user to restructure.

### 7. Write the parent index first (recovery manifest)

Write the index **before** generating children, with every child's status
`pending`. The index is then the manifest a partial run can recover from: if
child generation fails partway, the index already lists what should exist.

Write `<vault>/plans/<YYYY-MM-DD>-<parent-slug>/index.md` via `obsidian create path="plans/<YYYY-MM-DD>-<parent-slug>/index.md" content="..."` using the format below, initializing every plan's status as `pending`.

### 8. Generate each child via plan-create

Generate in dependency order (topological). Later children may reference earlier
siblings **only by slug** in their phase `Dependencies:` — never by assuming a
sibling's concrete deliverables already exist on disk.

For each child, invoke `plan-create` with a brief containing:

- `child_goal` — becomes the plan's Goal
- `child_constraints` — child-specific constraints plus a copy of global constraints
- `depends_on` — list of sibling bare slugs
- `output_path` — exact path: `plans/<YYYY-MM-DD>-<parent-slug>/<NN>-<child-slug>.md`
- `child_frontmatter` — written **with** its `---` fences (an unfenced block produces invalid frontmatter and silently breaks index sync):
  ```yaml
  ---
  parent_plan: ./index.md
  plan_index: N
  total_plans: M
  depends_on: [slug-a, slug-b]
  ---
  ```

`plan-create` writes the child plan with this frontmatter (fences included) prepended above the `#` heading. See `plan-create` and the contract.

If generation fails on a child, stop and report which children were written and which are missing; the index (written in step 7) is the recovery manifest. The user can re-run to fill in only the missing children.

## Parent Index Format

```md
# [Project Name]

## Overview
[2-3 sentences describing the whole effort across children]

## Global Constraints
- [Constraints that apply to every child plan]

## Assumptions
- [Cross-cutting assumptions]

## Plan Dependency Graph
​```mermaid
graph LR
  foo --> bar
  bar --> baz
  bar --> qux
​```

## Plans
1. [Plan 1 Name](01-plan-slug.md) — pending
2. [Plan 2 Name](02-plan-slug.md) — pending
3. ...

## Open Questions
- [Only unresolved items that still matter across plans]
```

## Status Values

The parent index plan list uses exactly the four contract values, spelled
identically to a phase `Status:`:

- `pending` — set when the index is written (step 7).
- `in-progress` — set by `plan-phase` when it starts a phase of a child whose index line still reads `pending`.
- `complete` — set by `plan-reflect` when every phase of that child is `complete`.
- `blocked` — set by `plan-reflect` when a phase of that child is `blocked`.

These spellings and the line-matching grammar (match by link target, replace the
trailing status word) are a frozen contract that `plan-phase` and `plan-reflect`
depend on — see contract §4. Status updates after creation flow through those
skills; do not modify the index manually during execution unless the user asks.

## Output Expectations

After writing the parent + all children:

- Provide the parent index path.
- Summarize the breakdown: plan names, statuses, dep graph.
- Call out remaining open questions.

Keep the response concise. The files are the primary artifact.
