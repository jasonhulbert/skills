---
name: plan-auto
description: Autonomously execute every remaining ready phase of one directory-backed plan until complete or no further in-scope progress is possible. Use when the user asks to run or finish an existing saved plan; do not use on a multi-plan parent.
---

# Plan Auto

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

Resolve one executable plan and validate its structure. Read the index plus the
objective, dependencies, coordination boundaries, durable notes, and status of every
non-complete phase before editing. This cross-phase digest prevents local choices
from conflicting with later interfaces. Load full phase detail only when a
phase becomes ready.

Execute the dependency graph, using index order only as a stable tiebreaker. Run
full `plan-phase` behavior for each ready phase. `plan-phase` owns terminal
status and evidence history. After each terminal phase result, run full
`plan-reflect` behavior to capture only learnings that improve upcoming phases
or sibling plans. Reflection does not reverify the phase or change its status.

When several ready phases have disjoint affected areas and no shared mutable
validation state, delegate them to bounded parallel agents if orchestration is
available. Give one agent exclusive ownership of each phase file and its scoped
implementation. Keep integration, shared-file decisions, and final repository
validation with the primary agent. Otherwise execute sequentially. Continue
locally if delegation is unavailable. During parallel work, delegated reflection
may update only its owned phase notes; the primary agent serially applies any
reported cross-phase learning after workers return.

After each result, refresh phase statuses and coordination notes. Resume an
`in-progress` phase before starting new work when its dependencies remain
satisfied. Continue independent ready phases when another phase is blocked; stop
only when every phase is complete or no ready phase can progress.

Use available approval or escalation mechanisms before treating an
approval-dependent action as blocked. Diagnose failures and try grounded
alternatives when new evidence supports them. Never repeat an unchanged command
or hypothesis. Preserve a working repository at phase boundaries.

Report completed and incomplete phases, aggregate changes, observed validation,
durable plan revisions, blockers, and the exact next action.
