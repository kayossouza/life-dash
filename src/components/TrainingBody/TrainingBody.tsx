import React from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { useAppData } from '../../utils/DataContext';

const TrainingBody: React.FC = () => {
  const { trainings, updateTraining, toggleTrainingCompleted } = useAppData();
  useTheme(); // Use theme context

  // Call the toggleTrainingCompleted function directly
  const handleToggleTrainingCompleted = (index: number) => {
    toggleTrainingCompleted(index);
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      {/* Render training body here */}
    </div>
  );
};

export default TrainingBody;
