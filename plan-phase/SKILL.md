---
name: plan-phase
description: Execute one ready phase from an existing directory-backed plan through implementation, validation, terminal status, and execution evidence. Use when the user asks to run a specific saved-plan phase; use plan-auto for all ready phases.
---

# Plan Phase

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

Resolve the plan, validate or deterministically repair its structure, and load
the named phase. Otherwise select the first ready non-complete phase in index
order. Verify its declared phase and sibling dependencies. Resume `blocked` only
after verifying the recorded condition is resolved; resume `in-progress` from
its `Remaining:` note and execution history without repeating completed work.

Set the phase to `in-progress`, remove a resolved blocker, and inspect the
relevant code, tests, callers, later coordination boundaries, and prior evidence
once. Choose a sound approach and implement only the work needed for the phase's
outcome. Use bounded delegation for genuinely disjoint work when helpful, while
keeping integration and terminal validation local. Add behavior-focused tests
when behavior changes.

After coherent increments, compare the repository with the objective,
deliverables, coordination invariants, and relevant risks. Classify failures as
implementation defects, tool or environment problems, or validation concerns
before changing code. Continue while safe in-scope work remains. Request
available approval or escalation instead of stopping merely because permission
is required. Never repeat an unchanged failing command or hypothesis.

Account for every deliverable and gate. Alternative evidence may satisfy a gate
only when it directly observes the same material behavior or failure mode; name
that equivalence in the execution history. Inference alone cannot satisfy a
runnable executable-behavior gate. Evidence checks create work only when they
reveal a material defect or change confidence in the outcome.

Finish in one pass when possible:

- mark `complete` when the objective and deliverables exist, every gate has
  proportionate direct evidence, and no material defect or constraint violation
  remains;
- leave `in-progress` with exact `Remaining:` work only when execution is
  interrupted despite safe work remaining; or
- mark `blocked` only when a concrete condition prevents further safe in-scope
  progress and record the actionable handoff required by the contract.

Append one execution-history entry with the complete status-transition sequence,
baseline,
changes, gate-by-gate results, evidence equivalence, and deviations. Leave
forward-looking note extraction to `plan-reflect`; do not perform a second
inspection pass or restate the execution report in `## Notes`. Report the
terminal status, changed files, actual validation, and any blocker or residual
uncertainty concisely.
