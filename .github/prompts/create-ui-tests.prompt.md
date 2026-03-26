---
description: "Create UI tests for required critical user journeys"
agent: "test-engineer"
argument-hint: "journeys (optional)"
tools: ['search', 'read', 'edit', 'execute', 'todo']
---

# Create UI Tests

Generate or update Playwright UI end-to-end tests for critical user journeys using Page Object Model best practices.

## Task

1. **Identify Target Journeys**
   - Journeys to test: ${input:journeys:User journeys to test (optional, leave blank for default set)}
   - If no journeys specified, use default set:
     - Create todo
     - Edit todo (if edit functionality exists)
     - Toggle todo completion
     - Delete todo
     - Error state handling (e.g., empty todo submission)

2. **HARD LIMIT: Maximum 5 Playwright Tests**
   - Create or update a MAXIMUM of 5 Playwright test cases total
   - Target range: 3-5 tests for this run
   - Include at least 1 error-path test within the 3-5 total
   - If more than 5 candidate scenarios exist:
     - Select the 5 highest-risk scenarios
     - List deferred scenarios in comments but DO NOT implement them
   - NEVER create more than 5 test cases in a single run

3. **Review Existing Tests**
   - Check `packages/frontend/tests/ui/` for existing Playwright tests
   - Identify what's already covered
   - Determine if tests need to be created or updated

4. **Apply Page Object Model (POM)**
   - Create or update page objects in `tests/ui/page-objects/`
   - Page objects should contain:
     - Reusable selectors (using stable queries)
     - Reusable interaction methods (e.g., `addTodo()`, `completeTodo()`)
     - Query methods for element retrieval
   - Keep test files focused on:
     - Scenario intent and flow
     - Assertions and expectations
     - NO duplicated selectors across tests

5. **Use Stable Selectors**
   - Priority order:
     1. Role + accessible name: `getByRole('button', { name: /add/i })`
     2. Label text: `getByLabelText('Todo title')`
     3. Placeholder: `getByPlaceholderText(/what needs to be done/i)`
     4. Test ID: `getByTestId('todo-item')` (last resort)
   - AVOID: CSS classes, brittle selectors

6. **Use State-Based Waits**
   - ✅ DO: `await element.waitFor({ state: 'visible' })`
   - ✅ DO: `await page.waitForLoadState('domcontentloaded')`
   - ❌ DO NOT: `await page.waitForTimeout(2000)` (arbitrary timeouts)

7. **Ensure Test Quality**
   - Tests must be:
     - **Deterministic**: Same result every run
     - **Isolated**: No shared state between tests
     - **Readable**: Clear scenario intent
     - **Debuggable**: Descriptive assertions

8. **Verify Test Count**
   - Before finishing, count the number of `test(...)` or `it(...)` blocks created/updated
   - If count exceeds 5, reduce to the 5 highest-priority scenarios
   - DO NOT claim "small scope" if final count is greater than 5

9. **Report Results**
   - List files created or modified
   - Summarize scenarios covered (max 5)
   - List any deferred scenarios (if more than 5 were candidates)
   - Confirm test count is within the 3-5 target range

## Example Page Object Pattern

```javascript
// tests/ui/page-objects/TodoPage.js
class TodoPage {
  constructor(page) {
    this.page = page;
    this.input = page.getByPlaceholder(/what needs to be done/i);
    this.addButton = page.getByRole('button', { name: /add/i });
  }

  async goto() {
    await this.page.goto('http://localhost:3000');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addTodo(title) {
    await this.input.fill(title);
    await this.addButton.click();
    await this.page.getByText(title).waitFor({ state: 'visible' });
  }

  getTodoByTitle(title) {
    return this.page.getByText(title);
  }
}
```

## Context References

- [UI Testing Workflow](.github/copilot-instructions.md#workflow-patterns)
- [Testing Guidelines](docs/testing-guidelines.md)
- [Test Engineer Agent](.github/agents/test-engineer.agent.md)
- [Playwright Documentation](https://playwright.dev)

## Success Criteria

- Maximum 5 Playwright test cases created/updated (target: 3-5)
- At least 1 error-path test included
- Page Object Model applied (selectors/interactions in page objects)
- Stable selectors used (role, label, placeholder)
- State-based waits (no arbitrary timeouts)
- Tests are deterministic, isolated, and readable
- Files and scenarios clearly reported
- Deferred scenarios listed if more than 5 candidates existed
