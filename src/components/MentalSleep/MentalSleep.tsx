import React from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { useAppData } from '../../utils/DataContext';

const MentalSleep: React.FC = () => {
  const { mentalSleep, updateMentalData } = useAppData();
  useTheme(); // Use theme context

  const toggleBreathingTechnique = () => {
    updateMentalData('usedBreathingTechnique', !mentalSleep.usedBreathingTechnique);
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      {/* Render mental sleep section here */}
    </div>
  );
};

export default MentalSleep;
