---
name: follow-the-path
description: User-invoked workflow for resolving consequential decisions for an idea or a defined scope of work through focused questions and a grounded decision outline. Invoke with $follow-the-path at shallow, standard, or deep depth.
x-anthropic:
  disable-model-invocation: true
---

# Follow the Path

Resolve consequential decisions for an idea or a defined scope of work through focused questions and a grounded decision outline.

The goal is to settle what an implementer cannot or should not decide alone. Everything else is left to the implementer's judgment.

## Operating Context

Plan for local development and verification where practical. Do not make deployment of unfinished work a routine implementation dependency. Deployment execution and changes to shared environments require user authorization. Do not require production data, metrics, or user research unless requested.

## Set Depth

Read `shallow`, `standard`, or `deep` from the invocation.

Default to `standard`, state the depth once, and let the user change it.

- `shallow`: Resolve the purpose and first-order strategic choices. Stop before reversible detail unless it could invalidate the idea.
- `standard`: Resolve high-impact or hard-to-reverse choices needed before implementation can start. Leave choices that are cheap to reverse or easy to make during implementation to the implementer.
- `deep`: Follow every consequential branch through behavior, edge cases, and failure handling. Omit detail that cannot change an upstream choice or how the finished result is judged.

Past the stopping point, each remaining choice is either left to the implementer or excluded. Record which is which. For choices left to the implementer, state the outcome that matters.

## Keep a Working Model

Build a working model from the first substantive answer. It holds the purpose, constraints, facts, assumptions, decisions, and open questions. Note what each decision rests on. Use that to find upstream ambiguity and to see which decisions a later answer affects. The decision outline is written from this model.

Ground each decision in a purpose, constraint, fact, or explicit user preference. Keep facts distinct from assumptions. Note whether each decision is settled or provisional. Record consequential alternatives and why they were not chosen.

## Follow the Path

1. Recover known context. Read the vision when one exists. For a mapped milestone, start with its outcome, boundaries, inherited constraints, and questions for this path, including shared question IDs. Establish only the missing purpose, beneficiary, desired change, constraints, and non-goals. Include intended operating conditions.
2. Ask the highest-value unresolved question. Prioritize upstream ambiguity, contradictions, and blockers. Prefer one question at a time; ask up to three only when tightly coupled.
3. Offer options only when real alternatives are visible. State their relevant tradeoffs without creating a false binary or steering the choice.
4. Research discoverable facts through representative local evidence or authorized services before asking the user. Keep facts distinct from user judgments and unresolved assumptions.
5. Integrate each answer into the working model. Ground decisions, mark consequential inferences provisional, close irrelevant branches, and select the next question. Give a compact checkpoint when the path changes or drift is possible.
6. Stress-test consequential decisions: what must be true for them to hold, and what downstream choices they force. Include deployment or transition viability when consequential at the selected depth.
7. Continue until the resolution test passes at the selected depth.

For each question, provide your recommended answer and a 2-3 bullet justification. Max of one parenthetical per bullet, no chained semicolons. State each idea once clearly and plainly.

If the user does not know an answer, recommend a working assumption and mark it provisional. When the choice is safe to make during implementation, leave it to the implementer instead. If the user stops, produce the current outline and identify blockers without claiming resolution.

## Establish the Quality Bar

Establish what a finished result looks like to the people it serves. Draw from the vision, the user's intent, and the product's existing conventions. Ask what could satisfy every decision yet still disappoint the user.

Describe the bar in plain words. Words such as "polished" or "consistent with the rest of the app" are useful. Do not expand them into checklists. Record only quality tradeoffs that are consequential at the selected depth.

## Test Resolution

Treat the outline as resolved only when:

- The root purpose can judge downstream choices
- Every in-scope decision has a status and a reason
- No contradiction or open item blocks implementation
- Provisional and open items state how work proceeds without them
- What done looks like is clear enough to judge the finished result
- What is left to the implementer is explicit

Resolution is relative to scope and depth. Do not require false certainty.

## Produce the Artifact

At resolution or on request, ask whether the user wants the artifact saved and, if so, where.

Use [references/output-template.md](references/output-template.md) at every depth. Preserve its sections unless the user requests another format. Follow its guidance and writing style.

Use relative links only to workflow artifacts in the designated workflow directory tree, defaulting to the artifact's destination directory. Exclude codebase and outside references, including plain-text paths. Do not widen the boundary or copy sources to bypass it. Resolve links for the final location; omit them while that location is unknown.

Return only the artifact. Preserve intent, decisions, constraints, and consequential uncertainty for use without the conversation. Retain facts only when they ground decisions, with a brief origin. Revise existing entries; omit research trails, implementation plans, and execution reports.

The artifact supports `spec` or direct implementation. Implementers inspect current code as needed.
