# Plan Directory Contract

Contract version: `plan-directory/v2`.

This contract defines shared artifacts and execution invariants for the
`plan-*` suite. It wins over individual plan-skill instructions, while system,
developer, and user instructions retain their normal higher priority.

## Layout and publication

A standalone plan lives at `<root>/<YYYY-MM-DD>-<slug>/` with `index.md` and
`phase-<NN>-<slug>.md` files. Use an existing workspace `plans/` root when the
user does not specify one. Never overwrite an existing plan; choose a `-2`,
`-3`, or later suffix before writing.

A multi-plan parent contains `index.md` and topologically ordered child
directories named `plan-<NN>-<slug>/`. Each child is an ordinary plan. Its unique
bare slug is its dependency identifier. A multi-plan parent is executable only
through `plan-auto-multi`, never as a single child plan.

Build a multi-plan tree in a hidden temporary sibling directory on the same
filesystem as its final destination. Create the parent and every child there,
validate the complete tree, then atomically rename it to the unused final path.
Never publish a parent with missing children. If interrupted before publication,
leave the final path absent and report the temporary path and resume action.

Execution skills accept a plan directory, its index, or a phase file.

## Plan index

```md
# [Name]

- Contract: plan-directory/v2
- Created: [ISO-8601 timestamp]
- Repository baseline: [commit and dirty summary | unavailable]

## Goal
- [Outcome]

## Constraints
- [Constraint]

## Assumptions
- [Relied-on assumption]

## Phases
1. [Phase 1: Name](phase-01-name.md)

## Open Questions
- [Optional cross-phase question]

## Revision History
- None yet.
```

Phase links define stable display order and selection priority, not implicit
execution dependencies. Links must be contiguous, unique, and resolve exactly.
Every phase file is linked exactly once. Indexes never contain live status.

Append a revision-history entry when assumptions, questions, phase order,
dependencies, coordination boundaries, or acceptance criteria change. Record the
timestamp, changed plan content, repository evidence, and reason. Do not record
ordinary code changes here.

## Multi-plan index

A parent index contains the same contract, creation, baseline, goal,
constraints, assumptions, open-question, and revision-history metadata plus
`## Overview`, `## Plan Dependency Graph`, and `## Plans`. Each plan entry links
its child directory and records exclusive scope, affected areas, interfaces,
goal, constraints, and `Depends on:` using unique bare slugs. An edge `a --> b`
means `b` depends on `a`. Entries, the Mermaid graph, and child phase-level
sibling dependencies must agree. The parent contains no live child status.

## Phase file

```md
# Phase <N>: [Name]

- Status: pending
- Objective: [Outcome]

## Deliverables
- [Checkable artifact]

## Dependencies
- [Phase <N> | sibling <slug> | none]

## Coordination
- Affected areas: [files, modules, services, or none]
- Interfaces and invariants: [contracts later work must preserve or none]

## Validation
- [Gate] [Command or observable result] — Expected: [result]
- [Evidence] [Optional confidence-building check] — Expected: [result]

## Notes
- [Only durable context useful to later phases or sibling plans]

## Execution History
- None yet.
```

The heading and zero-padded filename number must agree. Each phase has exactly
one status: `pending`, `in-progress`, `complete`, or `blocked`. Only `complete`
is done. A nonterminal phase carries one resumability note directly below its
status when needed:

```md
- Remaining:
  - [Safe unfinished work or validation]
```

```md
- Blocked on:
  - Blocker: [specific condition]
  - Human help requested: [smallest action the human can take]
  - Why this unblocks: [dependency or uncertainty it resolves]
  - Resume with: [exact next agent action after help arrives]
```

A complete phase carries neither note. Every blocker must request the smallest
useful human action, explain why it unblocks work, and give the exact resume
action. Include a recommended default and viable alternatives for decisions. If
no human action can clear it, state the external change and resume condition.

For a validation concern, also record the criterion, expected and actual
results, repository evidence, grounded approaches tried, and why the criterion
requires human clarification or revision. Do not label a difficult defect a
validation concern merely because multiple fixes failed.

## Execution history

Replace `- None yet.` with append-only entries:

```md
### [ISO-8601 timestamp] — execution
- Transition: [status sequence, such as pending -> in-progress -> complete]
- Baseline: [commit and relevant dirty state | unavailable]
- Changes: [files or artifacts changed | none]
- Validation:
  - [Gate or Evidence criterion] — [observed pass | observed fail | not run | uncertain] via [command or observation]
- Equivalent evidence: [original gate, same failure mode observed, and rationale | none]
- Deviations: [plan deviation and reason | none]
```

