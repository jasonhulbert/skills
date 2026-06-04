---
name: plan-task
description: Implement a small, well-scoped task in a single pass: inspect the repo, confirm intent with the user, make the change, validate, and report. Lightweight counterpart to `plan-create` for changes that don't warrant a durable phased plan.
---

# Plan Task

A single-pass alternative to the `plan-create` -> `plan-phase` -> `plan-reflect` flow.

Use this when the change is small enough to implement in one focused pass and a durable plan file would be overhead.

## Inputs

Use, in this order:

1. The user's request
2. The current codebase
3. The current conversation

## Critical Rules

- Always confirm intent with the user before editing. Because this flow edits the repo with **no reviewable plan artifact**, the confirmation gate is mandatory: present the scope and wait for an explicit go-ahead. An explicit go-ahead already in the user's request (e.g. "yes, just rename X to Y, go ahead") satisfies the gate — restate the scope, then proceed without a second round-trip.
- Do not write a plan file. The skill is intentionally ephemeral.
- Stay surgical. Touch only what the task requires. Do not refactor or improve adjacent code.
- If any **Escalation trigger** (below) is true — at confirmation time or mid-task — stop and recommend `plan-create` instead of pushing through.
- **Delegate isolated sub-work, not the implementation.** For bounded, separable sub-work — parallel read-only investigation, or an independent check of your change — spin up subagents (the Agent tool) with a self-contained brief. But if the *implementation itself* wants to split into parallel write-streams, that's a sign the task exceeds `plan-task` — escalate to `plan-create` rather than orchestrating it here.
- Validate every change against a concrete check. Do not claim "done" without one.
- Match existing patterns and conventions. Do not invent new ones for a one-off change.

## Escalation triggers

This is the single, authoritative list of "too big for `plan-task`." If any is
true, stop and recommend the `plan-create` -> `plan-phase` -> `plan-reflect`
flow. The pre-edit scope check (step 2) and the mid-task check both use this list.

- The work spans multiple subsystems or services.
- It needs sequenced migration or destructive/irreversible operations.
- It needs a new interface or abstraction beyond a one-off helper.
- Acceptance criteria are unclear, shifting, or hinge on a decision the user has not made.
- It can't be validated in one pass (no single check confirms it works), or it touches more than a handful of files across unrelated modules.

## Workflow

### 1. Build context

- Read the user's request and any conversation context.
- Inspect the relevant code paths: exports, immediate callers, shared utilities the change might touch.
- To cover a wider surface fast, delegate the lookup to one or more read-only subagents in parallel, then fold their findings into your context.
- Separate what is known from what is assumed.

### 2. Confirm intent and scope

Before editing, restate to the user:

- What you understand the task to be.
- The smallest concrete change set you intend to make.
- Any assumptions you are relying on.
- Any blocking ambiguity.

Then check the scope against the **Escalation triggers** list above. If any is true, stop and recommend `plan-create` instead.

If the scope is appropriate, name the concrete check you will validate with (see step 4), then wait for the user's go-ahead before editing — unless they already gave one in their request. If the user redirects or clarifies, restate and wait again.

### 3. Execute

- Make the change directly. Use the existing patterns and file structure.
- Add or update tests when behavior changes; the test should fail if the intended behavior regresses, not merely exercise the code.
- Update docs or config only when the task actually requires it.
- Keep the repo in a working state at every step.

### 4. Validate

Run the check you named at confirmation time, then report the actual command and
its result — not "checks passed." Minimum bar:

- if behavior changed, run the tests that cover it
- always run lint/typecheck if the project has them
- fall back to manual verification only when no automated check exists, and name the exact steps you performed

For a non-trivial change, you may have a fresh-context subagent independently re-run the check against the change — but you own the final result; treat its report as input to verify, not a verdict to trust.

If validation cannot be run, say exactly why. Do not silently skip — an un-runnable check is not a pass.

### 5. Report

Keep the response short and operational:

```md
Task: [one-line restatement]

Files changed:
- [path] — [short reason]

Validation:
- [command or check] — [result]

Assumptions relied on:
- [only if applicable]

Not done / deferred:
- [anything in the original ask you intentionally left out, and why — omit if nothing]

Open issues:
- [only if applicable]
```

## When to stop and escalate

Mid-task, re-apply the **Escalation triggers** check. If any becomes true that
wasn't at confirmation time, stop — do not partially implement. Tell the user
this skill is no longer a good fit and recommend the
`plan-create` -> `plan-phase` -> `plan-reflect` flow instead.
