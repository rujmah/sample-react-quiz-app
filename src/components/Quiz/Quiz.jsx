import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

const Results = loadable(() => import('./Results'));
const Questions = loadable(() => import('./Questions'));

const Quiz = (props) => {
  const { questions } = props;

  const [question, setQuestion] = useState(questions[0]);
  const { ask, answers } = question;
  const questionsLength = questions.length;

  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [answered, setAnswered] = useState([]);

  useEffect(() => {
    if (current > questionsLength) {
      setCompleted(true);
    } else {
      setQuestion(questions[current - 1]);
    }
  }, [questions, current, questionsLength]);

  const processSelection = (id) => {
    setScore(id === question.correct ? score + 1 : score);
    setAnswered([...answered, id]);
    setCurrent(current + 1);
  };

  return (
    <div className="quiz-block">
      <div className="quiz-progress h2" data-testid="quiz-progress">
        {completed
          ? `Quiz completed`
          : `Question ${current} of ${questionsLength}`}
      </div>

      <Card className="quiz-question-block">
        <Card.Body>
          {completed ? (
            <Results answered={answered} questions={questions} score={score} />
          ) : (
            <Questions
              ask={ask}
              answers={answers}
              processSelection={processSelection}
            />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

Quiz.propTypes = {
  questions: PropTypes.array,
};

Quiz.defaultProps = {
  questions: [
    {
      id: 1,
      ask: 'Wall-E has what pet?',
      correct: 4,
      answers: [
        { id: 1, answer: 'Dog' },
        { id: 2, answer: 'Cat' },
        { id: 3, answer: 'Hamster' },
        { id: 4, answer: 'Cockroach' },
        { id: 5, answer: 'Snake' },
      ],
    },
  ],
};

export default Quiz;
