// DailyHabits.test.tsx
// Tests for DailyHabits component, following guidelines: one assert per test, readable, fast, independent, repeatable.

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataProvider } from '../../../state/DataContext';
import DailyHabits from '../DailyHabits';

function renderWithProvider(ui: React.ReactElement) {
  return render(<DataProvider>{ui}</DataProvider>);
}

describe('DailyHabits', () => {
  test('renders all daily habits', () => {
    renderWithProvider(<DailyHabits />);
    expect(screen.getByText(/Hábitos Diários/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Resetar Tudo/i })).toBeInTheDocument();
    // Check at least one habit label
    expect(screen.getByLabelText(/Acordou às 05:30/i)).toBeInTheDocument();
  });

  test('can toggle a habit', () => {
    renderWithProvider(<DailyHabits />);
    const checkbox = screen.getByLabelText(/Acordou às 05:30/i);
    expect((checkbox as HTMLInputElement).checked).toBe(false);
    fireEvent.click(checkbox);
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  test('can reset all habits', async () => {
    renderWithProvider(<DailyHabits />);
    let checkbox = screen.getByLabelText(/Acordou às 05:30/i);
    // Ensure the checkbox is checked before testing reset
    if (!(checkbox as HTMLInputElement).checked) {
      fireEvent.click(checkbox);
      await waitFor(() => expect((screen.getByLabelText(/Acordou às 05:30/i) as HTMLInputElement).checked).toBe(true), { timeout: 1500 });
    }
    fireEvent.click(screen.getByRole('button', { name: /Resetar Tudo/i }));
    await waitFor(() => expect((screen.getByLabelText(/Acordou às 05:30/i) as HTMLInputElement).checked).toBe(false), { timeout: 1500 });
  });
});
