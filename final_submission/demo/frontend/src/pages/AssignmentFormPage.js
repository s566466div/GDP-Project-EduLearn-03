import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseContext } from '../contexts/CourseContext';
import Layout from '../components/Layout';


const AssignmentFormPage = ({ onSave }) => {
  const { id, assignmentId } = useParams();
  const { createAssignment } = useContext(CourseContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleGoBack = () => {
    navigate(-1); // Go to the previous page
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', questionType: 'SHORT_ANSWER', options: [] }]);
  };

  const handleSave = () => {
    const assignmentData = { title, description, deadline, questions };
    createAssignment(id, assignmentData);
    navigate(`/courses/${id}`)
  };

  const handleQuestionChange = (updatedQuestion, index) => {
    const updatedQuestions = questions.map((q, i) => (i === index ? updatedQuestion : q));
    setQuestions(updatedQuestions);
  };

  return (
    <Layout>
      <button className="go-back-button" onClick={handleGoBack}>
          &larr; Go Back
      </button>
    <div className="assignment-form">
      <h2>Create or Edit Assignment</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <h3>Questions</h3>
      {questions.map((question, index) => (
        <QuestionForm
          key={index}
          question={question}
          onChange={(updatedQuestion) => handleQuestionChange(updatedQuestion, index)}
          />
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSave}>Save Assignment</button>
    </div>
</Layout>
  );
};



const QuestionForm = ({ question, onChange }) => {
    const [questionText, setQuestionText] = useState(question.questionText);
    const [questionType, setQuestionType] = useState(question.questionType);
    const [options, setOptions] = useState(question.options);
    
    useEffect(() => {
      onChange({ ...question, questionText, questionType, options });
    }, [questionText, questionType, options]);
  
    const handleAddOption = () => {
      setOptions([...options, { optionText: '', isCorrect: false }]);
    };
  
    const handleOptionChange = (updatedOption, index) => {
      const updatedOptions = options.map((o, i) => (i === index ? updatedOption : o));
      setOptions(updatedOptions);
    };
  
    return (
      <div className="question-form">
        <input
          type="text"
          placeholder="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="SHORT_ANSWER">Short Answer</option>
          <option value="LONG_ANSWER">Long Answer</option>
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="SINGLE_ANSWER">Single Answer</option>
        </select>
  
        {['MULTIPLE_CHOICE', 'SINGLE_ANSWER'].includes(questionType) && (
          <div className="options-section">
            <h4>Options</h4>
            {options.map((option, index) => (
              <OptionForm
                key={index}
                option={option}
                onChange={(updatedOption) => handleOptionChange(updatedOption, index)}
              />
            ))}
            <button onClick={handleAddOption}>Add Option</button>
          </div>
        )}
      </div>
    );
  };
  
  const OptionForm = ({ option, onChange }) => {
    const [optionText, setOptionText] = useState(option.optionText);
    const [isCorrect, setIsCorrect] = useState(option.isCorrect);
  
    useEffect(() => {
      onChange({ ...option, optionText, isCorrect });
    }, [optionText, isCorrect]);
  
    return (
      <div className="option-form">
        <input
          type="text"
          placeholder="Option Text"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
          />
          Correct Answer
        </label>
      </div>
    );
  };

export default AssignmentFormPage;
