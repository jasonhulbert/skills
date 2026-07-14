# Plan Directory Contract

This contract defines the shared artifact and execution invariants for
`plan-*` skills. It wins over individual skills.

## Layout

A standalone plan lives at `<root>/<YYYY-MM-DD>-<slug>/` with `index.md` and
`phase-<NN>-<slug>.md` files. Use an existing workspace `plans/` root when the
user does not specify one. Never overwrite an existing plan; suffix its
directory with `-2`, `-3`, and so on.

A multi-plan parent contains `index.md` and topologically ordered child
directories named `plan-<NN>-<slug>/`. Each child is an ordinary plan. Its bare
slug is its dependency identifier.

Execution skills accept a plan directory, its index, or a phase file. A
multi-plan parent is not directly executable.

## Plan index

```md
# [Name]

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
```

Phase links define order. They must be contiguous, unique, and resolve exactly.
Every phase file is linked exactly once. Indexes never contain live status.

## Multi-plan index

A parent index contains `#`, `## Goal`, `## Overview`, `## Global Constraints`,
`## Assumptions`, `## Plan Dependency Graph`, and `## Plans`. Each plan entry
links its child directory and records scope, goal, constraints, and `Depends
on:` using bare slugs. An edge `a --> b` means `b` depends on `a`. The entries,
Mermaid graph, and child phase-level sibling dependencies must agree. An
optional `## Open Questions` may follow.

## Phase file

```md
# Phase <N>: [Name]

- Status: pending
- Objective: [Outcome]

## Deliverables
- [Checkable artifact]

## Dependencies
- [Phase <N> | sibling <slug> | none]

## Validation
- [Gate] [Material acceptance check]
- [Evidence] [Optional confidence-building check]

## Notes
- [Optional execution context]
```

The heading and zero-padded filename number must agree. Each phase has exactly
one status: `pending`, `in-progress`, `complete`, or `blocked`. Only `complete`
is done. `plan-reflect` places one resumability note directly below a nonterminal
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

A complete phase carries neither `Remaining:` nor `Blocked on:` note. It may
retain a concise `## Notes` entry describing a non-material verification gap.

For a validation concern, make the blocker actionable:

```md
- Blocked on:
  - Validation concern: [criterion]
  - Expected: [required result]
  - Actual: [observed result]
  - Evidence: [repository or environment evidence]
  - Approaches tried: [distinct grounded approaches]
  - Human help requested: [clarification, approval, or criterion revision]
  - Why this unblocks: [decision or uncertainty it resolves]
  - Resume with: [exact next agent action after help arrives]
```

Every blocked phase must make the human handoff actionable. Ask for the
smallest useful action, such as a decision, file or input, access, approval, or
external change. Explain why that action unblocks the phase and what the agent
will do next. When the blocker presents a choice, include a recommended default
and the viable alternatives or tradeoffs. Do not end with a cryptic blocker or
a generic request to "advise". If no human action can clear the blocker, state
the external change required and the condition for resuming.

Validation entries should identify a command or observable result and its
expected outcome. They must test the phase outcome, not prescribe an
implementation unless that implementation is itself a requirement. Use the
fewest checks that would change the decision to accept the phase. A `[Gate]`
must protect a material correctness, safety, compatibility, data-integrity, or
explicit user-acceptance condition. An `[Evidence]` check increases confidence
but does not create work or block completion by itself. A gate may be satisfied
by equivalent evidence; the named command is not the goal.

Entries may use the legacy labels `[Required]` and `[Supplemental]`. Treat
`[Required]` as `[Gate]` and `[Supplemental]` as `[Evidence]`. For unlabeled
legacy entries, use judgment: promote an entry to a gate only when it is
material and decision-changing; otherwise treat it as evidence. Never invent a
hard gate merely because a check appears in the file. Record non-material
verification gaps under `## Notes` without adding `Remaining:` or `Blocked on:`.

Completion is outcome-first: the objective and deliverables must be achieved,
material acceptance conditions must have proportionate evidence, and no
material defect or constraint violation may remain. A check is evidence for
that decision, not a competing objective.

Report evidence with a calibrated status such as `observed`, `inferred`, `not
run`, or `uncertain`. Reserve `pass` for an observed result that matches the
expected outcome. Do not turn an unavailable command into a claim that the
underlying behavior is correct.

## Dependencies

Earlier phase dependencies require `complete`. A `sibling <slug>` dependency is
valid only in a multi-plan child whose parent entry declares that slug. Verify a
sibling by reading its index and linked phase status lines; every phase must be
`complete`. Every parent dependency must appear in at least one child phase.

## Status ownership

- `plan-phase`: `pending → in-progress`; `blocked → in-progress` only after
  verifying resolution and removing `Blocked on:`.
- `plan-reflect`: `in-progress → complete|blocked` and all `Remaining:` or
  `Blocked on:` edits.
- Indexes never mirror status.

`plan-reflect` may revise affected later phase files. It may insert a
prerequisite by renumbering only pending phases, updating filenames, headings,
links, and dependencies together. Never renumber a started phase. Parent
dependency edits must update the entry and Mermaid graph together.
If a prerequisite must precede a started phase, block it and require follow-up
work rather than rewriting history.

## Structural validation

Before execution or reflection, verify the applicable schema, link integrity,
numbering, legal statuses, and dependency consistency. Stop and name malformed
artifacts; do not guess or silently repair them.

## Validation failures

A failed gate starts triage, not an open-ended retry loop. Classify it as an
implementation defect, a tool or environment problem, or a validation concern.
An evidence check is not a remediation target unless it reveals a material
defect or changes confidence in the goal. A retry is justified only when the
input, implementation, environment, or failure hypothesis changes; never repeat
an unchanged failing command or approach. Pursue distinct grounded alternatives
when new evidence supports them. If two materially distinct approaches produce
the same material failure, or the criterion is ambiguous, stale,
implementation-prescriptive, unrunnable, or disproportionate to the phase
outcome, stop remediation and surface a validation concern.

A validation concern is a permitted blocker when repository evidence supports
it and the phase cannot be completed without weakening, redefining, or
otherwise deciding a material criterion. Record it under `Blocked on:` with the
criterion, expected and actual results, evidence, approaches tried, the
specific human help requested and resume action. Do not silently weaken a gate,
replace it with an easier check, or mark the phase complete to avoid a material
concern.

## Autonomous execution

When the user requests execution and reflection together, or invokes
`plan-auto`, loop:

1. `plan-phase` implements until the objective is achieved and no safe,
   in-scope material work remains or a concrete permitted blocker prevents
   progress. It gathers proportionate evidence rather than pursuing every
   possible check.
2. `plan-reflect` independently assesses the goal, deliverables, and
   proportionate evidence, then records the earned status.
3. `complete` finishes. A valid `blocked` result stops. `in-progress` returns
   immediately to `plan-phase` for remediation.

Continue while safe, evidence-based in-scope material work remains. Do not retry
an unchanged failure or present `Remaining:` for a non-material evidence gap.
Failed validation on its own is not a blocker; a material defect, unresolved
acceptance condition, or validated criterion mismatch is. A standalone
reflection request assesses the goal and evidence; it does not authorize
implementation.
