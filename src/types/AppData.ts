// Refactored: Centralized all app data types and interfaces for clarity and reusability.

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
