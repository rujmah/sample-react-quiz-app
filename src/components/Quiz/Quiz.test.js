import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quiz from './Quiz';

const testQuestions = [
  {
    id: 1,
    ask: 'What do Mike and Sully call the child that they find?',
    correct: 1,
    answers: [
      { id: 1, answer: 'Boo' },
      { id: 2, answer: 'Cutie' },
      { id: 3, answer: 'Child' },
      { id: 4, answer: 'Girl' },
      { id: 5, answer: 'Dangerous' },
    ],
  },
  {
    id: 2,
    ask: 'What is the game called that WreckIt Ralph finds the princess?',
    correct: 3,
    answers: [
      { id: 1, answer: 'Hammer Time' },
      { id: 2, answer: 'Racing Royalty' },
      { id: 3, answer: 'Sugar Rush' },
      { id: 4, answer: 'Candy Racers' },
      { id: 5, answer: 'Sherbert Rally' },
    ],
  },
];
test('should render quiz block', async () => {
  render(<Quiz questions={testQuestions} />);

  await waitFor(() => screen.getByTestId('quiz-ask'));

  // Question
  expect(screen.getByTestId('quiz-ask')).toHaveTextContent(
    testQuestions[0].ask
  );

  // Ask
  const answers = screen.getAllByTestId('quiz-answer');
  expect(answers).toHaveLength(5);
  expect(answers[3]).toHaveTextContent(testQuestions[0].answers[3].answer);

  // Progress
  expect(screen.getByTestId('quiz-progress')).toHaveTextContent(
    'Question 1 of 2'
  );
});

test('should move to the next question', async () => {
  render(<Quiz questions={testQuestions} />);

  await waitFor(() => screen.getByText('Boo'));

  userEvent.click(screen.getByText('Boo'));
  await waitFor(() => screen.getByTestId('quiz-progress'));

  expect(screen.getByTestId('quiz-progress')).toHaveTextContent(
    'Question 2 of 2'
  );
  expect(screen.getByTestId('quiz-ask')).toHaveTextContent(
    testQuestions[1].ask
  );
  const answers = screen.getAllByTestId('quiz-answer');
  expect(answers[2]).toHaveTextContent('Sugar Rush');
});

test('should give the score at the end of the quiz', async () => {
  render(<Quiz questions={testQuestions} />);

  await waitFor(() => screen.getByText('Boo'));

  userEvent.click(screen.getByText('Boo'));
  await waitFor(() => screen.getByTestId('quiz-progress'));
  let answers = screen.getAllByTestId('quiz-answer');

  userEvent.click(answers[3]);
  await waitFor(() => screen.getByTestId('quiz-score'));
  expect(screen.getByTestId('quiz-score')).toHaveTextContent(
    'You scored 1 out of 2'
  );
  expect(screen.getByTestId('quiz-progress')).toHaveTextContent(
    'Quiz completed'
  );
  answers = screen.getAllByTestId('quiz-answer');
  expect(answers[0]).toHaveTextContent(`✅ ${testQuestions[0].ask}`);
  expect(answers[1]).toHaveTextContent(`❌ ${testQuestions[1].ask}`);
});
