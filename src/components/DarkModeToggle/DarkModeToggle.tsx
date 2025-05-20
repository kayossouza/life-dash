import React from 'react';
import { useTheme } from '../../utils/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button 
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
    >
      {/* You can add an icon or text here */}
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
