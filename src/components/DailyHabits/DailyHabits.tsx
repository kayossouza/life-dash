import React from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { useAppData } from '../../utils/DataContext';

const DailyHabits: React.FC = () => {
  const { dailyHabits, toggleHabit, resetAllHabits } = useAppData();
  useTheme(); // Use theme context without destructuring

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      {/* Render daily habits list here */}
    </div>
  );
};

export default DailyHabits;
