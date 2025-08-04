import React, { useState, useCallback, memo } from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, data: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = memo(({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (editTitle.trim()) {
      await onUpdate(todo.id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  }, [editTitle, todo.id, onUpdate]);

  const handleCancel = useCallback(() => {
    setEditTitle(todo.title);
    setIsEditing(false);
  }, [todo.title]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  return (
    <div className={`group relative bg-white rounded-lg shadow-md p-4 mb-3 transition-all duration-200 hover:shadow-lg ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center space-x-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <p className={`text-gray-800 break-words ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>
              {todo.title}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                title="Edit todo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="Delete todo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-500 hover:text-green-600 transition-colors duration-200"
                title="Save changes"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-gray-500 hover:text-gray-600 transition-colors duration-200"
                title="Cancel editing"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Todo ID Badge */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">ID: {todo.id}</span>
        <span className="text-xs text-gray-400">User: {todo.userId}</span>
      </div>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem; 