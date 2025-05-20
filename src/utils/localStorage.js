// Utility functions for localStorage management

// Cache the localStorage availability check
let isLocalStorageAvailableCache = null;

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  // Return the cached result if we've already checked
  if (isLocalStorageAvailableCache !== null) {
    return isLocalStorageAvailableCache;
  }

  // Ensure we have access to the window object and localStorage
  if (typeof window === 'undefined') {
    console.warn('Window is not defined (SSR context?)');
    isLocalStorageAvailableCache = false;
    return false;
  }
  
  if (!window.localStorage) {
    console.warn('localStorage is not available on window object');
    isLocalStorageAvailableCache = false;
    return false;
  }
  
  try {
    // Try writing and reading a test value
    const testKey = '__test_localStorage__';
    window.localStorage.setItem(testKey, 'test');
    const testValue = window.localStorage.getItem(testKey);
    window.localStorage.removeItem(testKey);
    
    // Verify the test was successful
    isLocalStorageAvailableCache = testValue === 'test';
    console.log('localStorage availability check:', isLocalStorageAvailableCache ? 'Available' : 'Not available');
    return isLocalStorageAvailableCache;
  } catch (e) {
    console.warn('Error checking localStorage availability:', e);
    isLocalStorageAvailableCache = false;
    return false;
  }
};

export const saveToLocalStorage = (key, data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available, cannot save data for key:', key);
    return;
  }
  
  try {
    console.log(`Saving data to localStorage for key "${key}":`, JSON.stringify(data));
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    
    // Verify data was actually saved
    const savedItem = localStorage.getItem(key);
    if (savedItem === serializedData) {
      console.log(`✅ Data successfully saved to localStorage for key "${key}"`);
    } else {
      console.error(`❌ Data verification failed for key "${key}". Expected vs Actual:`, serializedData, savedItem);
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available, using default value for key:', key);
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    console.log(`Loading from localStorage for key "${key}":`, item ? 'Found data' : 'No data found');
    
    // Extra safe-guard against invalid JSON
    if (!item) return defaultValue;
    
    try {
      const parsedData = JSON.parse(item);
      console.log(`Successfully parsed data for key "${key}":`, parsedData);
      return parsedData;
    } catch (parseError) {
      console.error(`Error parsing JSON for key "${key}":`, parseError);
      localStorage.removeItem(key); // Remove invalid JSON
      return defaultValue;
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const clearLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing localStorage item:', error);
  }
};
