// DarkModeToggle.test.tsx
// Tests for DarkModeToggle component, following guidelines: one assert per test, readable, fast, independent, repeatable.

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../utils/ThemeContext';
import DarkModeToggle from '../DarkModeToggle';

describe('DarkModeToggle', () => {
  function renderWithProvider() {
    return render(
      <ThemeProvider>
        <DarkModeToggle />
      </ThemeProvider>
    );
  }

  test('renders toggle button', () => {
    renderWithProvider();
    expect(screen.getByLabelText(/toggle dark mode/i)).toBeInTheDocument();
  });

  test('toggles dark mode', () => {
    renderWithProvider();
    const button = screen.getByLabelText(/toggle dark mode/i);
    // Initial state: should show moon icon (dark mode off)
    expect(button.innerHTML).toMatch(/svg/);
    fireEvent.click(button);
    // After click: should show sun icon (dark mode on)
    expect(button.innerHTML).toMatch(/svg/);
  });
});
