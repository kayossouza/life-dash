// MentalSleep.test.tsx
// Tests for MentalSleep component, following guidelines: one assert per test, readable, fast, independent, repeatable.

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import MentalSleep from '../MentalSleep';
import { DataProvider } from '../../../state/DataContext';

// Helper to render with context
function renderWithProvider(ui: React.ReactElement) {
  return render(<DataProvider>{ui}</DataProvider>);
}

describe('MentalSleep', () => {
  test('renders all fields', () => {
    renderWithProvider(<MentalSleep />);
    expect(screen.getByLabelText(/Horário que dormiu ontem/i)).toBeInTheDocument();
    expect(screen.getByText(/Nível de energia ao acordar/i)).toBeInTheDocument();
    expect(screen.getByText(/Usou técnica de respiração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Frase de gratidão do dia/i)).toBeInTheDocument();
  });

  test('can change sleep time', () => {
    renderWithProvider(<MentalSleep />);
    const input = screen.getByLabelText(/Horário que dormiu ontem/i);
    fireEvent.change(input, { target: { value: '23:30' } });
    expect((input as HTMLInputElement).value).toBe('23:30');
  });

  test('can select energy level', () => {
    renderWithProvider(<MentalSleep />);
    const button = screen.getByLabelText('Nível de energia 4');
    fireEvent.click(button);
    expect(button.className).toMatch(/bg-blue-500|dark:bg-dark-accent/);
  });

  test('can toggle breathing technique', () => {
    renderWithProvider(<MentalSleep />);
    const breathingButton = screen.getByRole('button', { name: /técnica de respiração/i });
    fireEvent.click(breathingButton);
    expect(breathingButton.textContent).toBe('✓');
    fireEvent.click(breathingButton);
    expect(breathingButton.textContent).toBe('');
  });

  test('can enter gratitude text', () => {
    renderWithProvider(<MentalSleep />);
    const textarea = screen.getByLabelText(/Frase de gratidão do dia/i);
    fireEvent.change(textarea, { target: { value: 'Sou grato pela família' } });
    expect((textarea as HTMLTextAreaElement).value).toBe('Sou grato pela família');
  });
});
