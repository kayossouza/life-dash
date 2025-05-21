import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, getTodayKey } from '../utils/localStorage';
import type {
  AppData,
  Training,
  MentalSleep,
  WeeklyReview,
  WeeklyView
} from '../types/AppData';

// Refactored: DataContextType is now defined here, using imported types
export interface DataContextType extends AppData {
  toggleHabit: (id: string) => void;
  resetAllHabits: () => void;
  updateTraining: (index: number, value: Partial<Training>) => void;
  toggleTrainingCompleted: (index: number) => void;
  updateMentalData: (field: keyof MentalSleep, value: MentalSleep[keyof MentalSleep]) => void;
  updateWeeklyReview: (field: keyof WeeklyReview, value: WeeklyReview[keyof WeeklyReview]) => void;
  updateWeeklyView: (field: keyof WeeklyView, value: WeeklyView[keyof WeeklyView]) => void;
}

// --- Defaults ---
// Default values for app data
const defaultData: AppData = {
  dailyHabits: [
    { id: 'wake-up', label: 'Acordou às 05:30', completed: false },
    { id: 'water', label: 'Tomou 15 copos de água (3L)', completed: false },
    { id: 'workout', label: 'Fez treino (JJ/academia/skate)', completed: false },
    { id: 'reading', label: 'Leu antes de dormir', completed: false },
    { id: 'smoking', label: 'Fumou com leveza (até 3x)', completed: false },
    { id: 'leisure', label: 'Pausa de ócio / tempo com Arthur', completed: false },
    { id: 'focus', label: 'Check de foco mental nos blocos', completed: false },
    { id: 'meditation', label: 'Meditou 10 minutos', completed: false },
    { id: 'plan_day', label: 'Planejou o dia', completed: false },
    { id: 'plan_week', label: 'Planejou a semana', completed: false },
    { id: 'gratitude', label: 'Gratidão do dia', completed: false }
  ],
  lastHabitReset: '',
  trainings: [
    { day: 'Segunda', plannedTraining: '', completed: false },
    { day: 'Terça', plannedTraining: '', completed: false },
    { day: 'Quarta', plannedTraining: '', completed: false },
    { day: 'Quinta', plannedTraining: '', completed: false },
    { day: 'Sexta', plannedTraining: '', completed: false },
    { day: 'Sábado', plannedTraining: '', completed: false },
    { day: 'Domingo', plannedTraining: '', completed: false }
  ],
  mentalSleep: {
    sleepTime: '',
    energyLevel: 3,
    usedBreathingTechnique: false,
    gratitude: ''
  },
  lastMentalUpdate: '',
  weeklyReview: {
    didWell: '',
    canImprove: '',
    nextWeekGoal: '',
    toAvoid: ''
  },
  weeklyView: {
    weekNumber: '',
    weeklyObjective: '',
    focusWord: ''
  }
};

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [appData, setAppData] = useState<AppData>(defaultData);

  // Refactored: Use named constant for magic number (habit reset time)
  const HABIT_RESET_HOUR = 5; // 5:00 AM

  // Refactored: Use named constant for localStorage key
  const LOCAL_STORAGE_KEY = 'appData' as const;

  // Load all data from localStorage on initial mount
  // (and reset daily/mental data if needed)
  useEffect(() => {
    const loadedData: AppData = {
      ...defaultData,
      ...loadFromLocalStorage<AppData>(LOCAL_STORAGE_KEY, defaultData)
    };
    setAppData(loadedData);

    const today = getTodayKey(HABIT_RESET_HOUR);
    if (loadedData.lastHabitReset !== today) {
      setAppData(prev => ({
        ...prev,
        dailyHabits: prev.dailyHabits.map(h => ({ ...h, completed: false })),
        lastHabitReset: today
      }));
    }
    if (loadedData.lastMentalUpdate !== today) {
      setAppData(prev => ({
        ...prev,
        mentalSleep: { ...prev.mentalSleep, gratitude: '', usedBreathingTechnique: false },
        lastMentalUpdate: today
      }));
    }
  }, []);

  // --- Actions ---
  // All state update functions for context consumers
  const toggleHabit = (id: string): void => {
    setAppData(prev => {
      const newHabits = prev.dailyHabits.map(h => h.id === id ? { ...h, completed: !h.completed } : h);
      const updated = { ...prev, dailyHabits: newHabits };
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  const resetAllHabits = (): void => {
    const today = getTodayKey(HABIT_RESET_HOUR);
    setAppData(prev => {
      const updated = {
        ...prev,
        dailyHabits: prev.dailyHabits.map(h => ({ ...h, completed: false })),
        lastHabitReset: today
      };
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  const updateTraining = (index: number, value: Partial<Training>): void => {
    setAppData(prev => {
      if (!Array.isArray(prev.trainings) || index < 0 || index >= prev.trainings.length) return prev;
      const newTrainings = [...prev.trainings];
      newTrainings[index] = { ...newTrainings[index], ...value };
      const updated = { ...prev, trainings: newTrainings };
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  const toggleTrainingCompleted = (index: number): void => {
    setAppData(prev => {
      if (!Array.isArray(prev.trainings) || index < 0 || index >= prev.trainings.length) return prev;
      const newTrainings = [...prev.trainings];
      newTrainings[index] = { ...newTrainings[index], completed: !newTrainings[index].completed };
      const updated = { ...prev, trainings: newTrainings };
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  const updateMentalData = (field: keyof MentalSleep, value: MentalSleep[keyof MentalSleep]): void => {
    setAppData(prev => {
      const updated = {
        ...prev,
        mentalSleep: { ...prev.mentalSleep, [field]: value },
        lastMentalUpdate: getTodayKey(HABIT_RESET_HOUR)
      };
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  const updateWeeklyReview = (field: keyof WeeklyReview, value: WeeklyReview[keyof WeeklyReview]): void => {
    setAppData(prev => {
      const updated = {
        ...prev,
        weeklyReview: { ...prev.weeklyReview, [field]: value }
      };
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  const updateWeeklyView = (field: keyof WeeklyView, value: WeeklyView[keyof WeeklyView]): void => {
    setAppData(prev => {
      const updated = {
        ...prev,
        weeklyView: { ...prev.weeklyView, [field]: value }
      };
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  // --- Context value ---
  // Memoized context value for provider
  const contextValue = useMemo<DataContextType>(() => ({
    ...appData,
    toggleHabit,
    resetAllHabits,
    updateTraining,
    toggleTrainingCompleted,
    updateMentalData,
    updateWeeklyReview,
    updateWeeklyView
  }), [appData]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useAppData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context;
};
