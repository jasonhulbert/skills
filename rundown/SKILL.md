---
name: rundown
description: Use when the user invokes this skill to get a plain-language overview of what was merged or deployed across one or more GitHub repositories within a timeframe.
x-anthropic:
  disable-model-invocation: true
---

# Rundown

Explain in plain language what shipped across the given repositories within the given timeframe. Write for the people who use, support, or depend on the software. Do not write a changelog of commit titles.

## Inputs

- **Repositories:** one or more `OWNER/REPO` values. Treat them as related unless the user says otherwise.
- **Timeframe:** a relative or absolute period, such as `yesterday` or `2026-11-01..2026-11-07`.
- **Optional:** the target environment and the audience. Default to production and a mixed engineering and product audience.

Ask only for missing repositories or a missing timeframe. Resolve the timeframe to absolute start and end times in the user's local timezone. State the resolved window at the top of the response.

## Determine what shipped

Use the strongest signal each repository has:

1. **GitHub Deployments** to the target environment. Ask if it is unclear which environment is production. A deploy counts at its latest `success` status, not its creation time.
2. **Releases or tags.**
3. **PRs merged into the default branch.** Label these as merged, not deployed.

For signals 1 and 2, what shipped is the commit range from the last successful deploy or release before the window to the last one inside it. Map those commits to PRs and include direct pushes that have no PR. Merge time does not determine what shipped.

If `gh` is unavailable or unauthenticated, say so and stop. These operations have pitfalls:

- `gh pr list --search "merged:START..END"` treats bare dates as UTC days. Use timestamps with an offset.
- `gh api repos/OWNER/REPO/compare/BASE...HEAD` returns at most 250 commits. Paginate or split larger ranges.
- `gh api repos/OWNER/REPO/deployments/ID/statuses` gives each deploy's outcome and time.
- `gh api repos/OWNER/REPO/commits/SHA/pulls` maps a commit to its PR.

Understand each change from its PR title, body, and labels. Read linked issues or the diff only when those do not explain the effect.

## Write the rundown

- Open with two to four sentences on the most important outcomes.
- Group by outcome, not by repository. PRs that serve one outcome form one item, whether or not they reference each other. An API endpoint and the UI that calls it are one item. Do not group changes only because they touch the same area.
- Describe each item by its effect on users, operators, or dependent systems. Link its PRs after the description.
- Rank by impact, including operational risk. Collapse tests, refactors, documentation, CI, and dependency bumps into one line per category.
- Omit a change and its revert when both shipped, unless the pair matters.
- Add a **Watch for** section only when something needs attention. Examples are part of a related set shipping without the rest, merged work that did not deploy, failed or rolled-back deploys, migrations, feature flags, and breaking changes.
- If nothing shipped, say so in one sentence and name the signal you used.
- Match detail to the window. Give specifics for a day and themes for a month.

## Boundaries

- Read only. Do not comment on, label, approve, or change anything.
- Distinguish evidence from inference. Never present merges as deploys.
