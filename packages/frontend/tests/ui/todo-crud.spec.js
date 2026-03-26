/**
 * TODO Application - Critical User Journey Tests
 * 
 * Tests are limited to 5 scenarios covering the highest-priority flows.
 * Additional scenarios (bulk operations, concurrent edits) are deferred.
 */
const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./page-objects/TodoPage');

test.describe('TODO Application - Critical User Journeys', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    await page.request.delete('http://localhost:3001/api/todos');
    todoPage = new TodoPage(page);
    await todoPage.goto();
});

  /**
   * Test 1: Create Todo (Happy Path)
   * Verifies core functionality of adding a new todo item
   * Also verifies stats calculation
   */
  test('should create a new todo successfully', async ({ page }) => {
    const todoTitle = 'Buy groceries';
    
    await todoPage.addTodo(todoTitle);
    
    // Verify todo appears in the list
    const todo = todoPage.getTodoByTitle(todoTitle);
    await expect(todo).toBeVisible();
    
    // Verify input is cleared after creation
    const inputValue = await todoPage.getInputValue();
    expect(inputValue).toBe('');
    
    // Verify stats show 1 incomplete item
    const stats = await todoPage.getStats();
    expect(stats.incomplete).toBe(1);
    expect(stats.completed).toBe(0);
  });

  /**
   * Test 2: Toggle Todo Completion
   * Verifies user can mark todos as complete/incomplete
   * Also verifies stats update correctly
   */
  test('should toggle todo completion status', async ({ page }) => {
    const todoTitle = 'Write unit tests';
    
    // Create a todo first
    await todoPage.addTodo(todoTitle);
    
    // Verify initially not completed
    let isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(false);
    
    // Verify stats: 1 incomplete, 0 completed
    let stats = await todoPage.getStats();
    expect(stats.incomplete).toBe(1);
    expect(stats.completed).toBe(0);
    
    // Toggle to completed
    await todoPage.toggleTodo(todoTitle);
    
    // Verify completed (has line-through)
    isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(true);
    
    // Verify stats: 0 incomplete, 1 completed
    stats = await todoPage.getStats();
    expect(stats.incomplete).toBe(0);
    expect(stats.completed).toBe(1);
    
    // Toggle back to incomplete
    await todoPage.toggleTodo(todoTitle);
    
    // Verify not completed
    isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(false);
    
    // Verify stats back to: 1 incomplete, 0 completed
    stats = await todoPage.getStats();
    expect(stats.incomplete).toBe(1);
    expect(stats.completed).toBe(0);
  });

  /**
   * Test 3: Delete Todo
   * Verifies user can remove todo items
   */
  test('should delete a todo successfully', async ({ page }) => {
    const todoTitle = 'Task to be deleted';
    
    // Create a todo first
    await todoPage.addTodo(todoTitle);
    await expect(todoPage.getTodoByTitle(todoTitle)).toBeVisible();
    
    // Delete the todo
    await todoPage.deleteTodo(todoTitle);
    
    // Verify todo is removed
    await expect(todoPage.getTodoByTitle(todoTitle)).not.toBeVisible();
  });

  /**
   * Test 4: Empty Todo Validation (Error Path)
   * Verifies system prevents creation of empty todos
   * Also verifies empty state message displays when no todos exist
   */
  test('should not create todo with empty title', async ({ page }) => {
    // Verify empty state message is visible initially
    const hasEmptyState = await todoPage.hasEmptyStateMessage();
    expect(hasEmptyState).toBe(true);
    
    // Try to submit empty todo
    await todoPage.todoInput.click();
    await todoPage.addButton.click();
    
    // Count todos in list (should be 0)
    const todos = await todoPage.getAllTodos();
    expect(todos.length).toBe(0);
    
    // Empty state should still be visible
    expect(await todoPage.hasEmptyStateMessage()).toBe(true);
    
    // Try with whitespace only
    await todoPage.todoInput.fill('   ');
    await todoPage.addButton.click();
    
    // Still should be 0
    const todosAfter = await todoPage.getAllTodos();
    expect(todosAfter.length).toBe(0);
    
    // Empty state should still be visible
    expect(await todoPage.hasEmptyStateMessage()).toBe(true);
  });

  /**
   * Test 5: Data Persistence After Reload
   * Verifies todos persist across page refreshes
   */
  test('should persist todos after page reload', async ({ page }) => {
    const todoTitle = 'Persistent task';
    
    // Create a todo
    await todoPage.addTodo(todoTitle);
    await expect(todoPage.getTodoByTitle(todoTitle)).toBeVisible();
    
    // Toggle it to completed
    await todoPage.toggleTodo(todoTitle);
    let isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(true);
    
    // Reload the page
    await page.reload({ waitUntil: 'domcontentloaded' });
    
    // Verify todo still exists
    await expect(todoPage.getTodoByTitle(todoTitle)).toBeVisible();
    
    // Verify completion state persisted
    isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(true);
  });

  /**
   * DEFERRED SCENARIOS (Not Implemented - Would Exceed 5 Test Limit):
   * - Error handling when backend API is unavailable
   * - Bulk delete all todos
   * - Filter todos by completion status
   * - Edit todo title (feature not yet implemented in app)
   * - Keyboard navigation
   * - Concurrent edits to same todo
   * - Multiple todos with complex state transitions
   */
});
