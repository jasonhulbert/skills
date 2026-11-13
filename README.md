# Skills

Personal agent skills for Claude Code and Codex. Each directory is one skill. Install a skill by linking its repository directory directly into `~/.claude/skills` for Claude Code and `~/.agents/skills` for Codex.

Invocation policy is defined per skill. Workflow skills require user invocation. `browser-use` supports automatic use when a task needs browser access. Provider-specific settings use namespaced frontmatter such as `x-anthropic` and `agents/openai.yaml`.

## Planning and Delivery

These skills take an idea from rough intent to a finished feature. They settle what an agent cannot or should not decide alone. Then they hand the work to an agent that is trusted to use judgment for everything else.

### Principles

- Plan intent and consequential decisions. Leave routine detail to the implementer.
- Done means a finished result the intended user would accept in its intended operating conditions. Acceptance criteria are a minimum, not the goal.
- Develop and verify locally where practical, using authorized services when needed. Address deployment or transition feasibility when relevant.
- Deployment of unfinished work is not a routine implementation dependency. Deployment execution and changes to shared environments require your authorization.
- The vision and decisions travel with the work to the agent that builds it.
- Workflow artifacts retain intent, scope, decisions, and status. Revise existing fields; keep research and execution reports in the conversation.
- Use relative links only to workflow artifacts within the designated directory tree. Exclude codebase and outside references. Agents inspect current code as needed.
- Split work only when it does not fit one implementation run. Every split adds a seam that someone must polish.

### Choosing a Flow

| Size | Flow | What the implementer gets |
| --- | --- | --- |
| Small: one focused change | `vision` → `follow-the-path` → implement | The decision artifact and the vision |
| Medium: one coherent feature | `vision` → `follow-the-path` → `spec` → implement | The spec, the decision artifact, and the vision |
| Large: several milestones | `vision` → `map-it` → for each milestone: `follow-the-path` → `spec` → implement | One spec per milestone, plus the vision and the milestone's decisions |

To implement directly, give the agent the spec or decision artifact with a prompt like this: "Implement this. Use the vision and decisions for intent. Use your judgment for anything they don't settle. You're done when the result matches 'What Done Looks Like', not when the tests pass. Report discoveries and verification in your response. Do not edit workflow artifacts or add companion reports unless I request it."

Use tickets only when a milestone does not fit one implementation run. Run `tickets` on the spec. Then choose how much oversight you want:

- `execute-ticket`: run one ticket at a time and review between tickets.
- `orchestrate-tickets`: let an orchestrating agent run every ticket through subagents and judge the results.

Both paths end with an integration and polish ticket that reviews the combined result against the spec and the vision.

### Workflow Skills

| Skill | Purpose |
| --- | --- |
| `vision` | Shape a rough idea into a short, high-level vision: what it is, why it exists, and the broad approach. Challenges weak premises. |
| `map-it` | Break a large vision into milestones with dependencies. Revise the map as work reveals changes. Add work found during a milestone without re-planning the whole map. |
| `follow-the-path` | Resolve consequential decisions through focused questions. Produces a decision artifact. Choose `shallow`, `standard`, or `deep` depth. |
| `spec` | Turn the conversation, vision, and decisions into an implementation brief. Does not interview you. |
| `respec` | Revise an existing spec from new information without eroding what still holds. |
| `tickets` | Split a spec into right-sized vertical slices that end with a polish ticket. Recommends skipping tickets when the spec fits one run. |
| `right-size` | Judge whether a work item fits one agent run. `tickets` uses it as a gate. |
| `execute-ticket` | Implement and verify one ticket to a finished result. |
| `orchestrate-tickets` | Run a ticket set through subagents, judge each result, and finish with a product-level review. |

## Other Skills

| Skill | Purpose |
| --- | --- |
| `blueprint-diagram` | Build interactive isometric diagrams in a blueprint style for systems, workflows, and event flows. |
| `handoff` | Compress the current conversation into a document another agent can pick up. |
| `investigate-bug` | Find a bug's root cause and propose a fix. Waits for approval before changing code. |
| `obsidian-cli` | Use the Obsidian CLI when the Obsidian MCP server is unavailable or lacks an operation. |
| `rundown` | Summarize in plain language what was merged or deployed across one or more repositories in a timeframe. |
| `ste` | Write a response with Standard Technical English structure and grammar controls. |
| `take-stock` | Summarize the current state of work without changing it. |
| `technical-research` | Compare current technical options against your requirements and recommend one with evidence. |
| `wat` | Clarify a response, idea, or subject. |
