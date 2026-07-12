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
- Execute the phase to its terminal outcome in the same invocation. Continue
  while any safe, in-scope deliverable or validation remains. A clean
  intermediate checkpoint, passing subset of tests, documented remaining work,
  large scope, elapsed time, or turn boundary is not a stopping condition.
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

After each coherent work increment, compare the repository against every
deliverable and validation item in the phase file. If any item remains and no
concrete stop condition below applies, continue executing. Do not convert known
remaining work into a handoff merely because the repository is currently clean
or a useful subset is complete.

### 4. Validate

Run the phase file's `## Validation` criteria first. Then run relevant targeted
tests, lint/typecheck, builds, smoke checks, or named manual verification. Give
the actual commands and results. An un-runnable validation is not a pass.

### 5. Handoff

Before handing off, perform a completion gate:

1. Account for every deliverable with a concrete repository artifact.
2. Account for every validation with an actual command or observable result.
3. Confirm no safe, in-scope implementation or validation work remains.
4. If work remains, name the exact concrete stop condition that prevents it.

If no stop condition applies, return to Execute instead of handing off.

Leave the phase `in-progress` because `plan-reflect` owns the result transition.
Report the plan directory, selected phase file, concrete changes, validation,
deviations, and the recommendation to run `plan-reflect` on that same phase.
When stopped by a blocker, distinguish completed work from blocked work and name
the evidence that makes the blocker concrete.

## When to stop and ask

Stop only when one of these conditions is concrete and prevents further safe,
in-scope progress:

- a declared prerequisite is missing or incomplete;
- a major product decision is unresolved and different answers would materially
  change the implementation;
- the next required action is destructive, irreversible, or requires approval;
- required external access, hardware, credentials, or user-provided input is
  unavailable and no local substitute can satisfy the validation; or
- repository evidence makes the phase invalid as written.

Before stopping, exhaust safe in-scope alternatives and complete all independent
work that is not blocked. State the blocking item, the evidence for it, and the
exact work it prevents. Tool friction, a failed first attempt, unavailable
delegation, large scope, context pressure, elapsed time, a clean checkpoint, or
partial validation are not blockers. If delegated work is unavailable, continue
locally.
