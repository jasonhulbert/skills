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
- [Required] [Falsifiable completion check]
- [Supplemental] [Optional confidence-building check]

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
  - [Decision or external prerequisite]
```

A complete phase carries neither note.

For a validation concern, make the blocker actionable:

```md
- Blocked on:
  - Validation concern: [criterion]
  - Expected: [required result]
  - Actual: [observed result]
  - Evidence: [repository or environment evidence]
  - Approaches tried: [distinct grounded approaches]
  - Decision needed: [clarification, approval, or criterion revision]
```

Validation entries should identify a command or observable result and its
expected outcome. They must test the phase outcome, not prescribe an
implementation unless that implementation is itself a requirement. Keep the
required set minimal and avoid duplicate checks. Entries may be labeled
`[Required]` or `[Supplemental]`; unlabeled entries in existing plans are
treated as required for compatibility. Required entries gate completion.
Supplemental entries must still be run when practical and reported, but their
failure does not by itself prevent completion unless it reveals a defect or
contradicts a deliverable.

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

A failed validation starts triage, not an open-ended retry loop. Classify the
failure as an implementation defect, a tool or environment problem, or a
validation concern. A retry is justified only when the input, implementation,
environment, or failure hypothesis changes; never repeat an unchanged failing
command or approach. Pursue distinct grounded alternatives when new evidence
supports them. If two materially distinct approaches produce the same failure,
or the criterion is ambiguous, stale, implementation-prescriptive,
unrunnable, or disproportionate to the phase outcome, stop remediation and
surface a validation concern.

A validation concern is a permitted blocker when repository evidence supports
it and the phase cannot be completed without weakening, redefining, or
otherwise deciding the criterion. Record it under `Blocked on:` with the
criterion, expected and actual results, evidence, approaches tried, and the
specific decision or clarification needed. Do not silently weaken a required
criterion, replace it with an easier check, or mark the phase complete to avoid
the concern.

## Autonomous execution

When the user requests execution and reflection together, or invokes
`plan-auto`, loop:

1. `plan-phase` implements and validates until no safe in-scope work remains or
   a concrete permitted blocker prevents progress.
2. `plan-reflect` independently verifies and records the earned status.
3. `complete` finishes. A valid `blocked` result stops. `in-progress` returns
   immediately to `plan-phase` for remediation.

Continue while safe, evidence-based in-scope work remains. Do not retry an
unchanged failure or present `Remaining:` as a handoff when a valid validation
concern has been established. Failed validation on its own is not a blocker;
validated criterion ambiguity or mismatch is. A standalone reflection request
verifies only and does not authorize implementation.
