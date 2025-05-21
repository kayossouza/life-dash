// WeeklyView.test.tsx
// Tests for WeeklyView component, following guidelines: one assert per test, readable, fast, independent, repeatable.

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataProvider } from '../../../state/DataContext';
import WeeklyView from '../WeeklyView';

function renderWithProvider(ui: React.ReactElement) {
  return render(<DataProvider>{ui}</DataProvider>);
}

describe('WeeklyView', () => {
  test('renders all fields', () => {
    renderWithProvider(<WeeklyView />);
    expect(screen.getByText(/Visão da Semana/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Semana atual/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Objetivo principal da semana/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Palavra de foco/i)).toBeInTheDocument();
  });

  test('can edit week number', () => {
    renderWithProvider(<WeeklyView />);
    const input = screen.getByLabelText(/Semana atual/i);
    fireEvent.change(input, { target: { value: 'Semana 22' } });
    expect((input as HTMLInputElement).value).toBe('Semana 22');
  });

  test('can edit weekly objective', () => {
    renderWithProvider(<WeeklyView />);
    const input = screen.getByLabelText(/Objetivo principal da semana/i);
    fireEvent.change(input, { target: { value: 'Foco total' } });
    expect((input as HTMLInputElement).value).toBe('Foco total');
  });

  test('can edit focus word', () => {
    renderWithProvider(<WeeklyView />);
    const input = screen.getByLabelText(/Palavra de foco/i);
    fireEvent.change(input, { target: { value: 'Disciplina' } });
    expect((input as HTMLInputElement).value).toBe('Disciplina');
  });
});
