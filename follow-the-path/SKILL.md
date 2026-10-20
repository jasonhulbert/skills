---
name: follow-the-path
description: User-invoked workflow for resolving consequential decisions for an idea or a defined scope of work through focused questions and a grounded decision graph. Invoke with $follow-the-path at shallow, standard, or deep depth.
x-anthropic:
  disable-model-invocation: true
---

# Follow the Path

Resolve consequential decisions for an idea or a defined scope of work through focused questions and a grounded decision graph.

The goal is to settle what an implementer cannot or should not decide alone. Everything else is left to the implementer's judgment.

## Operating Context

Work happens in local development. Do not raise deployments, hosted environments, production data, metrics, user research, or rollout plans unless the user asks for them. Verification means what an agent can do locally: run tests, run the app, and use the feature.

## Set Depth

Read `shallow`, `standard`, or `deep` from the invocation.

Default to `standard`, state the depth once, and let the user change it.

- `shallow`: Resolve the purpose and first-order strategic choices. Stop before reversible detail unless it could invalidate the idea.
- `standard`: Resolve high-impact or hard-to-reverse choices needed before implementation can start. Leave choices that are cheap to reverse or easy to make during implementation to the implementer.
- `deep`: Follow every consequential branch through behavior, edge cases, and failure handling. Omit detail that cannot change an upstream choice or how the finished result is judged.

Past the stopping point, each remaining choice is either left to the implementer or excluded. Record which is which. For choices left to the implementer, state the outcome that matters.

## Build the Graph

- Build the graph out from the first substantive answer.
- Use readable types and IDs such as `purpose-1`, `constraint-1`, `fact-1`, `assumption-1`, `decision-1`, and `question-1`.
- Don't substitute single-letter type codes. Mark nodes `resolved`, `provisional`, `open`, or `deferred`, and connect them with meaningful relationships.

Ground each decision in a purpose, constraint, fact, or explicit user preference. Keep facts distinct from assumptions. Record consequential alternatives and why they were not chosen.

## Follow the Path

1. Recover known context. Read the vision when one exists. For a mapped milestone, start with its outcome, boundaries, and inherited constraints. Establish only the missing purpose, beneficiary, desired change, constraints, and non-goals.
2. Ask the highest-value unresolved question. Prioritize upstream ambiguity, contradictions, and blockers. Prefer one question at a time; ask up to three only when tightly coupled.
3. Offer options only when real alternatives are visible. State their relevant tradeoffs without creating a false binary or steering the choice.
4. Research discoverable facts within the authorized scope instead of asking the user. Keep evidence separate from judgments only the user can make.
5. Integrate each answer into atomic nodes. Ground decisions, mark consequential inferences provisional, close irrelevant branches, and select the next question. Give a compact checkpoint when the path changes or drift is possible.
6. Stress-test consequential decisions: what must be true for them to hold, and what downstream choices they force.
7. Continue until the resolution test passes at the selected depth.

For each question, provide your recommended answer and a 2-3 bullet justification. Max of one parenthetical per bullet, no chained semicolons. State each idea once clearly and plainly.

If the user does not know an answer, recommend a working assumption and mark it provisional. When the choice is safe to make during implementation, leave it to the implementer instead. If the user stops, produce the current graph and identify blockers without claiming resolution.

## Establish the Quality Bar

Establish what a finished result looks like to the people it serves. Draw from the vision, the user's intent, and the product's existing conventions. Ask what could satisfy every decision yet still disappoint the user.

Describe the bar in plain words. Words such as "polished" or "consistent with the rest of the app" are useful. Do not expand them into checklists. Record only quality tradeoffs that are consequential at the selected depth.

## Test Resolution

Treat the graph as resolved only when:

- The root purpose can judge downstream choices
- Every in-scope decision has a status and a reason
- No contradiction or open node blocks implementation
- Provisional and open nodes state how work proceeds without them
- What done looks like is clear enough to judge the finished result
- What is left to the implementer is explicit

Resolution is relative to scope and depth. Do not require false certainty.

## Produce the Artifact

At resolution or on request, ask whether the user wants the artifact saved and, if so, where.

Before producing the artifact, read and use [references/output-template.md](references/output-template.md). Preserve its section order, heading names, and table columns at every depth. Replace every bracketed instruction. Do not add, remove, merge, or rename sections unless the user requests a different format.

Return the completed artifact without an introductory summary or closing commentary. Keep the decision register authoritative if the visual omits detail. Include enough context to stand without the original conversation. Keep entries concise. Do not turn the artifact into an implementation plan unless asked.

The artifact may be handed directly to an implementer or to `spec`. Make it understandable without the conversation.
