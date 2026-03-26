---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
argument-hint: "issue-number (optional)"
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute Step Instructions

Execute the instructions from the current step in a GitHub Issue, following the project's TDD workflow.

## Task

1. **Get Issue Content**
   - If ${input:issue-number:Issue number (leave blank to auto-detect)} is provided, use it
   - Otherwise, use `gh` CLI to find the exercise issue (search for issues with label "exercise" or "bootcamp")
   - Retrieve the full issue content including comments: `gh issue view <number>`

2. **Parse Step Instructions**
   - Locate the latest step in the issue (e.g., "# Step 5-0:", "# Step 5-1:")
   - Extract all `:keyboard: Activity:` sections from that step
   - Read each activity instruction carefully

3. **Execute Activities Systematically**
   - Work through each activity in order
   - Follow TDD principles: Red → Green → Refactor
   - Write tests FIRST for new features
   - Run tests after each implementation
   - Document progress in todo list

4. **Scope Boundaries**
   - ✅ **DO**: Implement backend and frontend component features with TDD
   - ✅ **DO**: Write Jest and React Testing Library tests
   - ❌ **DO NOT**: Create or run Playwright UI tests in this prompt
   - ❌ **DO NOT**: Commit or push changes (use `/commit-and-push` instead)

5. **Handoff Rules for UI Testing**
   - If the step requires UI end-to-end testing (Playwright):
     - Complete all non-UI activities first
     - Use `/create-ui-tests` to generate UI tests (auto-switches to test-engineer agent)
     - Use `/run-ui-tests` to execute and validate UI tests (auto-switches to test-engineer agent)
   - **IMPORTANT**: Do NOT proceed to `/validate-step` until required UI workflows are complete

6. **Completion**
   - After completing all activities, provide next commands in order:
     - **If UI workflow required**: `/create-ui-tests` → `/run-ui-tests` → `/validate-step {step-number}`
     - **If UI workflow NOT required**: `/validate-step {step-number}`
   - NEVER recommend `/validate-step` before required UI prompts

## Context References

- [TDD Workflow](.github/copilot-instructions.md#workflow-patterns)
- [Testing Guidelines](docs/testing-guidelines.md)
- [TDD Developer Agent](.github/agents/tdd-developer.agent.md)

## Success Criteria

- All `:keyboard: Activity:` sections completed
- Tests written and passing (Jest, React Testing Library)
- Changes validated but NOT committed
- Clear next steps provided based on UI workflow requirements
