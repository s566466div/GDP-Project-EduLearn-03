// src/components/QuizForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuiz, updateQuiz } from '../actions/quizActions';
import { useNavigate } from 'react-router-dom';
import './QuizForm.css'; // Import the CSS file

const QuizForm = ({ quiz }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(quiz || {
    name: '',
    description: '',
    deadline: '',
    course: '',
    questions: [{ questionText: '', options: ['', ''], answer: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const questions = [...formData.questions];
    questions[index][field] = value;
    setFormData({ ...formData, questions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { questionText: '', options: ['', ''], answer: '' }]
    });
  };

  const submitForm = () => {
    if (quiz) {
      dispatch(updateQuiz(formData));
    } else {
      dispatch(createQuiz(formData));
    }
    navigate('/quizzes');
  };

  return (
    <form className="quiz-form-container" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Quiz Name" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
      <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
      <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="Course" />

      {formData.questions.map((q, index) => (
        <div key={index} className="question-section">
          <input
            type="text"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
            placeholder="Question Text"
          />
          {q.options.map((option, i) => (
            <input
              key={i}
              type="text"
              value={option}
              onChange={(e) => {
                const options = [...q.options];
                options[i] = e.target.value;
                handleQuestionChange(index, 'options', options);
              }}
              placeholder={`Option ${i + 1}`}
            />
          ))}
          <input
            type="text"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            placeholder="Answer"
          />
        </div>
      ))}

      <button type="button" className="add-question-btn" onClick={addQuestion}>Add Question</button>
      <button type="submit" className="submit-btn">{quiz ? 'Update' : 'Create'} Quiz</button>
    </form>
  );
};

export default QuizForm;
