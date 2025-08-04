import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, TodoFormData } from '../types/Todo';
import { TodoApiService } from '../services/todoApi';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await TodoApiService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new todo
  const createTodo = useCallback(async (todoData: TodoFormData) => {
    try {
      setIsCreating(true);
      setError(null);
      const newTodo = await TodoApiService.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  // Update a todo
  const updateTodo = useCallback(async (id: number, todoData: Partial<Todo>) => {
    try {
      setError(null);
      const updatedTodo = await TodoApiService.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  }, []);

  // Toggle todo completion status
  const toggleTodo = useCallback(async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  }, [todos, updateTodo]);

  // Delete a todo
  const deleteTodo = useCallback(async (id: number) => {
    try {
      setError(null);
      await TodoApiService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  }, []);

  // Filtered todos based on current filter
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Statistics
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      completionRate
    };
  }, [todos]);

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    loading,
    isCreating,
    error,
    filter,
    stats,
    setFilter,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
}; 