import Dashboard from './components/Dashboard/Dashboard'
import { ThemeProvider } from './utils/ThemeContext'
import { DataProvider } from './utils/DataContext'
import './App.css'

// App component with both Theme and Data providers

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Dashboard />
      </DataProvider>
    </ThemeProvider>
  )
}

export default App
