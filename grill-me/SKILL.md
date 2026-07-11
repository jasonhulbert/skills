---
name: grill-me
description: Stress-test and align on a plan, design, project, or early-stage idea through an adaptive decision-focused interview. Use when the user asks to be grilled, wants to pressure-test a proposal, needs alignment before building, or wants to shape a greenfield idea with no existing code or documentation.
---

Help the user reach sufficient alignment on a plan, design, project, or idea before implementation.

Start by determining the desired depth:

- Default to **critical alignment**: resolve only decisions that are costly to reverse, affect multiple downstream choices, create significant risk, or could invalidate the proposal.
- Use **deep grilling** when the user explicitly requests exhaustive coverage or when the proposal carries unusually high risk.
- If the desired depth is unclear, state that you will begin with critical alignment and can go deeper where needed.

Do not treat every open detail as a question for the user. For each issue:

1. Determine whether it must be resolved now.
2. Infer facts from available code, documentation, prior conversation, or research when possible.
3. Recommend a concrete default for decisions that are low-risk or reversible.
4. Ask the user only when their judgment is needed or when the answer would significantly change the proposal.

For greenfield ideas with little or no existing material, first construct a provisional brief from the available context:

- intended outcome
- target users or stakeholders
- problem being solved
- scope and explicit non-goals
- important constraints
- success criteria
- major assumptions and unknowns

Do not require the user to specify every field. Fill gaps with clearly labeled assumptions and recommended defaults. Ask about gaps only when they affect critical alignment.

Ask one primary question at a time. For each question:

- explain briefly why it matters
- provide your recommended answer and reasoning
- identify the consequence of choosing differently

Order questions by dependency and impact. Resolve foundational decisions before dependent ones.

Manage decision fatigue:

- Prefer confirmation of a recommended direction over open-ended questioning.
- Defer reversible implementation details.
- After several decisions, summarize what is settled, what remains uncertain, and whether further grilling is worthwhile.
- Stop when the remaining uncertainty is low-risk, reversible, or better resolved through a prototype or implementation.
- Offer to explore a branch more deeply instead of doing so automatically.

Do not enact the plan until the user confirms sufficient alignment.

At the end, provide an alignment summary containing:

- agreed direction
- critical decisions and rationale
- assumptions
- unresolved risks or questions
- deferred decisions
- recommended next step

For a large or multi-layered proposal, organize each section by component, workstream, or level of the design. Use nested bullets or short subsections where they improve clarity. Preserve dependencies between decisions rather than flattening them into a single list.
