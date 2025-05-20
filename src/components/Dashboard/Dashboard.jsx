import { useEffect } from 'react';
import WeeklyView from '../WeeklyView/WeeklyView';
import DailyHabits from '../DailyHabits/DailyHabits';
import TrainingBody from '../TrainingBody/TrainingBody';
import MentalSleep from '../MentalSleep/MentalSleep';
import WeeklyReview from '../WeeklyReview/WeeklyReview';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { useTheme } from '../../utils/ThemeContext';

const Dashboard = () => {
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
      <header className="bg-white dark:bg-dark-surface shadow-soft dark:shadow-dark-soft transition-all duration-300">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-dark-text">Painel de Vida Ninja</h1>
          <DarkModeToggle />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Top section - Weekly View */}
          <div className="col-span-1 md:col-span-2 animate-on-mount">
            <WeeklyView />
          </div>
          
          {/* Middle sections */}
          <div className="animate-on-mount">
            <DailyHabits />
          </div>
          
          <div className="animate-on-mount">
            <TrainingBody />
          </div>
          
          <div className="animate-on-mount">
            <MentalSleep />
          </div>
          
          {/* Bottom section - Weekly Review */}
          <div className="col-span-1 md:col-span-2 animate-on-mount">
            <WeeklyReview />
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-dark-muted">
          Painel de Vida Ninja - Desenvolvido para monitorar hábitos e evolução pessoal
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
