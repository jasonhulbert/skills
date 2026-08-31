---
name: right-size
description: Use this skill when the user invokes it to assess whether a task or work item is sufficiently defined and contextually bounded for one agent to execute and verify within a single conservative context window based on context fit rather than time or effort.
---
# Right-size a work item

Treat any assigned task, request, ticket, issue, investigation, deliverable, or change as a work item.

Assess whether the work item can be understood, executed, and verified in one continuous agent run while retaining the necessary context and leaving reasonable headroom.

Do not estimate time or effort. Do not judge fit from file count, line count, word count, artifact count, or the number of disciplines or technical layers alone. Judge the concepts, decisions, uncertainties, and relationships that must remain active together.

A right-sized work item must not depend on a context reset, agent handoff, or supplemental planning cycle.

## Establish the assessment boundary

Use the work item and the context already available.

When relevant sources, systems, tools, or workspaces are available, perform only bounded, non-mutating discovery needed to identify the likely working area, dependencies, and verification path. If locating the relevant context requires broad exploration, treat that as sizing evidence.

Do not invent requirements, success criteria, stakeholder intent, substantive design decisions, or access that the work item does not establish. Record reasonable inferences as assumptions.

## Define completion

Identify:

- The intended outcome
- The observable completion criteria
- The expected verification method

If any of these cannot be determined reliably, identify what is missing.

## Check readiness

Evaluate each readiness gate:

- **Purpose:** Is the intended outcome identifiable?
- **Completion:** Are observable completion criteria known or safely inferable?
- **Prerequisites:** Are essential inputs, access, dependencies, approvals, and prior decisions available or established?
- **Verification:** Is there a feasible way to verify the completed outcome?

Fail a gate only when the missing condition prevents reliable sizing or a bounded execution path. Do not fail a gate because normal execution discovery remains.

If any readiness gate fails, return `Not ready`. Do not use a context-risk score to override a failed readiness gate.

## Sketch the minimum working context

If the readiness gates pass, account for the context needed to carry the work item through completion:

- Instructions, constraints, and invariants
- Relevant concepts and their relationships
- Source material, systems, tools, or workspaces
- Decisions and assumptions
- Intermediate state that must be retained
- Validation steps and resulting evidence
- Headroom for conversation, tool output, failed approaches, and unexpected findings

Use approximately 20% headroom as a qualitative safety margin. Do not attempt an exact token estimate.

Context may be summarized or externalized when later work can rely on that representation without recovering omitted detail. Do not assume externalization removes the need to reason about tightly coupled information.

## Score context risk

Score each dimension from `0` to `2` using the closest behavioral anchor.

| Dimension | 0 — Bounded | 1 — Contained risk | 2 — Significant risk |
| --- | --- | --- | --- |
| **Coherence** | One outcome and one working thread | Several tightly related outcomes sharing one execution path | Independent outcomes requiring separate execution paths |
| **Coupling** | A limited set of concepts with clear relationships | Several concepts or systems must be coordinated, but their relationships are understood | Many unfamiliar or tightly coupled concepts must remain active together |
| **Discovery** | Relevant context and working areas are known | Some bounded exploration is needed | Broad or open-ended exploration is needed before action |
| **Decision load** | Important decisions are settled or routine | A few locally resolvable choices remain | Several consequential or competing approaches must be resolved |
| **Continuity** | Intermediate context can be summarized or externalized safely | Some detail must remain active, but the working set stays contained | Substantial detail must remain active and cannot be reduced without meaningful loss |
| **Verification** | Completion has one focused verification path | Completion requires several bounded checks | Verification is broad, cross-cutting, subjective, or likely to require a separate cycle |

Score context risk rather than general difficulty. A demanding task may still score low when its working context is coherent and bounded.

Do not lower one score because another dimension is strong. A significant risk in one dimension cannot be compensated for by low risk elsewhere.

Several artifacts, systems, or disciplines may still be right-sized when governed by one clear rule. A single stated outcome may still be too large when it depends on many tightly coupled decisions.

## Make the judgment

Return exactly one judgment:

- **Right:** All readiness gates pass, no context-risk dimension scores `2`, and the total context-risk score is `3` or lower.
- **Not right:** All readiness gates pass, but at least one context-risk dimension scores `2` or the total context-risk score is `4` or higher.
- **Not ready:** At least one readiness gate fails.

Apply the rubric as written. ==Do not adjust individual scores to produce a preferred judgment.==

Ordinary execution discovery and locally resolvable decisions are compatible with `Right`. Treat uncertainty as significant when resolving it may require broad exploration, a new planning cycle, external coordination, or a decision that could substantially change the working set.

## Report the assessment

> When right-size-work-item is being used as a refinement gate within another workflow, follow that workflow’s output format. Preserve the judgment and required remediation, but do not emit the standalone assessment report unless requested.

Provide:

- **Judgment:** `Right`, `Not right`, or `Not ready`
- **Intended outcome:** One concise statement
- **Verification:** How completion would be demonstrated
- **Readiness:** `Pass`, or the failed readiness gates
- **Context risk:** Each dimension score and the total when readiness passes
- **Reasons:** No more than three work-item-specific reasons

Use the reasons to explain the failed readiness gates or the scores most responsible for the judgment. Explain every score of `2`. State important assumptions or missing information rather than silently resolving them.

For a `Not right` work item, propose the fewest independently executable phases needed. For each phase, state:

- Its outcome
- Its boundary or dependency
- Its verification method

Each phase must itself be right-sized.

For a `Not ready` work item, identify the smallest set of inputs, decisions, or access needed before reassessment. Propose a discovery phase only when it can produce a concrete decision or artifact required by later work.
