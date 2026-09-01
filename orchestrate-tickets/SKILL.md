---
name: orchestrate-tickets
description: Use when the user invokes this skill to execute an approved ticket manifest autonomously by sequencing dependencies, delegating every ticket to subagents, and independently validating completion.
---

# Orchestrate tickets

Execute an approved ticket set through a subagent team while retaining responsibility for scheduling, integration, acceptance, and project completion.

## Orient

- Read the governing instructions and complete manifest.
- Read the linked spec when present for the overall goal, behavior, and boundaries.
- Use the manifest to understand completion conditions and dependencies.
- Read each ticket when it becomes a candidate for delegation.
- Verify existing workspace state and dependency outcomes instead of trusting ticket order or status.
- Maintain a compact working ledger of each ticket's accepted outcome and evidence.

## Track status

Act as the single writer for ticket status during orchestration. Use only `Pending`, `In Progress`, `Blocked`, and `Complete`. Keep exactly one plain `Status: <value>` line immediately below each ticket title and one matching line immediately below its linked heading in the manifest.

- At startup, repair missing, duplicate, invalid, or mismatched lines. Reconcile them to the last state supported by execution evidence. Treat status as a record, not proof of an outcome.
- Update both copies to `Status: In Progress` together before delegating a ready ticket. Do the same before retrying a blocked ticket.
- Leave both copies `In Progress` while judging a subagent's completion claim or returning deficiencies for correction.
- Update both copies to `Status: Blocked` when a blocker prevents further ticket work.
- Update both copies to `Status: Complete` only after independently accepting the ticket.
- Return both copies to `Status: In Progress` before corrective work when later evidence invalidates an accepted ticket. Use `Status: Blocked` instead when correction cannot proceed, and reassess affected dependents.
- Apply each transition to both files before scheduling more work. Repair any partial update immediately.

## Schedule

- Treat a ticket as ready only after you have accepted every dependency.
- Give each execution subagent one ticket per run.
- Keep ticket implementation with subagents.
- Choose ready work by dependency leverage, conflict risk, and available agents.
- Establish the workspace and change-handoff model before parallel delegation.
- Isolate work or sequence tickets unless their write surfaces are known not to overlap.
- Continue independent ready work when another ticket is blocked.

## Delegate

- Give the subagent the exact ticket path and identify the adjacent `manifest.md` and any `spec.md` linked from it.
- Provide accepted dependency outcomes, workspace coordination constraints, and only task-specific context not captured in those files.
- Require the subagent to use `execute-ticket` and stay within the assigned ticket.
- Tell the subagent that orchestration owns status synchronization and that it must not edit either status line.
- Direct consequential interpretations, scope changes, deviations, and blockers to you instead of the user.
- Do not permit silent ticket splitting, omitted acceptance criteria, or redefined completion.
- Require a `Complete` or `Blocked` result with changed files, evidence for every acceptance criterion, verification results, and relevant decisions or risks.

Resolve escalations from approved sources and repository evidence when the answer is established. Ask the user only when the unresolved choice would change observable behavior, scope, a public contract, data compatibility, security posture, or an irreversible result.

## Judge

- Treat a subagent's completion report as a claim.
- Inspect the ticket's changes, evidence, and effect in the integrated workspace yourself.
- Judge the ticket against only its accepted dependencies, not concurrent sibling work.
- Map every acceptance criterion to observable evidence and confirm proportionate checks passed.
- Reject scope drift, concealed decisions, accidental changes, or unsupported criteria.
- Return specific deficiencies to a subagent and reassess the resulting work.
- Mark a ticket `Complete` in both locations only after the complete ticket is correct and verified.
- Unblock dependents only from accepted tickets.

After all tickets are accepted, verify the manifest's project completion conditions against the integrated workspace.

Do not commit, push, publish, or deploy unless requested. Make no ticket-state changes other than the status synchronization defined above.

Report `Complete` or `Blocked`, ticket outcomes, project-level verification, and only relevant unresolved risks.
