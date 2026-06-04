---
name: investigate-bug
description: Investigate a bug, identify the root cause, propose a concrete fix,
  and wait for user approval before implementing.
---

# Investigate Bug

Diagnose the bug first. Do not implement a fix until the user approves the proposed approach.

## Critical Rules

- Do not guess at the bug or the fix.
- Do not start implementation before approval.
- If the report is unclear, ask only the questions needed to reproduce or scope the problem.
- Verify behavior from the code and, when possible, from tests, logs, or reproduction steps.
- Be explicit about confidence level and uncertainty.

## Workflow

### 1. Clarify the report if needed

Ask concise questions only if you cannot identify:

- the failing behavior
- the expected behavior
- the affected area of the codebase
- a plausible way to reproduce it

### 2. Investigate

- Trace the relevant execution path in the code.
- Attempt to reproduce the issue when practical.
- Compare observed behavior with expected behavior.
- Check recent history or adjacent code when it might explain the regression.

### 3. Report findings

Use this structure:

```md
Observed behavior:
- [what happens]

Expected behavior:
- [what should happen]

Reproduction status:
- [reproduced / not reproduced / partially reproduced]
- [exact trigger, test, or reason reproduction is incomplete]

Root cause:
- [specific explanation with file/function references]

Confidence:
- [high / medium / low] - [why]
```

### 4. Propose the fix

Do not write code yet. Describe:

- the recommended approach
- the files likely to change
- why this addresses the root cause
- how you will validate the fix
- any material alternatives and why they are weaker

End by asking the user to approve, modify, or redirect the fix plan.

### 5. Implement only after approval

After approval:

- make the code changes
- add or update tests
- run validation
- summarize the result and any residual risk

## When To Push Back

Say so directly if:

- the reported bug is actually current intended behavior
- the requested fix would create a regression or larger design problem
- the evidence is too weak to support the claimed root cause
