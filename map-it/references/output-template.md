# Map Template

Use for drafts and saved maps. Replace placeholders. Repeat milestone entries. Write `None.` for empty sections. Do not invent entries to fill a section.

Keep the sections and fields shown. References follow the skill's artifact boundary. Omit unavailable references.

Keep IDs consistent. Planning status describes the boundary: `Established` means supported by current context; `Provisional` means earlier work may change it. Resolved maps may contain provisional milestones.

Milestones added for work found during earlier milestones use `emergent-milestone-N.M` IDs. `N` is the planned milestone they follow in preferred order, or the last planned milestone for an addition at the end. `M` counts emergent milestones after that anchor and starts at 1. IDs do not nest and never change. Place the overview row and milestone entry after the anchor, in `M` order. Use the same fields as planned milestones.

Use `milestone-N` or `emergent-milestone-N.M` for the heading placeholder.

```markdown
# [Project name] Map

## Purpose and Sources

[Intended outcome and beneficiary.]

- **Vision:** [Vision link or None.]
- **Workflow references:** [Decision artifacts needed to interpret this map, or None.]
- **Constraints:** [Shared limits and intended operating conditions]
- **Outside this map:** [Exclusions]

## Map Status

- **Resolution:** [Draft or Resolved]
- **Remaining blockers:** [Questions preventing credible boundaries or sequencing]

## Milestone Overview

| Milestone            | Outcome  | Required dependencies    | Planning status              |
| -------------------- | -------- | ------------------------ | ---------------------------- |
| milestone-1: [Title] | [Result] | [Milestone IDs or None.] | [Established or Provisional] |

[Explain preferred order and independent paths where useful.]

## Milestones

### [emergent?]-milestone-1: [Title]

**Outcome:** [Result and contribution to the vision]

**Included:** [Scope]

**Outside this milestone:** [Exclusions]

**Dependencies:** [Milestone IDs or external prerequisites, required results, and when needed]

**Done when:** [Finished outcome from the user's point of view and acceptance method]

**Inherited constraints:** [Decisions and limits to preserve]

**Questions for follow-the-path:** [Local questions or shared question IDs to resolve]

## Shared Questions

| ID         | Question        | Owning milestone | Dependent milestones | Answer needed by |
| ---------- | --------------- | ---------------- | -------------------- | ---------------- |
| question-1 | [Shared choice] | [Milestone ID]   | [Milestone IDs]      | [Decision point] |

## Assumptions and Revisit Triggers

| Assumption           | Affected milestones or questions | Revisit when                                              |
| -------------------- | -------------------------------- | --------------------------------------------------------- |
| [Working assumption] | [IDs]                            | [Decision or implementation finding that would change it] |

## Next Path

**Recommended milestone:** [ID and reason, or blocker to resolve first]

**Handoff:** [Relevant milestone or question IDs and workflow links. Do not repeat their contents.]
```
