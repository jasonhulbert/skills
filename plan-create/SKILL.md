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
dependencies, falsifiable validation, and only necessary execution notes. Keep
shared context in the index and phase-specific detail in its phase file.

Write the contract-defined directory, index, and ordered phase files. For a
`plan-multi` child brief, use its supplied `output_dir`, global and child goals,
constraints, and bare-slug dependencies exactly; represent every parent
dependency in at least one relevant child phase.

Re-read the complete artifact and fix structural, link, numbering, dependency,
status, or validation defects before reporting. Report the plan directory,
phase outline, assumptions, and open questions.