History is append-only. Correct an inaccurate prior entry with a new execution
entry; do not rewrite it. `## Notes` is forward-looking context, not an
execution log.

## Validation integrity

Validation must test the phase outcome rather than prescribe an implementation
unless that implementation is itself required. Use the fewest checks that would
change acceptance. A `[Gate]` protects a material correctness, safety,
compatibility, data-integrity, or explicit acceptance condition. `[Evidence]`
increases confidence but does not create work or block completion by itself.

Every gate must have a gate-by-gate result in execution history. A named command
is evidence rather than the objective, but alternative evidence satisfies it
only when it directly observes the same material behavior or failure mode. State
the equivalence rationale. Inference alone cannot satisfy a runnable executable-
behavior gate. If neither the named check nor direct equivalent evidence is
available, the phase retains a material evidence gap.

Legacy `[Required]` and `[Supplemental]` labels mean `[Gate]` and `[Evidence]`.
For unlabeled legacy entries, promote only material decision-changing checks.
Never invent a gate merely because a command appears in the file.

Report evidence as `observed pass`, `observed fail`, `not run`, or `uncertain`.
Do not claim a check passed when it was skipped or inferred.

A failed gate starts triage. Classify it as an implementation defect, tool or
environment problem, or validation concern. Retry only when the input,
implementation, environment, or failure hypothesis changes. A validation
concern is permitted only when repository evidence shows that the criterion is
ambiguous, stale, implementation-prescriptive, unrunnable, disproportionate, or
incompatible with the stated outcome and further implementation retries would
not resolve that mismatch. Never weaken or replace a gate silently.

## Dependencies and scheduling

`## Dependencies` is the execution graph. A phase is ready when every declared
phase dependency is `complete` and every sibling dependency's linked phases are
`complete`. `none` creates no dependency. Index order breaks ties among ready
phases; a blocked earlier phase does not prevent an independent later phase from
running.

A `sibling <slug>` dependency is valid only in a multi-plan child whose parent
entry declares that slug. Every parent dependency must appear in at least one
relevant child phase. Slugs must be unique and graphs acyclic.

Parallel execution is allowed only for phases or children with disjoint affected
areas, compatible interfaces, and no shared mutable validation, migration,
deployment, or generated state. One worker exclusively owns each delegated
phase file. The primary agent owns scheduling, shared integration, and final
validation.

## Status and revision ownership

- `plan-phase` owns phase transitions, `Remaining:`, `Blocked on:`, and execution
  history.
- `plan-reflect` never changes earned status or execution history. It records
  post-phase forward-looking notes in the pending phase or sibling that will
  consume them and may revise affected pending plan content. Use the executed
  phase only when no clear future destination exists.
- `plan-auto` and `plan-auto-multi` coordinate execution but do not maintain a
  competing status summary.
- Indexes never mirror live status.

Only pending phases may be renumbered. Update filenames, headings, links, and
dependencies together. Never renumber a started phase. Parent dependency edits
must update entries, the Mermaid graph, and affected child phases together. Every
plan revision receives an index revision-history entry.

## Structural validation and repair

Before creation completes, execution starts, or reflection begins, verify the
contract version, applicable schema, link integrity, numbering, legal statuses,
unique slugs, coordination fields, and dependency consistency.

Repair a defect automatically only when there is exactly one mechanical
interpretation and the repair cannot change scope, execution order, acceptance,
or earned status. Record and report the repair. Stop and request direction for
ambiguous, semantic, or destructive repairs. A temporary multi-plan tree may be
completed and validated before publication; never treat a partial final tree as
valid.

## Autonomous execution

`plan-auto` reads a cross-phase coordination digest, then executes ready phases
until every phase is complete or no ready phase can progress. `plan-phase`
performs implementation, validation, terminal status, and history in one pass.
After a terminal phase result, `plan-reflect` reads the execution record without
rerunning verification and records only learnings that improve pending phases or
sibling plans. An unexpected interruption may leave `in-progress` with exact
`Remaining:` work; resume it without repeating completed inspection or
implementation.

`plan-auto-multi` schedules ready child plans from the parent dependency graph
and runs `plan-auto` for each. A blocked branch does not stop independent ready
branches. Both orchestrators may use bounded parallel agents only under the
isolation rules above.

Use available approval and escalation mechanisms before recording an approval-
dependent blocker. Continue while safe, evidence-based, in-scope work remains.
Do not repeat an unchanged failure or create work for a non-material evidence
gap. Reflection is a lightweight learning step, not a second verification pass.
