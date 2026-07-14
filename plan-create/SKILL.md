---
name: plan-create
description: Create a durable directory-backed phased implementation plan. Use for multi-step software work; use plan-task for a focused one-pass change and plan-multi for a large multi-workstream effort.
---

# Plan Create

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it. Do not implement.

Inspect the request, repository, tests, integration points, and local
constraints. Resolve only ambiguity that changes scope, sequencing, risk, or
acceptance; otherwise state reasonable assumptions.

Design executable phases around the objective and deliverables, with minimal
goal-relevant validation. Validation should measure the outcome rather than
prescribe the implementation. Label material acceptance conditions `[Gate]` and
optional confidence-building checks `[Evidence]`. Use the fewest gates that
would change the decision to accept the phase; do not turn conventional lint,
typecheck, test, or documentation checks into gates unless they protect a
material requirement.

Make each gate realistic and attainable in the stated environment. Include its
expected observable result and prerequisite, or identify an equivalent local
check. Do not specify a check the agent cannot reasonably run and then treat
that check as the plan's objective.

Challenge validation before writing it. Flag criteria that are ambiguous,
stale, environment-dependent without a known prerequisite, implementation-
prescriptive, broader than the phase objective, or disproportionate to the
requested outcome. Resolve concerns only when repository evidence settles them;
otherwise record them as open questions and report them. Do not hide them in an
unbounded validation list or let them expand the required gate set.

Make consequential open questions actionable: state the human decision or input
needed, why it affects the plan, the recommended default, and the alternatives
if a choice exists. Avoid vague questions that leave the human to infer how to
unblock the work.

Keep shared context in the index and phase-specific detail in its phase file.

Write the contract-defined directory, index, and ordered phase files. For a
`plan-multi` child brief, use its supplied `output_dir`, global and child goals,
constraints, and bare-slug dependencies exactly; represent every parent
dependency in at least one relevant child phase.

Re-read the complete artifact and fix structural, link, numbering, dependency,
status, or validation defects before reporting. Report the plan directory,
phase outline, assumptions, and open questions.
