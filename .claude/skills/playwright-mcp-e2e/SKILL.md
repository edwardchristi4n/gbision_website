---
title: "Skill — Playwright MCP E2E"
name: playwright-mcp-e2e
description: Use when running Phase 3 end-to-end testing via Playwright MCP — negotiates test approach, scaffolds evidence folder, enforces the 6-step playbook, and generates QA handover.
type: skill
tags: [e2e, playwright, testing, phase-3]
related:
  - ../../playbooks/playwright-mcp-e2e-testing/
  - ../writing-user-story/SKILL.md
status: active
last_updated: 2026-04-25
---

# Playwright MCP E2E

## When to invoke

- The user asks to run an E2E test through the browser via Playwright MCP.
- A Phase 2 implementation is complete and you need to validate via real UI flow.
- A bug reproduction requires a browser session and evidence capture.
- You are starting a new E2E test cycle for a ticket (new evidence folder needed).

## Pre-flight

- [ ] Playwright MCP is installed and reachable in the current session.
- [ ] Target frontend is running and you know the URL (dev, staging, or local).
- [ ] The ticket has a user-story with section 9 (test plan) populated.
- [ ] You have write access to `<YOUR_EVIDENCE_ROOT>/<ticket-slug>/`.

---

## Phase 0 — Negotiation (ALWAYS START HERE)

Before executing any tests, enter planning/brainstorming mode with the user.

### 0.1 Check for past tests

```bash
ls <YOUR_EVIDENCE_ROOT>/
```

- [ ] If past test folders exist, read the most recent `MASTER_TEST_REPORT_*.md` to extract:
  - Test Prerequisites section (SSL setup, services, human intervention)
  - Test Execution Flow (standardized steps)
  - Insights from prior testing
- [ ] Ask user: "I found past tests at `<folder>`. Should I copy the prerequisites and insights from there?"

### 0.2 Discuss feature scope

Ask the user (if not already discussed):

- [ ] **What changed in this ticket?** — List BE changes, FE changes, API changes
- [ ] **What are the happy path scenarios?** — Core functionality that MUST work
- [ ] **What are the negative/edge cases worth testing?** — Error handling, boundary conditions
- [ ] **What existing unit/integration tests cover this?** — Reference tests already written

### 0.3 Discuss prerequisites and human intervention

Ask the user (if not copied from past tests):

- [ ] **What URL will we test?** — `<YOUR_LOCAL_URL>`, staging, etc.
- [ ] **Are there SSL certificate issues?** — Does the user need to click "Advanced → Continue"?
- [ ] **What login flow is required?** — SSO, manual login, API token?
- [ ] **What human interventions are needed?** — Clicks that MCP cannot automate
- [ ] **What services must be running?** — Backend, database, external APIs

### 0.4 Discuss evidence collection

- [ ] **Evidence folder path?** — Confirm or create path
- [ ] **Naming convention?** — Default: `MASTER_TEST_REPORT_<SLUG>.md`, `HANDOVER_TEST_REPORT_<SLUG>.md`
- [ ] **What evidence per TC?** — Screenshots, console logs, network logs, exported data

### 0.5 Present test approach

Before proceeding, present your plan to the user and wait for confirmation.

---

## The six-step loop

### Step 1 — Plan test cases
- [ ] Produce test scenarios table (ID, type, scenario, why)
- [ ] Save directly into `MASTER_TEST_REPORT_<SLUG>.md` (NOT a separate test-plan.md)

### Step 2 — Scaffold evidence folder
- [ ] Create `tc-NNN/` subfolders for each scenario
- [ ] Create `bugs/` folder
- [ ] Initialize master report with 14-section skeleton

### Step 3 — Execute via MCP
- [ ] For each scenario: drive browser, capture screenshots, handle human intervention
- [ ] Update master report after each TC

### Step 4 — Discover & RCA bugs
- [ ] For each failure: create `bugs/BUG-<id>-<slug>.md`
- [ ] Link bug from master report

### Step 5 — Master report
- [ ] Fill all 14 sections
- [ ] Update executive summary with final counts

### Step 6 — QA Handover
- [ ] Generate `HANDOVER_TEST_REPORT_<SLUG>.md`
- [ ] Include QA Backlog and Known Limitations
- [ ] Remind user about PDF export

---

## Evidence folder shape

```
<YOUR_EVIDENCE_ROOT>/<ticket-slug>/
├── MASTER_TEST_REPORT_<SLUG>.md
├── HANDOVER_TEST_REPORT_<SLUG>.md
├── tc-001/
│   ├── tc-001-01-initial.png
│   └── ...
├── tc-002/
└── bugs/
    └── BUG-001-*.md
```

---

## Red flags

- **Skipped Phase 0** — Go back and negotiate scope/prerequisites first.
- **Separate test-plan.md** — Plan should be IN the master report.
- **No screenshots saved** — You're not in the evidence folder.
- **Bug but no RCA doc** — Don't advance until RCA is drafted.
- **No QA handover** — Step 6 is required.

---

## Pre-handover checklist

- [ ] Phase 0 negotiation completed
- [ ] Every scenario has a result in master report
- [ ] Every bug has an RCA doc
- [ ] HANDOVER_TEST_REPORT exists with QA backlog
- [ ] Evidence folder referenced from ticket or PR

---

## See also

- `writing-user-story` — section 9 is the input to Phase 0
- `session-kickstart` — routes E2E intents here
- `agentic-coding-mindset` — pause-and-consult when bugs appear
