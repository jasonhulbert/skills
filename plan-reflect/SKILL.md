---
name: plan-reflect
description: Reflect on one executed phase of a directory-backed plan and record useful learnings for upcoming phases or sibling plans without rerunning verification. Use after plan-phase, either directly or through plan-auto, and when the user explicitly asks to capture phase learnings.
---

# Plan Reflect

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it. Do not implement,
rerun checks, independently verify claims, or change the phase's earned status.

Resolve and structurally validate the plan. Read the target phase objective,
execution history, deviations, durable notes, and the coordination boundaries of
pending phases or sibling plans. Treat the execution record as the evidence
source; `plan-phase` owns its results.

Identify only learnings that improve later execution, such as a confirmed or
invalidated assumption, discovered interface behavior, environment prerequisite,
risk, reusable implementation approach, or validation caveat. Add concise
forward-looking notes to the pending phase or sibling plan that will consume
them. Add a note to the executed phase only when no clear future destination
exists or the learning documents an ongoing constraint. Revise pending
objectives, dependencies, coordination boundaries, or validation when a learning
makes existing content stale or unsafe, and append the required index revision-
history entry.

Do not restate the execution report, append a reflection run log, or edit
`Status:`, `Remaining:`, `Blocked on:`, or `## Execution History`. Make no plan
change when the execution produced no useful durable learning. During delegated
parallel execution, update only the owned phase and return cross-phase or
cross-child learnings to the primary agent for serialized application.

Report the notes or plan revisions made, or state that no durable learning
required a plan change.
