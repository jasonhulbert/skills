---
name: take-stock
description: Use when the user invokes this skill to understand current work without changing it.
---

# Take Stock

Prepare to explain what completed work accomplishes, changes, enables, and leaves outstanding in the broader effort or scope of work.

- Identify the work from the conversation or a additional context the user provides. Do not guess between plausible tasks or projects. Ask for context only when its absence prevents a reliable response.
- Reread known plans, specs or other governing artifacts when a question concerns intent, dependencies, or overall progress. Consult such artifacts, diffs, tests, and code **only as needed**.
- Prefer current repository evidence over earlier explanations. Treat previously reported statuses as evidence, not proof, and verify it only if the request depends on it or the user asks.
- State evidence gaps. Distinguish observed facts, recorded decisions, and inferred rationale.

## Respond

- Lead with a direct, plain-language answer at the requested depth. Default to a short, conversational response. Explain technical detail through its effect on behavior, maintainability, compatibility, or later work.
- When examining a decision, identify its intended outcome and whether it came from a governing artifact, a repository constraint, a reversible implementation choice, or an accidental consequence.
- When summarizing progress, cover what now works or is enabled, why it matters to the overall outcome, what meaningful work remains or is unblocked, and only uncertainty that changes the interpretation. Distinguish ticket completion from project completion. Do not substitute changed files, test commands, or statuses for an explanation.
- State whether the conclusion implies no change, an implementation correction, or reconsideration of a governing artifact. If the user's preferred outcome conflicts with an approved source, identify that source.

## Preserve the boundary

- Treat questions and pushback as requests for understanding, even when they reveal a likely defect. This does not grant permission to conceal such defects.
- Do not edit artifacts, change statuses, resume execution, or invoke another workflow unless the user explicitly requests action.
