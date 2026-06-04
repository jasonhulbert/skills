---
name: plan-auto
description: Autonomously execute ALL remaining phases of a saved plan in one unattended run (`plan-phase` + `plan-reflect` per phase) until done or a stop condition. Triggers on "run/finish the whole plan", "auto-run all phases", "do the rest unattended". NOT for a single phase (use `plan-phase`) and NOT when you want to review between phases.
---

# Plan Auto

Run a saved plan end-to-end without per-phase user input.

`plan-auto` is an alternative to manually alternating `plan-phase` and `plan-reflect`. It executes each remaining phase in sequence, reflecting after each one, and only returns control when the plan is complete or a stop condition is hit.

Underlying contract:
`plan-create` -> (`plan-phase` -> `plan-reflect`)+   ← `plan-auto` drives the inner loop

**Read the plan file contract first:** `/Users/HulbertJ/.claude/skills/plan-shared/PLAN-CONTRACT.md` defines phase `Status:` values and that only `complete` counts as done — the loop's resume and stop logic depend on it. This skill is a thin orchestrator: it does **not** re-implement `plan-phase` or `plan-reflect`; it runs each of them in full per phase and adds the loop control, progress checks, and stop conditions below. When in doubt about what happens inside a phase, defer to those skills. The plan file is the only persistent state; `plan-auto` adds no bookkeeping files.

Because this runs unattended, its job is as much about *halting safely* as making progress.

## Inputs

Expected inputs:

- the plan file path, or enough context to find it
- the current repo state

If the plan file cannot be identified confidently, ask the user. Do not ask the user to restate technical context that is already in the repo or plan.

## Critical Rules

- Start immediately on invocation, with one exception: if any pending phase is flagged as destructive/irreversible, or the plan has `## Open Questions` that gate a pending phase, surface them and get a one-word go-ahead before starting. Otherwise do not ask for confirmation — just begin.
- Operate on a single plan file. Do not chain across sibling plans in a `plan-multi` artifact, even if a parent index is present. Parent-index bookkeeping is already handled by the underlying `plan-phase` and `plan-reflect` skills on a per-child basis.
- Execute phases in order, starting from the first phase whose `Status:` is not `complete`.
- For each phase, run the full `plan-phase` logic, then the full `plan-reflect` logic. Do not shortcut either.
- **Progress must be monotonic.** The count of not-`complete` phases must strictly decrease each iteration. Never run the same phase twice in a row: if reflection did not mark the just-executed phase `complete`, that is a stop (incomplete phase) — do not re-enter the loop on it. If the count did not drop, halt with "no progress."
- Keep the repo in a working state between phases. Never leave broken code, failing tests, or half-applied migrations across the phase boundary.
- Respect the stop conditions below. When a stop condition fires, halt cleanly and return control to the user; do not continue "best effort" into later phases.
- Be idempotent. Re-invoking `plan-auto` on the same plan must resume correctly from the first not-`complete` phase, using only the plan file and repo as state.

## Stop Conditions

The default is to **keep running**. Halt only when one of the blockers below is hit. When in doubt about ambiguity, continue — but when in doubt about a destructive action, stop.

Where a phase was executed, complete its reflection first (so the plan file reflects reality), then stop before starting the next phase.

### 1. Blocking ambiguity

A question only the user can answer, and the next pending phase cannot safely proceed without the answer. Same bar as `plan-phase`:

- the next phase depends on a missing prerequisite the plan got wrong
- a major product or UX choice is unresolved and the next phase hinges on it
- the next phase would require a risky, irreversible, or destructive change that warrants explicit user sign-off
- the codebase has diverged from the plan so sharply that the next phase's objective is no longer valid

A new `## Open Questions` entry only counts here if it **gates the next pending phase**. A note-to-self Open Question about something downstream or orthogonal does not halt the loop.

### 2. Incomplete phase

Reflection did not mark the just-executed phase `Status: complete` (it is `in-progress` or `blocked`):

- phase is partially complete or not complete
- validation could not be run or did not pass
- deliverables are missing

Policy: **halt immediately and report.** Do not auto-retry the phase or "try a different approach" unattended — a phase that failed verification needs a human. The one exception: a clearly transient tooling error (e.g. a flaky network call during validation) may be retried **once**, and the retry must be named in the final summary. If reflection itself cannot run at all, treat the phase as not-complete and halt.

### 3. Destructive or irreversible operation

If executing the current phase would perform a destructive or irreversible action — dropping or altering data, deleting files outside the change set, history rewrites, force-push, production migrations, or anything not trivially revertible — **halt before performing it and ask the user**, even if the plan authorizes it. Unattended mode removes the human veto, so this brake is unconditional and applies to the phase being executed now, not only to the next one.

### What does NOT halt the loop

Routine reflection activity is expected and must not stop the run. Specifically, none of the following are stop conditions on their own:

- a downstream phase getting a `Revised after Phase N:` note bullet
- reflection tightening deliverables, dependencies, validation, or notes on a later phase
- new Open Questions that don't gate the next pending phase
- parent-index updates (`pending → in-progress → complete`) on a `plan-multi` child
- the plan file being edited at all — reflection is supposed to edit it

These are normal artifacts of the plan evolving as work proceeds. Continue.

