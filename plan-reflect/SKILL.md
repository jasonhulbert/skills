---
name: plan-reflect
description: Verify one directory-backed plan phase against the repository, record the earned status in that phase file, and revise only affected later phase files.
---

# Plan Reflect

Verify a just-executed phase and update the plan directory to match reality.

Pipeline: `plan-create` -> `plan-phase` -> `plan-reflect`.

Read `../plan-shared/PLAN-CONTRACT.md` first. It defines the phase-file schema,
status ownership, and the restricted rule for reordering pending phases. The
contract wins.

## Inputs

Accept a plan directory, its `index.md`, or the phase-file path, plus a phase
name or number if necessary. Resolve the plan directory, read its compact index
and target phase file, then inspect the repository.

Validate the index and linked phase-file structure under contract §2 before
making a status decision. If it is malformed, stop and report the broken path or
schema rule; do not silently repair an existing artifact during reflection.

## Rules

- Verify against the repository, never the execution summary alone.
- Mark `complete` only when every deliverable exists and every validation
  criterion is re-run and passes.
- If validation cannot run, leave the phase `in-progress` and record exactly why
  under `Remaining:`.
- Record `Remaining:` or `Blocked on:` in the target phase file so the plan is
  resumable without chat history.
- Do not update an index with phase or child-plan status. Status exists only in
  phase files.
- Revise only downstream files that are actually affected.

## Workflow

### 1. Verify the phase

For each `## Deliverables` item, read the repository evidence and mark it met or
missing. Re-run every `## Validation` criterion and record the exact command or
observable result. Investigate unplanned changed files before accepting them.

Set the result:

- `complete` only when all deliverables and validation pass.
- `in-progress` when work or validation remains; add `Remaining:`.
- `blocked` when a user decision or external prerequisite is required; add
  `Blocked on:`.

### 2. Record useful learnings

Capture only discoveries that change future execution: invalid assumptions,
new dependencies, changed sequencing, or a decision that gates later work.

### 3. Update phase files and index

Update the target phase status and outstanding-work note. Remove any stale
`Remaining:` or `Blocked on:` note when it becomes complete.

For a changed future phase, add a short `Revised after Phase N:` note in that
phase file and change its deliverables, dependencies, validation, or notes only
as needed. Update the current plan index only for cross-phase open questions or
phase order; never add status summaries.

When adding or removing a `sibling <slug>` dependency, also update the current
child's `Depends on:` list in the **parent** manifest and the parent Mermaid
graph together. The parent index is the durable multi-plan dependency source;
fail loudly if the child is not in the required layout or the updates would make
the parent and phase-level dependencies disagree.

If a newly required prerequisite belongs before later pending work, you may
insert a phase by renumbering only pending phase files. Update all affected
filenames, headings, index links, and phase-number dependencies in one change.
Never renumber a started, complete, or blocked phase. If the prerequisite must
precede one, mark the current phase blocked and request a follow-up plan.

## Output expectations

Report whether the phase is complete, partial, or blocked; the files changed;
the verification commands and results; the plan directory and phase file; and
the next step. The updated directory is primary.
