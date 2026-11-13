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

Plan for local development and verification where practical. Do not make deployment of unfinished work a routine implementation dependency. Deployment execution and changes to shared environments require user authorization. Do not require production data, metrics, or user research unless requested.

## Process

### Step 1: Gather context

Read the vision, map milestone, and decision artifact when they are available. Explore the repo to understand the current state of the codebase, its conventions, and where the work fits, if you haven't already.

Preserve explicit decisions and exclusions. Treat local-development instructions as execution limits unless the source explicitly limits the product. Do not invent user preferences, targets, or settled designs. Note missing context that would change what gets built.

### Step 2: Write the spec

Use plain language. State each idea once at the depth needed to guide implementation. Let clear intent cover derivable cases.

Use the [template](#spec-template). Omit what a capable implementer would do or decide without help.

Use relative links only to workflow artifacts in the designated workflow directory tree, defaulting to the spec's destination directory. Exclude codebase and outside references, including plain-text paths. Do not widen the boundary or copy sources to bypass it. Resolve links for the final location; omit them while that location is unknown.

Retain repository findings as requirements or consequential constraints. Omit code excerpts, file inventories, and research or execution reports. Preserve intent without requiring the conversation; implementers inspect current code independently.

Describe what done looks like as a finished experience in its intended operating conditions. Plain words such as "polished", "consistent with the rest of the app", or "handles the empty and error cases a user will hit" are useful. Do not expand them into exhaustive criteria.

Before presenting, ask whether an implementer could follow this spec and still deliver something the user would be disappointed by. Close gaps within scope or name the missing decision. Distinguish unresolved requirements from checks that can wait until release.

Write to a temporary location on the user's machine and present. Do not wrap the presentation in surrounding prose; present only the spec.

### Step 3: Revise

Apply the user's feedback. When you disagree with a change, give up to three bullets of rationale and defer to the user.

Replace superseded statements in place. Do not append reports or sections.

### Step 4: Save

Ask the user if and where they would like the file saved.

## Spec Template

```markdown
# [Spec Title]

## Goal

[Problem, beneficiary, and intended outcome. Link the vision and decisions within the workflow boundary.]

## What Done Looks Like

[Describe the finished result from the user's point of view: what they can do, how it should feel, and the quality bar. Include behavior that must not change. Use short subsections when the work has distinct parts.]

## Decisions

- [Settled decision, with a short reason when the reason guides other choices.]

## Constraints

- [Constraints not evident from the codebase: integrations, contracts, compatibility, data or schema impact, security, deployment or transition requirements, or non-obvious verification needs. Include requirements for work handed off for later execution.]

## Left to the Implementer

- [Choices the implementer should make using judgment and existing conventions. Note any that should be escalated instead.]

## Open Questions

- [Only unresolved questions that could change what gets built, with the working assumption to use until answered.]

## Out of Scope

- [Only plausible adjacent work that should not be done.]
```

Omit Constraints, Open Questions, or Out of Scope when they would be empty.
