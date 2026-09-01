---
name: take-stock
description: Use when the user invokes this skill to understand current work without changing it. Answer plain-language implementation questions, examine or challenge decisions, or briefly explain what completed work changes, enables, and leaves outstanding in the broader plan. Often follows execute-ticket or orchestrate-tickets. Inspect available artifacts and repository evidence as needed.
disable-model-invocation: true
---

# Take Stock

## Ground the answer

- Identify the work from the conversation or a path the user provides. Do not guess between plausible tickets or projects. Ask for context only when its absence prevents a reliable answer.
- Read the ticket and its adjacent manifest and linked spec when the question concerns intent, dependencies, or overall progress. Consult the execution report, diff, tests, and code only as needed.
- Prefer current repository evidence over earlier explanations. Treat status as a record, not proof, and verify only where the request depends on it or the user asks.
- State evidence gaps. Distinguish observed facts, recorded decisions, and inferred rationale.

## Respond

- Lead with a direct, plain-language answer at the requested depth. Default to a short, conversational response. Explain technical detail through its effect on behavior, maintainability, compatibility, or later work.
- When examining a decision, identify its intended outcome and whether it came from a governing artifact, a repository constraint, a reversible implementation choice, or an accidental consequence. Explain the tradeoffs without defending the current implementation by default. Compare the user's alternative and say plainly when the evidence favors it or the current choice lacks support.
- When summarizing progress, cover what now works or is enabled, why it matters to the overall outcome, what meaningful work remains or is unblocked, and only uncertainty that changes the interpretation. Distinguish ticket completion from project completion. Do not substitute changed files, test commands, or statuses for an explanation.
- State whether the conclusion implies no change, an implementation correction, or reconsideration of a governing artifact. If the user's preferred outcome conflicts with an approved source, identify that source.

## Preserve the boundary

- Treat questions and pushback as requests for understanding, even when they reveal a likely defect. Do not edit artifacts, change statuses, resume execution, or invoke another workflow unless the user explicitly requests action.
