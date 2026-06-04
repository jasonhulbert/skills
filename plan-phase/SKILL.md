---
name: plan-phase
description: Execute ONE phase of a saved plan — select the phase, inspect the repo, make the change, validate, and hand off to `plan-reflect`. Triggers on "run the next phase", "do phase N", "implement phase X". To run every remaining phase unattended, use `plan-auto` instead.
---

# Plan Phase

Execute one phase from a saved plan file.

This is the execution step of the pipeline:
`plan-create` -> `plan-phase` -> `plan-reflect`

**Read the plan file contract first:** `/Users/HulbertJ/.claude/skills/plan-shared/PLAN-CONTRACT.md` defines how to find the plan, the phase `Status:` values and who owns each transition, and the parent-index rules. The rules below are specific to *executing* a phase and assume that contract. If anything here seems to disagree with the contract, the contract wins.

Treat the plan as the contract for what must be accomplished. Use the repo to determine how to do it. Run exactly one phase — to run the whole plan unattended, that is `plan-auto`'s job.

## Inputs

Expected inputs are:

- the plan file path, or enough context to find it (see contract §1 for the naming convention)
- the target phase — selected by the deterministic rule below
- the current repo state

### Which phase to run (deterministic)

1. If the user named a phase explicitly, run that one.
2. Otherwise, run the **first phase whose `Status:` is not `complete`**, reading top to bottom.
3. Never skip ahead of an incomplete dependency: if the selected phase's `Dependencies:` reference an earlier phase that is not `complete`, stop and ask rather than running out of order.

If the plan file is missing, or step 1–2 is genuinely ambiguous, ask the user. Do not ask the user to restate technical context that is already in the repo or plan.

## Critical Rules

- Implement the phase directly in the codebase. Do not spend the turn filling out templates.
- Ask questions only for blocking ambiguity, unsafe changes, or major product decisions.
- **Prefer subagents for isolated workstreams.** When part of the phase is genuinely separable, run it as parallel subagents (the Agent tool) rather than serially — see "Delegating isolated workstreams." Keep critical-path, tightly coupled, or high-context work in the main agent, and never block on delegation.
- Prefer existing patterns, abstractions, and file structure over inventing new ones.
- **Stay in this phase's scope.** Change only what this phase requires. Do not implement deliverables that belong to other phases, even if convenient — that corrupts `plan-reflect`'s per-phase verification. Note out-of-scope problems for reflection instead of fixing them.
- **Do not start a phase with unmet dependencies.** If the phase's `Dependencies:` name an earlier phase that is not `complete`, stop and ask rather than building on missing prerequisites.
- Keep the repo in a working state while editing.
- Run validation that is appropriate for the change. Do not claim success without verification.
- If the best implementation materially deviates from the plan, explain the deviation in the final summary so `plan-reflect` can update the plan.
- **Phase-body edits you may make are limited to the `Status:` start marker.** Set the phase from `pending` to `in-progress` when you begin (contract §3). Do not set `complete`/`blocked` or edit other phases — `plan-reflect` owns those.
- If the plan is a child of a multi-plan artifact (has `parent_plan` frontmatter), update the parent index status when you start the first phase only (see step 1c). Do not touch the parent index on subsequent phases — `plan-reflect` owns the `complete` transition.

## Delegating isolated workstreams

Prefer running genuinely isolated work as parallel subagents (the Agent tool) instead of doing everything serially. Strong candidates:

- **Read-only investigation** — mapping call sites, surveying tests, gathering context. Parallel explorers can't conflict.
- **Disjoint edits** — non-overlapping files/modules with clear ownership. If two streams might touch the same file, give each subagent its own git worktree (Agent `isolation: "worktree"`) so they can't collide, then integrate.
- **Independent verification** — a fresh-context subagent that checks the result against the phase's Validation criteria, with no stake in having written it.

Keep in the main agent: the critical path, tightly coupled changes, anything needing full conversation context, and the final integration + validation.

