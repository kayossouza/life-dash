import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Fix: Use correct relative paths for mocks
jest.mock('../components/Dashboard/Dashboard', () => () => <div data-testid="dashboard">Dashboard</div>);
jest.mock('../utils/ThemeContext', () => {
  const actual = jest.requireActual('../utils/ThemeContext');
  return {
    ...actual,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
  };
});
jest.mock('../state/DataContext', () => {
  const actual = jest.requireActual('../state/DataContext');
  return {
    ...actual,
    DataProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="data-provider">{children}</div>,
  };
});

describe('App', () => {
  it('renders the app with providers and dashboard', () => {
    render(<App />);
    // Providers wrap the dashboard
    const theme = screen.getByTestId('theme-provider');
    const data = screen.getByTestId('data-provider');
    const dashboard = screen.getByTestId('dashboard');
    expect(theme).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();
    // Providers should wrap dashboard
    expect(theme).toContainElement(data);
    expect(data).toContainElement(dashboard);
  });
});
