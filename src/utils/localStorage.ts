// Utility functions for localStorage management (TypeScript, strict)
// Provides robust, typed wrappers for localStorage with error handling

// Export cache for testability
export let isLocalStorageAvailableCache: boolean | null = null;
export function _resetLocalStorageCache() { isLocalStorageAvailableCache = null; }
const TEST_KEY = '__test_localStorage__' as const;

export const isLocalStorageAvailable = (): boolean => {
  if (isLocalStorageAvailableCache !== null) {
    return isLocalStorageAvailableCache;
  }
  if (typeof window === 'undefined' || !window.localStorage) {
    isLocalStorageAvailableCache = false;
    return false;
  }
  try {
    window.localStorage.setItem(TEST_KEY, 'test');
    const testValue = window.localStorage.getItem(TEST_KEY);
    window.localStorage.removeItem(TEST_KEY);
    isLocalStorageAvailableCache = testValue === 'test';
    return isLocalStorageAvailableCache;
  } catch {
    isLocalStorageAvailableCache = false;
    return false;
  }
};

export const saveToLocalStorage = (key: string, data: unknown): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    const serializedData = typeof data === 'string' ? data : JSON.stringify(data);
    window.localStorage.setItem(key, serializedData);
  } catch (error) {
    // Log error for debugging (do not crash app)
    console.warn(`Error saving to localStorage for key "${key}":`, error);
  }
};

export const loadFromLocalStorage = <T = unknown>(key: string, defaultValue: T | null = null): T | null => {
  if (!isLocalStorageAvailable()) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      // If not JSON, return as string (fallback for legacy/plain values)
      if (typeof item === 'string') return (item as unknown) as T;
      console.warn(`Error parsing localStorage item for key "${key}":`, error);
      return defaultValue;
    }
  } catch (error) {
    console.warn(`Error loading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

export const clearLocalStorageItem = (key: string): void => {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn(`Error clearing localStorage item for key "${key}":`, error);
  }
};

// Refactored: Extracted utility to get current date key for daily resets
export function getTodayKey(resetHour: number = 5): string {
  const now = new Date();
  if (now.getHours() < resetHour) {
    now.setDate(now.getDate() - 1);
  }
  return now.toDateString();
}
