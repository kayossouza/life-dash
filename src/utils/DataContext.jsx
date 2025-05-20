import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

// Create the data context
const DataContext = createContext();

// Default values for all the app's data
const defaultData = {
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

// Provider component
export const DataProvider = ({ children }) => {
  // State for all app data
  const [appData, setAppData] = useState(defaultData);
  
  // Load all data from localStorage on initial mount
  useEffect(() => {
    console.log('DataContext: Loading all data from localStorage');
    
    const loadedData = {
      ...defaultData,
      dailyHabits: loadFromLocalStorage('dailyHabits', defaultData.dailyHabits),
      lastHabitReset: loadFromLocalStorage('lastHabitReset', ''),
      trainings: loadFromLocalStorage('trainings', defaultData.trainings),
      mentalSleep: loadFromLocalStorage('mentalSleep', defaultData.mentalSleep),
      lastMentalUpdate: loadFromLocalStorage('lastMentalUpdate', ''),
      weeklyReview: loadFromLocalStorage('weeklyReview', defaultData.weeklyReview),
      weeklyView: loadFromLocalStorage('weeklyView', defaultData.weeklyView)
    };
    
    setAppData(loadedData);
    
    // Check if we need to reset habits based on date
    const today = new Date().toDateString();
    if (loadedData.lastHabitReset !== today) {
      console.log('DataContext: Resetting daily habits (new day)');
      setAppData(prev => ({
        ...prev,
        dailyHabits: prev.dailyHabits.map(habit => ({ ...habit, completed: false })),
        lastHabitReset: today
      }));
    }
    
    // Check if we need to reset mental items based on date
    if (loadedData.lastMentalUpdate !== today) {
      console.log('DataContext: Resetting mental daily items (new day)');
      setAppData(prev => ({
        ...prev,
        mentalSleep: {
          ...prev.mentalSleep,
          usedBreathingTechnique: false,
          gratitude: ''
        },
        lastMentalUpdate: today
      }));
    }
  }, []);
  
  // Daily habits functions
  const toggleHabit = (id) => {
    setAppData(prev => {
      const newHabits = prev.dailyHabits.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      );
      
      // Save to localStorage
      saveToLocalStorage('dailyHabits', newHabits);
      
      return {
        ...prev,
        dailyHabits: newHabits
      };
    });
  };
  
  const resetAllHabits = () => {
    const today = new Date().toDateString();
    setAppData(prev => {
      const newHabits = prev.dailyHabits.map(habit => ({ ...habit, completed: false }));
      
      // Save to localStorage
      saveToLocalStorage('dailyHabits', newHabits);
      saveToLocalStorage('lastHabitReset', today);
      
      return {
        ...prev,
        dailyHabits: newHabits,
        lastHabitReset: today
      };
    });
  };
  
  // Training functions
  const updateTraining = (index, value) => {
    setAppData(prev => {
      const newTrainings = [...prev.trainings];
      newTrainings[index].plannedTraining = value;
      
      // Save to localStorage
      saveToLocalStorage('trainings', newTrainings);
      
      return {
        ...prev,
        trainings: newTrainings
      };
    });
  };
  
  const toggleTrainingCompleted = (index) => {
  setAppData(prev => {
    if (!Array.isArray(prev.trainings)) return prev;
    if (index < 0 || index >= prev.trainings.length) return prev;

    const newTrainings = [...prev.trainings];
    newTrainings[index] = {
      ...newTrainings[index],
      completed: !newTrainings[index].completed
    };

    // Save to localStorage
    saveToLocalStorage('trainings', newTrainings);

    return {
      ...prev,
      trainings: newTrainings
    };
  });
};
  
  // Mental Sleep functions
  const updateMentalData = (field, value) => {
    setAppData(prev => {
      const newMentalData = {
        ...prev.mentalSleep,
        [field]: value
      };
      
      // Save to localStorage
      saveToLocalStorage('mentalSleep', newMentalData);
      
      return {
        ...prev,
        mentalSleep: newMentalData
      };
    });
  };
  
  // Weekly Review functions
  const updateWeeklyReview = (field, value) => {
    setAppData(prev => {
      const newReview = {
        ...prev.weeklyReview,
        [field]: value
      };
      
      // Save to localStorage
      saveToLocalStorage('weeklyReview', newReview);
      
      return {
        ...prev,
        weeklyReview: newReview
      };
    });
  };
  
  // Weekly View functions
  const updateWeeklyView = (field, value) => {
    setAppData(prev => {
      const newView = {
        ...prev.weeklyView,
        [field]: value
      };
      
      // Save to localStorage
      saveToLocalStorage('weeklyView', newView);
      
      return {
        ...prev,
        weeklyView: newView
      };
    });
  };
  
  // Create context value with data and functions
  const contextValue = useMemo(() => ({
    // Data
    dailyHabits: appData.dailyHabits,
    trainings: appData.trainings,
    mentalSleep: appData.mentalSleep,
    weeklyReview: appData.weeklyReview,
    weeklyView: appData.weeklyView,
    
    // Functions
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

// Hook to use the data context
export const useAppData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context;
};
