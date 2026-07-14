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

Run the smallest set of checks that can change acceptance of the outcome. Use
equivalent evidence when it establishes the same result. Treat additional
checks as confidence-building rather than new work; report checks that were not
run and any material residual uncertainty without claiming they passed. If a
material acceptance condition lacks proportionate evidence, state the gap and
recommend `plan-create` or user input rather than looping. If the task expands
beyond this skill's boundary, stop and recommend `plan-create` rather than
leaving a misleading partial implementation.

Use calibrated evidence terms such as `observed`, `inferred`, `not run`, or
`uncertain`; reserve `pass` for an observed result that matches the expected
outcome.

Report changed files, actual validation results, relied-on assumptions, and any
work explicitly deferred.
