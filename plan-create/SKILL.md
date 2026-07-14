---
name: plan-create
description: Create a durable directory-backed phased implementation plan without implementing it. Use only when the user explicitly asks to create, save, or persist an auditable plan; use plan-create-multi when they explicitly request a multi-workstream plan.
---

# Plan Create

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it. Do not implement.

Inspect the request, repository, tests, integration points, and local
constraints. Resolve only ambiguity that changes scope, sequencing, risk, or
acceptance; otherwise record reasonable assumptions. Capture the repository
baseline and dirty-worktree state required by the contract.

Design the fewest executable phases that preserve a working repository. Phase
links define display order; `## Dependencies` defines execution order. Record
affected areas and interfaces or invariants so an executor can understand
cross-phase consequences without loading every phase in full.

Use outcome-focused validation. Label material acceptance conditions `[Gate]`
and optional confidence checks `[Evidence]`. Each gate must state its expected
observable result and prerequisite. Use the fewest gates that would change the
decision to accept the phase. Do not make routine lint, typecheck, test, or
documentation commands gates unless they protect a material requirement.

Challenge each gate before writing it. Flag criteria that are ambiguous, stale,
environment-dependent without a known prerequisite, implementation-prescriptive,
broader than the objective, or disproportionate. Resolve concerns only when
repository evidence settles them; otherwise record an actionable open question
with the needed input, its effect, the recommended default, and alternatives.

Keep shared context in the index and phase-specific detail in phase files. For a
`plan-create-multi` child brief, use its supplied `output_dir`, global and child
goals, constraints, bare-slug dependencies, and coordination boundaries exactly.
Represent every parent dependency in at least one relevant child phase.

Write the contract-defined directory, index, and ordered phase files. Re-read
the complete artifact and fix structural, link, numbering, dependency, status,
coordination, and validation defects before reporting the directory, phase
outline, assumptions, and open questions.
