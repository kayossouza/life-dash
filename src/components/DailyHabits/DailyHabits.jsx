import { useTheme } from '../../utils/ThemeContext';
import { useAppData } from '../../utils/DataContext';

const DailyHabits = () => {
  const { dailyHabits, toggleHabit, resetAllHabits } = useAppData();
  useTheme(); // Use theme context without destructuring

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Hábitos Diários</h2>
        <button
          onClick={resetAllHabits}
          className="px-3 py-1 bg-blue-500 dark:bg-dark-accent text-white rounded-md hover:bg-blue-600 dark:hover:opacity-90 transition"
        >
          Resetar Dia
        </button>
      </div>
      
      <div className="space-y-2">
        {dailyHabits.map((habit) => (
          <div 
            key={habit.id}
            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md transition"
          >
            <button
              onClick={() => toggleHabit(habit.id)}
              className={`w-6 h-6 flex items-center justify-center rounded border ${
                habit.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 dark:border-dark-border'
              } mr-3 transition-colors duration-200`}
            >
              {habit.completed && "✓"}
            </button>
            <span className={`${habit.completed ? 'line-through text-gray-500 dark:text-dark-muted' : 'text-gray-800 dark:text-dark-text'} transition-colors duration-200`}>
              {habit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyHabits;
