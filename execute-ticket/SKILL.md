---
name: execute-ticket
description: Use when the user invokes this skill to implement and verify one ready, right-sized ticket in a codebase.
x-anthropic:
  disable-model-invocation: true
---

# Execute a ticket

Implement one ticket to a finished result while preserving its intent and boundaries.

## Operating Context

Work happens in local development. Verification means what an agent can do locally: run tests, run the app, and use the feature. Do not deploy, use hosted environments, or seek production data. If a criterion can only be confirmed outside local development, verify what you can locally, note the rest, and do not block on it.

## Orient

- Read the governing instructions and complete ticket before acting.
- Read `manifest.md` beside the ticket when present for the project outcome and dependencies.
- Read `spec.md`, `vision.md`, and `decisions.md` beside the manifest when present or linked. They describe what the finished product should be.
- Do not search for missing context files unless the ticket provides another path.
- Treat the acceptance criteria as the minimum. The goal is a finished result that meets the spec's "What Done Looks Like" and the vision for the part of the product this ticket touches.
- Treat implementation decisions and testing notes as constraints, not a complete recipe.
- Use supporting material to interpret the ticket without expanding its scope.
- Verify dependency outcomes in the workspace instead of trusting ticket order or status.

## Track status

Use only `Pending`, `In Progress`, `Blocked`, and `Complete`. Keep exactly one plain `Status: <value>` line immediately below the ticket title. When the adjacent manifest contains the ticket, keep exactly one matching line immediately below that ticket's linked heading.

Unless `orchestrate-tickets` explicitly owns status synchronization:

- Update the ticket and manifest entry to `Status: In Progress` together after confirming the ticket is ready and before implementation begins. This also applies when resuming a blocked ticket.
- Return a previously complete ticket to `Status: In Progress` in both locations before corrective work when current verification disproves completion.
- Update both lines to `Status: Blocked` before stopping for a blocker.
- Update both lines to `Status: Complete` only after the ticket is finished and verified.
- Repair missing, duplicate, invalid, or mismatched status lines before continuing. Treat status as a record, not as evidence that the ticket outcome exists.

When `orchestrate-tickets` owns status synchronization, do not edit either status line. Report the claimed `Complete` or `Blocked` transition so the orchestrator can judge it and update both copies.

## Execute

- Explore from the ticket's purpose into the code, contracts, tests, and conventions needed to understand the behavior, change boundary, and verification path.
- Prefer current code and executable evidence over stale implementation hints.
- Resolve routine details and reversible local choices with your own judgment and repository conventions.
- Build the complete behavior across every required layer. Finish it to the spec's quality bar: consistent with the surrounding product, handling the states a user will hit, and free of visible rough edges.
- Make related refactoring or cleanup when it improves the result or the code you touch. Do not take on unrelated work.
- When finishing well needs work clearly outside the ticket, note it in the report instead of doing it.
- Preserve unrelated behavior and user changes.
- Test at the existing behavioral boundary.

Ask the user only when ambiguity or a source conflict would change observable behavior, a public contract, scope, data compatibility, security posture, or an irreversible result.

Stop with the exact blocker when a missing dependency, decision, or permission prevents completion.

Do not silently split the ticket, omit acceptance criteria, or redefine completion when it is no longer ready or right-sized.

Do not commit, push, publish, or deploy unless requested. Make no ticket-state changes other than the status synchronization defined above.

## Verify and report

- Check each acceptance criterion locally with tests, by running the app, or by using the feature.
- Use the result as its intended user would. Fix what feels unfinished.
- Inspect the final diff for accidental changes, debug artifacts, and exposed secrets.
- Distinguish failures caused by the change from unrelated baseline failures.
- Claim completion only when the acceptance criteria are met and the result meets the quality bar.

Report `Complete` or `Blocked`, the outcome, important changes, verification results, anything that could not be verified locally, and follow-up work noticed outside the ticket.
