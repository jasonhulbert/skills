---
name: plan-reflect
description: Verify a completed plan phase against the actual repo state, capture what changed, and update the saved plan before the next phase begins.
---

# Plan Reflect

Review a just-executed phase and update the saved plan based on what actually happened.

This is the verification step of the pipeline:
`plan-create` -> `plan-phase` -> `plan-reflect`

**Read the plan file contract first:** `/Users/HulbertJ/.claude/skills/plan-shared/PLAN-CONTRACT.md` defines the phase `Status:` values, the fact that you are the only writer of `complete`/`blocked` and of `Remaining:`/`Blocked on:` notes, and the parent-index rules. The rules below assume that contract. If anything here seems to disagree, the contract wins.

The goal is not ceremony. You are the checkpoint that catches drift between the plan and reality, so **verify against the repo — never rubber-stamp the phase's self-report** — and record the true state before the next phase starts.

## Inputs

Use:

- the saved plan file
- the completed phase name or number
- the actual repo state
- the `plan-phase` summary, if available

If the plan file or target phase cannot be identified confidently, ask the user.

## Critical Rules

- Verify against the repo, not just the prior summary.
- Update the plan file directly. Do not only describe what should change.
- Mark a phase `complete` only if every deliverable is present in the repo AND every `Validation:` criterion was re-run and passed.
- **If a phase's validation could not be run (tooling/environment limits), it is NOT `complete`.** Leave it `in-progress`, add a `- Remaining:` note saying validation could not be run and why. Never substitute "looks done" for evidence.
- Write only the status values in the contract (`in-progress` → `complete` or `blocked`). Never set a phase back to `pending`.
- For a phase that is partial or blocked, write what is left **into the plan file** (a `- Remaining:` or `- Blocked on:` bullet), so the next run is resumable from the file alone — not just from chat.
- Update only the downstream phases that are actually affected.
- Keep reflection notes short and actionable.
- If the work is incomplete or incorrect, record that honestly instead of forcing plan progress.
- If the plan is a child of a multi-plan artifact (has `parent_plan` frontmatter), flip the parent index to `complete` for this child only when every phase in the child plan is `complete` (and to `blocked` if a phase is blocked).

## Workflow

### 1. Verify the completed phase

Verify against the repo as it is right now — do not trust the `plan-phase` summary. The summary's outcome claim (`implemented` / `partially implemented` / `blocked`) is an input to check, not a verdict.

- Read the phase's `Objective:`, `Deliverables:`, and `Validation:` criteria from the plan file.
- **For each `Deliverable:`** — confirm it actually exists in the repo (read the file/symbol). Mark each met or missing.
- **For each `Validation:` criterion** — re-run it yourself (test, lint, build, observable check). Record the command and its real result. If a criterion cannot be run, say exactly why; an un-runnable criterion is not a pass.
- Diff the repo against the phase's claimed "Files changed." Investigate files changed that the plan did not anticipate, and deliverables claimed but not present.

Resulting status (contract §3):

- **`complete`** — every deliverable met AND every validation criterion re-run and passed.
- **`in-progress`** — some deliverables or validation outstanding. Add a `- Remaining:` bullet listing exactly what is left.
- **`blocked`** — cannot finish without a user decision or external prerequisite. Add a `- Blocked on:` bullet.

### 2. Extract only useful learnings

Capture only what changes later execution, such as:

- wrong assumptions in the original plan
- new dependencies or sequencing changes
- codebase constraints discovered during implementation
- follow-up work that must happen before the next phase

### 3. Update the plan file

Make the edits directly in the plan:

- Set the phase's `- Status:` to the value from step 1 (`complete`, `in-progress`, or `blocked`). Only `complete` when earned.
- For `in-progress` (partial) or `blocked`, add a `- Remaining:` or `- Blocked on:` bullet inside that phase listing the specific outstanding work. Do not rely on chat memory.
- When you set a phase to `complete`, delete any `- Remaining:` or `- Blocked on:` note left on it from a prior pass — a `complete` phase must carry no outstanding-work notes.
- If a later phase needs revising, add a `- Revised after Phase N:` note bullet **inside** that phase. Do not edit the `## Phase <N>:` heading — phase number and name must stay stable so downstream matching works.
- Revise deliverables, dependencies, validation, or notes only where needed.
- Put learnings where the next phase will read them: a constraint affecting a specific later phase goes in that phase's `Notes:`; an unresolved decision goes in `## Open Questions` (add the section if absent).

### 4. Update parent index (if applicable)

Only if the plan file has `parent_plan` frontmatter:

- If after your step 3 edits **every** phase in the child plan is `complete` (this reflection closed the final phase), the child's index status becomes `complete`.
- Else if any phase you touched is now `blocked`, the child's index status becomes `blocked`.
- Otherwise leave the index as-is and skip the rest.

To update:

- Resolve the parent index path relative to the child plan file (typically `./index.md` in the same directory).
- Read the parent index (`obsidian read path="..."`).
- In the `## Plans` list, locate this child's line and update its trailing status word, following the contract's line-matching grammar (match by link target, replace the trailing token).
- Write the updated index (`obsidian create path="..." content="..." overwrite`).

If there is no `parent_plan` frontmatter, skip this step.

If the parent index cannot be read, or the child line cannot be located, note it in the output and continue — reflection is still valid even if the parent-index sync fails.

## Suggested Plan Update Style

Use short, traceable edits. Keep the heading stable; record provenance and
revisions in note bullets:

```md
## Phase 3: API Integration
- Status: pending
- Revised after Phase 2: shared auth middleware now exists.
- Objective: ...
- Dependencies:
  - Reuse the Phase 2 auth middleware instead of adding phase-local auth logic.
```

## Output Expectations

After updating the plan file:

- report whether the phase was fully complete, partially complete, or incomplete
- summarize the concrete plan changes you made
- provide the updated plan path
- state the recommended next step

Keep the response brief. The updated plan file is the primary artifact.
