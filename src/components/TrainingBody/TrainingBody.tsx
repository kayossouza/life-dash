import React from 'react';
import { useAppData } from '../../utils/DataContext';

const TrainingBody: React.FC = () => {
  const { trainings, updateTraining, toggleTrainingCompleted } = useAppData();

  // Call the toggleTrainingCompleted function directly
  const handleToggleTrainingCompleted = (index: number) => {
    toggleTrainingCompleted(index);
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-dark-text">Treino e Corpo</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-dark-surface">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-dark-border text-left text-sm font-medium text-gray-700 dark:text-dark-muted">Dia</th>
              <th className="py-2 px-4 border-b dark:border-dark-border text-left text-sm font-medium text-gray-700 dark:text-dark-muted">Treino Planejado</th>
              <th className="py-2 px-4 border-b dark:border-dark-border text-center text-sm font-medium text-gray-700 dark:text-dark-muted">Feito</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training, index) => (
              <tr key={training.day} className="hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors duration-200">
                <td className="py-2 px-4 border-b dark:border-dark-border text-gray-800 dark:text-dark-text">
                  {training.day}
                </td>
                <td className="py-2 px-4 border-b dark:border-dark-border">
                  <input
                    type="text"
                    value={training.plannedTraining}
                    onChange={(e) => updateTraining(index, { plannedTraining: e.target.value })}
                    placeholder="Tipo de treino"
                    className="w-full p-1 border border-gray-300 dark:border-dark-border rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text transition-colors duration-200"
                  />
                </td>
                <td className="py-2 px-4 border-b dark:border-dark-border text-center">
                  <button
                    onClick={() => handleToggleTrainingCompleted(index)}
                    className={`w-6 h-6 flex items-center justify-center rounded border ${
                      training.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 dark:border-dark-border'
                    } mx-auto transition-colors duration-200`}
                  >
                    {training.completed && "✓"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingBody;
