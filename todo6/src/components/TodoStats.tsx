import React, { memo } from 'react';

interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
  };
}

const TodoStats: React.FC<TodoStatsProps> = memo(({ stats }) => {
  const { total, completed, pending, completionRate } = stats;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Todos */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{total}</div>
          <div className="text-sm text-blue-700">Total Todos</div>
        </div>

        {/* Completed Todos */}
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{completed}</div>
          <div className="text-sm text-green-700">Completed</div>
        </div>

        {/* Pending Todos */}
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{pending}</div>
          <div className="text-sm text-yellow-700">Pending</div>
        </div>

        {/* Completion Rate */}
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
          <div className="text-sm text-purple-700">Completion Rate</div>
        </div>
      </div>

      {/* Progress Bar */}
      {total > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
});

TodoStats.displayName = 'TodoStats';

export default TodoStats; 