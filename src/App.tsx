import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { ThemeProvider } from './utils/ThemeContext';
import { DataProvider } from './utils/DataContext';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <Dashboard />
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
