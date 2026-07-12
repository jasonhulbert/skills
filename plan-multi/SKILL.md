---
name: plan-multi
description: Break a very large task into isolated directory-backed child plans coordinated by a parent dependency manifest.
---

# Plan Multi

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it. Do not implement.

Use this for work with real child-plan boundaries such as distinct deployables,
ownership, or independently validated subprojects. Otherwise use `plan-create`.

Inspect the repository and draft children with exclusive scope, goal,
constraints, and bare-slug dependencies. Ensure collective coverage and an
acyclic graph. Ask only when a consequential unresolved choice changes the
breakdown; otherwise proceed with explicit assumptions.

Create the parent manifest first as the recovery record. Order child directories
topologically, then invoke `plan-create` for each child using its supplied
`global_goal`, `child_goal`, `child_constraints`, `depends_on`, and `output_dir`.
Keep status out of the parent.

If generation is interrupted, preserve the parent and report present and missing
children. Otherwise verify the full parent/child structure and dependency
agreement, then report the manifest, children, graph, and open questions.
