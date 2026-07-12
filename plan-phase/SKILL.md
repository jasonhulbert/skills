---
name: plan-phase
description: Execute one phase from a directory-backed plan, loading the compact index and selected phase file only. Use `plan-auto` to run all remaining phases unattended.
---

# Plan Phase

Execute exactly one phase from a saved plan directory.

Pipeline: `plan-create` -> `plan-phase` -> `plan-reflect`.

Read `../plan-shared/PLAN-CONTRACT.md` first. It defines plan resolution,
phase-file status ownership, and safe phase-order revision. The contract wins.

## Inputs and selection

Accept a plan directory, its `index.md`, or a phase-file path. Resolve the
containing plan directory and read its index. A multi-plan parent index is not
executable; ask the user for a child plan.

Validate the index and linked phase-file structure under contract §2 before
selecting a phase. If it is malformed, stop and name the broken path or schema
rule; do not guess or repair an existing plan during execution.

Select the named phase when the user specifies one. Otherwise, follow the
ordered `## Phases` links and read each phase's status line until finding the
first status that is not `complete`. Do not load full phase bodies merely to
select a phase. Never start a phase whose declared earlier-phase dependency is
not complete.

## Rules

- Implement the selected phase directly. Do not fill out templates.
- Stay within the selected phase's scope.
- Ask only for blocking ambiguity, unsafe/destructive work, or a major product
  decision.
- Prefer bounded parallel investigation, disjoint edits, or independent
  verification when they are genuinely worthwhile. Keep integration and final
  validation local.
- Run the phase's stated validation first, then relevant supplemental checks.
- The only plan edit made here is the selected phase's start marker:
  `pending → in-progress`, or `blocked → in-progress` after the blocker is
  verified resolved. Do not mark a phase complete or blocked; `plan-reflect`
  owns those results.
- Do not update a plan or multi-plan index for execution status. Indexes never
  mirror live status.

## Workflow

### 1. Load and start

Read the compact plan index and the selected phase file. Extract its objective,
deliverables, dependencies, validation, and execution notes. Confirm declared
dependencies in the repository and other phase files. For each `sibling <slug>`
dependency, follow contract §3's parent-index lookup and verify every linked
phase in that sibling plan is complete. If the child directory is not in the
required multi-plan layout, the parent entry does not declare the sibling, or
the sibling is incomplete, stop before writing a start marker. If safe to
proceed, set the selected phase's status to `in-progress`; if it is already in
progress, leave it unchanged and inspect existing work before repeating anything.

If the selected phase is `blocked`, read its `Blocked on:` note. Resume it only
after verifying that prerequisite is resolved; then set it to `in-progress` and
remove the resolved note. Do not treat a request to rerun the phase as evidence
that a blocker disappeared. Ask when resolution cannot be verified.

### 2. Inspect before editing

Read the relevant code, tests, and immediate integration points. Identify the
smallest safe change set and any bounded work worth delegating.

### 3. Execute

Make only the changes needed by this phase. Add or update behavior-focused tests
when behavior changes. Update documentation or configuration only when the
phase requires it.

### 4. Validate

Run the phase file's `## Validation` criteria first. Then run relevant targeted
tests, lint/typecheck, builds, smoke checks, or named manual verification. Give
the actual commands and results. An un-runnable validation is not a pass.

### 5. Handoff

Leave the phase `in-progress`. Report the plan directory, selected phase file,
concrete changes, validation, deviations, and the recommendation to run
`plan-reflect` on that same phase.

## When to stop and ask

Stop before editing if a prerequisite is missing, a major product decision is
unresolved, the phase is destructive or irreversible, or the repository makes
the phase invalid. If delegated work is unavailable, continue locally rather
than blocking.
