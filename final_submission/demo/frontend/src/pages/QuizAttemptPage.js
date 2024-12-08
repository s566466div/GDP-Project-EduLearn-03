// src/pages/QuizAttemptPage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './QuizAttemptPage.css'; // Import the CSS file

const QuizAttemptPage = () => {
  const { id } = useParams();
  const quiz = useSelector((state) => state.quizzes.find((quiz) => quiz.id === id));
  const [responses, setResponses] = useState({});

  const handleAnswerChange = (questionIndex, answer) => {
    setResponses({ ...responses, [questionIndex]: answer });
  };

  const submitQuiz = () => {
    console.log('Submitted answers:', responses);
    // Implement submission logic here
  };

  return (
    <div className="quiz-attempt-container">
      <h1>{quiz.name}</h1>
      <p>{quiz.description}</p>
      {quiz.questions.map((question, index) => (
        <div key={index} className="question-container">
          <p>{question.questionText}</p>
          {question.options.map((option, i) => (
            <div key={i} className="option-container">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button className="submit-quiz-btn" onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default QuizAttemptPage;
