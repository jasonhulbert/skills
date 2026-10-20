---
name: map-it
description: The user will invoke this skill to map a large vision into bounded milestones or revise an existing map when requirements or findings change.
x-anthropic:
  disable-model-invocation: true
---

# Map It

Sketch the map before following a path. The map shows how milestones connect and keeps each path oriented toward the larger vision. It provides enough direction to choose the next path while leaving room to redraw what lies ahead.

An optional step after `vision`. Each milestone is a path through `follow-the-path`, `spec`, and optional `tickets`.

## Establish context

Read the vision and available context. Ask only critical questions needed for a credible draft. Skip initial questions when the context is sufficient.

For a new map, if the whole vision fits one focused decision process and one coherent spec, recommend going directly to `follow-the-path`.

## Reorient an existing map

When re-invoked against a map, read it alongside new requirements, findings, and milestone progress. Identify what remains valid and what changes the work ahead. Resolve conflicts that block a credible revision.

Revise affected paths or replace them when their boundaries no longer fit. Preserve completed outcomes and account for work in progress. Update dependencies, shared questions, assumptions, and the next path.

Keep IDs for continuing milestones. Give replacement paths new IDs and identify which they replace. Repair references and flag downstream decisions, specs, or tickets that need review.

Present the revised draft with a brief explanation of what changed and why. Use the same refinement and resolution process below.

## Draft the map

Map the full vision using [references/output-template.md](references/output-template.md).

- Prefer usable behavior. Allow enabling milestones that produce a needed capability. Discovery milestones must name a consequential question and the evidence or decision they will produce.
- Size each milestone for one focused decision process and one coherent spec. Split independent problems hidden under one outcome. Combine fragments that only make sense together. A milestone may require several tickets.
- Distinguish required dependencies from preferred order.
- Mark later scope provisional where earlier work may change it.

## Handle shared decisions

Resolve implementation choices only when needed for credible milestone boundaries or sequencing. Leave other choices to `follow-the-path`.

Assign each shared question to a milestone. Identify dependent milestones and when they need the answer. Record working assumptions and revisit triggers. Carry inherited constraints and unresolved responsibilities into each affected milestone.

## Refine and resolve

Present the draft, then ask one or two focused questions at a time. Recommend an answer with brief rationale and relevant tradeoffs. Prioritize changes to scope, dependencies, sequence, and completion conditions.

Update the map as answers arrive. Use common words, consistent terms, and one idea per sentence. Keep discussion and superseded proposals outside the artifact.

Resolve the map when it covers the vision, follows the sizing guidance, and gives every milestone observable completion conditions. Dependencies must have no unresolved cycles. Open questions must have owners and remain answerable before dependent work needs them.

No open question may block credible boundaries or sequencing. Later milestones may remain provisional. If interrupted, preserve the draft and identify blockers.

## Save and hand off

Drafts may be saved to a temporary directory on the user's machine. At resolution, ask for a permanent destination unless the user already specified one.

Save resolved revisions to the supplied map unless the user chooses another destination.

Save using the template. Recommend the next milestone by dependency. Include enough context for `follow-the-path` to proceed without the original conversation. Continue downstream only when requested.
