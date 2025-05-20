import React from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { useAppData } from '../../utils/DataContext';

const WeeklyReview: React.FC = () => {
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
      {/* Render weekly review section here */}
    </div>
  );
};

export default WeeklyReview;
