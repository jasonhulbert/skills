---
name: plan-create
description: Align on and save a delivery-first software plan, either as a standalone execution plan or as a durable goal roadmap with a just-in-time milestone plan. Use when the user explicitly asks to create, save, persist, expand, or revise a plan or roadmap, including work that may need multiple coordinated workstreams.
---

# Plan Create

Read `../plan-shared/PLAN-CONTRACT.md` completely and follow it. Do not
implement the software.

## Align on the destination

Inspect the request, repository, tests, integration points, existing planning
artifacts, and local constraints. First capture the user's complete intended
goal and observable completion criteria. Do not silently reduce that goal to
the next implementation step.

Resolve facts from evidence. Recommend defaults for reversible choices. Ask one
primary question at a time only when user judgment would change direction,
scope, risk acceptance, roadmap shape, or the current execution horizon. State
why the question matters, give a recommended answer, and explain the
consequence of choosing differently. Do not create partial artifacts while
critical alignment is pending.

Propose a `[Hold]` only for a condition that would make continued execution
unsafe, destructive, or strategically invalid. Explain the unacceptable
outcome, clearing condition, and owner, and obtain explicit user agreement
before recording a planned hold. Do not turn desired evidence or general
caution into a hold.

Proceed once the user confirms alignment, authorizes stated assumptions, or all
remaining uncertainty is reversible or better resolved by implementation. If
there is no critical ambiguity or proposed hold, proceed without ceremonial
questions.

## Choose the planning horizon

Create one standalone execution plan when the complete requested outcome can be
planned coherently now. Otherwise create a goal roadmap covering the complete
outcome and a detailed execution plan for its first milestone. Create only a
roadmap when the user explicitly requests roadmap-only work.

Choose the largest coherent execution horizon that can be planned responsibly
without likely replanning from known uncertainty. A plan may deliver a large
feature, subsystem, or several related capabilities. Do not split work merely
because it is large or crosses capability layers. Split it when unresolved
product decisions, unstable interfaces, meaningful unknowns, sequencing, or
coordination make later detail speculative.

For a roadmap:

- define outcome-oriented milestones that collectively cover the complete goal;
- intend each milestone to become one execution plan, reshaping the milestone
  before planning if necessary;
- map every goal completion criterion to a milestone or explicit exclusion;
- distinguish deferred milestones from exclusions;
- keep unplanned milestones coarse, recording outcomes, dependencies, and
  decision-relevant uncertainties rather than speculative task lists; and
- detail the current milestone using present repository evidence and durable
  learning from completed milestones.

When expanding an existing roadmap, re-check its goal coverage and current
state. Update stale milestone outcomes, dependencies, or ordering only when
evidence requires it, and record the reason. Do not rewrite completed history.

## Design executable work

Use the fewest coherent work items that preserve a working repository. Create a
multi-workstream execution plan only when distinct areas can advance
independently toward the same milestone outcome. Treat affected areas as
coordination guidance, not hard ownership boundaries.

Define confidence targets as risks or behaviors worth observing. Do not
precommit exhaustive checks or commands. Include an exact command only when an
existing stable harness directly measures an important target. Confidence
targets never become holds implicitly.

Do not create a work item whose primary outcome is verification, gate clearing,
release evidence, or confidence collection for earlier work. Gather confidence
while delivering the relevant outcome. Plan test infrastructure or tooling as
work only when it is itself an agreed reusable capability.

Write the contract-defined artifact. Construct every new standalone plan or
initial roadmap tree completely in a hidden temporary sibling on the same
filesystem, validate it, then atomically rename it to the unused final path.
Construct a newly elaborated milestone plan in a hidden sibling inside its
roadmap, validate and publish it, then link it from the roadmap. Never publish a
partial execution plan or placeholder milestone directory.

Re-read the result and fix structural, dependency, coverage, scope, hold, and
link defects. Use relative Markdown links for every relationship between
planning artifacts. Report the complete goal, planning horizon, roadmap summary
when present, current execution outcome, approved holds, assumptions, and
artifact location.
