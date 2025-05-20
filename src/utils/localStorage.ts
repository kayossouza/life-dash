// Utility functions for localStorage management (TypeScript, strict)

let isLocalStorageAvailableCache: boolean | null = null;

export const isLocalStorageAvailable = (): boolean => {
  if (isLocalStorageAvailableCache !== null) {
    return isLocalStorageAvailableCache;
  }
  if (typeof window === 'undefined' || !window.localStorage) {
    isLocalStorageAvailableCache = false;
    return false;
  }
  try {
    const testKey = '__test_localStorage__';
    window.localStorage.setItem(testKey, 'test');
    const testValue = window.localStorage.getItem(testKey);
    window.localStorage.removeItem(testKey);
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
    // Log error for debugging
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
      // If not JSON, return as string
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
