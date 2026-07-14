---
name: plan-auto
description: Autonomously execute and reflect every remaining phase of one directory-backed plan until complete or concretely blocked.
---

# Plan Auto

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it.

Resolve one executable plan and validate its structure. Read ordered links and
status lines; load a full phase only when executing it. Do not chain sibling
plans or execute a multi-plan parent.

For each first non-complete phase in order:

1. Run full `plan-phase` behavior.
2. Run full `plan-reflect` behavior.
3. If reflection records `Remaining:`, repeat both on the same phase while
   material implementation or outcome-changing evidence work remains. Do not
   repeat an unchanged failing validation path or reopen a phase for a
   non-material evidence gap.
4. Advance only after `complete`. Stop for a valid `blocked` result, including
   a surfaced validation concern, or an approval-dependent action.

Diagnose material failures and try sound alternatives when new evidence supports
them. Once the objective is achieved with proportionate evidence, do not pursue
additional checks solely because they were listed in the plan. Once a validation
concern is established, preserve the evidence and surface the decision needed
instead of re-entering the same remediation loop. Keep the repository working
between phases. Refresh the index after reflection because pending phases may
have changed.

Report phases completed, outcome evidence, material gaps, any valid blocker,
aggregate changes, reflection revisions, and the next action. For a blocked
phase, make the human handoff actionable by naming the smallest help requested,
why it unblocks the phase, and the exact resume action. Include a recommendation
and alternatives for decisions or approvals. Add no status sidecar or run log;
phase files are authoritative.
