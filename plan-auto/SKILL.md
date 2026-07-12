---
name: plan-auto
description: Autonomously execute every remaining phase of one directory-backed plan, reflecting after each phase until complete or a safe stop condition occurs.
---

# Plan Auto

Run one saved plan directory end to end without per-phase user input.

Pipeline: `plan-create` -> (`plan-phase` -> `plan-reflect`)+. This is a thin
orchestrator: it runs those skills in full and owns only loop control, progress
checks, and safe stop conditions.

Read `../plan-shared/PLAN-CONTRACT.md` first. The plan directory is the durable
artifact: its compact index provides order and its phase files provide all live
status. The contract wins.

## Inputs

Accept a plan directory, its `index.md`, or a phase-file path and resolve the
plan directory. Do not operate on a multi-plan parent index; ask the user to
choose a child plan. A legacy monolithic plan is unsupported and requires
manual migration.

Validate the index and linked phase-file structure under contract §2 before
starting. If it is malformed, stop and report the exact broken path or schema
rule. Do not infer missing order or repair an existing plan during an unattended
run.

Read the plan index's ordered phase links. Read only the status line for each
phase to find the first not-`complete` phase and count remaining phases; load a
full phase file only when it is about to run.

## Rules

- Start immediately unless the next phase is destructive/irreversible or an
  index open question gates it. A next phase already marked `blocked` also
  requires its recorded blocker to be resolved before continuing. In each case,
  request explicit go-ahead or the missing resolution.
- Run one plan directory only. Do not chain sibling plans.
- Run phases in index order and reflect after every one.
- Progress is monotonic: the count of not-complete phase files must strictly
  decrease after each iteration. Never rerun the same phase automatically.
- Keep the repository working between phases.
- Add no run log, status sidecar, or index status summary. Phase files are the
  only live-state source.
- Stop cleanly on a blocker, incomplete reflection, failed validation, no
  progress, or destructive work needing sign-off.

## Stop conditions

After a phase is executed, complete reflection before stopping. Halt when:

1. The next phase has a blocking ambiguity, unmet prerequisite, major product
   decision, or destructive/irreversible action.
2. Reflection leaves the phase `in-progress` or `blocked`.
3. Required validation is not green or the repository is not working.
4. The count of non-complete phase files did not decrease.
5. Reflection changes the next phase so substantially that it is no longer
   executable as written.

A transient tooling error during validation may be retried once. Name that retry
in the final summary. New non-gating open questions, normal reflection notes,
and index link changes from a permitted pending-phase insertion do not stop the
run by themselves.

## Workflow

### 1. Locate and announce

Resolve the plan directory. Read its index and phase status lines. If all linked
phases are complete, report that and stop. Otherwise announce the directory and
phase numbers to be run.

### 2. Loop

For each next incomplete phase in index order:

1. Emit `Phase N: [name] — starting.`
2. Run the full `plan-phase` behavior on that phase file.
3. Run the full `plan-reflect` behavior on that phase file.
4. Re-read the index and status lines. Check repository health, the reflected
   phase status, monotonic progress, and whether the next phase remains safe.
5. Emit `Phase N: [name] — complete.` or a one-line stop reason.

If reflection inserted and renumbered pending phases, treat the refreshed index
as authoritative before choosing the next phase.

## Final summary

Report the plan directory, phases run and completed, any incomplete phases, stop
reason, aggregate files changed, real validation results, reflection updates,
open issues, and the concrete next step.
