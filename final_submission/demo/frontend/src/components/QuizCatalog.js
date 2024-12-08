// src/components/QuizCatalog.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuiz } from '../actions/quizActions';
import { useNavigate } from 'react-router-dom';
import './QuizCatalog.css'; // Import the CSS file

const QuizCatalog = () => {
  const quizzes = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="quiz-catalog-container">
      <h1>Quiz Catalog</h1>
      <button className="add-question-btn" onClick={() => navigate('/quiz/create')}>Create New Quiz</button>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="quiz-card">
          <h3>{quiz.name}</h3>
          <p>{quiz.description}</p>
          <button className="attempt-btn" onClick={() => navigate(`/quiz/attempt/${quiz.id}`)}>Attempt</button>
          <button className="edit-btn" onClick={() => navigate(`/quiz/edit/${quiz.id}`)}>Edit</button>
          <button className="delete-btn" onClick={() => dispatch(deleteQuiz(quiz.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default QuizCatalog;
