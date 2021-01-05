import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const Results = ({ answered, questions, score }) => (
  <>
    <Card.Title className="quiz-score" data-testid="quiz-score">
      You scored {score} out of {questions.length}
    </Card.Title>
    <div className="quiz-answers d-grid gap-3">
      {questions.map((q, i) => (
        <div
          className="quiz-answer-container p-2 bg-light border"
          key={`answer${q.id}`}
        >
          <div className="quiz-answer" data-testid="quiz-answer">
            {q.correct === answered[i] ? `✅` : `❌`} {q.ask}
          </div>
        </div>
      ))}
    </div>
  </>
);

Results.propTypes = {
  answered: PropTypes.array,
  questions: PropTypes.array,
  score: PropTypes.number,
};

export default Results;
