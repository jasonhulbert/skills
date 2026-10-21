---
name: spec
description: Use this skill when the user invokes it to turn the current conversation, vision, and decisions into an implementation brief. No interview, just synthesis of what you've already discussed.
x-anthropic:
  disable-model-invocation: true
---

# Spec

This skill turns the current conversation, vision, decisions, and codebase understanding into a spec. Do NOT interview the user — just synthesize what you already know.

A spec is a brief, not a contract. It carries intent, decisions, and boundaries so an implementer can deliver a finished result. The implementer is expected to use judgment for everything the spec does not settle.

## Operating Context

Work happens in local development. Do not include deployments, hosted environments, production data, metrics, user research, or rollout plans unless the user asks for them. Verification means what an agent can do locally: run tests, run the app, and use the feature.

## Process

### Step 1: Gather context

Read the vision, map milestone, and decision artifact when they are available. Explore the repo to understand the current state of the codebase, its conventions, and where the work fits, if you haven't already.

Preserve explicit decisions and exclusions. Do not invent user preferences, targets, or settled designs. Note missing context that would change what gets built.

### Step 2: Write the spec

> **Writing Style:** Avoid verbose, overly-dense or jargon-laden text. State a purpose or impact once and allow reasonable interpretation to cover cases. If the reader understands impact or purpose, most cases become derivable. State an idea once, at the depth needed to understand its core premise - no deeper. A second pass over the same point in more detail is a common source of bloat.

Write the spec using the [template](#spec-template) below. Leave out anything a capable implementer would do anyway or decide well without help. State each fact in one section only.

Describe what done looks like as a finished experience, not a list of checks. Plain words such as "polished", "consistent with the rest of the app", or "handles the empty and error cases a user will hit" are useful. Do not expand them into exhaustive criteria.

Before presenting, ask whether an implementer could follow this spec and still deliver something the user would be disappointed by. If so, close the gap within scope or name the missing decision.

Write to a temporary location on the user's machine and present. Do not wrap the presentation in surrounding prose; present only the spec.

### Step 3: Revise

Apply the user's feedback. When you disagree with a change, give up to three bullets of rationale and defer to the user.

### Step 4: Save

Ask the user if and where they would like the file saved.

## Spec Template

```markdown
# [Spec Title]

## Goal

[The problem, who it is for, and the intended outcome. Link the vision and decision artifacts when they exist.]

## What Done Looks Like

[Describe the finished result from the user's point of view: what they can do, how it should feel, and the quality bar. Include behavior that must not change. Use short subsections when the work has distinct parts.]

## Decisions

- [Settled decision, with a short reason when the reason guides other choices.]

## Constraints

- [Only constraints the implementer could not infer from the codebase: required integrations, external contracts, compatibility, data or schema impact, security, or a testing approach the codebase does not make obvious.]

## Left to the Implementer

- [Choices the implementer should make using judgment and existing conventions. Note any that should be escalated instead.]

## Open Questions

- [Only unresolved questions that could change what gets built, with the working assumption to use until answered.]

## Out of Scope

- [Only plausible adjacent work that should not be done.]
```

Omit Constraints, Open Questions, or Out of Scope when they would be empty.
