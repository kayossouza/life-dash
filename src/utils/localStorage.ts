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
  } catch {}
};

export const loadFromLocalStorage = <T = unknown>(key: string, defaultValue: T | null = null): T | null => {
  if (!isLocalStorageAvailable()) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    try {
      return JSON.parse(item) as T;
    } catch {
      // If not JSON, return as string
      return (item as unknown) as T;
    }
  } catch {
    return defaultValue;
  }
};

export const clearLocalStorageItem = (key: string): void => {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
    }
  } catch {}
};
