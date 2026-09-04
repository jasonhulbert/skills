---
name: spec
description: Use this skill when the user invokes it to turn the current conversation into a spec — no interview, just synthesis of what you've already discussed.
---

# Spec

This skill takes the current conversation context and codebase understanding and produces a spec. Do NOT interview the user — just synthesize what you already know.

## Process

### Step 1: Explore

Explore the repo to understand the current state of the codebase, if you haven't already.

### Step 2: Identify behavioral slices

A behavioral slice is a coherent behavior with a clear trigger and outcome. Identify the smallest set of broad behavioral slices needed to cover the spec. Prefer existing tests, fixtures, and behavioral boundaries when they fit. Start by treating the spec as one end-to-end slice, and split it only when distinct outcomes, contexts or lifecycles require separation.

### Step 3: Write the spec

> **Writing Style:** Avoid verbose, overly-dense or jargon-laden text. State a purpose or impact once and allow reasonable interpretation to cover cases. If the reader understands impact or purpose, most cases become derivable. State an idea once, at the depth needed to understand it's core premise - no deeper. A second pass over the same point in more detail is a common source of bloat.

Write the spec using the [template](#spec%20template) below. Remove any sentence that does not change implementation, verification, rollout, compatibility, or scope. State each fact in one section only. Write to a temporary location on the users machine and present. Do not wrap the presentation in surrounding prose; present only the spec.

### Step 4: Judgement

If the user requests changes to or provides direct feedback on behavioral slices, present evidence and rationale for the original slice but defer to the user for final judgement. Limit your evidence and rational to a maximum of 3 bullet points.

You must return to [Step 2](#step%202) if changes should be made to behavioral slices.

### Step 5: Save

Ask the user if and where they would like the file saved.

#### Spec Template

# [Spec Title]

## Goal

[Explain the current problem and desired outcome in enough detail to stand alone.]

## Behavioral Contract

Describe each distinct trigger, context, and observable result. Use a compact table when behavior differs across callers, states, routes, or failure modes.

Include behavior that must remain unchanged.

## Implementation Constraints

Record only decisions that affect implementation:

- Architectural boundary and execution order
- Existing services or integrations that must be reused
- Exact external identifiers, API contracts, and failure responses
- Compatibility requirements
- Persistence, schema, and configuration impact
- Security and operational invariants

Do not include an exhaustive file inventory. Stable symbols or architectural seam names are allowed when they remove ambiguity.

## Verification

List the smallest set of observable checks that proves the behavioral contract:

- Successful path
- Denial and dependency-failure paths
- Exclusions and precedence
- Preserved behavior
- Required fake or integration boundary

Include verified prior art only when it changes the test approach.

## Operational Prerequisites

Include only when deployment order, external provisioning, migration, or feature activation affects safety.

## Assumptions and Open Decisions

Include only unresolved matters that could change the implementation. State the working assumption and the consequence if it is wrong. Do not repeat established decisions.

## Out of Scope

Include only plausible adjacent work whose exclusion prevents scope expansion.
