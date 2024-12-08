// src/pages/AssignmentAttemptPage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './AssignmentAttemptPage.css';

const AssignmentAttemptPage = () => {
  const { id } = useParams();
  const assignment = useSelector((state) => state.assignments.find((assignment) => assignment.id === id));
  const [responses, setResponses] = useState({});

  const handleAnswerChange = (questionIndex, answer) => {
    setResponses({ ...responses, [questionIndex]: answer });
  };

  const submitAssignment = () => {
    console.log('Submitted answers:', responses);
    // Implement submission logic here
  };

  return (
    <div className="assignment-attempt-container">
      <h1>{assignment.name}</h1>
      <p>{assignment.description}</p>
      {assignment.questions.map((question, index) => (
        <div key={index} className="question-container">
          <p>{question.questionText}</p>
          <p className="question-description">{question.description}</p>
          {question.type === 'short_answer' && (
            <input
              type="text"
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Your Answer"
            />
          )}
          {question.type === 'long_answer' && (
            <textarea
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Your Answer"
            ></textarea>
          )}
          {question.type === 'mcq' && question.options.map((option, i) => (
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
      <button className="submit-assignment-btn" onClick={submitAssignment}>Submit Assignment</button>
    </div>
  );
};

export default AssignmentAttemptPage;
