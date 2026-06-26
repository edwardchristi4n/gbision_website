---
title: "Skill — Writing User Story"
name: writing-user-story
description: Use at Phase 1 (post-brainstorm, pre-implementation) — scaffolds a user-story doc with all 12 required sections and validates completeness.
type: skill
tags: [phase-1, planning, documentation]
related:
  - ../session-kickstart/SKILL.md
  - ../diagram-standards/SKILL.md
status: active
last_updated: 2026-04-25
---

# Writing User Story

## When to invoke

- You are starting Phase 1 planning for a new ticket.
- The user asks to "write a user story" or "create an implementation plan."
- You need to document requirements before coding.
- A ticket exists but has no structured planning doc yet.

## What it does

Scaffolds a user-story document with all 12 required sections, then validates that each section is filled before handover to Phase 2.

## The 12 Required Sections

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Ticket** | ID, link, type, summary, author, reviewer |
| 2 | **Context & Problem** | Motivation, stakeholder, pain point, why now |
| 3 | **Requirements** | Functional (FR-N) and non-functional (performance, security, observability) |
| 4 | **Considered Approaches** | At least 2 approaches with pros/cons + recommendation |
| 5 | **Security & Risk Notes** | Auth, input validation, failure modes, rollback plan |
| 6 | **Knowledge Refs** | Guides, playbooks, component docs that apply |
| 7 | **Flow Diagram** | Mermaid flowchart with phase-numbered nodes (use `diagram-standards`) |
| 8 | **Sequence Diagram** | Mermaid sequence with highlight boxes matching flow colors |
| 9 | **Test Plan** | Unit, integration, E2E test cases |
| 10 | **Acceptance Criteria** | Observable, testable criteria (Given/When/Then) |
| 11 | **Spec Mapping** | Link to openspec change or equivalent |
| 12 | **Out of Scope** | What this ticket explicitly does NOT deliver |

## Scaffolding Checklist

- [ ] Create the user-story file at the correct location.
- [ ] Copy the template with all 12 sections.
- [ ] Fill in section 1 (Ticket) with known metadata.
- [ ] Fill in section 2 (Context) with the problem statement.
- [ ] Work through sections 3-12 with the user.
- [ ] For sections 7-8, invoke `diagram-standards` skill.

## Validation Checklist (Before Handover to Phase 2)

- [ ] All 12 sections have content (not just placeholders).
- [ ] Section 4 has at least 2 approaches with a clear recommendation.
- [ ] Section 7 (flow) and section 8 (sequence) use the standard color palette.
- [ ] Section 9 has at least one E2E test case defined.
- [ ] Section 10 has at least 3 acceptance criteria in Given/When/Then format.
- [ ] Section 12 explicitly lists what's out of scope.

## Red flags

- "We can skip the flow diagram, it's simple" — No. Draw it anyway.
- "Only one approach makes sense" — List it anyway, with a note that alternatives were considered but none fit.
- "Acceptance criteria: it works correctly" — Not testable. Rewrite.
- Section 12 is empty — There's always something out of scope.

## See also

- `diagram-standards` — for sections 7 and 8.
- `session-kickstart` — routes Phase 1 intents here.
- `playwright-mcp-e2e` — section 9.3 is the input for Phase 3.
