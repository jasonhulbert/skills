---
name: plan-task
description: Implement a small well-scoped task in one pass without a durable plan artifact. Use when one focused change and its validation are sufficient.
---

# Plan Task

Use this only for a focused change that does not require multiple subsystems,
sequenced migration, a substantial new abstraction, unresolved acceptance
criteria, or separate validation phases. Use `plan-create` when those boundaries
appear.

Inspect the request and relevant code. Ask only when consequential ambiguity
changes scope or acceptance; otherwise proceed with reasonable assumptions and
a concrete validation target.

Inspect the relevant code and callers, make the smallest complete change, and
follow existing patterns. Add behavior-focused tests when behavior changes.
Avoid unrelated cleanup.

Run the agreed validation and appropriate project checks. An unrun check is not
a pass. If the task expands beyond this skill's boundary, stop and recommend
`plan-create` rather than leaving a misleading partial implementation.

Report changed files, actual validation results, relied-on assumptions, and any
work explicitly deferred.
