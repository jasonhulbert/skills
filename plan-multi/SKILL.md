---
name: plan-multi
description: Break a very large task into isolated directory-backed child plans coordinated by a parent manifest. Use for multi-service, multi-week work that exceeds a single plan's natural scope.
---

# Plan Multi

Create a multi-plan artifact for work that does not fit one phased plan.

Pipeline: `plan-multi` -> (`plan-create` per child) -> (`plan-phase` ->
`plan-reflect` per child phase).

Read `../plan-shared/PLAN-CONTRACT.md` first. It defines the parent manifest,
child directories, and the no-duplicated-status rule. The contract wins.

## When to use

Use this only when the work exceeds roughly eight phases **and** has at least
one of: distinct deployables, clear ownership boundaries, or natural
sub-projects with isolated validation. Otherwise use `plan-create`.

## Rules

- Do not implement code.
- Do not write the parent or child artifacts before the user approves the
  breakdown.
- Make child deliverables collectively exhaustive and mutually exclusive. No
  file, module, or migration has two owners.
- Validate the child dependency graph for unknown nodes and cycles before
  writing anything.
- The parent `index.md` is a recovery manifest and dependency map. It never
  stores child-plan status.
- If the parent directory exists, list its contents and stop rather than
  overwriting it.

## Workflow

### 1. Build context

Inspect the repository, seams, validation boundaries, and constraints. Separate
known facts from assumptions.

### 2. Draft the breakdown

Provide a brief overview, global constraints, and children with slug, goal,
scope, relevant child-specific constraints, and bare-slug `depends_on` values.
Include a coverage map and a Mermaid graph. Get user approval before generating
artifacts.

### 3. Assign child directories

Order children topologically. Assign `plan-<NN>-<child-slug>/` using their
one-based, zero-padded position. The bare slug is the graph identifier; the
directory name is only the filesystem identifier.

### 4. Write the parent manifest

Write `<parent-dir>/index.md` first, using contract §2. Include the global goal
as well as global constraints. Every `## Plans` entry must persist the approved
child goal, scope, relevant constraints, and `Depends on:` list beside its
directory link. The Mermaid graph is derived from those lists. The manifest
contains no status values and lets a later run recreate a missing child directory
without chat context.

### 5. Generate children

In dependency order, invoke `plan-create` with:

- `global_goal`
- `child_goal`
- `child_constraints`, including global constraints
- `depends_on` as bare sibling slugs
- `output_dir`, for example `plans/2026-07-12-platform/plan-01-api/`

Each child is an ordinary plan directory. Put only phase-specific cross-plan
dependencies in its phase files, but ensure every parent `Depends on:` slug is
represented by at least one such dependency. Do not duplicate the parent graph
or create frontmatter/status synchronization.

If child generation fails, stop and report the directories present and missing.
The parent manifest remains the recovery record.

## Output expectations

Report the parent `index.md`, child directories, dependency graph, and any open
questions. The directory artifacts are primary.
