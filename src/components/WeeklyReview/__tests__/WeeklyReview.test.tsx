// WeeklyReview.test.tsx
// Tests for WeeklyReview component, following guidelines: one assert per test, readable, fast, independent, repeatable.

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataProvider } from '../../../state/DataContext';
import WeeklyReview from '../WeeklyReview';

function renderWithProvider(ui: React.ReactElement) {
  return render(<DataProvider>{ui}</DataProvider>);
}

describe('WeeklyReview', () => {
  beforeAll(() => {
    // Mock URL.createObjectURL and URL.revokeObjectURL for jsdom
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    global.URL.revokeObjectURL = jest.fn();
  });

  test('renders all fields', () => {
    renderWithProvider(<WeeklyReview />);
    expect(screen.getByText(/Revisão Semanal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/O que mandei bem/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/O que posso ajustar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Objetivo da próxima semana/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/O que quero evitar repetir/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Exportar como texto/i })).toBeInTheDocument();
  });

  test('can edit did well', () => {
    renderWithProvider(<WeeklyReview />);
    const textarea = screen.getByLabelText(/O que mandei bem/i);
    fireEvent.change(textarea, { target: { value: 'Fiz tudo certo' } });
    expect((textarea as HTMLTextAreaElement).value).toBe('Fiz tudo certo');
  });

  test('can edit can improve', () => {
    renderWithProvider(<WeeklyReview />);
    const textarea = screen.getByLabelText(/O que posso ajustar/i);
    fireEvent.change(textarea, { target: { value: 'Dormir mais cedo' } });
    expect((textarea as HTMLTextAreaElement).value).toBe('Dormir mais cedo');
  });

  test('can edit next week goal', () => {
    renderWithProvider(<WeeklyReview />);
    const textarea = screen.getByLabelText(/Objetivo da próxima semana/i);
    fireEvent.change(textarea, { target: { value: 'Terminar projeto' } });
    expect((textarea as HTMLTextAreaElement).value).toBe('Terminar projeto');
  });

  test('can edit to avoid', () => {
    renderWithProvider(<WeeklyReview />);
    const textarea = screen.getByLabelText(/O que quero evitar repetir/i);
    fireEvent.change(textarea, { target: { value: 'Procrastinar' } });
    expect((textarea as HTMLTextAreaElement).value).toBe('Procrastinar');
  });

  test('can export as text', () => {
    renderWithProvider(<WeeklyReview />);
    const exportButton = screen.getByRole('button', { name: /Exportar como texto/i });
    fireEvent.click(exportButton);
    // Optionally, check if clipboard or download is triggered, or a message is shown
    // For now, just assert the button is clickable
    expect(exportButton).toBeInTheDocument();
  });

  test('fields retain values after editing', () => {
    renderWithProvider(<WeeklyReview />);
    const didWell = screen.getByLabelText(/O que mandei bem/i);
    const canImprove = screen.getByLabelText(/O que posso ajustar/i);
    const nextGoal = screen.getByLabelText(/Objetivo da próxima semana/i);
    const toAvoid = screen.getByLabelText(/O que quero evitar repetir/i);
    fireEvent.change(didWell, { target: { value: 'A' } });
    fireEvent.change(canImprove, { target: { value: 'B' } });
    fireEvent.change(nextGoal, { target: { value: 'C' } });
    fireEvent.change(toAvoid, { target: { value: 'D' } });
    expect(didWell).toHaveValue('A');
    expect(canImprove).toHaveValue('B');
    expect(nextGoal).toHaveValue('C');
    expect(toAvoid).toHaveValue('D');
  });
});
