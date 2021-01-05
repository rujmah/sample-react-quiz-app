import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const quizHeader = screen.getByText(/Quiz:/i);
  expect(quizHeader).toBeInTheDocument();
});
