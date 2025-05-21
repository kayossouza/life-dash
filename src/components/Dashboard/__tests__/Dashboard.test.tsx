// Dashboard.test.tsx
// Tests for Dashboard component, following guidelines: one assert per test, readable, fast, independent, repeatable.

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../utils/ThemeContext';
import { DataProvider } from '../../../state/DataContext';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  function renderWithProviders() {
    return render(
      <ThemeProvider>
        <DataProvider>
          <Dashboard />
        </DataProvider>
      </ThemeProvider>
    );
  }

  test('renders dashboard title (heading only)', () => {
    renderWithProviders();
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings.length).toBe(1);
    expect(headings[0]).toHaveTextContent(/Painel de Vida Ninja/i);
  });

  test('renders all main sections', () => {
    renderWithProviders();
    expect(screen.getByText(/Visão da Semana/i)).toBeInTheDocument();
    expect(screen.getByText(/Hábitos Diários/i)).toBeInTheDocument();
    expect(screen.getByText(/Treino e Corpo/i)).toBeInTheDocument();
    expect(screen.getByText(/Mental e Sono/i)).toBeInTheDocument();
    expect(screen.getByText(/Revisão Semanal/i)).toBeInTheDocument();
  });

  test('renders dark mode toggle', () => {
    renderWithProviders();
    expect(screen.getByLabelText(/toggle dark mode/i)).toBeInTheDocument();
  });
});
