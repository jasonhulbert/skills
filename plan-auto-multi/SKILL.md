---
name: plan-auto-multi
description: Autonomously execute the dependency graph of an existing directory-backed multi-plan parent, coordinating ready child plans until all are complete or no branch can progress. Use when the user asks to run or finish a saved plan created by plan-create-multi.
---

# Plan Auto Multi

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

Resolve and validate one published multi-plan parent. Read the parent goal,
constraints, child scopes, coordination boundaries, and dependency graph. A
child is complete only when every linked phase in that child is `complete`; the
parent never mirrors child status.

Repeatedly identify ready incomplete children whose declared child dependencies
are complete. Run full `plan-auto` behavior for each ready child. Continue other
independent branches when one child blocks; descendants of a blocked child remain
unready.

When ready children have exclusive affected areas, compatible interfaces, and
no shared mutable validation or deployment state, delegate them to bounded
parallel agents if orchestration is available. Give each agent one child plan
and require it to keep changes within that child's scope. The primary agent owns
the dependency scheduler, shared integration, conflict resolution, status
refresh, and final validation. Run children sequentially when isolation is not
clear, and continue locally if delegation is unavailable. Collect cross-child
learnings from delegated reflections and apply affected parent or sibling-plan
updates serially before releasing dependent children.

Refresh child phase statuses after every child result. Revalidate shared
interfaces before releasing dependent children. Use available approval or
escalation mechanisms before recording an approval blocker. Stop only when all
children are complete or no incomplete child is ready and no recorded blocker
can be resolved in scope.

Run the smallest decision-changing cross-child checks after integration. Report
children completed, branches still runnable or blocked, aggregate changes,
observed validation, interface deviations, and the exact next action.
