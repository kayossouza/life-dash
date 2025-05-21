import React from 'react';
import { createRoot } from 'react-dom/client';

// Mock App for entrypoint test
jest.mock('../App', () => () => <div data-testid="app-root">App</div>);

// Mock StrictMode to just render children
jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return { ...actual, StrictMode: ({ children }: { children: React.ReactNode }) => <>{children}</> };
});

describe('main entrypoint', () => {
  let container: HTMLDivElement;
  let rootSpy: jest.SpyInstance;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    rootSpy = jest.spyOn(document, 'getElementById').mockReturnValue(container);
    // Mock createRoot
    (createRoot as unknown as jest.Mock).mockClear?.();
  });

  afterEach(() => {
    document.body.removeChild(container);
    rootSpy.mockRestore();
  });

  it('renders App into the root element', async () => {
    // Mock createRoot
    const renderSpy = jest.fn();
    (createRoot as unknown as jest.Mock) = jest.fn(() => ({ render: renderSpy }));
    require('../main');
    expect(createRoot).toHaveBeenCalledWith(container);
    expect(renderSpy).toHaveBeenCalled();
    // No assertion on document.body.innerHTML, since render is mocked
  });
});