To keep delegation from adding divergence:

- Each subagent gets a **self-contained brief** (it does not share your context): the goal, the files it owns, what to return, what not to touch.
- You own integration and validation — verify subagent output, don't trust it.
- Don't delegate trivial work to look busy; if the phase is one tight change, just make it.
- If subagents aren't available here, continue locally — never block on delegation.

## Workflow

### 1. Load the plan and select the phase

- Read the plan file.
- Select the target phase using the deterministic rule in Inputs.
- Extract its objective, deliverables, dependencies, and validation criteria.
- Confirm every item in its `Dependencies:` is actually satisfied in the repo. If a declared dependency is unmet, do **not** start — stop and ask (see "When To Stop And Ask").

### 1b. Mark the phase in-progress

Set the selected phase's `- Status:` line from `pending` to `in-progress` (contract §3). This is the start marker, and the only edit to the phase body you make. (Edit the file in place; if the plan is in the vault, use the `obsidian` CLI per the contract's storage rule.) If the phase is already `in-progress` — e.g. a prior run died mid-phase — leave it and re-examine what is actually done before redoing work.

### 1c. Update parent index (if applicable)

If the plan file has `parent_plan` frontmatter AND this child's line in the parent index currently reads `pending`:

- Resolve the parent index path relative to the child plan file (typically `./index.md` in the same directory).
- Read the parent index (`obsidian read path="..."`).
- In the `## Plans` list, locate this child's line and update its trailing status word to `in-progress`, following the contract's line-matching grammar (match by link target, replace the trailing token).
- Write the updated index (`obsidian create path="..." content="..." overwrite`).

If there is no `parent_plan` frontmatter, skip this step.

If the parent index cannot be read, or the child line cannot be located, note it in the handoff summary and continue — execution must not block on parent-index bookkeeping.

### 2. Inspect before editing

- Read the relevant code paths and tests.
- Identify the smallest safe change set that satisfies the phase.
- Identify whether any sidecar work can be delegated safely, such as bounded exploration, disjoint file edits, or independent verification.
- If there is blocking ambiguity, ask concise questions. Otherwise proceed.

### 3. Execute

- If delegation is available and worthwhile, assign only concrete, bounded subtasks with clear file ownership or a narrowly defined read-only goal.
- Make the code changes directly.
- Add or update tests when the phase changes behavior.
- Update docs or config only when the phase actually requires it.

### 4. Validate

First run the phase's own `Validation:` criteria from the plan file — that is the
yardstick `plan-reflect` will re-check against, so validating against anything
else risks a mismatch. Then add any other relevant checks:

- targeted tests
- lint or typecheck
- build or smoke checks
- manual verification steps when automation is not available

Report the actual command and its result, not "checks passed." If validation
cannot be run, say exactly why — an un-runnable check is not a pass.

### 5. Prepare the handoff

Leave the phase `in-progress`. Do not set it `complete` or `blocked` — `plan-reflect` owns those transitions and writes them only after verifying the work against the repo. (If the user explicitly asks you to combine execution and reflection, then follow `plan-reflect`'s rules exactly when setting the final status.)

## Response Format

Keep the response short and operational:

```md
Phase executed: [phase name]

Outcome (a claim for plan-reflect to verify, not a final status):
- [implemented / partially implemented / blocked]

Files changed:
- [path] - [what changed, concretely]

Validation:
- [command or check] - [result]

Deviations from plan:
- [only if applicable]

Open issues:
- [only if applicable]

Recommended next step:
- Run `plan-reflect` on [phase name]
```

## When To Stop And Ask

Stop and ask the user if:

- the phase depends on a missing prerequisite the plan got wrong
- a major product or UX choice is unresolved
- implementation would require risky migration or destructive changes
- the codebase strongly suggests the plan is no longer valid

If delegation is unavailable in the current environment, continue locally rather than blocking on it.

Otherwise, proceed and make the phase real.
