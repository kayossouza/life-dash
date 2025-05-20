import { useTheme } from '../../utils/ThemeContext';
import { useAppData } from '../../utils/DataContext';

const WeeklyReview = () => {
  const { weeklyReview, updateWeeklyReview } = useAppData();
  useTheme(); // Use theme context

  const exportAsText = () => {
    const reviewText = `
# Revisão Semanal

## O que mandei bem
${weeklyReview.didWell}

## O que posso ajustar
${weeklyReview.canImprove}

## Objetivo da próxima semana
${weeklyReview.nextWeekGoal}

## O que quero evitar repetir
${weeklyReview.toAvoid}
`;

    // Create a blob and download link
    const blob = new Blob([reviewText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revisao-semanal-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-soft dark:shadow-dark-soft transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg animate-on-mount hover-lift">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Revisão Semanal</h2>
        <button
          onClick={exportAsText}
          className="px-3 py-1 bg-blue-500 dark:bg-dark-accent text-white rounded-md hover:bg-blue-600 dark:hover:opacity-90 transition-colors duration-200"
        >
          Exportar como texto
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="didWell" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            O que mandei bem
          </label>
          <textarea
            id="didWell"
            value={weeklyReview.didWell}
            onChange={(e) => updateWeeklyReview('didWell', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-200"
            rows="3"
            placeholder="Quais foram suas vitórias?"
          />
        </div>
        
        <div>
          <label htmlFor="canImprove" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            O que posso ajustar
          </label>
          <textarea
            id="canImprove"
            value={weeklyReview.canImprove}
            onChange={(e) => updateWeeklyReview('canImprove', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-200"
            rows="3"
            placeholder="O que poderia ter sido melhor?"
          />
        </div>
        
        <div>
          <label htmlFor="nextWeekGoal" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            Objetivo da próxima semana
          </label>
          <textarea
            id="nextWeekGoal"
            value={weeklyReview.nextWeekGoal}
            onChange={(e) => updateWeeklyReview('nextWeekGoal', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-200"
            rows="3"
            placeholder="O que deseja alcançar na próxima semana?"
          />
        </div>
        
        <div>
          <label htmlFor="toAvoid" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">
            O que quero evitar repetir
          </label>
          <textarea
            id="toAvoid"
            value={weeklyReview.toAvoid}
            onChange={(e) => updateWeeklyReview('toAvoid', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent focus:border-transparent transition-colors duration-200"
            rows="3"
            placeholder="Quais comportamentos ou situações deseja evitar?"
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyReview;
