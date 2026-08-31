---
name: spec
description: Use this skill when the user invokes it to turn the current conversation into a spec — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---
# Spec

This skill takes the current conversation context and codebase understanding and produces a spec. Do NOT interview the user — just synthesize what you already know.

## Process

### Step 1: Explore

Explore the repo to understand the current state of the codebase, if you haven't already. 

### Step 2: Identify behavioral slices

A behavioral slice is a coherent behavior with a clear trigger and outcome. Identify the smallest set of broad behavioral slices needed to cover the spec. Prefer existing tests, fixtures, and behavioral boundaries when they fit. Start by treating the spec as one end-to-end slice, and split it only when distinct outcomes, contexts or lifecycles require separation.

### Step 3: Write the spec

>**Writing Style:** Avoid verbose, overly-dense or jargon-laden text. State a purpose or impact once and allow reasonable interpretation to cover cases. If the reader understands impact or purpose, most cases become derivable. State an idea once, at the depth needed to understand it's core premise - no deeper. A second pass over the same point in more detail is a common source of bloat.

Write the spec using the [template](#spec%20template) below to a temporary location on the users machine and present. Do not wrap the presentation in surrounding prose; present only the spec.

### Step 4: Judgement

If the user requests changes to or provides direct feedback on behavioral slices, present evidence and rationale for the original slice but defer to the user for final judgement. Limit your evidence and rational to a maximum of 3 bullet points.

You must return to [Step 2](#step%202) if changes should be made to behavioral slices.

### Step 5: Save

Ask the user if and where they would like the file saved.

---

#### Spec Template

```
# <project title>

## Problem Statement

The problem that the user is facing, from the user's perspective. Make the goal understanable even when the spec source was conversational or later becomes unavailable.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A comprehensive, numbered list of user stories. Each user story should be in the format of:

1. As an <actor>, I want a <feature>, so that <benefit>

Example: "1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending"

This list of user stories should be extensive and cover all aspects of the feature.

## Implementation Decisions

A list of implementation decisions that were made. For example, this can include:

- The modules that will be built/modified
- The interfaces of those modules that will be modified
- Technical clarifications from the developer
- Architectural decisions
- Library and Tooling decisions
- Schema changes
- API contracts
- Specific interactions

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

## Testing Decisions

A list of testing decisions that were made. Include:

- A description of what makes a good test (only test external behavior, not implementation details)
- Which modules will be tested
- Prior art for the tests (i.e. similar types of tests in the codebase)

## Acceptance Criteria

List the few things that must be true for the solution to be considered working. Focus on visible results and important failure cases. Do not repeat the user stories or describe how the solution will be built. Keep the list short, group related cases, and do not try to cover every possible input.

## Assumptions and Open Questions

List only assumptions or unanswered decisions that could change what gets built or how it works. State assumptions and why they matter plainly. Do not include minor uncertainties or questions asked just for completeness. Keep this short, and leave the section out if there is nothing important to add.

## Out of Scope

A description of the things that are out of scope for this spec.

## Further Notes

Any further notes about the feature.
```
