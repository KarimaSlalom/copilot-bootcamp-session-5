import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

const renderApp = () => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );
};

test('renders TODO App heading', async () => {
  renderApp();
  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should delete a todo when delete button is clicked', async () => {
  const user = userEvent.setup();
  const mockTodos = [
    { id: 1, title: 'Test Todo', completed: false },
    { id: 2, title: 'Another Todo', completed: true },
  ];

  global.fetch.mockImplementation((url, options) => {
    if (options?.method === 'DELETE') {
      return Promise.resolve({ ok: true });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });
  });

  renderApp();

  // Wait for todos to load
  await screen.findByText('Test Todo');
  
  // Find and click delete button for first todo
  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  await user.click(deleteButtons[0]);

  // Verify DELETE request was made
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('should display correct stats based on todos', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: false },
    { id: 3, title: 'Todo 3', completed: true },
  ];

  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockTodos),
  });

  renderApp();

  // Wait for todos to load
  await screen.findByText('Todo 1');

  // Check stats: 2 incomplete, 1 completed
  expect(await screen.findByText(/2 items left/i)).toBeInTheDocument();
  expect(await screen.findByText(/1 completed/i)).toBeInTheDocument();
});

test('should display empty state message when no todos', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
  });

  renderApp();

  // Wait for empty state message
  expect(await screen.findByText(/no todos yet/i)).toBeInTheDocument();
});

test('should display error message when fetch fails', async () => {
  global.fetch.mockRejectedValue(new Error('Network error'));

  renderApp();

  // Wait for error message
  expect(await screen.findByText(/error loading todos/i)).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});
