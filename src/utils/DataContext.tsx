import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

// --- Types ---
export interface DailyHabit {
  id: string;
  label: string;
  completed: boolean;
}

export interface Training {
  day: string;
  plannedTraining: string;
  completed: boolean;
}

export interface MentalSleep {
  sleepTime: string;
  energyLevel: number;
  usedBreathingTechnique: boolean;
  gratitude: string;
}

export interface WeeklyReview {
  didWell: string;
  canImprove: string;
  nextWeekGoal: string;
  toAvoid: string;
}

export interface WeeklyView {
  weekNumber: string;
  weeklyObjective: string;
  focusWord: string;
}

export interface AppData {
  dailyHabits: DailyHabit[];
  lastHabitReset: string;
  trainings: Training[];
  mentalSleep: MentalSleep;
  lastMentalUpdate: string;
  weeklyReview: WeeklyReview;
  weeklyView: WeeklyView;
}

export interface DataContextType extends AppData {
  toggleHabit: (id: string) => void;
  resetAllHabits: () => void;
  updateTraining: (index: number, value: Partial<Training>) => void;
  toggleTrainingCompleted: (index: number) => void;
  updateMentalData: (field: keyof MentalSleep, value: MentalSleep[keyof MentalSleep]) => void;
  updateWeeklyReview: (field: keyof WeeklyReview, value: WeeklyReview[keyof WeeklyReview]) => void;
  updateWeeklyView: (field: keyof WeeklyView, value: WeeklyView[keyof WeeklyView]) => void;
}

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

  // Load all data from localStorage on initial mount
  useEffect(() => {
    const loadedData: AppData = {
      ...defaultData,
      ...loadFromLocalStorage<AppData>('appData', defaultData)
    };
    setAppData(loadedData);

    // Reset habits if needed
    const today = new Date().toDateString();
    if (loadedData.lastHabitReset !== today) {
      setAppData(prev => ({
        ...prev,
        dailyHabits: prev.dailyHabits.map(h => ({ ...h, completed: false })),
        lastHabitReset: today
      }));
    }
    // Reset mental items if needed
    if (loadedData.lastMentalUpdate !== today) {
      setAppData(prev => ({
        ...prev,
        mentalSleep: { ...prev.mentalSleep, gratitude: '', usedBreathingTechnique: false },
        lastMentalUpdate: today
      }));
    }
  }, []);

  // --- Actions ---
  const toggleHabit = (id: string): void => {
    setAppData(prev => {
      const newHabits = prev.dailyHabits.map(h => h.id === id ? { ...h, completed: !h.completed } : h);
      const updated = { ...prev, dailyHabits: newHabits };
      saveToLocalStorage('appData', updated);
      return updated;
    });
  };

  const resetAllHabits = (): void => {
    const today = new Date().toDateString();
    setAppData(prev => {
      const updated = {
        ...prev,
        dailyHabits: prev.dailyHabits.map(h => ({ ...h, completed: false })),
        lastHabitReset: today
      };
      saveToLocalStorage('appData', updated);
      return updated;
    });
  };

  const updateTraining = (index: number, value: Partial<Training>): void => {
    setAppData(prev => {
      if (!Array.isArray(prev.trainings) || index < 0 || index >= prev.trainings.length) return prev;
      const newTrainings = [...prev.trainings];
      newTrainings[index] = { ...newTrainings[index], ...value };
      const updated = { ...prev, trainings: newTrainings };
      saveToLocalStorage('appData', updated);
      return updated;
    });
  };

  const toggleTrainingCompleted = (index: number): void => {
    setAppData(prev => {
      if (!Array.isArray(prev.trainings) || index < 0 || index >= prev.trainings.length) return prev;
      const newTrainings = [...prev.trainings];
      newTrainings[index] = { ...newTrainings[index], completed: !newTrainings[index].completed };
      const updated = { ...prev, trainings: newTrainings };
      saveToLocalStorage('appData', updated);
      return updated;
    });
  };

  const updateMentalData = (field: keyof MentalSleep, value: MentalSleep[keyof MentalSleep]): void => {
    setAppData(prev => {
      const updated = {
        ...prev,
        mentalSleep: { ...prev.mentalSleep, [field]: value },
        lastMentalUpdate: new Date().toDateString()
      };
      saveToLocalStorage('appData', updated);
      return updated;
    });
  };

  const updateWeeklyReview = (field: keyof WeeklyReview, value: WeeklyReview[keyof WeeklyReview]): void => {
    setAppData(prev => {
      const updated = {
        ...prev,
        weeklyReview: { ...prev.weeklyReview, [field]: value }
      };
      saveToLocalStorage('appData', updated);
      return updated;
    });
  };

  const updateWeeklyView = (field: keyof WeeklyView, value: WeeklyView[keyof WeeklyView]): void => {
    setAppData(prev => {
      const updated = {
        ...prev,
        weeklyView: { ...prev.weeklyView, [field]: value }
      };
      saveToLocalStorage('appData', updated);
      return updated;
    });
  };

  // --- Context value ---
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
