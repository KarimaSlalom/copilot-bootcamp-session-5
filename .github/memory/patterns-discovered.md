# Discovered Code Patterns

> **Purpose**: Document recurring code patterns, best practices, and anti-patterns discovered during development. These patterns should be applied consistently across the codebase. This file is committed to git as accumulated knowledge.

## How to Use This File

When you discover a pattern that should be applied consistently:
1. Add a new pattern entry using the template below
2. Include minimal code examples
3. Reference specific files where the pattern is used
4. Update when patterns evolve or exceptions are found

---

## Pattern: Service Initialization with Empty Collections

**Context**: Service layer methods that return collections (arrays) when no data exists

**Problem**: 
Inconsistent handling of "no data" state leads to frontend errors:
- Returning `null` requires null checks before iteration
- Returning `undefined` causes `Cannot read property` errors
- Different endpoints returning different empty states causes confusion

**Solution**:
Always return empty arrays `[]` for collection endpoints when no data exists, never `null` or `undefined`.

**Example**:

```javascript
// ✅ GOOD - Return empty array
class TodoService {
  getAllTodos() {
    if (this.todos.length === 0) {
      return []; // Frontend can safely use .map()
    }
    return this.todos;
  }
}

// ❌ BAD - Return null
class TodoService {
  getAllTodos() {
    if (this.todos.length === 0) {
      return null; // Frontend needs: todos?.map() or todos && todos.map()
    }
    return this.todos;
  }
}
```

**Benefits**:
- Frontend code is simpler (no null checks needed)
- Consistent behavior across all collection endpoints
- Prevents common runtime errors
- Aligns with JavaScript array method expectations

**Related Files**:
- `packages/backend/src/app.js` - GET /todos endpoint
- Any service returning collections

**Exceptions**: 
- Single item endpoints (GET /todos/:id) should return `null` or 404 when item not found
- This pattern applies to *collections only*

---

## Pattern Template

Copy this template when documenting a new pattern:

```markdown
## Pattern: [Descriptive Pattern Name]

**Context**: [When/where does this pattern apply?]

**Problem**: 
[What problem does this pattern solve? What goes wrong without it?]

**Solution**:
[Concise description of the pattern]

**Example**:

```javascript
// ✅ GOOD - Show the correct implementation
[minimal code example]

// ❌ BAD - Show what to avoid
[anti-pattern example]
```

**Benefits**:
- [Why this pattern is better]
- [What it prevents]
- [How it improves the codebase]

**Related Files**:
- [File paths where this pattern is used or should be used]

**Exceptions**: 
- [Any situations where this pattern doesn't apply]
```

---

## Categories of Patterns to Document

### API Patterns
- Request/response structure
- Error handling conventions
- Status code usage
- Validation patterns

### Testing Patterns
- Test structure and organization
- Mock/stub conventions
- Integration test setup
- Test data management

### State Management
- How state is initialized
- State update patterns
- State synchronization

### Error Handling
- Error propagation
- User-facing error messages
- Logging conventions

### Code Organization
- File structure conventions
- Import/export patterns
- Naming conventions

---

## Anti-Patterns to Avoid

Document patterns that have caused bugs or should be avoided:

### Anti-Pattern: [Name]
**Problem**: [What goes wrong]
**Instead**: [Link to correct pattern above]
**Context**: [When this anti-pattern was discovered]
