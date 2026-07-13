---
name: plan-reflect
description: Verify one directory-backed plan phase against the repository, record its earned status, and revise only affected later phases.
---

# Plan Reflect

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

## Verify

Resolve and structurally validate the plan. Read the target phase and repository
evidence, not the execution summary alone. Check every deliverable, independently
verify each required validation, and run appropriate supplemental checks. Use a
fresh or equivalent check when needed; do not repeat an unchanged failing
command merely to satisfy the checklist. Investigate relevant unplanned changes
and verify the failure class.

Record:

- `complete` only when every deliverable exists and every required validation
  passes; report supplemental results and treat a failure as blocking only when
  it reveals a defect or contradicts a deliverable;
- `in-progress` with specific `Remaining:` work when safe implementation or
  validation remains; or
- `blocked` with `Blocked on:` only when a concrete permitted blocker prevents
  progress.

An incomplete implementation, failed check, tool problem, or first remediation
failure is not itself a blocker. A validated concern that a required criterion
is ambiguous, stale, implementation-prescriptive, disproportionate, or
otherwise incompatible with the phase outcome is a permitted blocker after
distinct grounded alternatives have been considered.

## Revise

Capture only learnings that change later execution. Revise only affected later
phase files or cross-phase questions/order in the index. Preserve all contract
rules for renumbering and parent dependencies. Remove stale resumability notes
when the phase becomes complete.

When a validation concern blocks the phase, record under `Blocked on:` the
criterion, expected and actual results, repository evidence, approaches tried,
and the exact decision or clarification needed. Do not weaken or replace the
current criterion silently. If the concern does not block completion, report it
and record it only when it changes later execution.

## Continue or report

Report status, changed files, verification results, plan and phase paths, and
the next action. For standalone reflection, stop without implementing.

Inside an autonomous execution cycle, an `in-progress` result is not a final
handoff. Return immediately to `plan-phase`, then reflect again. End only at
`complete` or a valid `blocked` result.
