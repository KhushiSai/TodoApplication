import React, { useState, useCallback } from 'react';
import { TodoFormData } from '../types/Todo';

interface TodoFormProps {
  onSubmit: (todoData: TodoFormData) => Promise<void>;
  loading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading = false }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await onSubmit({ title: title.trim(), completed });
        setTitle('');
        setCompleted(false);
      } catch (error) {
        // Error handling is done in the parent component
        console.error('Failed to create todo:', error);
      }
    }
  }, [title, completed, onSubmit]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  }, [handleSubmit]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="todo-title" className="block text-sm font-medium text-gray-700 mb-2">
            Todo Title
          </label>
          <textarea
            id="todo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your todo title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            disabled={loading}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            id="todo-completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="todo-completed" className="ml-2 block text-sm text-gray-700">
            Mark as completed
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 ${
              loading || !title.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Adding...</span>
              </div>
            ) : (
              'Add Todo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm; 