# Plan Delivery Contract

Contract version: `plan-directory/v4`.

This contract defines durable operational memory for `plan-create` and
`plan-run`. It separates the complete destination from the current execution
horizon:

- A **goal roadmap** preserves the complete outcome, progress, and coarse path.
- An **execution plan** contains actionable work for a standalone outcome or one
  roadmap milestone.

Plans exist to align direction, coordinate work, resume execution, and expose
decisions and risk. They are not exhaustive verification ledgers.

## Planning horizon

Use one standalone execution plan when the complete requested outcome can be
planned coherently now. Use a goal roadmap when later detail would be
speculative, but preserve the complete goal and its completion criteria.

Choose the largest coherent execution horizon that can be planned responsibly
without likely replanning from known uncertainty. Size and breadth alone do not
require decomposition. Split at unresolved decisions, unstable interfaces,
meaningful unknowns, sequencing boundaries, or coordination boundaries.

Every roadmap milestone represents an observable outcome and is intended to
become one execution plan. Keep future milestones coarse until they are ready
to plan. Every goal completion criterion must map to a milestone or an explicit
exclusion.

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

A standalone plan lives at `<root>/<YYYY-MM-DD>-<slug>/` with `index.md` and
contiguous `work-<NN>-<slug>.md` files.

A goal roadmap lives at `<root>/<YYYY-MM-DD>-<goal-slug>/roadmap.md`. A detailed
milestone plan lives at `milestone-<NN>-<slug>/` beneath that directory. Do not
create a milestone directory until its plan is elaborated. Each milestone maps
to at most one execution plan, and each detailed milestone plan links back to
its roadmap and milestone ID.

An execution plan may use multiple workstreams. Replace its direct work files
with topologically ordered `workstream-<NN>-<slug>/` child plans. Each child is
an ordinary work plan governed by the execution plan index.

Use an existing workspace `plans/` root unless the user selects another
location. Never overwrite an existing artifact; choose a numeric suffix when
needed. Build every new standalone plan or initial roadmap tree completely in a
hidden temporary sibling on the same filesystem, validate it, then atomically
rename it to the final path. Build a later milestone plan in a hidden sibling
within the roadmap, validate and rename it, then update `roadmap.md`. Never
publish a partial plan or placeholder milestone directory.

`plan-run` accepts a roadmap directory or file, execution-plan directory or
index, workstream directory, or work file and auto-detects its shape.

## Goal roadmap

```md
# [Goal name]

- Contract: plan-directory/v4
- Artifact: goal-roadmap
- Created: [ISO-8601 timestamp]
- Repository baseline: [commit and relevant dirty state | unavailable]

## Goal
- Outcome: [complete requested destination]
- Done when:
  - [Observable completion criterion]

## Explicit Exclusions
- [Outcome intentionally outside the complete goal | None.]

## Constraints
- [Constraint]

## Assumptions
- [Relied-on assumption]

## Milestones
1. `milestone-01-slug` — [Name]
   - Status: [pending | planned | active | done | deferred | superseded]
   - Outcome: [observable result]
   - Useful when: [user or operator value]
   - Depends on: [milestone IDs | none]
   - Plan: [Execution plan](milestone-01-slug/index.md)
   - Key uncertainties: [decision-relevant unknowns | none]
   - Result: [observable delivered result | Not delivered yet.]

## Goal Coverage
- [Completion criterion] → [milestone ID | Explicit exclusion]

## Decisions and Changes
- None yet.
```

For an unplanned milestone, use `- Plan: Not planned yet.` instead of a link.

Milestone IDs are contiguous and stable. Order is expected progression;
dependencies determine readiness. A milestone is:

- `pending` when its outcome is retained but not detailed;
- `planned` when its linked execution plan is ready;
- `active` after execution begins;
- `done` when its observable outcome is delivered;
- `deferred` when intentionally postponed without leaving the goal; or
- `superseded` when replaced, merged, or removed by a recorded decision.

