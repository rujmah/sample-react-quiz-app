import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const Questions = ({ ask, answers, processSelection }) => (
  <>
    <Card.Title data-testid="quiz-ask">{ask}</Card.Title>
    <div className="quiz-answers d-grid gap-3">
      {answers.map((a) => (
        <div
          className="quiz-answer-container p-2 bg-light border"
          key={`answer${a.id}`}
        >
          <Button
            className="quiz-answer"
            data-testid="quiz-answer"
            onClick={() => processSelection(a.id)}
          >
            {a.answer}
          </Button>
        </div>
      ))}
    </div>
  </>
);

Questions.propTypes = {
  ask: PropTypes.string,
  answers: PropTypes.array,
  processSelection: PropTypes.func,
};

export default Questions;
