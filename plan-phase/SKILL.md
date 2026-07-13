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
and validation item. When a check fails, classify it before changing code:
implementation defect, tool or environment problem, or validation concern.
Continue while safe in-scope work remains. Ask only when a missing prerequisite,
consequential unresolved decision, approval-dependent or destructive action,
unavailable external requirement, or invalid phase prevents further progress.
Exhaust independent work and evidence-based alternatives first, but never
repeat an unchanged failing command or approach.

Run the phase's required validation, then appropriate supplemental checks. An
unrun required check is not a pass; report any supplemental check that could not
run. If a criterion remains failed after materially
different, evidence-based alternatives, report the validation concern with its
evidence rather than continuing a repetitive retry loop.

## Handoff

Account for every deliverable with repository evidence and every validation
item with an actual result. If safe work remains without a concrete blocker,
continue execution. If the criterion itself is the concrete blocker, leave the
structured evidence for `plan-reflect` to record as a validation concern; do not
silently relax it.

Leave status `in-progress`; `plan-reflect` owns the result. Report changes,
validation, deviations, and any evidenced blocker. In an autonomous execution
cycle, proceed directly to reflection and resume this skill immediately if
reflection records `Remaining:`.

Stop only when a concrete condition prevents safe, in-scope progress. This
includes a required validation criterion that repository evidence shows is
ambiguous, stale, implementation-prescriptive, disproportionate, or otherwise
incompatible with the phase outcome after distinct grounded alternatives were
tried. A failed first attempt, tool friction, elapsed time, or partial
validation is not enough.
