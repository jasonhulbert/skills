---
name: technical-research
description: Research current technical options, compare them against the user's requirements, and recommend a solution with evidence, tradeoffs, and clear next steps.
---

# Technical Research

Evaluate technical options for a real decision. Prefer current, primary, and authoritative sources over memory or popularity alone.

## Inputs

Use:

- the user's requirements and constraints
- the current stack and codebase context
- current external sources when facts may be stale or decision-relevant

If requirements are too vague to evaluate meaningfully, ask focused questions about priorities and constraints before researching.

## Critical Rules

- Do not recommend an option that clearly fails the stated requirements.
- Do not rely on stale memory for versions, maintenance status, pricing, licensing, benchmarks, or security posture.
- Prefer official docs, primary maintainers, standards, and source repositories. Use secondary sources only to corroborate or fill gaps.
- Tailor the depth to the decision. Do not generate a giant template when two focused comparisons will answer the question.
- Make tradeoffs explicit. If no option is clearly good, say so.
- Cite the important factual claims.

## Workflow

### 1. Frame the decision

Before researching, identify:

- the actual decision to make
- must-have requirements
- preferred qualities
- disqualifiers
- what would change the recommendation

If the user's priorities are unclear, ask concise tradeoff questions.

### 2. Research the serious options

Usually evaluate 2 to 4 viable options, not every possible option.

For each option, gather only the facts that matter to the decision, such as:

- maintenance status
- compatibility with the current stack
- implementation complexity
- performance characteristics
- operational burden
- license, pricing, or lock-in concerns
- security or reliability concerns

### 3. Compare and recommend

Make the recommendation based on the user's actual criteria, not generic popularity.

When useful, provide:

- a primary recommendation
- a fallback option
- conditions that would cause you to revisit the choice

## Output Format

Keep the structure concise and decision-oriented:

```md
Decision:
- [what is being chosen]

Requirements:
- [must-haves]
- [important tradeoffs]

Options considered:
- [option] - [1 sentence fit summary]
- [option] - [1 sentence fit summary]

Recommendation:
- [top choice]
- [why it wins for this case]

Tradeoffs:
- [what you give up]

Risks:
- [main risks and mitigations]

Next step:
- [the concrete follow-up action]
```

Add a compact comparison table only when it helps the decision.

## Research Standards

For current or high-stakes claims:

- verify with live sources
- include citations
- distinguish facts from inference

If evidence is weak or conflicting, say that directly and explain how it affects confidence.
