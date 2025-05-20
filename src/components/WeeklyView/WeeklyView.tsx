import React from 'react';
import { useAppData } from '../../utils/DataContext';

const WeeklyView: React.FC = () => {
  const { weeklyView, updateWeeklyView } = useAppData();

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg hover-lift">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-dark-text">Visão da Semana</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="weekNumber" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            Semana atual
          </label>
          <input
            type="text"
            id="weekNumber"
            value={weeklyView.weekNumber}
            onChange={(e) => updateWeeklyView('weekNumber', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-300"
            placeholder="ex: Semana 21 de 2025"
          />
        </div>
        <div>
          <label htmlFor="weeklyObjective" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            Objetivo principal da semana
          </label>
          <input
            type="text"
            id="weeklyObjective"
            value={weeklyView.weeklyObjective}
            onChange={(e) => updateWeeklyView('weeklyObjective', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-300"
            placeholder="Qual seu objetivo essa semana?"
          />
        </div>
        <div>
          <label htmlFor="focusWord" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            Palavra de foco
          </label>
          <input
            type="text"
            id="focusWord"
            value={weeklyView.focusWord}
            onChange={(e) => updateWeeklyView('focusWord', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-300"
            placeholder="Uma palavra para se orientar"
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;
