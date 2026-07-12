---
name: plan-reflect
description: Verify one directory-backed plan phase against the repository, record its earned status, and revise only affected later phases.
---

# Plan Reflect

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

## Verify

Resolve and structurally validate the plan. Read the target phase and repository
evidence, not the execution summary alone. Check every deliverable, rerun every
validation criterion, and investigate relevant unplanned changes.

Record:

- `complete` only when every deliverable exists and every validation passes;
- `in-progress` with specific `Remaining:` work when safe implementation or
  validation remains; or
- `blocked` with `Blocked on:` only when a concrete permitted blocker prevents
  progress.

An incomplete implementation, failed check, tool problem, or first remediation
failure is not itself a blocker.

## Revise

Capture only learnings that change later execution. Revise only affected later
phase files or cross-phase questions/order in the index. Preserve all contract
rules for renumbering and parent dependencies. Remove stale resumability notes
when the phase becomes complete.

## Continue or report

Report status, changed files, verification results, plan and phase paths, and
the next action. For standalone reflection, stop without implementing.

Inside an autonomous execution cycle, an `in-progress` result is not a final
handoff. Return immediately to `plan-phase`, then reflect again. End only at
`complete` or a valid `blocked` result.
