# Plan Delivery Contract

Contract version: `plan-directory/v3`.

This contract defines durable operational memory for `plan-create` and
`plan-run`. Plans exist to align direction, coordinate work, resume execution,
and expose decisions and risk. They are not exhaustive verification ledgers.

A plan covers the smallest end-to-end increment that a target user or operator
can run, observe, and learn from. An MVP, v1, complete product, or production
release is not one increment merely because it has a single label. Defer later
capabilities and lifecycle stages when implementing the current slice will
change their design.

## Core semantics

Delivery and confidence are independent.

- Delivery answers whether planned software work remains: `pending`, `working`,
  `done`, or `blocked`.
- Confidence reports current evidence: `unassessed`, `verified`, `partial`,
  `failed`, `unavailable`, or `deferred`.

Confidence never controls dependency readiness. A work item may be `done` with
less than verified confidence. `Done` means its deliverables exist, its intended
outcome is usable, and no known defect prevents that intended use. It does not
claim exhaustive correctness.

Only an explicitly approved `[Hold]`, a concrete defect with no safe path,
required user or external action, or a direction-changing decision may block
delivery. Missing evidence, unavailable environments, credentials, harness
failures, skipped checks, and uncertainty are not blockers by themselves.

## Layout and publication

A single plan lives at `<root>/<YYYY-MM-DD>-<slug>/` with `index.md` and
contiguous `work-<NN>-<slug>.md` files. Use an existing workspace `plans/` root
unless the user selects another location. Never overwrite an existing plan;
choose a numeric suffix.

A multi-workstream plan uses the same parent index plus topologically ordered
`workstream-<NN>-<slug>/` child plans. Each child is an ordinary plan. Build the
complete tree in a hidden temporary sibling on the same filesystem, validate
it, then atomically rename it to the unused final path. Never publish a partial
multi-workstream plan.

`plan-run` accepts a plan directory, index, workstream directory, or work file
and auto-detects its shape.

## Plan index

```md
# [Name]

- Contract: plan-directory/v3
- Created: [ISO-8601 timestamp]
- Repository baseline: [commit and relevant dirty state | unavailable]

## Increment
- Outcome: [next integrated, usable result]
- Useful when: [observable user or operator value]

## Non-goals
- [Deferred direction or explicit exclusion]

## Constraints
- [Constraint]

## Assumptions
- [Relied-on assumption]

## Approved Holds
- None.

## Confidence Strategy
- [Risk or behavior worth observing; no exhaustive command list]

## Work
1. [Work 1: Name](work-01-name.md)

## Decisions and Changes
- None yet.
```

For each approved hold, replace `None` with:

```md
- [Hold] [Condition] — Prevents: [unacceptable outcome]; clear when: [minimum
  evidence or decision]; owner: [user, agent, or external party].
```

Planned holds require explicit user agreement. Confidence targets never imply a
hold.

For a multi-workstream parent, replace `## Work` with `## Workstreams`. Each
entry links its child directory and states its outcome, affected areas,
interfaces, and bare-slug dependencies. Include a `## Dependency Graph` Mermaid
diagram. Entries, graph edges, and child dependencies must agree. An edge
`a --> b` means `b` depends on `a`.

Index order is display order and a scheduling tiebreaker. Dependencies define
readiness. Links must be contiguous, unique, and resolve exactly.

## Work item

```md
# Work <N>: [Name]

- Delivery: pending
- Confidence: unassessed
- Outcome: [coherent result]

## Deliverables
- [Checkable software or artifact]

## Dependencies
- [Work <N> | workstream <slug> | none]

## Coordination
- Affected areas: [files, modules, services, or none]
- Interfaces and invariants: [contracts to preserve or none]

## Holds
- None additional.

## Confidence Targets
- [Risk or behavior] — Desired observation: [proportionate evidence]

## Notes
- [Only durable context useful to this or later work]

## Outcome Record
- None yet.
```

The heading and zero-padded filename number must agree. Every work file is
linked once. Delivery and confidence must each use exactly one legal value.

When delivery is `blocked`, insert this section before `## Outcome Record`:

```md
## Blocked On
- Classification: [approved hold | product defect | user action | external state | direction decision]
- Product impact: [why work cannot safely continue]
- Recommendation: [preferred clearing action]
- Alternatives: [viable alternatives or none]
- Owner: [user, agent, or external party]
- Clear when: [observable continuation condition]
```

Remove the section when the condition clears; preserve its resolution in the
next outcome record. Never use `Blocked On` for a confidence gap alone.

Work is ready when every declared work dependency is `done` and every declared
workstream dependency's linked work is `done`. Confidence state has no effect on
readiness. Resume `working` work before starting new ready work when practical.
Continue independent work when another item is blocked.

## Outcome records

Replace `None yet` with one concise entry per execution session:

```md
### [ISO-8601 timestamp]
- Delivered: [observable result or none]
- Confidence:
  - [Target] — [verified | partial | failed | unavailable | deferred] via [brief observation]
- Known issues and follow-ups: [material item, owner, and recommendation | none]
- Decisions and deviations: [direction or scope change and reason | none]
- Resume: [next useful action | complete]
```

Do not include command transcripts, repeated attempts, routine passing checks,
or a chronological narration. Preserve raw logs in the normal test or build
artifacts when they matter.

Set the work item's aggregate confidence to the most informative honest summary
of its targets. Use `verified` only when all important targets have direct
support. Use `partial` for mixed or incomplete support, `failed` for an observed
behavior gap, `unavailable` when the environment prevents observation, and
`deferred` when checking was intentionally postponed.

## Decisions, learning, and scope

Record only decisions and changes that alter direction, constraints, approved
holds, work decomposition, dependencies, or meaningful risk. Include timestamp,
decision, reason, and affected work. Update future work directly when execution
invalidates it. There is no separate reflection log.

Affected areas and workstream scopes guide coordination. They are not ownership
fences. A small cross-boundary fix is allowed when it is the shortest safe path
to the increment; record the deviation. Replan or ask the user when the change
expands the product outcome, violates a constraint, accepts meaningful product
risk, or materially changes the workstream graph.

During parallel execution, one worker exclusively owns each delegated work file
and mutable implementation area. Shared integration, generated state,
deployments, migrations, and external effects require explicit coordination.

## Confidence triage

Choose checks after implementation based on the confidence targets and actual
risks. Exact planned commands are evidence, not completion requirements.

Do not create separate work whose primary purpose is to verify earlier work or
clear confidence targets. Gather confidence alongside the outcome it informs.
Testing infrastructure is delivery work only when it is an agreed reusable
capability, not when it exists solely to force a confidence state.

Classify a failed or unavailable check as a product defect, harness defect,
environment limitation, or inconclusive evidence. Fix product defects that
prevent intended use. For a non-hold verification problem, make at most one
small remediation attempt based on a changed hypothesis when worthwhile, then
record the gap and continue. Never add product behavior solely to make a check
observable or repeat an unchanged attempt.

When human attention is required, report the classification, product impact,
recommended action, alternatives, owner, and exact continuation condition.

## Structural validation and repair

Before creation completes or execution starts, verify the contract version,
layout, links, numbering, legal states, dependency consistency, unique
workstream slugs, and approved-hold format.

Repair only defects with one mechanical interpretation that cannot change
direction, dependencies, holds, or earned delivery state. Record the repair in
`Decisions and Changes`. Ask before semantic, ambiguous, or destructive repair.
