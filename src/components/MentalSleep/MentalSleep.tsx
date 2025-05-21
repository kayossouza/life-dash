import React from 'react';
import { useAppData } from '../../state/DataContext';

const MentalSleep: React.FC = () => {
  const { mentalSleep, updateMentalData } = useAppData();

  const toggleBreathingTechnique = () => {
    updateMentalData('usedBreathingTechnique', !mentalSleep.usedBreathingTechnique);
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-dark-text">Mental e Sono</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="sleepTime" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            Horário que dormiu ontem
          </label>
          <input
            type="time"
            id="sleepTime"
            value={mentalSleep.sleepTime}
            onChange={(e) => updateMentalData('sleepTime', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-200"
          />
        </div>
        <div>
          <fieldset>
            <legend id="energyLevel-label" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
              Nível de energia ao acordar (1-5)
            </legend>
            <div className="flex items-center space-x-1" role="group" aria-labelledby="energyLevel-label">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  aria-label={`Nível de energia ${level}`}
                  onClick={() => updateMentalData('energyLevel', level)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full
                    ${mentalSleep.energyLevel === level 
                      ? 'bg-blue-500 dark:bg-dark-accent text-white' 
                      : 'bg-gray-200 dark:bg-dark-bg text-gray-700 dark:text-dark-muted'
                    } transition-colors duration-200`}
                >
                  {level}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="flex items-center py-2">
          <button
            onClick={toggleBreathingTechnique}
            type="button"
            aria-label="Técnica de respiração ou meditação"
            className={`w-6 h-6 flex items-center justify-center rounded border ${
              mentalSleep.usedBreathingTechnique 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 dark:border-dark-border'
            } mr-3 transition-colors duration-200`}
          >
            {mentalSleep.usedBreathingTechnique && "✓"}
          </button>
          <span className="text-gray-800 dark:text-dark-text">
            Usou técnica de respiração ou meditação
          </span>
        </div>
        <div>
          <label htmlFor="gratitude" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            Frase de gratidão do dia
          </label>
          <textarea
            id="gratitude"
            value={mentalSleep.gratitude}
            onChange={(e) => updateMentalData('gratitude', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-200"
            rows={2}
            placeholder="Pelo que você é grato hoje?"
          />
        </div>
      </div>
    </div>
  );
};

export default MentalSleep;
