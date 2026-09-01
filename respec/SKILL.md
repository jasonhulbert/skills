---
name: respec
description: Use when the user invokes this skill to revise an existing spec from new information or feedback while preserving coherence and challenging changes that effectively require a new spec.
---

# Respec

Revise an existing spec from new information or feedback. Protect it from accidental erosion, not from explicit new direction.

## Revise

- Read the complete spec and new input. Use the conversation and only the repository evidence needed to interpret affected claims.
- Ask for the spec only when it is unavailable. Do not interview the user for further requirements.
- Preserve unaffected content. Apply the input at the smallest coherent boundary without inferring adjacent scope.
- Pause when a change replaces the original problem or intended outcome, or makes most behavioral slices obsolete.
- Explain the discontinuity in no more than three bullets and recommend a new spec.
- Defer the boundary judgment to the user and treat their final direction as authoritative.
- Replace contradictions and update every affected section.
- Record unresolved consequential uncertainty instead of inventing a decision.
- Preserve a slice unless its trigger, outcome, or coverage boundary changes.
- Change the slice set only when the behavior requires it. Keep slices broad and testable.
- Keep every user story aligned with its behavioral slice and every acceptance criterion traceable to stated behavior.
- Remove superseded or unsupported content.

## Present

- Produce the complete revised spec in its existing structure as the current source of truth, not a changelog.
- Keep the writing concise.
- Check for gaps, contradictions, scope drift, and weakened behavioral coverage.
- Write the revision to a temporary location and present it without overwriting the source spec.
- Summarize scope or behavioral-slice changes in no more than three bullets.
- After approval, ask whether to replace the source spec or save the revision elsewhere.
