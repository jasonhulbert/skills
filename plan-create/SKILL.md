---
name: plan-create
description: Resolve critical ambiguity, then create a durable directory-backed phased implementation plan without implementing it. Use only when the user explicitly asks to create, save, or persist an auditable plan; use plan-create-multi when they explicitly request a multi-workstream plan.
---

# Plan Create

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it. Do not implement.

## Critical alignment

For a direct plan request, inspect the request, repository, tests, integration
points, and local constraints before writing plan files. Build a provisional
brief covering the outcome, scope and non-goals, material constraints,
acceptance conditions, assumptions, and risks.

Resolve facts from available evidence. Identify only ambiguities that are costly
to reverse, affect multiple downstream choices, create significant risk, or
could invalidate the plan. Recommend and record a reasonable default for
low-risk or reversible gaps.

When a critical ambiguity requires user judgment, pause before creating the plan
directory and ask one primary question at a time. Briefly state why it matters,
recommend an answer with reasoning, and explain the consequence of choosing
differently. Order questions by dependency and impact. After several decisions,
summarize what is settled and what remains uncertain.

Continue to planning when the user confirms sufficient alignment, explicitly
authorizes proceeding with stated assumptions, or the remaining uncertainty is
low-risk, reversible, or better resolved during implementation. If inspection
finds no critical ambiguity, proceed without asking a ceremonial question. Do
not write a partial plan while alignment is pending.

For a `plan-create-multi` child brief, treat the parent-approved brief as the
alignment decision. Use its supplied `output_dir`, global and child goals,
constraints, bare-slug dependencies, and coordination boundaries exactly. If
the brief contains a critical contradiction or omission, return the issue to the
parent coordinator instead of interviewing the user or writing a partial child.

Capture the repository baseline and dirty-worktree state required by the
contract.

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

Keep shared context in the index and phase-specific detail in phase files.
Represent every parent dependency in at least one relevant child phase.

Write the contract-defined directory, index, and ordered phase files. Re-read
the complete artifact and fix structural, link, numbering, dependency, status,
coordination, and validation defects before reporting the directory, phase
outline, assumptions, and open questions.
