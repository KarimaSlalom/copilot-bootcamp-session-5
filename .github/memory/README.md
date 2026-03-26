# Development Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It provides a structured way to capture discoveries that emerge during TDD, linting, debugging, and integration work, enabling GitHub Copilot to provide more context-aware suggestions in future sessions.

## Why a Memory System?

During development, you discover patterns, make architectural decisions, and learn from bugs. Without documentation, these insights are lost. This memory system:

- **Preserves Context**: Captures the "why" behind decisions, not just the "what"
- **Accelerates AI Assistance**: GitHub Copilot references these files to provide better suggestions
- **Reduces Repeated Mistakes**: Documents anti-patterns and pitfalls to avoid
- **Tracks Evolution**: Shows how the codebase patterns have evolved over time

## Two Types of Memory

### 1. Persistent Memory (`.github/copilot-instructions.md`)

Foundational principles, workflows, and conventions that don't change frequently:
- Development philosophy (TDD, incremental changes)
- Testing strategies and workflow patterns
- Git workflow and commit conventions
- Agent usage guidelines

**When to update**: When you establish new team conventions or modify core workflows

### 2. Working Memory (`.github/memory/`)

Tactical discoveries, patterns, and session-specific learnings:
- Code patterns discovered during implementation
- Debugging insights and solutions
- Active session notes and decisions
- Historical session summaries

**When to update**: Continuously during development, especially during TDD cycles and debugging

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the memory system
├── session-notes.md             # Historical summaries of completed sessions (committed to git)
├── patterns-discovered.md       # Accumulated code patterns and best practices (committed to git)
└── scratch/
    ├── .gitignore               # Ignores all files in scratch/ directory
    └── working-notes.md         # Active session notes (NOT committed to git)
```

### session-notes.md
**Purpose**: Document completed development sessions for future reference

**Committed to git**: ✅ Yes - this is historical record

**When to update**:
- At the END of a development session
- After completing a feature, bug fix, or investigation
- When summarizing key findings from scratch/working-notes.md

**Contents**:
- Session name and date
- What was accomplished
- Key findings and decisions
- Outcomes (tests passing, features completed)

### patterns-discovered.md
**Purpose**: Document recurring code patterns, best practices, and anti-patterns

**Committed to git**: ✅ Yes - this is accumulated knowledge

**When to update**:
- When you discover a pattern that should be applied consistently
- After resolving a bug caused by inconsistent patterns
- During code review when you notice a pattern worth documenting

**Contents**:
- Pattern name and context
- Problem it solves
- Solution approach
- Code examples
- Related files

### scratch/working-notes.md
**Purpose**: Active session notes - your "working memory" during development

**Committed to git**: ❌ No - ephemeral, excluded by .gitignore

**When to update**:
- Throughout active development sessions
- During TDD cycles (RED-GREEN-REFACTOR)
- While debugging issues
- When making decisions that need to be tracked temporarily

**Contents**:
- Current task and approach
- Key findings as you discover them
- Decisions made and rationale
- Blockers encountered
- Next steps
- Random notes and observations

**Workflow**: At session end, distill important findings into session-notes.md and patterns-discovered.md, then archive or clear working-notes.md for the next session.

## When to Use Each File During Development

### During TDD Workflow

1. **Start**: Document current task in `scratch/working-notes.md`
   - What feature/test you're implementing
   - Your approach

2. **RED Phase** (Test fails):
   - Note the test you wrote
   - Note expected behavior

3. **GREEN Phase** (Make it pass):
   - Document implementation decisions
   - Note any patterns you're following

4. **REFACTOR Phase**:
   - Document refactoring decisions
   - If you discover a reusable pattern → add to `patterns-discovered.md`

5. **Session Complete**:
   - Summarize session in `session-notes.md`
   - Clear or archive `scratch/working-notes.md`

### During Linting/Code Quality Workflow

1. **Categorizing Issues**: Note patterns of errors in `scratch/working-notes.md`
   - Are there recurring issues? (e.g., always forgetting PropTypes)
   
2. **Fixing Issues**: Document decisions
   - Why you chose one fix approach over another
   
3. **Pattern Emerges**: 
   - If you notice a pattern worth documenting → add to `patterns-discovered.md`
   - Example: "Always use PropTypes.shape for complex objects"

### During Debugging Workflow

1. **Problem Identified**: Document in `scratch/working-notes.md`
   - Error message
   - Steps to reproduce
   - Initial hypothesis

2. **Investigation**: Track findings
   - What you tried
   - What didn't work
   - What revealed the root cause

3. **Root Cause Found**: Document clearly
   - What the actual problem was
   - Why it occurred
   - The fix applied

4. **Pattern Recognition**:
   - If this was caused by a common mistake → add to `patterns-discovered.md` as anti-pattern
   - Add to `session-notes.md` as a key finding

### During Integration Work

1. **Integration Issue**: Document in `scratch/working-notes.md`
   - Which components aren't integrating correctly
   - Expected vs actual behavior

2. **API Contracts**: If you discover API expectations
   - Document the contract in `patterns-discovered.md`
   - Note related files

3. **Resolution**: Summarize in `session-notes.md`
   - What integration pattern you established
   - Tests added to prevent regression

## How AI Reads and Applies These Patterns

GitHub Copilot and AI assistants:

1. **Read Automatically**: These files are included in the workspace context
2. **Apply Patterns**: When you write similar code, AI suggests patterns from `patterns-discovered.md`
3. **Avoid Mistakes**: AI considers anti-patterns and debugging lessons when making suggestions
4. **Provide Context**: When you ask questions, AI references session notes for historical context

**Example**:
- You document: "Service initialization: Always return empty array instead of null for consistency"
- Later: When you create a new service, AI suggests `return []` instead of `return null`

## Best Practices

### Writing Effective Session Notes
- ✅ Be specific: "Fixed bug where todos weren't persisting" not "Fixed stuff"
- ✅ Include outcomes: "All tests now passing (12/12)"
- ✅ Note decisions: "Chose REST over GraphQL because..."
- ❌ Don't include code dumps - reference files instead

### Documenting Patterns
- ✅ Include minimal code examples
- ✅ Explain the "why" not just the "how"
- ✅ Reference specific files where pattern is used
- ❌ Don't document one-off solutions - only repeatable patterns

### Using Working Notes
- ✅ Write freely - it's ephemeral
- ✅ Update continuously during work
- ✅ Include dead ends and wrong turns (helps AI understand your thought process)
- ✅ Clear or archive at session end
- ❌ Don't commit to git - it's intentionally temporary

### Maintaining the System
- Review `patterns-discovered.md` periodically - remove outdated patterns
- Keep `session-notes.md` chronological - newest at top
- Archive old session notes if the file gets too large (move to `archive/` subdirectory)
- The memory system should help, not burden - if it feels like overhead, simplify

## Getting Started

1. **Right Now**: Open `scratch/working-notes.md` and document what you're working on
2. **During Work**: Update working notes as you make discoveries
3. **End of Session**: Summarize key findings into `session-notes.md`
4. **When Patterns Emerge**: Add to `patterns-discovered.md`

The system becomes more valuable over time as you accumulate patterns and learnings. Start small, be consistent, and let it grow organically.
