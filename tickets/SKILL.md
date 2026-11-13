---
name: tickets
description: Turn a plan, spec, or the current context into tickets, favoring right-sized, tracer-bullet vertical slices.
x-anthropic:
  disable-model-invocation: true
---

# Tickets

Turn a plan, spec, or the current context into tickets, favoring tracer-bullet vertical slices.

Tracer-bullet vertical slices are thin, end-to-end increments of behavior through every relevant implementation layer.

Tickets exist to fit work into implementation runs. They are not the definition of done. Every split adds a seam that someone must integrate and polish, so prefer fewer, larger tickets when they remain right-sized.

## Operating Context

Plan for local verification where practical or use authorized services when needed. Do not make deployment of unfinished work a routine ticket dependency. Deployment execution and changes to shared environments require user authorization. Do not require production data, metrics, or user research unless requested.

## Process

### 1. Gather context

Explore the repo to understand the current state of the codebase, if you haven't already.

Identify the source material from which the tickets are being produced. This may be a specification, plan, request, the current context.

Determine which source is authoritative. Use the first of these that applies:

- A source the user explicitly designates.
- An approved spec produced by `spec`.
- A plan or explicit request from the user.

If no source qualifies, or if more than one source qualifies at the same level, ask the user which source is authoritative.

Treat every other source as supplemental. Use supplemental sources to fill gaps, add detail, and inform implementation decisions. Do not let a supplemental source override the authoritative source.

Compare the sources for conflicts. A conflict is significant when resolving it one way or the other would change ticket scope, behavior, acceptance criteria, dependencies, or sequencing. When you find a significant conflict, stop and ask the user how to resolve it before drafting the breakdown. For each conflict, name the sources involved and state what each one says. Resolve conflicts that would not change the tickets in favor of the authoritative source.

[**Preparatory refactoring**](https://martinfowler.com/articles/preparatory-refactoring-example.html) is the process of preemptively reshaping code before developing a new feature. Identify preparatory refactoring opportunities that would materially simplify or de-risk the planned work.

Apply `right-size` to the whole source first. If it is `Right`, recommend implementing directly from the source instead of creating tickets. Continue only if the user still wants tickets.

### 2. Draft the breakdown

Break the work into **vertical slice** tickets:

- Each is an end-to-end slice that cuts through every relevant layer of a system. _Vertical_, NOT a horizontal slice of one layer.
- A slice is verifiable on its own once its blockers are resolved. It need not be independently releasable.
- Any preparatory refactoring should be done before the tickets it enables.

When a spec is provided, use its "What Done Looks Like" as the coverage boundary. Assign every required outcome and relevant transition requirement to a ticket.

Each ticket must contain its **dependencies**; the other tickets that must complete before it can start. A ticket with no dependencies can start immediately.

Include worthwhile preparatory refactoring as separate tickets. Make them dependencies of the tickets they enable.

**Wide refactors may require an exception to the usual vertical-slicing approach.** A **wide refactor** is a mechanical change that affects many consumers at once, such as renaming a shared column or changing a widely used type. Do not force such changes into vertical slice tickets if their intermediate states would break existing consumers. Instead, sequence the work according to its compatibility, availability, and recovery needs. Represent the steps as separate tickets with clear dependencies.

When the old and new versions need to coexist during the transition, an **expand–contract** approach is often appropriate:

- **Expand**: Add the new structure or interface alongside the old one while keeping existing consumers working.
- **Migrate**: Move data and update callers or consumers to use the new version.
- **Contract**: Remove the old structure or interface once nothing depends on it.

Use a different sequencing strategy when a coordinated change is safe or expand–contract adds unnecessary complexity. Distinguish implementation dependencies from eventual release order.

End every breakdown with an **integration and polish** ticket that depends on all other tickets. It reviews the integrated behavior and any required transition against the spec's "What Done Looks Like" and the vision, then fixes inconsistencies, rough edges, missing states, and seams between tickets.

### 3. Right-size the candidate tickets

Apply `right-size` to every candidate ticket before presenting the breakdown.

Assess each ticket assuming its identified dependencies have completed and delivered their stated outcomes.

- **Right:** Keep the candidate.
- **Not right:** Replace it with the fewest independently executable vertical slices needed, update their dependencies, and assess each resulting candidate again.
- **Not ready:** Identify the smallest missing input, decision, or access needed. Do not present the candidate as an executable implementation ticket. Create a discovery ticket only when it can produce a concrete decision or artifact required by later work, then right-size that discovery ticket.

Apply the same assessment to preparatory refactors and expand–migrate–contract steps. Do not right-size the integration and polish ticket; its scope depends on what earlier tickets leave behind.

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

### 5. Create the tickets

After the user approves the breakdown, create one Markdown file for each ticket using the below [ticket template](#ticket-template).

- Create all ticket files and the manifest in a single temporary directory on the user's machine.
- Name each ticket file using a zero-padded index and lowercase, kebab-case slug: `<index>-<slug>.md` (for example, `001-add-account-balance.md`).
- Sequence the tickets so that each ticket appears after its dependencies.
- Create one `manifest.md` file in the same directory using the below [manifest template](#manifest-template). List every ticket in sequence with its index, title, relative link, and dependencies.
- Use each ticket's index and title consistently in the ticket file, manifest, and dependency references.
- Give every ticket exactly one plain `Status: Pending` line immediately below its title.
- Repeat that line immediately below the ticket's linked heading in the manifest.
- Describe behavior and constraints. Omit code snippets and implementation recipes.

Give the manifest a project title, project summary, project outcome, and references to workflow source artifacts.

Use relative links only to workflow artifacts in the designated workflow directory tree, defaulting to the generated directory. Exclude codebase and outside references, including plain-text paths. Do not widen the boundary. Resolve and check links against the intended saved layout when the destination is known.

Reference existing sources within the boundary. Copy only these core artifacts when needed from outside it:

- An approved spec as `spec.md`.
- The vision, when available, as `vision.md`.
- The decision artifact from `follow-the-path`, when available, as `decisions.md`.

Link copies from the manifest. Preserve their intent and decisions, rebase internal links, and remove outside references. Do not copy supporting material or invent missing sources.

Keep tickets and manifests within their templates. Revise existing fields; omit research and execution reports, including companion files.

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

Describe the end-to-end behavior or enabling change this ticket provides, from the user's point of view where possible.

## Dependencies

- None
- or: [<index>: <title>](<ticket-file>.md)

## Acceptance Criteria

- The minimum observable conditions for this ticket. The finished work must also meet the spec's quality bar for this part of the product.

## Implementation Decisions

- Consequential decisions, constraints, interfaces, and operating or compatibility requirements.

## Testing Notes

- Non-obvious verification methods, required evidence, and deferred release checks.

## Open Questions

- Only unresolved decisions that could change this ticket, with the working assumption to use.

## Out of Scope

- Only boundaries needed to keep this ticket focused.
```

Omit Testing Notes, Open Questions, or Out of Scope when they would be empty.

#### Manifest Template

Adjust source paths to the saved layout and omit absent sources.

```markdown
# <project title>

## Project Summary

Briefly describe the problem and the intended outcome. Orient someone who has not read the individual tickets.

## Project Outcome

Describe the finished result and consequential operating constraints in a few sentences. Point to the spec's "What Done Looks Like" when a spec exists.

## Source Material

- [Specification](spec.md)
- [Vision](vision.md)
- [Decisions](decisions.md)
- or: Derived from <plan, request, or current context>.

## Tickets

### [<index>: <title>](<ticket-file>.md)

Status: Pending

Dependencies:

- None
```
