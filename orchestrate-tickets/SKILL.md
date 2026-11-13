---
name: orchestrate-tickets
description: Use when the user invokes this skill to execute an approved ticket manifest autonomously by sequencing dependencies, delegating every ticket to subagents, and independently validating completion.
x-anthropic:
  disable-model-invocation: true
---

# Orchestrate tickets

Execute an approved ticket set through a subagent team while retaining responsibility for scheduling, integration, acceptance, and the finished product.

## Operating Context

Develop and verify locally where practical. Use authorized services when local substitutes would distort the solution or provide inadequate evidence. Deployment of unfinished work is not a routine ticket dependency. Changes to shared environments require user authorization. Do not seek production data unless requested.

## Orient

- Read the governing instructions and complete manifest.
- Read the linked `spec.md`, `vision.md`, and `decisions.md` when present. They describe what the finished product should be.
- Use the manifest to understand the project outcome, dependencies, and intended operating conditions.
- Read each ticket when it becomes a candidate for delegation.
- Verify existing workspace state and dependency outcomes instead of trusting ticket order or status.
- Keep a compact ledger of accepted outcomes and evidence in working context.

## Track status

Act as the single writer for ticket status during orchestration. Use only `Pending`, `In Progress`, `Blocked`, and `Complete`. Keep exactly one plain `Status: <value>` line immediately below each ticket title and one matching line immediately below its linked heading in the manifest.

- At startup, repair missing, duplicate, invalid, or mismatched lines. Reconcile them to the last state supported by execution evidence. Treat status as a record, not proof of an outcome.
- Update both copies to `Status: In Progress` together before delegating a ready ticket. Do the same before retrying a blocked ticket.
- Leave both copies `In Progress` while judging a subagent's completion claim or returning deficiencies for correction.
- Update both copies to `Status: Blocked` when a blocker prevents further ticket work.
- Update both copies to `Status: Complete` only after independently accepting the ticket.
- Return both copies to `Status: In Progress` before corrective work when later evidence invalidates an accepted ticket. Use `Status: Blocked` instead when correction cannot proceed, and reassess affected dependents.
- Apply each transition to both files before scheduling more work. Repair any partial update immediately.

During execution, change workflow artifacts only through status synchronization unless the user requests a revision. Keep discoveries, blockers, and evidence in responses or working context. Do not add them to workflow artifacts or companion reports.

## Schedule

- Treat a ticket as ready only after you have accepted every dependency.
- Give each execution subagent one ticket per run.
- Keep ticket implementation with subagents.
- Choose ready work by dependency leverage, conflict risk, and available agents.
- Establish the workspace and change-handoff model before parallel delegation.
- Isolate work or sequence tickets unless their write surfaces are known not to overlap.
- Continue independent ready work when another ticket is blocked.

## Delegate

- Give the subagent the exact ticket path and identify the adjacent `manifest.md` and any linked `spec.md`, `vision.md`, and `decisions.md`.
- Provide accepted dependency outcomes, workspace coordination constraints, and only task-specific context not captured in those files.
- Require the subagent to use `execute-ticket` and stay within the assigned ticket.
- Tell the subagent that orchestration owns status synchronization and that it must not edit either status line.
- Require discoveries and evidence in responses, never additions to workflow artifacts or companion reports.
- Direct consequential interpretations, scope changes, deviations, and blockers to you instead of the user.
- Do not permit silent ticket splitting, omitted acceptance criteria, or redefined completion.
- Require a `Complete` or `Blocked` result with changed files, verification evidence, relevant decisions, outstanding checks or blockers, and follow-up work outside the ticket.

Resolve escalations from approved sources and repository evidence when the answer is established. Ask the user only when the unresolved choice would change observable behavior, scope, a public contract, data compatibility, security posture, or an irreversible result.

## Judge

- Treat a subagent's completion report as a claim.
- Inspect the ticket's changes and use the result in the integrated workspace yourself.
- Judge the ticket against only its accepted dependencies, not concurrent sibling work. Individual tickets need not be independently releasable.
- Judge against the acceptance criteria and the spec's quality bar for that part of the product. Return work that meets the criteria but feels unfinished.
- Assess relevant deployment or transition procedures for feasibility, including work handed off for later execution.
- Accept related cleanup that improves the result. Reject unrelated work, concealed decisions, and accidental changes.
- Return specific deficiencies to a subagent and reassess the resulting work.
- Mark a ticket `Complete` in both locations only after it is finished and verified. Defer release checks only when available evidence supports correctness and viability.
- Unblock dependents only from accepted tickets.
- Collect optional follow-up work for the integration and polish ticket when it fits the project outcome. Required corrections stay with the affected ticket.

## Finish

The integration and polish ticket runs last. When delegating it, include the collected follow-up work.

After all tickets are accepted, use the integrated product against the spec's "What Done Looks Like" and the vision. Judge any required transition as part of that outcome. When the result falls short, delegate focused fixes and judge them the same way.

Do not commit, push, publish, or deploy unless requested.

Report `Complete` or `Blocked`, ticket outcomes, and how the finished product compares to the intended outcome. Distinguish blockers from deferred environment checks and include relevant handoff requirements.