A superseded milestone must name its replacement or the goal change that made
it unnecessary. Never use `superseded` to hide unfinished scope. A roadmap is
complete only when every non-excluded completion criterion is covered by done
milestones. Preserve milestone results and decision history when later plans
change.

## Execution plan index

```md
# [Name]

- Contract: plan-directory/v4
- Artifact: execution-plan
- Created: [ISO-8601 timestamp]
- Repository baseline: [commit and relevant dirty state | unavailable]
- Goal roadmap: [Goal roadmap](../roadmap.md)
- Milestone: [milestone-NN-slug | Standalone.]

## Outcome
- Deliver: [integrated, usable result]
- Useful when: [observable user or operator value]

## Scope
- Includes: [planned outcome boundary]
- Later roadmap milestones: [milestone IDs | None.]
- Goal exclusions: [roadmap exclusions | None.]

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

For a standalone plan, use `- Goal roadmap: None.` and
`- Milestone: Standalone.`.

For each approved hold, replace `None` with:

```md
- [Hold] [Condition] — Prevents: [unacceptable outcome]; clear when: [minimum
  evidence or decision]; owner: [user, agent, or external party].
```

Planned holds require explicit user agreement. Confidence targets never imply a
hold.

For a multi-workstream execution plan, replace `## Work` with
`## Workstreams`. Each entry links its child directory and states its outcome,
affected areas, interfaces, and bare-slug dependencies. Include a
`## Dependency Graph` Mermaid diagram. Entries, graph edges, and child
dependencies must agree. An edge `a --> b` means `b` depends on `a`.

Index order is display order and a scheduling tiebreaker. Dependencies define
readiness. Use relative Markdown links between planning artifacts. Links must be
contiguous, unique, and resolve exactly.

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
workstream dependency's linked work is `done`. A roadmap milestone plan is
ready when the milestone is `planned` or `active` and all milestone dependencies
are `done`. Confidence state has no effect on readiness. Resume `working` work
before starting new ready work when practical. Continue independent work when
another item is blocked.

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
or a chronological narration. Preserve raw logs in normal test or build
artifacts when they matter.

Set the work item's aggregate confidence to the most informative honest summary
of its targets. Use `verified` only when all important targets have direct
support. Use `partial` for mixed or incomplete support, `failed` for an observed
behavior gap, `unavailable` when the environment prevents observation, and
`deferred` when checking was intentionally postponed.

## Decisions, learning, and scope

Record only decisions and changes that alter the goal, constraints, approved
holds, milestone shape, work decomposition, dependencies, or meaningful risk.
Include timestamp, decision, reason, and affected work. Update future work
directly when execution invalidates it. There is no separate reflection log.

When a milestone finishes, update its roadmap status and result. Reconcile
every goal completion criterion against done and remaining milestones. Carry
only decision-relevant learning into future milestones. Revise their outcome,
order, dependencies, or uncertainties when warranted, and record why. Do not
invent detailed work before elaboration and never silently drop a criterion.

Affected areas and workstream scopes guide coordination. They are not ownership
fences. A small cross-boundary fix is allowed when it is the shortest safe path
to the planned outcome; record the deviation. Replan or ask the user when the
change expands the complete goal, violates a constraint, accepts meaningful
product risk, or materially changes milestone or workstream structure.

During parallel execution, one worker exclusively owns each delegated work file
and mutable implementation area. Shared integration, generated state,
deployments, migrations, roadmap updates, and external effects require explicit
coordination.

## Confidence triage

Choose checks after implementation based on confidence targets and actual
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
artifact type, layout, links, numbering, legal states, dependency consistency,
unique slugs, goal coverage, roadmap back-links, and approved-hold format.

Repair only defects with one mechanical interpretation that cannot change the
goal, direction, dependencies, holds, or earned delivery state. Record the
repair in `Decisions and Changes`. Ask before semantic, ambiguous, or
destructive repair.
