// src/components/AssignmentForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAssignment, updateAssignment } from '../actions/assignmentActions';
import { useNavigate } from 'react-router-dom';
import './AssignmentForm.css';

const AssignmentForm = ({ assignment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(assignment || {
    name: '',
    description: '',
    deadline: '',
    questions: [{ questionText: '', type: 'short_answer', options: [], description: '' }]
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
      questions: [...formData.questions, { questionText: '', type: 'short_answer', options: [], description: '' }]
    });
  };

  const submitForm = () => {
    if (assignment) {
      dispatch(updateAssignment(formData));
    } else {
      dispatch(createAssignment(formData));
    }
    navigate('/assignments');
  };

  return (
    <form className="assignment-form-container" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Assignment Name" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
      <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />

      {formData.questions.map((q, index) => (
        <div key={index} className="question-section">
          <input
            type="text"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
            placeholder="Question Text"
          />
          <textarea
            value={q.description}
            onChange={(e) => handleQuestionChange(index, 'description', e.target.value)}
            placeholder="Question Description"
          />
          <select value={q.type} onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}>
            <option value="short_answer">Short Answer</option>
            <option value="long_answer">Long Answer</option>
            <option value="single_answer">Single Answer</option>
            <option value="mcq">Multiple Choice</option>
          </select>
          {q.type === 'mcq' && (
            q.options.map((option, i) => (
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
            ))
          )}
        </div>
      ))}

      <button type="button" className="add-question-btn" onClick={addQuestion}>Add Question</button>
      <button type="submit" className="submit-btn">{assignment ? 'Update' : 'Create'} Assignment</button>
    </form>
  );
};

export default AssignmentForm;
