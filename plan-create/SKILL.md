---
name: plan-create
description: Create a durable, phased implementation plan saved to a file, for a multi-step software change worth tracking across sessions. Triggers on "plan this feature", "break this into phases", "make a plan for X". Executed by `plan-phase`/`plan-auto`, updated by `plan-reflect`. Use `plan-task` instead for a small one-pass change that needs no saved plan; use `plan-multi` for very large work spanning multiple services or more than ~8 phases.
---

# Plan Create

Create a phased implementation plan for real execution in the current codebase.

`plan-create` produces the durable plan artifact that `plan-phase`, `plan-reflect`, and `plan-auto` all consume, and that `plan-multi` generates one of per child. It is the entry point of the pipeline:
`plan-create` -> (`plan-phase` -> `plan-reflect`)

**Read the plan file contract first:** `/Users/HulbertJ/.claude/skills/plan-shared/PLAN-CONTRACT.md` defines the file location/naming, the document schema, the phase `Status:` values, and the multi-plan frontmatter. The rules below are specific to *creating* a plan and assume that contract. If anything here seems to disagree with the contract, the contract wins.

The plan you write is a working artifact. Later skills should be able to execute and update it without needing a large amount of extra restatement from the user. A malformed plan breaks every downstream skill, so conform to the schema exactly.

**Escalate or de-escalate before planning:** if the change is small enough to finish in one focused pass with no saved plan, use `plan-task` instead. If it would exceed ~8 phases or span multiple deployables/services, use `plan-multi` instead.

## Inputs

Use, in this order:

1. The user's request
2. The current codebase and local docs
3. Only the minimum blocking questions needed to resolve ambiguity

If the request is too vague to plan against, ask focused questions first. Otherwise, inspect the repo before asking the user things the code can already answer.

## Invocation by plan-multi

`plan-create` may be invoked directly (standalone) or by `plan-multi` as one child of a multi-plan artifact.

When invoked by `plan-multi`, expect a scoped brief with:

- `child_goal` — treat as the user's request
- `child_constraints` — merge into the `## Constraints` section (includes a copy of global constraints)
- `depends_on` — list of parent-sibling plan slugs
- `output_path` — exact path to write the plan file (overrides the default `plans/` location)
- `child_frontmatter` — YAML to prepend verbatim above the `#` heading, of the form:
  ```yaml
  ---
  parent_plan: ./index.md
  plan_index: N
  total_plans: M
  depends_on: [slug1, slug2]
  ---
  ```

Behavior when a brief is supplied:

- Write the plan to `output_path` exactly. The path is inside the Obsidian vault, so write via the `obsidian` CLI (see the contract's storage-backend rule).
- Prepend `child_frontmatter` above the `# [Project or Feature Name]` heading, **including its `---` fences** exactly as supplied. The frontmatter must be valid (opening and closing `---`), or downstream parent-index sync silently fails.
- Reference `depends_on` plans (bare slugs) in individual phase `Dependencies:` sections only where a phase actually depends on work from a prior plan. The cross-plan dep graph itself lives in the parent index.

Standalone behavior: write to the repo `plans/` directory per §1 of the contract, with no frontmatter.

## Critical Rules

- Do not start implementing code.
- Do not over-prescribe the solution. Define outcomes, constraints, and validation, not detailed implementation steps.
- Ask questions only when the answer materially changes scope, sequencing, risk, or acceptance criteria.
- If you proceed with a non-blocking assumption, state it explicitly in the plan.
- Push back on technically weak requirements or sequencing.
- Size phases so one phase can usually be executed in one focused implementation pass.
- When it improves quality or reduces risk, design phases so independent subtasks can be delegated in parallel with clear ownership boundaries and minimal overlap.

## Workflow

### 1. Build context

- Inspect the repo structure and the relevant code paths.
- Identify the real integration points, constraints, and likely risks.
- Separate what is known from what is assumed.

### 2. Resolve only blocking ambiguity

When needed, ask concise, decision-oriented questions. Prefer:

- "I recommend X because Y. Does that match your intent?"
- "If we choose A, Phase 2 changes in this way. If we choose B, it changes in that way."

Do not ask broad brainstorming questions when the repo already narrows the answer.

### 3. Design the phase breakdown

Each phase must be executable by `plan-phase` with access to:

- the plan file
- the repo
- the current conversation

Each phase should include:

- a clear objective
- concrete deliverables
- dependencies on prior phases
- validation criteria that define done
- only the minimum notes needed to avoid avoidable mistakes

When useful, prefer phase boundaries that make deliberate delegation easier later, for example:

- separating read-heavy investigation from write-heavy implementation
- separating backend, frontend, migration, and test work when the write scopes are distinct
- keeping tightly coupled or critical-path work in the same phase

### 4. Persist the plan

Write the final plan to a durable file using the naming and location rules in §1
of the contract:

- Standalone: `plans/<YYYY-MM-DD>-<slug>.md` (today's date, kebab-case slug from
  the goal). Use an existing repo `plans/` directory if one exists, else create
  `plans/` at the repo root. If that exact filename exists, append `-2`, `-3`, …
  rather than overwriting.
- Invoked by `plan-multi`: write to `output_path` exactly, via the `obsidian` CLI.

### 5. Verify the artifact

Re-read the file you just wrote and confirm, before reporting. Do not report a
plan that fails any of these:

- The `#` title, `## Goal`, and `## Constraints` sections exist.
- Every phase heading is `## Phase <N>: <Name>`, numbered 1..K contiguously.
- Every phase has exactly one `- Status: pending` line (no checkbox), a non-empty
  `Objective:`, and a falsifiable `Validation:` (a runnable check or observable
  result — not "works correctly").
- If invoked by `plan-multi`: the `child_frontmatter` block sits above the `#`
  heading **with its `---` fences**, and `output_path` was used exactly.

Fix the file in place if any check fails.

## Plan Format

Use this structure so the downstream skills have a consistent contract.

When invoked by `plan-multi`, prepend the `child_frontmatter` block verbatim above the `#` heading. Standalone invocations omit the frontmatter.

```md
---
# Present only when invoked by plan-multi:
parent_plan: ./index.md
plan_index: N
total_plans: M
depends_on: [slug1, slug2]
---

# [Project or Feature Name]

## Goal
- [What is being built or changed]

## Constraints
- [Technical, product, compliance, migration, timeline, or compatibility constraints]

## Assumptions
- [Only assumptions you are actively relying on]

## Phase 1: [Name]
- Status: pending
- Objective: [What this phase accomplishes]
- Deliverables:
  - [Concrete, checkable output]
- Dependencies:
  - [Phase <N> | sibling <slug> | "none"]
- Validation:
  - [A runnable check or observable result, not "works correctly"]
- Notes:
  - [Only if needed for safe execution]
- Delegation Notes:
  - [Optional: which parts are safe to parallelize, which should stay local, and any ownership boundaries]

## Phase 2: [Name]
- Status: pending
- Objective: ...

## Open Questions
- [Only unresolved items that still matter]
```

## Output Expectations

After saving the plan file:

- provide the plan path
- summarize the phase breakdown briefly
- call out any assumptions or open questions that remain

Keep the response concise. The plan file is the primary artifact.
