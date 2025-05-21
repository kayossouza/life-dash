import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';
import { ThemeContextType } from '../types/ThemeContext';


// Mock window.matchMedia for Jest (jsdom does not implement it)
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  };
}

// Constant for localStorage key (for dark mode preference)
const DARK_MODE_KEY = 'darkMode' as const;

// Create a strictly typed context for theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for consuming the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider props type for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Initialize theme based on localStorage or user preference
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      // Prefer explicit utility for localStorage (robustness)
      const stored = loadFromLocalStorage(DARK_MODE_KEY, null);
      let isDark: boolean;
      if (typeof stored === 'string') {
        isDark = stored === 'true';
      } else if (typeof stored === 'boolean') {
        isDark = stored;
      } else {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      setDarkMode(isDark);
    } catch (error) {
      // Warn but do not crash if error
      console.warn('Error initializing dark mode:', error);
    }
  }, []);

  // Toggle dark mode and persist to localStorage
  const toggleDarkMode = (): void => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      try {
        saveToLocalStorage(DARK_MODE_KEY, String(newMode));
      } catch (error) {
        console.warn('Error saving dark mode preference:', error);
      }
      return newMode;
    });
  };

  // Apply or remove dark class on <html> element for Tailwind
  useEffect(() => {
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      console.warn('Error applying dark mode class:', error);
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
