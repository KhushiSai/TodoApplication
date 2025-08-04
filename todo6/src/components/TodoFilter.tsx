import React, { memo } from 'react';

interface TodoFilterProps {
  currentFilter: 'all' | 'completed' | 'pending';
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

const TodoFilter: React.FC<TodoFilterProps> = memo(({ currentFilter, onFilterChange, stats }) => {
  const filterOptions = [
    { value: 'all' as const, label: 'All', count: stats.total },
    { value: 'completed' as const, label: 'Completed', count: stats.completed },
    { value: 'pending' as const, label: 'Pending', count: stats.pending },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Todos</h2>
      
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              currentFilter === option.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
              currentFilter === option.value
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {option.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});

TodoFilter.displayName = 'TodoFilter';

export default TodoFilter; 