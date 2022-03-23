import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/sudoku resolver/i);
  expect(linkElement).toBeInTheDocument();
});
