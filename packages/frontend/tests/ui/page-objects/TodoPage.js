/**
 * Page Object Model for TODO application
 * Encapsulates selectors and interactions for maintainability
 */
class TodoPage {
  constructor(page) {
    this.page = page;
    
    // Stable selectors using accessible roles and labels
    this.todoInput = page.getByPlaceholder(/what needs to be done/i);
    this.addButton = page.getByRole('button', { name: /add/i });
    this.todoList = page.getByRole('list');
  }

  /**
   * Navigate to the TODO application
   */
  /**
  async goto() {
    await this.page.goto('http://localhost:3000');
    await this.page.waitForLoadState('domcontentloaded');
  }
  */
 /**

Navigate to the TODO application and wait for initial data load
*/
  async goto() {
   await this.page.goto('http://localhost:3000');
   await this.page.waitForLoadState('domcontentloaded');
   await this.page.waitForLoadState('networkidle');
   await this.todoInput.waitFor({ state: 'visible', timeout: 5000 });
   await this.page.waitForTimeout(100);
 }

  /**
   * Add a new todo item
   * @param {string} title - The todo title
   */
  async addTodo(title) {
    await this.todoInput.fill(title);
    await this.addButton.click();
    // State-based wait: Wait for the todo to appear
    await this.page.getByText(title).waitFor({ state: 'visible' });
  }

  /**
   * Toggle the completion status of a todo
   * @param {string} title - The todo title to toggle
   */
  async toggleTodo(title) {
    const todoItem = this.page.getByText(title).locator('..');
    const checkbox = todoItem.getByRole('checkbox');
    await checkbox.click();
    // Wait for checkbox state to update
    await this.page.waitForTimeout(100); // Brief wait for React state update
  }

  /**
   * Delete a todo item
   * @param {string} title - The todo title to delete
   */
  async deleteTodo(title) {
    const todoItem = this.page.getByText(title).locator('..');
    // Use stable selector with aria-label
    const deleteButton = todoItem.getByRole('button', { name: /delete/i });
    await deleteButton.click();
    
    // State-based wait: Wait for the todo to disappear
    await this.page.getByText(title).waitFor({ state: 'hidden' });
  }

  /**
   * Get a todo element by its title
   * @param {string} title - The todo title
   * @returns {Locator} The todo element locator
   */
  getTodoByTitle(title) {
    return this.page.getByText(title);
  }

  /**
   * Get all todo items
   * @returns {Promise<Locator[]>} Array of todo item locators
   */
  async getAllTodos() {
    return this.todoList.getByRole('listitem').all();
  }

  /**
   * Check if a todo is completed (has line-through styling)
   * @param {string} title - The todo title
   * @returns {Promise<boolean>} True if completed
   */
  async isTodoCompleted(title) {
    const todoText = this.page.getByText(title);
    const textDecoration = await todoText.evaluate(el => 
      window.getComputedStyle(el).textDecoration
    );
    return textDecoration.includes('line-through');
  }

  /**
   * Get the value of the input field
   * @returns {Promise<string>} The input value
   */
  async getInputValue() {
    return this.todoInput.inputValue();
  }

  /**
   * Check if the add button is enabled
   * @returns {Promise<boolean>} True if enabled
   */
  async isAddButtonEnabled() {
    return this.addButton.isEnabled();
  }

  /**
   * Get the stats chips displaying incomplete and completed counts
   * @returns {Promise<{incomplete: number, completed: number}>} The todo stats
   */
  async getStats() {
    const incompleteText = await this.page.getByText(/items left/i).textContent();
    const completedText = await this.page.getByText(/completed/i).textContent();
    
    const incomplete = parseInt(incompleteText.match(/(\d+)/)?.[1] || '0');
    const completed = parseInt(completedText.match(/(\d+)/)?.[1] || '0');
    
    return { incomplete, completed };
  }

  /**
   * Check if empty state message is displayed
   * @returns {Promise<boolean>} True if empty state message is visible
   */
  async hasEmptyStateMessage() {
    const emptyMessage = this.page.getByText(/no todos yet/i);
    return emptyMessage.isVisible();
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error message is visible
   */
  async hasErrorMessage() {
    const errorMessage = this.page.getByText(/error loading todos/i);
    return errorMessage.isVisible();
  }
}

module.exports = { TodoPage };