### Drift that *does* halt

The only time reflection-driven plan changes warrant a halt is when the **next pending phase is no longer executable as written** — for example, its objective was replaced, its dependencies were invalidated, or it was reordered/removed. That is really just a form of blocking ambiguity; classify it as such.

## Workflow

### 1. Locate the plan

- Resolve the plan file path from the user's input or recent conversation.
- Read the plan file.
- Identify the ordered list of phases and their current `Status:` values.
- Determine the starting phase: the first phase whose status is not `complete`.
- If every phase is already `complete`, report that and stop.

### 2. Announce the run

Before starting the first phase, emit one short line naming the plan and the pending phases to be executed, in order. This is a status line, not a confirmation prompt.

Example:
```
Running plan-auto on plans/2026-04-21-feature-x.md — pending phases: 2, 3, 4.
```

### 3. Loop: for each pending phase

For each pending phase from the start point onward:

#### 3a. Phase start status line

Emit a brief one-line status:

```
Phase N: [phase name] — starting.
```

#### 3b. Execute the phase

Run the full `plan-phase` behavior on this phase — follow that skill exactly, including phase selection, the dependency and scope gates, the `pending → in-progress` start marker, validation against the phase's own criteria, and parent-index bookkeeping. Do not re-implement it here.

Orchestration-specific note: only `plan-phase`'s own hard halts (blocking ambiguity, unsafe/destructive change, major product decision) stop the loop here — then reflection has nothing to verify. A response that notes "Deviations from plan" while still delivering the phase is **not** a halt; that is what reflection is for. Otherwise continue to 3c.

#### 3c. Reflect on the phase

Run the full `plan-reflect` behavior on the just-executed phase — follow that skill exactly: verify against the repo, set the earned status, record `Remaining:`/`Blocked on:` notes, revise affected downstream phases, and update the parent index. Do not re-implement it here.

Orchestration-specific note: reflect after **every** phase, never batch reflections — the next phase must read an accurate plan.

#### 3d. Evaluate stop conditions

After reflection, check — in order:

1. **Repo green?** Is the repo still in a working state (the validation `plan-reflect` ran is green, no half-applied migration)? If not → stop.
2. **Phase done?** Is the just-executed phase `Status: complete`? If not → stop (incomplete phase). Do not re-run it.
3. **Progress made?** Did the count of not-`complete` phases strictly decrease this iteration? If not → stop (no progress).
4. **Next phase clear?** Is the next not-`complete` phase still executable as written, with no unresolved question only the user can answer, and no destructive step needing sign-off? If no → stop (blocking ambiguity / destructive).

If all check out, continue to the next phase. Do not stop merely because the plan file was edited, a phase got a `Revised after Phase N:` note, a parent index was touched, or a non-gating Open Question was added. Those are expected.

Bias toward continuing on ambiguity; bias toward halting on anything destructive or any failure to make progress. A halt should otherwise feel like an exception, not a routine outcome.

#### 3e. Phase end status line

Emit a brief one-line status:

```
Phase N: [phase name] — complete.
```

or, on stop:

```
Phase N: [phase name] — [stop reason]. Halting.
```

### 4. Final summary

After the loop exits (either all phases complete, or stopped early), emit a single consolidated summary. Keep it short and operational.

## Response Format

### Per-phase status lines (during the run)

One line on phase start, one line on phase end. No prose, no headings.

### Final summary (at the end of the run)

```md
plan-auto run complete.

Plan: [path]
Phases run: [N, ...]
Phases completed: [N, ...]
Phases not completed: [N, ...]   # only if any
Stop reason: [none | blocking ambiguity | incomplete phase | no progress | destructive op needs sign-off]

Files changed (aggregate):
- [path] — [short reason]

Validation (aggregate):
- [command or check] — [result]

Plan updates from reflection:
- Phase N: [short note on what changed in the plan file]

Open issues / deviations:
- [only if applicable]

Recommended next step:
- [Re-run plan-auto to resume | address open issue X | plan is complete]
```

If the loop stopped early, the "Recommended next step" should name the concrete user action needed before the plan can resume.

## When To Stop And Ask

Stop and ask the user only if:

- the plan file cannot be confidently identified
- the plan file exists but every phase is already complete (just report and stop)
- a pending phase is destructive/irreversible, or the plan has Open Questions gating a pending phase (get a go-ahead before starting)
- any blocker from the Stop Conditions section fires mid-loop

Do not ask the user for permission to continue after a successful phase. The successful phase is the signal. Reflection editing the plan file is expected — it is not a signal to stop.

## Notes For The Operator (You)

- `plan-auto` is a convenience wrapper, not a new execution engine. When in doubt about what to do inside a phase, defer to `plan-phase`'s rules. When in doubt about how to update the plan file, defer to `plan-reflect`'s rules.
- Do not batch reflections across multiple phases. Reflect after each phase so the next phase reads an accurate plan.
- Do not introduce meta-state files, run logs, or side artifacts. The plan file and the repo are the only persistent state.
- If you hit a tool or environment limitation (e.g., validation cannot be run), treat that the same way `plan-phase` and `plan-reflect` do — surface it honestly, and stop if it prevents marking the phase complete.
