---
title: "Skill — Session Kickstart"
name: session-kickstart
description: Use at the start of a new ticket or session — routes intent to the correct guides and playbooks.
type: skill
tags: [session-start, routing, planning]
related:
  - ../agentic-coding-mindset/SKILL.md
status: active
last_updated: 2026-04-25
---

# Session Kickstart

## When to invoke

- Start of a new ticket, or first turn of a fresh session on an existing ticket.
- When the user asks "how do I X in this project" or "where is the docs for Y".
- When you are about to touch a subsystem you have not worked in this session.
- When you notice you are reasoning from training-data priors instead of project-specific docs.

## What it does

Intent-routes the task into the correct set of guides, playbooks, and project docs so you bootstrap with the right context, not the whole knowledge base.

## Checklist

- [ ] Restate the user's intent in one sentence: "The user wants to {verb} {object} in {subsystem}."
- [ ] Classify the intent into one of the task types below.
- [ ] Load the guides marked **required** for that task type; skim the ones marked **optional**.
- [ ] Confirm which project docs are in scope (if any).
- [ ] State what you loaded, so the user can correct routing early.

## Intent → guide routing table

| Task type | Required guides | Optional guides |
|-----------|-----------------|-----------------|
| **Phase 1 planning** (new ticket) | Project context, user-story template | Workflow playbook |
| **Phase 2 implementation** (code) | Coding standards | Testing guide, component docs |
| **Phase 3 E2E** (Playwright) | playwright-mcp-e2e skill | Testing guide |
| **Database change** | Migration guide | Architecture overview |
| **New component** | Coding standards, architecture | React/component patterns |
| **RCA / bug investigation** | Troubleshooting docs | Archive of prior RCAs |
| **Documentation authoring** | Diagram standards | Templates |

> If the task does not match any row, default to project context + ask the user to disambiguate.

## Output — always announce your routing

After running the checklist, tell the user in one short block:

```
Kickstart: <task type>
Loaded: <required guide list>
Next: <first concrete step>
```

This gives the user a chance to correct the routing before you spend tokens on the wrong path.

## Red flags

- You started reading a guide without first classifying intent — stop, classify, then read.
- You loaded more than four guides on turn one — you are probably not routing, you are hoarding.
- You cannot map the user's request to any row in the table — ask a clarifying question before reading anything.

## See also

- `agentic-coding-mindset` — for baseline session behavior.
- `writing-user-story` — triggered once routing lands on Phase 1.
- `playwright-mcp-e2e` — triggered once routing lands on Phase 3.
