---
name: follow-the-path
description: User-invoked workflow for clarifying an idea through high-value questions and a grounded decision graph. Invoke with $follow-the-path to resolve purpose, assumptions, tradeoffs, and consequential branches at shallow, standard, or deep depth.
---

# Follow the Path

Clarify an emerging idea while maintaining a traceable graph of its grounding decisions.

## Set Depth

Read `shallow`, `standard`, or `deep` from the invocation.

Default to `standard`, state the depth once, and let the user change it.

- `shallow`: Resolve the purpose and first-order strategic choices. Stop before reversible detail unless it could invalidate the idea.
- `standard`: Resolve high-impact or hard-to-reverse choices needed for the next meaningful action, including key assumptions, risks, and validation. Stop at choices that are cheap to reverse, safely deferrable, or evidence-dependent.
- `deep`: Follow every consequential branch through behavior, edge cases, failure handling, constraints, validation, and rollout. Omit detail that cannot affect an upstream choice or acceptance of the result.

Call the stopping boundary the **decision frontier**. Record what is deferred, why, and what would reopen it.

## Build the Graph

- Build the graph out from the first substantive answer.
- Use readable types and IDs such as `purpose-1`, `constraint-1`, `fact-1`, `assumption-1`, `decision-1`, `risk-1`, `validation-1`, and `question-1`.
- Don't substitute single-letter type codes. Mark nodes `resolved`, `provisional`, `open`, or `deferred`, and connect them with meaningful relationships.

Ground each decision in a purpose, constraint, fact, or explicit user preference. Keep facts distinct from assumptions. Record consequential alternatives, tradeoffs, and implications.

## Follow the Path

1. Recover known context. Establish only the missing purpose, beneficiary, desired change, success criteria, constraints, and non-goals.
2. Ask the highest-value unresolved question. Prioritize upstream ambiguity, contradictions, and blockers. Prefer one question at a time; ask up to three only when tightly coupled.
3. Offer options only when real alternatives are visible. State their relevant tradeoffs without creating a false binary or steering the choice.
4. Research discoverable facts within the authorized scope instead of asking the user. Keep evidence separate from judgments only the user can make.
5. Integrate each answer into atomic nodes. Ground decisions, mark consequential inferences provisional, close irrelevant branches, and select the next question. Give a compact checkpoint when the path changes or drift is possible.
6. Stress-test consequential branches: what must be true, what could change or invalidate the decision, what downstream choices it forces, and whether it can be deferred safely.
7. Continue until the resolution test passes at the selected depth.

For each question, provide your recommended answer and a 2-3 bullet justification. Max of one parenthetical per bullet, no chained semicolons. State each idea once clearly and plainly.

If the user does not know an answer, define evidence, a test, a decision rule, or a safe deferral. If the user stops, produce the current graph and identify blockers without claiming resolution.

## Test Resolution

Treat the graph as resolved only when:

- The root purpose can judge downstream choices
- Every in-scope decision has a status, grounding, and recorded tradeoffs where consequential
- Assumptions remain labeled and have validation where uncertainty matters
- No contradiction or open node blocks the next meaningful action
- Provisional and deferred nodes explain why work can proceed and what would resolve them
- The decision frontier is explicit

Resolution is relative to scope and depth. Do not require false certainty.

## Produce the Artifact

At resolution or on request, ask whether the user wants the artifact saved and, if so, where.

Before producing the artifact, read and use [references/output-template.md](references/output-template.md). Preserve its section order, heading names, table columns, and empty-section convention at every depth. Replace every bracketed instruction. Do not add, remove, merge, or rename sections unless the user requests a different format.

Return the completed artifact without an introductory summary or closing commentary. Keep the decision register authoritative if the visual omits detail. Include enough context to stand without the original conversation. Keep entries concise without discarding grounding, tradeoffs, implications, or resolution triggers. Do not turn the artifact into an implementation plan unless asked.
