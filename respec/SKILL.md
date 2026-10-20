---
name: respec
description: Use when the user invokes this skill to revise an existing spec from new information or feedback while preserving coherence and challenging changes that effectively require a new spec.
x-anthropic:
  disable-model-invocation: true
---

# Respec

Revise an existing spec from new information or feedback. Protect it from accidental erosion, not from explicit new direction.

## Revise

- Read the complete spec and new input. Use the conversation and only the repository evidence needed to interpret affected claims.
- Ask for the spec only when it is unavailable. Do not interview the user for further requirements.
- Preserve unaffected content. Apply the input at the smallest coherent boundary without inferring adjacent scope.
- Pause when a change replaces the original problem or intended outcome, or makes most of "What Done Looks Like" obsolete.
- Explain the discontinuity in no more than three bullets and recommend a new spec.
- Defer the boundary judgment to the user and treat their final direction as authoritative.
- Replace contradictions and update every affected section.
- Record unresolved consequential uncertainty as an open question with a working assumption instead of inventing a decision.
- Keep "What Done Looks Like" a description of the finished result. Do not convert it into a checklist.
- Do not add deployment, production data, metrics, or rollout content unless the user asks for it.
- Remove superseded or unsupported content.

## Present

- Produce the complete revised spec in its existing structure as the current source of truth, not a changelog.
- Keep the writing concise.
- Check for gaps, contradictions, and scope drift.
- Write the revision to a temporary location and present it without overwriting the source spec.
- Summarize changes to scope or to "What Done Looks Like" in no more than three bullets.
- After approval, ask whether to replace the source spec or save the revision elsewhere.
