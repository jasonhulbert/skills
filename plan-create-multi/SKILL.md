---
name: plan-create-multi
description: Create a durable parent manifest and isolated child plans for a large multi-workstream effort without implementing it. Use only when the user explicitly asks for a saved or auditable multi-plan breakdown with distinct deployables, owners, or independently validated subprojects.
---

# Plan Create Multi

Read `../plan-shared/PLAN-CONTRACT.md` first and follow it. Do not implement.

Use this only for work with real child-plan boundaries such as distinct
deployables, ownership, or independently validated subprojects. Otherwise use
`plan-create`.

Inspect the repository and draft children with exclusive scope, affected areas,
interfaces, goal, constraints, and unique bare-slug dependencies. Ensure
collective coverage and an acyclic graph. Put cross-child checks at the smallest
appropriate boundary and avoid duplicated validation. Ask only when a
consequential unresolved choice changes the decomposition; otherwise record an
explicit assumption.

Choose the unused final directory name before writing. Create a hidden temporary
sibling on the same filesystem. Build the parent manifest and every child plan
inside that temporary directory. The parent must contain enough scope,
coordination, goal, constraint, and dependency detail to reconstruct a child
without chat context.

Order child directories topologically, then run full `plan-create` behavior for
each child using its supplied `global_goal`, `child_goal`, `child_constraints`,
`coordination_boundaries`, `depends_on`, and temporary `output_dir`. Keep live
status out of the parent.

Validate the complete temporary tree, including contract version, links, unique
slugs, graph cycles, collective coverage, exclusive affected areas, and parent
and child dependency agreement. Publish only by atomically renaming the complete
temporary directory to the chosen final directory. Never publish a partial
parent. If interrupted, leave the final path absent and report the temporary
path and exact resume action.

Report the final manifest, children, dependency graph, assumptions, and open
questions.
