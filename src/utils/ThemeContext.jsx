import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme based on localStorage or user preference
  useEffect(() => {
    try {
      // Check if window and localStorage are available (for SSR/testing)
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
      }
      
      const isDark = localStorage.getItem('darkMode') === 'true' || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches && 
                     localStorage.getItem('darkMode') === null);
      
      setDarkMode(isDark);
    } catch (error) {
      console.warn('Error accessing localStorage or matchMedia:', error);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('darkMode', String(newMode));
        }
      } catch (error) {
        console.warn('Error saving dark mode preference:', error);
      }
      return newMode;
    });
  };

  // Apply dark class to html element
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

