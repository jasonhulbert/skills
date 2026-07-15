---
name: plan-create
description: Align on and save a delivery-first rolling plan for the next usable software increment without implementing it. Use when the user explicitly asks to create, save, or persist a plan, including work that may need multiple coordinated workstreams.
---

# Plan Create

Read `../plan-shared/PLAN-CONTRACT.md` completely and follow it. Do not
implement the software.

## Align before writing

Inspect the request, repository, tests, integration points, and local
constraints. Build a provisional brief covering the next usable outcome,
non-goals, constraints, assumptions, important risks, and what would make the
increment useful.

Resolve facts from evidence. Recommend defaults for reversible choices. Ask one
primary question at a time only when user judgment would change direction,
scope, risk acceptance, or the plan shape. State why the question matters, give
a recommended answer, and explain the consequence of choosing differently.
Do not create partial plan files while critical alignment is pending.

Propose a `[Hold]` only for a condition that would make continued execution
unsafe, destructive, or strategically invalid. Explain the unacceptable
outcome, clearing condition, and owner, and obtain explicit user agreement
before recording a planned hold. Do not turn desired evidence or general
caution into a hold.

Proceed once the user confirms alignment, authorizes stated assumptions, or all
remaining uncertainty is reversible or better resolved by implementation. If
there is no critical ambiguity or proposed hold, proceed without ceremonial
questions.

## Plan the next increment

Plan through the next integrated, usable increment. Keep later work as coarse
direction or non-goals; do not detail an entire product lifecycle when current
implementation will change later decisions.

Define the increment as the smallest end-to-end slice that a target user or
operator can run, observe, and learn from. Do not rename an entire MVP, v1, or
production release as one increment. When the request spans several capability
layers or lifecycle stages and the repository does not already support them,
recommend a narrow first slice and obtain confirmation before writing. Defer
authentication, billing, administration, distribution, and production readiness
unless they are necessary to the immediate user scenario or already-established
foundation.

Use the fewest coherent work items that preserve a working repository. Create a
multi-workstream plan only when distinct areas must advance independently to
make the same near-term scenario usable. Do not use workstreams to preserve a
full-product decomposition that should instead be deferred. Treat affected
areas as coordination guidance, not hard ownership boundaries.

Define confidence targets as risks or behaviors worth observing. Do not
precommit exhaustive checks or commands. Include an exact command only when an
existing stable harness directly measures an important target. Confidence
targets never become holds implicitly.

Do not create a work item whose primary outcome is verification, gate clearing,
release evidence, or confidence collection for earlier work. Gather confidence
while delivering the relevant outcome. Plan test infrastructure or tooling as
work only when it is itself an agreed reusable capability, not a way to force
confidence to `verified`.

Write the contract-defined plan. For a multi-workstream plan, construct the
entire tree in a hidden temporary sibling on the same filesystem, validate it,
then atomically rename it to the unused final path. Re-read the artifact and fix
structural, dependency, scope, hold, and link defects before reporting its
location, increment, work outline, approved holds, assumptions, and deferred
direction.
