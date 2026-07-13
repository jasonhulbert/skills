---
name: plan-create
description: Create a durable directory-backed phased implementation plan. Use for multi-step software work; use plan-task for a focused one-pass change and plan-multi for a large multi-workstream effort.
---

# Plan Create

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it. Do not implement.

Inspect the request, repository, tests, integration points, and local
constraints. Resolve only ambiguity that changes scope, sequencing, risk, or
acceptance; otherwise state reasonable assumptions.

Design executable phases with an objective, checkable deliverables,
dependencies, and minimal falsifiable validation. Validation should measure the
outcome rather than prescribe the implementation. Label completion gates
`[Required]` and confidence-building checks `[Supplemental]`; keep the
required set small, non-duplicative, and grounded in commands or observable
results with explicit expected outcomes.

Challenge validation before writing it. Flag criteria that are ambiguous,
stale, environment-dependent without a known prerequisite, implementation-
prescriptive, broader than the phase objective, or disproportionate to the
requested outcome. Resolve concerns only when repository evidence settles them;
otherwise record them as open questions and report them. Do not hide them in an
unbounded validation list.

Keep shared context in the index and phase-specific detail in its phase file.

Write the contract-defined directory, index, and ordered phase files. For a
`plan-multi` child brief, use its supplied `output_dir`, global and child goals,
constraints, and bare-slug dependencies exactly; represent every parent
dependency in at least one relevant child phase.

Re-read the complete artifact and fix structural, link, numbering, dependency,
status, or validation defects before reporting. Report the plan directory,
phase outline, assumptions, and open questions.
