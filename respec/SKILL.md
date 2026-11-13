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
- Record unresolved consequential uncertainty as an open question with a working assumption. Distinguish unresolved requirements from checks that can wait until release.
- Keep "What Done Looks Like" a description of the finished result in its intended operating conditions. Do not convert it into a checklist.
- Treat local-development instructions as execution limits unless the source explicitly limits the product. Do not add deployment execution, production data, metrics, or user research unless requested.
- Remove superseded or unsupported content.
- Retain findings as requirements or consequential constraints. Omit code excerpts, file inventories, and research or execution reports.
- Use relative links only to workflow artifacts in the designated workflow directory tree, defaulting to the spec's destination directory. Remove codebase and outside references, including plain-text paths, while preserving necessary conclusions. Do not widen the boundary or copy sources to bypass it.

## Present

- Produce the complete revised spec in its existing structure as the current source of truth, not a changelog.
- Keep the writing concise.
- Check for gaps, contradictions, and scope drift, including deployment or transition feasibility where the revision affects it.
- Resolve links for the final destination, not the temporary review copy.
- Write the revision to a temporary location and present it without overwriting the source spec.
- Summarize changes to scope or to "What Done Looks Like" in no more than three bullets.
- After approval, ask whether to replace the source spec or save the revision elsewhere.
