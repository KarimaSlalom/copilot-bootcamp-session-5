---
description: "Analyze changes, generate commit message, and push to feature branch"
argument-hint: "branch-name (REQUIRED)"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

Analyze changes, generate a conventional commit message, and push to a feature branch.

## Task

1. **Validate Prerequisites**
   - If ${input:branch-name:Feature branch name (REQUIRED)} is not provided, stop and ask the user for it
   - If the current step includes required UI workflow, verify:
     - `npm run test:ui` has been run successfully, OR
     - `/run-ui-tests` was executed successfully in the current chat
   - If UI tests have not run and are required, prompt user to run `/run-ui-tests` first

2. **Analyze Changes**
   - Run `git status` to see all modified files
   - Run `git diff` to understand the nature of changes
   - Categorize changes (feature, fix, test, refactor, docs, etc.)

3. **Generate Commit Message**
   - Use conventional commit format:
     - `feat:` - New feature
     - `fix:` - Bug fix
     - `test:` - Test additions or modifications
     - `refactor:` - Code refactoring
     - `docs:` - Documentation changes
     - `chore:` - Maintenance tasks
     - `style:` - Code style changes
   - Write a clear, descriptive message (e.g., "feat: add todo completion toggle")
   - Include scope if helpful (e.g., "feat(api): add delete endpoint")

4. **Branch Management**
   - Check if the specified branch exists: `git branch --list ${branch-name}`
   - If branch does NOT exist: `git checkout -b ${branch-name}`
   - If branch exists: `git checkout ${branch-name}`
   - CRITICAL: NEVER commit to `main` or any branch other than the user-provided branch name

5. **Commit and Push**
   - Stage all changes: `git add .`
   - Commit with generated message: `git commit -m "<message>"`
   - Push to remote: `git push origin ${branch-name}`
   - If this is the first push to the branch, use: `git push -u origin ${branch-name}`

6. **Report Results**
   - Display the commit message used
   - Show the branch pushed to
   - Confirm push was successful
   - Provide next steps (e.g., create PR, continue with next step)

## Context References

- [Git Workflow](.github/copilot-instructions.md#git-workflow)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Success Criteria

- Changes committed with descriptive conventional commit message
- Changes pushed to specified feature branch (NOT main)
- UI tests validated if required by the step
- User informed of next actions
