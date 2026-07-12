---
name: plan-create
description: Create a durable, directory-backed phased implementation plan. Each phase is a separate file, so later execution loads only the needed phase. Use for a multi-step software change worth tracking across sessions; use `plan-task` for a one-pass change and `plan-multi` for a very large multi-workstream effort.
---

# Plan Create

Create a phased implementation plan for real execution in the current codebase.

Pipeline: `plan-create` -> (`plan-phase` -> `plan-reflect`)+.

Read `../plan-shared/PLAN-CONTRACT.md` first. It defines the plan directory,
index and phase schemas, status ownership, and the rules for revising order.
The contract wins over this skill.

## Inputs

Use, in order:

1. The user's request.
2. The current codebase and local documentation.
3. Only questions that block scope, sequencing, risk, or acceptance criteria.

Use `plan-task` when the work fits in one focused implementation pass. Use
`plan-multi` when it exceeds roughly eight phases and has real workstream,
deployable, or ownership boundaries.

### Invocation by `plan-multi`

`plan-multi` supplies a scoped brief with `global_goal`, `child_goal`,
`child_constraints`, `depends_on`, and `output_dir`. Treat the combined global
and child goal plus constraints as the user's request. Write that child's
`index.md` and phase files to `output_dir` exactly. The child index has the
normal plan-index schema; it does not have frontmatter or a copied parent
status. Its goal must state the child outcome in the context of `global_goal`,
and its constraints must include every applicable global constraint.

Put a bare sibling slug in a phase's `## Dependencies` only when that phase
really depends on the sibling's work. Every supplied `depends_on` slug must
appear in at least one phase dependency, and no phase may name another sibling.

## Rules

- Do not implement code.
- Define outcomes, constraints, and validation rather than prescribing internals.
- Keep a phase executable in one focused implementation pass.
- State any non-blocking assumptions in the plan index.
- Make every validation criterion falsifiable.
- Keep shared context in `index.md`; keep execution detail and status in the
  corresponding phase file.
- Do not create or accept a legacy single-file plan. Ask the user to migrate it.

## Workflow

### 1. Build context

Inspect the relevant repository paths, tests, integration points, and local
constraints. Separate known facts from assumptions.

### 2. Resolve only blocking ambiguity

Ask concise, decision-oriented questions only when the answer changes the
breakdown, ordering, risk, or acceptance criteria. Otherwise proceed with an
explicit assumption.

### 3. Design phases

For every phase define an objective, checkable deliverables, dependencies,
falsifiable validation, and only the notes needed to execute safely. Prefer
boundaries that support isolated investigation, disjoint edits, or independent
verification without splitting tightly coupled work.

### 4. Write the directory artifact

For standalone use the directory naming rules in contract §1. Create:

- `index.md` with the plan goal, constraints, assumptions, ordered phase links,
  and any cross-phase open questions.
- One `phase-<NN>-<slug>.md` file per phase, using contract §3.

For a child brief, use `output_dir` exactly. Write the child index first as its
recovery manifest, then generate phase files in order. If phase generation
fails, stop and report the files present and missing; do not silently continue.

### 5. Verify the artifact

Re-read the index and every generated phase file before reporting. Confirm:

- The index has `#`, `## Goal`, `## Constraints`, and `## Phases`.
- Phase links are contiguous, ordered, and resolve to the named files.
- Each phase heading and filename number agree.
- Each phase has exactly one `- Status: pending`, a non-empty objective, at
  least one deliverable, and falsifiable validation.
- No index line includes a phase status.
- For a child brief, its goal includes the global goal, its constraints include
  applicable global constraints, and its sibling dependencies exactly match the
  supplied `depends_on` list.

Fix failures in place. Do not report a malformed plan.

## Output expectations

Report the plan directory and its `index.md`, summarize the phase breakdown,
and call out assumptions or open questions. The directory artifact is primary.
