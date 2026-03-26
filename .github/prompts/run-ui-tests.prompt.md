---
description: "Run UI tests and summarize failures"
agent: "test-engineer"
tools: ['read', 'execute', 'todo']
---

# Run UI Tests

Execute Playwright UI end-to-end tests and provide a clear summary of results with failure classification.

## Task

1. **REQUIRED: Install Playwright Dependencies**
   - **CRITICAL FIRST STEP**: Run `npm run test:ui:install --workspace=frontend`
   - This step is MANDATORY in Ubuntu/Linux environments and after container rebuilds
   - The install script performs: `playwright install --with-deps chromium`
   - **Automated remediation**: Script includes bounded Ubuntu repo fix for common Yarn key issue, plus one retry
   - **If install fails**:
     - Stop immediately and report an environment blocker
     - Provide the failing command and key error lines
     - DO NOT perform ad-hoc package hunting or broad OS troubleshooting beyond the automated remediation
     - DO NOT continue to run Playwright tests after a failed dependency install

2. **Verify Environment**
   - Ensure backend server is running (port 3001)
   - Ensure frontend dev server is running (port 3000)
   - If not running, start from repo root: `npm start`
   - Wait a few seconds for servers to be fully ready

3. **Run UI Tests**
   - Execute: `cd packages/frontend && npm run test:ui`
   - Capture full output (pass/fail counts, error messages)
   - Alternative debug mode (if needed): `npm run test:ui -- --headed --debug`

4. **Parse Results**
   - Count total tests, passed tests, failed tests
   - Extract failure details:
     - Test name
     - Error message
     - Stack trace location
     - Screenshot/trace info (if available)

5. **Classify Failures**
   - For each failed test, categorize as:
     - **Application Code Defect**: App behavior doesn't meet test expectations
     - **Test Code Defect**: Test has wrong expectations, brittle selectors, or flaky logic
     - **Environment Defect**: External factors (network, timing, browser state, missing dependencies)

6. **Generate Summary Report**
   - Provide structured output:
     ```markdown
     ## UI Test Results
     
     **Status**: [PASS/FAIL]
     **Total**: X tests
     **Passed**: Y tests ✅
     **Failed**: Z tests ❌
     
     ### Passing Tests
     - ✅ Test name 1
     - ✅ Test name 2
     
     ### Failed Tests
     
     #### Test: [Test Name]
     **Classification**: [Application Code | Test Code | Environment]
     **Error**: [Error message]
     **Root Cause**: [Clear explanation]
     **Recommended Fix**: [Specific steps]
     
     ### Summary
     [Overall assessment and next actions]
     ```

7. **Provide Recommendations**
   - If all tests pass: Celebrate and confirm readiness to proceed
   - If tests fail:
     - For **Application Code**: Point to specific code that needs fixing
     - For **Test Code**: Suggest selector improvements or expectation fixes
     - For **Environment**: Provide setup/configuration steps
   - Recommend next prompt: `/commit-and-push` if tests pass, or debugging steps if tests fail

## Failure Classification Guide

### Application Code Defect
- Test expectations are correct
- Application behavior doesn't match expectations
- Example: Button click doesn't create todo, but test expects it to

### Test Code Defect
- Application behavior is correct
- Test has wrong expectations or brittle implementation
- Example: Test uses `.todo-item-class` selector that changed to `.todo-card`

### Environment Defect
- Tests pass/fail inconsistently
- External dependencies missing or misconfigured
- Example: Backend not running, browser dependencies missing, network timeout

## Context References

- [UI Testing Workflow](.github/copilot-instructions.md#workflow-patterns)
- [Testing Guidelines](docs/testing-guidelines.md)
- [Test Engineer Agent](.github/agents/test-engineer.agent.md)

## Success Criteria

- Playwright dependencies installed successfully (or failure reported)
- UI tests executed successfully
- Clear pass/fail summary provided
- All failures classified with root cause
- Specific recommendations for fixing failures
- Next steps clearly communicated
