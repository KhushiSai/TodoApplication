import { Todo, TodoFormData, ApiResponse } from '../types/Todo';

const API_BASE_URL = 'http://jsonplaceholder.typicode.com/todos';

// Fallback data for when API is not available
const FALLBACK_TODOS: Todo[] = [
  { userId: 1, id: 1, title: "Learn React", completed: false },
  { userId: 1, id: 2, title: "Build Todo App", completed: true },
  { userId: 1, id: 3, title: "Master TypeScript", completed: false },
  { userId: 1, id: 4, title: "Style with Tailwind", completed: true },
  { userId: 1, id: 5, title: "Deploy to production", completed: false },
];

export class TodoApiService {
  // GET - Fetch all todos
  static async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const todos: Todo[] = await response.json();
      return todos;
    } catch (error) {
      console.warn('API not available, using fallback data:', error);
      // Return fallback data if API fails
      return FALLBACK_TODOS;
    }
  }

  // GET - Fetch a single todo by ID
  static async getTodoById(id: number): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const todo: Todo = await response.json();
      return todo;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      // Return a fallback todo
      return { userId: 1, id, title: `Todo ${id} (offline)`, completed: false };
    }
  }

  // POST - Create a new todo
  static async createTodo(todoData: TodoFormData): Promise<Todo> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoData,
          userId: 1, // Default user ID
        }),
        signal: AbortSignal.timeout(5000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newTodo: Todo = await response.json();
      return newTodo;
    } catch (error) {
      console.warn('API not available, creating local todo:', error);
      // Create a local todo with a temporary ID
      const tempId = Date.now();
      return {
        userId: 1,
        id: tempId,
        title: todoData.title,
        completed: todoData.completed,
      };
    }
  }

  // PUT - Update an existing todo
  static async updateTodo(id: number, todoData: Partial<Todo>): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
        signal: AbortSignal.timeout(5000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedTodo: Todo = await response.json();
      return updatedTodo;
    } catch (error) {
      console.warn('API not available, updating local todo:', error);
      // Return the updated todo locally
      return {
        userId: 1,
        id,
        title: todoData.title || 'Updated Todo',
        completed: todoData.completed || false,
      };
    }
  }

  // PATCH - Partially update a todo
  static async patchTodo(id: number, todoData: Partial<Todo>): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
        signal: AbortSignal.timeout(5000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedTodo: Todo = await response.json();
      return updatedTodo;
    } catch (error) {
      console.warn('API not available, patching local todo:', error);
      // Return the patched todo locally
      return {
        userId: 1,
        id,
        title: todoData.title || 'Patched Todo',
        completed: todoData.completed || false,
      };
    }
  }

  // DELETE - Delete a todo
  static async deleteTodo(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(5000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.warn('API not available, deleting local todo:', error);
      // For local deletion, we just return successfully
      // The actual deletion will be handled by the state management
    }
  }
} 