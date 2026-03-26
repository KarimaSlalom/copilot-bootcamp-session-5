---
description: "Workspace-wide instructions for TODO application development with TDD, testing strategies, and specialized agent workflows"
---

# TODO Application Development Guidelines

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React-based user interface
- **Backend**: Express API server
- **Development Philosophy**: Iterative, feedback-driven development
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Consult these documents to understand the project architecture and workflows:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles for all development work:

1. **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle
   - Write tests first (RED)
   - Implement code to pass tests (GREEN)
   - Refactor for quality (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - Each change should be independently verifiable
   - Avoid large, monolithic updates

3. **Systematic Debugging**: Use test failures as guides
   - Read error messages carefully
   - Isolate the failing component
   - Fix and verify systematically

4. **Validation Before Commit**: Ensure quality gates pass
   - All tests must pass
   - No lint errors
   - Manual verification when appropriate

## Testing Scope

This project uses a multi-layered testing strategy:

### Test Types

- **Backend**: Jest + Supertest for API testing
- **Frontend Component Tests**: React Testing Library for unit/integration tests
- **UI End-to-End Tests**: Playwright for critical user journey automation
- **Manual Browser Testing**: Exploratory validation and visual checks

### Testing Approach by Context

**Backend API Changes**:
- Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)
- Test API endpoints, request/response handling, and business logic
- Validate error handling and edge cases

**Frontend Component Features**:
- Write React Testing Library tests FIRST for component behavior, then implement (RED-GREEN-REFACTOR)
- Test user interactions, state changes, and rendering
- Follow with manual browser testing for full UI flows

## Workflow Patterns

Follow these standard workflows for different types of tasks:

### 1. TDD Workflow
1. Write or fix tests
2. Run tests
3. Observe failure (RED)
4. Implement minimal code to pass
5. Run tests again (GREEN)
6. Refactor for quality
7. Repeat

### 2. Code Quality Workflow
1. Run linter
2. Categorize issues (style, logic, security)
3. Fix systematically by category
4. Re-validate with linter
5. Confirm no new issues introduced

### 3. Integration Workflow
1. Identify integration issue
2. Debug with appropriate tools
3. Write/update tests to cover the issue
4. Fix the root cause
5. Verify end-to-end functionality

### 4. UI Testing Workflow
1. Define critical user journeys
2. Create Playwright UI tests
3. Run tests
4. Debug failures (test issue vs. app issue)
5. Validate coverage of key scenarios

## Agent Usage

Use specialized agents for focused workflows:

### tdd-developer
**Use for**: Implementation and unit/integration TDD cycles
- Write and run unit tests (Jest, React Testing Library)
- Implement features using TDD
- Refactor code while maintaining test coverage
- **DO NOT**: Create or run Playwright UI tests in this mode

### code-reviewer
**Use for**: Code quality improvements
- Address lint errors
- Review code for best practices
- Suggest refactoring opportunities
- Validate code standards compliance

### test-engineer
**Use for**: All Playwright UI test activities
- Author Playwright UI tests
- Execute UI test suites
- Triage test failures
- Validate end-to-end flows
- Perform isolation checks

## Memory System

The project uses a dual-memory system to capture and apply development learnings:

### Persistent Memory
This file (`.github/copilot-instructions.md`) contains foundational principles and workflows:
- Development philosophy and core principles
- Testing strategies and workflow patterns
- Git conventions and agent usage guidelines
- These are stable, long-term instructions

### Working Memory
The `.github/memory/` directory contains tactical discoveries and patterns:
- **session-notes.md**: Historical summaries of completed sessions (committed to git)
- **patterns-discovered.md**: Accumulated code patterns and best practices (committed to git)
- **scratch/working-notes.md**: Active session notes during development (NOT committed to git)

### During Active Development

1. **Start Session**: Document your current task in `.github/memory/scratch/working-notes.md`
2. **During Work**: Update working notes as you make discoveries, decisions, and findings
3. **TDD Cycles**: Track RED-GREEN-REFACTOR progress in working notes
4. **Debugging**: Document investigation steps, hypotheses, and root causes
5. **Pattern Discovery**: When you find reusable patterns, add them to `patterns-discovered.md`
6. **End Session**: Summarize key findings into `session-notes.md`

### How AI Uses Memory

GitHub Copilot and AI assistants reference these memory files to:
- Suggest patterns from `patterns-discovered.md` when writing similar code
- Avoid documented anti-patterns and common mistakes
- Provide context-aware suggestions based on historical decisions
- Reference past solutions to similar problems

See [.github/memory/README.md](memory/README.md) for comprehensive documentation on using the memory system.

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring
- `style:` - Code style changes (formatting, etc.)

**Examples**:
```bash
git commit -m "feat: add delete todo functionality"
git commit -m "fix: resolve todo completion toggle issue"
git commit -m "test: add integration tests for todo API"
```

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<descriptive-name>`
- **Main branch**: `main` (protected, requires PR)

## Commands and Tools

### Running Tests

```bash
# Backend tests
cd packages/backend && npm test

# Frontend tests
cd packages/frontend && npm test

# UI end-to-end tests
cd packages/frontend && npm run test:ui
```

### Linting

```bash
# Backend lint
cd packages/backend && npm run lint

# Frontend lint
cd packages/frontend && npm run lint
```

### Running the Application

```bash
# Backend server (from root)
npm run dev:backend

# Frontend dev server (from root)
npm run dev:frontend
```
