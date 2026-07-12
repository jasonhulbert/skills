---
name: plan-phase
description: Execute one phase from a directory-backed plan to its implementation and validation boundary. Use plan-auto to run every remaining phase.
---

# Plan Phase

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

## Select and start

Resolve the plan, validate its structure, and load the named phase. Otherwise
select the first linked phase not marked `complete`. Verify its dependencies.

Set `pending` to `in-progress`. Resume `blocked` only after verifying its
recorded blocker is resolved; then clear `Blocked on:`. Leave an existing
`in-progress` status unchanged and inspect prior work before repeating it.

## Execute

Implement only the selected phase. Inspect relevant code and integration points,
choose a sound approach, and add behavior-focused tests when behavior changes.

After each coherent increment, compare the repository with every deliverable
and validation item. Continue while safe in-scope work remains. Ask only when a
missing prerequisite, consequential unresolved decision, approval-dependent or
destructive action, unavailable external requirement, or invalid phase prevents
further progress. Exhaust safe alternatives and independent work first.

Run the phase's validation, then appropriate supplemental checks. An unrun check
is not a pass.

## Handoff

Account for every deliverable with repository evidence and every validation
item with an actual result. If safe work remains without a concrete blocker,
continue execution.

Leave status `in-progress`; `plan-reflect` owns the result. Report changes,
validation, deviations, and any evidenced blocker. In an autonomous execution
cycle, proceed directly to reflection and resume this skill immediately if
reflection records `Remaining:`.
