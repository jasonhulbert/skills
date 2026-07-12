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
3. If reflection records `Remaining:`, repeat both on the same phase while safe
   in-scope remediation remains.
4. Advance only after `complete`. Stop only for a valid `blocked` result or an
   approval-dependent action.

Diagnose failures and try sound alternatives without an arbitrary retry limit.
Keep the repository working between phases. Refresh the index after reflection
because pending phases may have changed.

Report phases completed, any valid blocker, aggregate changes, validation
results, reflection revisions, and the next action. Add no status sidecar or run
log; phase files are authoritative.
