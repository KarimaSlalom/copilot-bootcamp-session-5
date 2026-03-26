---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
argument-hint: "step-number (REQUIRED, e.g. 5-0, 5-1)"
tools: ['search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Completion

Verify that all success criteria for a specific step are met in the current workspace.

## Task

1. **Get Step Number**
   - Step number is REQUIRED: ${input:step-number:Step number (e.g., 5-0, 5-1)}
   - Format should be like "5-0", "5-1", or "5-2"

2. **Retrieve Issue Content**
   - Use `gh` CLI to find the main exercise issue
   - Common patterns: `gh issue list --label exercise` or `gh issue list --label bootcamp`
   - Get full issue content: `gh issue view <issue-number>`

3. **Locate Step Section**
   - Search for the heading "# Step ${step-number}:" in the issue content
   - Extract the entire step section up to the next step heading

4. **Extract Success Criteria**
   - Find the "Success Criteria", "Validation", or similar section within the step
   - List all criteria items (usually bullet points or checkboxes)

5. **Validate Each Criterion**
   - For each criterion, check the current workspace state:
     - **Tests passing**: Run `npm test` in relevant package(s)
     - **Files exist**: Check for required files
     - **Code patterns**: Search for expected implementations
     - **Lint clean**: Run `npm run lint` if mentioned
     - **Functionality**: Verify expected behavior
   - Mark each criterion as ✅ Met or ❌ Not Met

6. **Generate Report**
   - Provide a structured summary:
     ```markdown
     ## Step ${step-number} Validation Results
     
     ### Success Criteria
     - ✅ Criterion 1: [Details of what was checked]
     - ✅ Criterion 2: [Details of what was checked]
     - ❌ Criterion 3: [Details of what failed]
       - Issue: [Specific problem found]
       - Recommendation: [How to fix]
     
     ### Overall Status
     [PASS/FAIL] - X of Y criteria met
     
     ### Next Actions
     [Specific steps to complete remaining criteria OR proceed to next step]
     ```

7. **Provide Guidance**
   - If all criteria met: Recommend committing and pushing (if not done) or moving to next step
   - If criteria not met: Provide specific, actionable steps to complete them
   - Reference relevant documentation or commands

## Context References

- [Code Quality Workflow](.github/copilot-instructions.md#workflow-patterns)
- [Testing Guidelines](docs/testing-guidelines.md)
- [Code Reviewer Agent](.github/agents/code-reviewer.agent.md)

## Success Criteria

- All success criteria from the step are checked
- Clear ✅/❌ status for each criterion
- Specific guidance provided for incomplete items
- Overall pass/fail determination
- Actionable next steps provided
