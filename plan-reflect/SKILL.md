---
name: plan-reflect
description: Verify one directory-backed plan phase against the repository, record its earned status, and revise only affected later phases.
---

# Plan Reflect

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

## Verify

Resolve and structurally validate the plan. Read the target phase and repository
evidence, not the execution summary alone. Assess the objective and deliverables
first, then independently verify material gates, disputed claims, and checks
that match the phase risk. Accept equivalent evidence. Do not rerun every check
merely because it is listed or repeat an unchanged failing command. Investigate
relevant unplanned changes and verify the failure class.

Record:

- `complete` when every deliverable exists, the objective is achieved, material
  acceptance conditions have proportionate evidence, and no material defect or
  constraint violation remains. Record non-material verification gaps under
  `## Notes` without reopening the phase;
- `in-progress` with specific `Remaining:` work when material implementation or
  evidence that could change the outcome remains; or
- `blocked` with `Blocked on:` only when a concrete permitted blocker prevents
  progress.

An incomplete implementation, material evidence gap, failed gate, tool problem,
or first remediation failure is not itself a blocker. A failed or unrun evidence
check is not a blocker unless it reveals a material defect or leaves the outcome
unacceptably uncertain. A validated concern that a material gate is ambiguous,
stale, implementation-prescriptive, disproportionate, or otherwise incompatible
with the phase outcome is a permitted blocker after distinct grounded
alternatives have been considered.

Every `blocked` result must include an actionable human handoff in `Blocked on:`:
the specific help requested, why it unblocks the phase, and the exact resume
action. For a decision or approval, include a recommended default and viable
alternatives when they exist. Do not leave a generic blocker or "please advise".

## Revise

Capture only learnings that change later execution. Revise only affected later
phase files or cross-phase questions/order in the index. Preserve all contract
rules for renumbering and parent dependencies. Remove stale resumability notes
when the phase becomes complete.

When a validation concern blocks the phase, record under `Blocked on:` the
criterion, expected and actual results, repository evidence, approaches tried,
the specific human help requested, why it unblocks the phase, and the exact
resume action. Do not weaken or replace the current criterion silently. If a
non-material verification gap remains, record its actual status and consequence
under `## Notes` instead of creating `Remaining:` work. If the concern does not
block completion, report it and record it only when it changes later execution.

## Continue or report

Report status, outcome evidence, material gaps, changed files, plan and phase
paths, and the next action. For standalone reflection, stop without
implementing.

Inside an autonomous execution cycle, an `in-progress` result is not a final
handoff. Return immediately to `plan-phase`, then reflect again. End only at
`complete` or a valid `blocked` result.
