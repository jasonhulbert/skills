---
name: execute-ticket
description: Use when the user invokes this skill to implement and verify one ready, right-sized ticket in a codebase.
---

# Execute a ticket

Implement one ticket through verified completion while preserving its intent and boundaries.

## Orient

- Read the governing instructions and complete ticket before acting.
- Read `manifest.md` beside the ticket when present for the project goal, completion conditions, and dependencies.
- Read `spec.md` beside the manifest when linked for the feature rationale, behavior, and boundaries.
- Do not search for missing context files unless the ticket provides another path.
- Treat the ticket's purpose, delivery statement, and acceptance criteria as the required outcome.
- Treat its implementation and testing decisions as constraints, not a complete recipe.
- Use supporting material to interpret the ticket without expanding its scope.
- Verify dependency outcomes in the workspace instead of trusting ticket order or status.

## Track status

Use only `Pending`, `In Progress`, `Blocked`, and `Complete`. Keep exactly one plain `Status: <value>` line immediately below the ticket title. When the adjacent manifest contains the ticket, keep exactly one matching line immediately below that ticket's linked heading.

Unless `orchestrate-tickets` explicitly owns status synchronization:

- Update the ticket and manifest entry to `Status: In Progress` together after confirming the ticket is ready and before implementation begins. This also applies when resuming a blocked ticket.
- Return a previously complete ticket to `Status: In Progress` in both locations before corrective work when current verification disproves completion.
- Update both lines to `Status: Blocked` before stopping for a blocker.
- Update both lines to `Status: Complete` only after every acceptance criterion is met and verified.
- Repair missing, duplicate, invalid, or mismatched status lines before continuing. Treat status as a record, not as evidence that the ticket outcome exists.

When `orchestrate-tickets` owns status synchronization, do not edit either status line. Report the claimed `Complete` or `Blocked` transition so the orchestrator can judge it and update both copies.

## Execute

- Explore from the acceptance criteria into only the code, contracts, tests, and conventions needed to understand the behavior, change boundary, and verification path.
- Prefer current code and executable evidence over stale implementation hints.
- Resolve routine details and reversible local choices from repository evidence.
- Implement the smallest coherent change that delivers the complete behavior across every required layer.
- Keep refactoring and unrelated cleanup outside the ticket unless required for safe completion.
- Preserve unrelated behavior and user changes.
- Test at the existing behavioral boundary.

Ask the user only when ambiguity or a source conflict would change observable behavior, a public contract, scope, data compatibility, security posture, or an irreversible result.

Stop with the exact blocker when a missing dependency, decision, permission, or verification path prevents completion.

Do not silently split the ticket, omit acceptance criteria, or redefine completion when it is no longer ready or right-sized.

Do not commit, push, publish, or deploy unless requested. Make no ticket-state changes other than the status synchronization defined above.

## Verify and report

- Map every acceptance criterion to evidence.
- Run focused checks first, then use broader or manual checks in proportion to the change.
- Inspect the final diff for scope drift, accidental changes, debug artifacts, and exposed secrets.
- Distinguish failures caused by the change from unrelated baseline failures.
- Claim completion only when every acceptance criterion is met and verified.

Report `Complete` or `Blocked`, the outcome, important changes, verification results, and only relevant decisions or risks.
