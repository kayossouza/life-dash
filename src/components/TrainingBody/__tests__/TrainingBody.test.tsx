// TrainingBody.test.tsx
// Tests for TrainingBody component, following guidelines: one assert per test, readable, fast, independent, repeatable.

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataProvider } from '../../../state/DataContext';
import TrainingBody from '../TrainingBody';

function renderWithProvider(ui: React.ReactElement) {
  return render(<DataProvider>{ui}</DataProvider>);
}

describe('TrainingBody', () => {
  test('renders training table', () => {
    renderWithProvider(<TrainingBody />);
    expect(screen.getByText(/Treino e Corpo/i)).toBeInTheDocument();
    expect(screen.getByText(/Dia/i)).toBeInTheDocument();
    expect(screen.getByText(/Treino Planejado/i)).toBeInTheDocument();
    expect(screen.getByText(/Feito/i)).toBeInTheDocument();
    // Check at least one planned training input exists
    expect(screen.getAllByPlaceholderText(/Tipo de treino/i).length).toBeGreaterThan(0);
  });

  test('can edit planned training', () => {
    renderWithProvider(<TrainingBody />);
    const input = screen.getAllByPlaceholderText(/Tipo de treino/i)[0];
    fireEvent.change(input, { target: { value: 'Cardio' } });
    expect((input as HTMLInputElement).value).toBe('Cardio');
  });

  test('can toggle training completed', () => {
    renderWithProvider(<TrainingBody />);
    // Find the first row's 'Feito' button by its role and cell position
    const rows = screen.getAllByRole('row');
    // Skip the header row
    const firstRow = rows[1];
    const feitoButton = firstRow.querySelector('button');
    expect(feitoButton).toBeTruthy();
    if (feitoButton) {
      expect(feitoButton.textContent).toBe('');
      fireEvent.click(feitoButton);
      expect(feitoButton.textContent).toBe('✓');
      fireEvent.click(feitoButton);
      expect(feitoButton.textContent).toBe('');
    }
  });
});
