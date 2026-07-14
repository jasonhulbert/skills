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

After each coherent increment, compare the repository with the objective,
deliverables, and relevant risks. Do not re-evaluate every validation item after
every increment. When a check fails, classify it before changing code:
implementation defect, tool or environment problem, or validation concern. A
failed gate may require remediation; an evidence check does not create work
unless it reveals a material defect or changes confidence in the goal.
Continue while safe in-scope work remains. Ask only when a missing prerequisite,
consequential unresolved decision, approval-dependent or destructive action,
unavailable external requirement, or invalid phase prevents further progress.
Exhaust independent work and evidence-based alternatives first, but never
repeat an unchanged failing command or approach.

Gather gate evidence at appropriate checkpoints, usually after implementation
stabilizes. Accept equivalent evidence when it establishes the same material
outcome. Run evidence checks when they are cheap and decision-changing; do not
create implementation work solely to satisfy an evidence list. An unrun gate is
an evidence gap, not an automatic failure, when other proportionate evidence
establishes the outcome. Report unrun checks and residual uncertainty honestly.

## Handoff

Account for every deliverable with repository evidence and every gate with an
actual result or explicit evidence gap. Report evidence checks that were run
and any material residual uncertainty. If the objective is achieved and only
non-material evidence gaps remain, continue to reflection rather than doing more
work solely to close those gaps. If the criterion itself is the concrete
blocker, leave the structured evidence for `plan-reflect` to record as a
validation concern; do not silently relax it.

Leave status `in-progress`; `plan-reflect` owns the result. Report changes,
validation, deviations, and any evidenced blocker. In an autonomous execution
cycle, proceed directly to reflection and resume this skill immediately if
reflection records `Remaining:`.

When progress is blocked, make the handoff human-actionable: state the specific
help requested, why it unblocks the phase, and the exact action to resume. For a
decision or approval, give a recommended default and viable alternatives when
they exist. Do not report only a cryptic error or "please advise".

Stop only when a concrete condition prevents safe, in-scope progress. This
includes a material acceptance condition for which no proportionate evidence
exists, or a gate that repository evidence shows is ambiguous, stale,
implementation-prescriptive, disproportionate, or otherwise incompatible with
the phase outcome after distinct grounded alternatives were tried. A failed
first attempt, tool friction, an unrun evidence check, elapsed time, or partial
validation is not enough.
