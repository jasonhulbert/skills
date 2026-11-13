# Output Template

Use this template for the final or user-requested artifact. Replace every bracketed instruction with project-specific content. Keep the sections in the order shown. If a section has nothing to say, write `None.` beneath its heading. Do not invent content to fill a section.

````markdown
# [Decision topic]

[A short opening paragraph. Say what this outline covers, the depth it was resolved at, and whether it is resolved, partially resolved, or unresolved. Link relevant workflow sources and milestone IDs.]

## Purpose

[Explain who this serves, what should change for them, and why that matters. Describe the constraints and non-goals that bound the work, including choices excluded from scope.]

## What Done Looks Like

[Describe the finished result a demanding user would accept. Include the quality bar in plain words.]

## Decisions

### [Short name for the decision]

[A short paragraph. Say what was chosen and why. Name what it rests on, such as the purpose, a constraint, a fact and where it came from, or the user's preference. If it depends on an unverified assumption, say so. If it is provisional, say so and say what would change it. Mention the alternatives someone might reasonably reopen, and why they were not chosen.]

## Open Questions and Assumptions

[Describe what is not settled. For each item, say what it affects and how work can proceed without it. If an item blocks work, say so plainly.]

## Left to the Implementer

[Describe the choices left to implementer judgment and the outcome that matters for each.]

## Next Step

[The next action this outline enables, or `None.` if the user requested clarification only.]
````

## Guidance

- Write for an implementer who was not in the conversation. Explain intent and reasons so they can make good choices in situations the outline does not cover.
- Describe decisions as choices with reasons, not as commands. Reserve "must" and "never" for hard constraints.
- Order decisions so each one comes after the decisions it depends on. The outline should read as the path that was followed.
- Make the standing of each statement clear in the sentence itself. Say whether it is decided, provisional, a fact with its origin, or an assumption.
- When a decision or open question corresponds to a shared question from a map, mention the question ID where it is discussed.
- Keep the same sections at every depth. Change the amount of detail, not the structure.
- For an interrupted path, say so in the opening paragraph and name the blockers under **Open Questions and Assumptions**.
- Add a diagram only when the user requests one. The prose remains the source of truth.
- References follow the skill's artifact boundary.

## Writing Style

- Use plain, common words. Write one idea per sentence and prefer active voice.
- Use one term for each concept. Define an unfamiliar term at first use.
- State conditions and consequences explicitly. Do not drop a condition, exception, or uncertainty to make a sentence shorter.
- Avoid idioms, filler, stacked parentheticals, and nested clauses.
