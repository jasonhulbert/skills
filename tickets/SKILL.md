---
name: tickets
description: Turn a plan, spec, or the current context into tickets, favoring right-sized, tracer-bullet vertical slices.
---
# Tickets

Turn a plan, spec, or the current context into tickets, favoring tracer-bullet vertical slices.

Tracer-bullet vertical slices are thin, end-to-end increments of behavior through every relevant implementation layer.

## Process

### 1. Gather context

Explore the repo to understand the current state of the codebase, if you haven't already.

[**Preparatory refactoring**](https://martinfowler.com/articles/preparatory-refactoring-example.html) is the process of preemptively reshaping code before developing a new feature. Identify preparatory refactoring opportunities that would materially simplify or de-risk the planned work.

Identify the source material from which the tickets are being produced. This may be a specification, plan, request, the current context. When multiple sources are used, 

When an approved spec produced by `spec` is available, use its problem statement, solution, acceptance criteria, and project boundaries to orient the manifest. Do not require a spec.

### 2. Draft the breakdown

Break the work into **vertical slice** tickets:
- Each is an end-to-end slice that cuts through every relevant layer of a system. _Vertical_, NOT a horizontal slice of one layer.
- A correctly made slice is verifiable on its own once its blockers are resolved.
- Each slice is small enough for one focused implementation session.
- Any preparatory refactoring should be done before the tickets it enables.

When a `spec` is provided, treat its behavioral slices as coverage boundaries, not necessarily as individual tickets. Split them only where dependencies, readiness, or context fit require it.

Each ticket must contain its **dependencies**; the other tickets that must complete before it can start. A ticket with no dependencies can start immediately.

Include worthwhile preparatory refactoring as separate tickets. Make them dependencies of the tickets they enable.

**Wide refactors may require an exception to the usual vertical-slicing approach.** A **wide refactor** is a mechanical change that affects many consumers at once, such as renaming a shared column or changing a widely used type. Do not force such changes into vertical slice tickets if their intermediate states would break existing consumers. Instead, sequence the work according to its compatibility needs and represent the steps as separate tickets with clear dependencies.

When the old and new versions need to coexist during the transition, an **expand–contract** approach is often appropriate:
- **Expand**: Add the new structure or interface alongside the old one while keeping existing consumers working.
- **Migrate**: Move data and update callers or consumers to use the new version.
- **Contract**: Remove the old structure or interface once nothing depends on it.

Use a different sequencing strategy when the change can be made safely in one coordinated pass or when expand–contract would add unnecessary complexity.

### 3. Right-size the candidate tickets

Apply `right-size` to every candidate ticket before presenting the breakdown.

Assess each ticket assuming its identified dependencies have completed and delivered their stated outcomes.

- **Right:** Keep the candidate.
- **Not right:** Replace it with the fewest independently executable vertical slices needed, update their dependencies, and assess each resulting candidate again.
- **Not ready:** Identify the smallest missing input, decision, or access needed. Do not present the candidate as an executable implementation ticket. Create a discovery ticket only when it can produce a concrete decision or artifact required by later work, then right-size that discovery ticket.

Apply the same assessment to preparatory refactors and expand–migrate–contract steps.

Do not present the proposed breakdown until every executable candidate is `Right`. Present unresolved readiness blockers separately.

### 4. Review the breakdown

Present the proposed breakdown as a numbered list. For each ticket, show:

- **Title**: short descriptive name
- **Identified dependencies**: which other tickets (if any) must complete first
- **What it delivers or enables**: the end-to-end behavior this ticket makes work

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Do the identified dependencies seem correct — does each ticket only depend on tickets that genuinely gate it?
- Should any tickets be merged or split further?

Iterate until the user approves the breakdown.

### 4. Create the tickets

After the user approves the breakdown, create one Markdown file for each ticket using the below [ticket template](#ticket%20template).

- Create all ticket files and the manifest in a single temporary directory on the user's machine.
- Name each ticket file using a zero-padded index and lowercase, kebab-case slug: `<index>-<slug>.md` (for example, `001-add-account-balance.md`).
- Sequence the tickets so that each ticket appears after its dependencies.
- Create one `manifest.md` file in the same directory using the below [manifest template](#manifest%20template). List every ticket in sequence with its index, title, relative link, and dependencies.
- Use each ticket's index and title consistently in the ticket file, manifest, and dependency references.
- Give every ticket exactly one plain `Status: Pending` line immediately below its title.
- Repeat that line immediately below the ticket's linked heading in the manifest.
- Avoid specific file paths or code snippets — they go stale fast.

Give the manifest a project title, project summary, project-level completion criteria, and source-material reference.

When the source is an approved spec, include a snapshot of it in the generated directory as `spec.md` and link to it from the manifest. Otherwise, describe the source without creating a substitute spec.

Use only `Pending`, `In Progress`, `Blocked`, and `Complete` as ticket status values. The ticket file and manifest entry must always contain the same value. `execute-ticket` or `orchestrate-tickets` updates both lines together as execution progresses.

After creating the files, present the manifest and the generated ticket files. Ask the user whether they would like the files saved and, if so, where. Do not copy the files to a permanent location until the user specifies one.

---

#### Ticket Template

```markdown
# <index>: <title>

Status: Pending

## Purpose

Briefly describe the problem this ticket addresses or why the enabling work matters.

## What It Delivers or Enables

Describe the end-to-end behavior or enabling change this ticket provides.

## Dependencies

- None
- or: [<index>: <title>](<ticket-file>.md)

## Acceptance Criteria

- Observable condition that must be true for this ticket to be complete.

## Implementation Decisions

- Decisions, constraints, interfaces, or compatibility requirements relevant to this ticket.

## Testing Decisions

- What external behavior should be tested, why it matters, and relevant prior art.

## Assumptions and Open Questions

- Only assumptions or unresolved decisions that could change this ticket.

## Out of Scope

- Only boundaries needed to keep this ticket focused.
```

#### Manifest Template

```markdown

# <project title>

## Project Summary

Briefly describe the problem and the intended outcome. Orient someone who has not read the individual tickets.

## Project Completion

- Observable ticket-level condition.
- Observable ticket-level condition.

## Source Material

- [Specification](<relative-path-to-spec.md>)
- or: Derived from <plan, request, or current context>.

## Tickets

### [<index>: <title>](<ticket-file>.md)

Status: Pending

Dependencies:
- None
```
