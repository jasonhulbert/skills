---
name: plan-run
description: Execute a saved delivery-first standalone plan, roadmap milestone, or ready portion of a goal roadmap while tracking delivery separately from confidence. Use when the user asks to run, continue, or finish a saved plan, roadmap, milestone, workstream, or work item.
---

# Plan Run

Read `../plan-shared/PLAN-CONTRACT.md` completely and follow it.

## Orient and schedule

Resolve the requested roadmap, milestone plan, standalone plan, workstream, or
work item and validate its structure. Read the goal, milestone outcome,
constraints, approved holds, decisions, dependencies, coordination areas,
delivery states, and durable notes. Auto-detect standalone, roadmap-backed,
single-workstream, and multi-workstream artifacts.

When running a goal roadmap, select ready linked milestone plans in dependency
order. Execute planned or active milestones until the requested goal is
delivered, no detailed ready milestone remains, or no work can safely progress.
Do not invent detailed work for an unplanned milestone. Report it as the next
planning action, not as a delivery blocker.

When running an execution plan, execute ready work until its outcome is
delivered or no work can safely progress. Dependency readiness is based only on
delivery state, never confidence state. Continue independent work when another
item is blocked.

Use bounded parallel agents only for ready work with compatible interfaces and
isolated mutable files, generated state, and external effects. Give one worker
exclusive ownership of each delegated work file and implementation area. Keep
shared integration, conflict resolution, roadmap updates, and final reporting
with the primary agent.

## Deliver the outcome

For a roadmap-backed plan, set its milestone to `active` when execution begins.
Set ready work to `working`, then implement the smallest sound change that
delivers its outcome. Preserve a working repository at useful boundaries. Add
behavior-focused tests when behavior changes.

Treat planned affected areas as coordination guidance. Make a small necessary
cross-item or cross-workstream fix when it is the shortest safe path to the
outcome, then record the deviation and update affected notes. Ask before a
change that expands the goal, violates an agreed constraint, accepts meaningful
product risk, or is large enough to require replanning.

## Build confidence without chasing it

Choose proportionate checks after seeing the implementation and environment.
Use confidence targets and material risks, not a desire to make every possible
check pass. Run exact planned commands when they remain relevant and feasible,
but treat them as evidence rather than the objective.

When a check fails or cannot run:

1. Classify it as a product defect, harness defect, environment limitation, or
   inconclusive evidence.
2. Determine whether it prevents the intended use or violates an approved
   `[Hold]`.
3. Fix a concrete in-scope product defect when it blocks the intended use.
4. For a non-hold verification problem, make at most one small remediation
   attempt based on a changed hypothesis when the likely value justifies it.
5. Otherwise record the confidence gap and recommended follow-up, then continue.

Never add product behavior solely to make a check observable. Never repeat an
unchanged command or hypothesis. A harness problem, unavailable environment,
missing credential, skipped check, or uncertain observation does not by itself
block delivery.

## Maintain delivery memory

Mark work `done` when its planned deliverables exist, its intended outcome is
usable, and no known defect prevents that intended use. Confidence may remain
`partial`, `failed`, `unavailable`, or `deferred`; it does not control delivery
or dependency readiness.

Mark work `blocked` only when:

- an approved hold is unmet;
- a concrete defect makes further work unsafe or invalid and no safe in-scope
  path remains;
- required user action or an external state change is necessary; or
- a direction decision would change scope, constraints, or meaningful risk.

When blocked or requesting a decision, give a short brief with the
classification, product impact, recommendation, alternatives, action owner, and
exact continuation condition. Persist that brief in `Blocked On` while the item
is blocked and remove it when resolved. Do not promote uncertainty or missing
evidence into a hold.

Update the concise outcome record once per execution session. Record delivered
behavior, confidence by target, known defects or follow-ups, and important
decisions or deviations. Do not copy command transcripts, narrate retries, or
run a separate reflection pass. Update future work directly when new learning
makes it stale.

When a roadmap milestone outcome is delivered, mark it `done`, summarize the
observable result, and reconcile goal coverage. Carry only decision-relevant
learning into pending milestones. Revise, reorder, merge, split, defer, or
supersede future milestones when the evidence warrants it; preserve the prior
decision and reason in the roadmap. Never silently drop a goal criterion.

Report delivered work first, then overall goal progress, confidence gaps,
blockers or required decisions, roadmap changes, and the next useful action. If
the next milestone has no detailed plan, name it as ready for `plan-create`
instead of asking the user to reconstruct what remains.
