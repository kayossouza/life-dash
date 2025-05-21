import React from 'react';
import { useAppData } from '../../state/DataContext';

const DailyHabits: React.FC = () => {
  const { dailyHabits, toggleHabit, resetAllHabits } = useAppData();

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Hábitos Diários</h2>
        <button
          className="ml-2 px-3 py-1 text-sm rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none"
          onClick={resetAllHabits}
          type="button"
        >
          Resetar Tudo
        </button>
      </div>
      <ul className="space-y-2">
        {dailyHabits.map(habit => (
          <li key={habit.id} className="flex items-center">
            <input
              id={`habit-${habit.id}`}
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(habit.id)}
              className="mr-3 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <label htmlFor={`habit-${habit.id}`} className={
              `text-gray-700 dark:text-gray-200 select-none ${habit.completed ? 'line-through opacity-60' : ''}`
            }>
              {habit.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyHabits;
