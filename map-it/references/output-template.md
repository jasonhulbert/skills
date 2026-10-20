# Map Template

Use for drafts and saved maps. Replace placeholders. Repeat milestone entries. Write `None.` for empty sections.

Keep IDs consistent. Planning status describes the boundary: `Established` means supported by current context; `Provisional` means earlier work may change it. Resolved maps may contain provisional milestones.

```markdown
# [Project name] Map

## Purpose and Sources

[Intended outcome and beneficiary.]

- **Vision:** [Source]
- **Supporting context:** [Decisions and sources]
- **Constraints:** [Shared limits]
- **Outside this map:** [Exclusions]

## Map Status

- **Resolution:** [Draft or Resolved]
- **Remaining blockers:** [Questions preventing credible boundaries or sequencing]

## Milestone Overview

| Milestone | Outcome | Required dependencies | Planning status |
| --- | --- | --- | --- |
| milestone-1: [Title] | [Result] | [Milestone IDs or None.] | [Established or Provisional] |

[Explain preferred order and independent paths where useful.]

## Milestones

### milestone-1: [Title]

**Outcome:** [Result and contribution to the vision]

**Included:** [Scope]

**Outside this milestone:** [Exclusions]

**Dependencies:** [Milestone IDs or external prerequisites, required results, and when needed]

**Completion conditions:**

- [Observable condition proving the outcome]

**Inherited constraints:** [Decisions and limits to preserve]

**Questions for follow-the-path:** [Local questions or shared question IDs to resolve]

## Shared Questions

| ID | Question | Owning milestone | Dependent milestones | Answer needed by |
| --- | --- | --- | --- | --- |
| question-1 | [Shared choice] | [Milestone ID] | [Milestone IDs] | [Decision point] |

## Assumptions and Revisit Triggers

| Assumption | Affected milestones or questions | Revisit when |
| --- | --- | --- |
| [Working assumption] | [IDs] | [Evidence, decision, or result] |

## Next Path

**Recommended milestone:** [ID and reason, or blocker to resolve first]

**Handoff:** [Sources and decisions needed for this milestone's follow-the-path.]
```
