import React, { useCallback, useState, useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import TodoFilter from './components/TodoFilter';
import ErrorMessage from './components/ErrorMessage';
import OfflineNotification from './components/OfflineNotification';
import { TodoFormData } from './types/Todo';

const App: React.FC = () => {
  const {
    todos,
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
  } = useTodos();

  const [isOffline, setIsOffline] = useState(false);

  // Check if we're working offline (no API response)
  useEffect(() => {
    if (!loading && todos.length > 0 && todos.length <= 5) {
      // If we have exactly 5 todos (our fallback data), we're likely offline
      const fallbackTitles = [
        "Learn React",
        "Build Todo App", 
        "Master TypeScript",
        "Style with Tailwind",
        "Deploy to production"
      ];
      const isUsingFallback = todos.every(todo => 
        fallbackTitles.includes(todo.title)
      );
      setIsOffline(isUsingFallback);
    }
  }, [todos, loading]);

  const handleCreateTodo = useCallback(async (todoData: TodoFormData) => {
    await createTodo(todoData);
  }, [createTodo]);

  const handleUpdateTodo = useCallback(async (id: number, data: Partial<TodoFormData>) => {
    await updateTodo(id, data);
  }, [updateTodo]);

  const handleToggleTodo = useCallback(async (id: number) => {
    await toggleTodo(id);
  }, [toggleTodo]);

  const handleDeleteTodo = useCallback(async (id: number) => {
    await deleteTodo(id);
  }, [deleteTodo]);

  const handleFilterChange = useCallback((newFilter: 'all' | 'completed' | 'pending') => {
    setFilter(newFilter);
  }, [setFilter]);

  const handleRetry = useCallback(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo Application
          </h1>
          <p className="text-gray-600">
            Manage your tasks with ease using React, TypeScript, and JSONPlaceholder API
          </p>
        </div>

        {/* Offline Notification */}
        {isOffline && <OfflineNotification />}

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleRetry}
          />
        )}

        {/* Statistics */}
        <TodoStats stats={stats} />

        {/* Filter */}
        <TodoFilter 
          currentFilter={filter}
          onFilterChange={handleFilterChange}
          stats={stats}
        />

        {/* Add Todo Form */}
        <TodoForm 
          onSubmit={handleCreateTodo}
          loading={isCreating}
        />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          loading={loading}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            Powered by{' '}
            <a 
              href="http://jsonplaceholder.typicode.com/todos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              JSONPlaceholder API
            </a>
          </p>
          <p className="mt-1">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default App; 