import React, { useEffect } from 'react';
import WeeklyView from '../WeeklyView/WeeklyView';
import DailyHabits from '../DailyHabits/DailyHabits';
import TrainingBody from '../TrainingBody/TrainingBody';
import MentalSleep from '../MentalSleep/MentalSleep';
import WeeklyReview from '../WeeklyReview/WeeklyReview';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { useTheme } from '../../utils/ThemeContext';

const Dashboard: React.FC = () => {
  const { darkMode } = useTheme();

  // Apply animation classes when component mounts
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, i * 100);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors duration-300">
      {/* Render dashboard sections here */}
    </div>
  );
};

export default Dashboard;
