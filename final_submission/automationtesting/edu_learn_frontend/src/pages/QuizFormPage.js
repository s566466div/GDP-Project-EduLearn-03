import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaArrowLeft, FaSave } from 'react-icons/fa';
import './QuizFormPage.css';
import { CourseContext } from '../contexts/CourseContext';
import Layout from '../components/Layout';

const QuizFormPage = ({ isEditing, courseId, fetchQuizById, saveQuiz }) => {
  const { id, quizId } = useParams();
  const { createQuiz } = useContext(CourseContext);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    deadline: '',
    questions: [],
  });
  const [notification, setNotification] = useState(null); 

  useEffect(() => {
    if (isEditing && quizId) {
      const loadQuiz = async () => {
        const data = await fetchQuizById(quizId);
        setQuiz(data);
      };
      loadQuiz();
    }
  }, [isEditing, quizId, fetchQuizById]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification disappears after 3 seconds
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { text: '', options: [{ text: '', isCorrect: false }] }],
    });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].text = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.push({ text: '', isCorrect: false });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options[optionIndex][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createQuiz(id, quiz);
      showNotification('Quiz created successfully!', 'success');
      setTimeout(() => {
        navigate(`/courses/${id}`);
      }, 2000); // Redirect to course page after 2 seconds
    } catch (error) {
      showNotification('Failed to create quiz. Please try again.', 'error');
    }
  };

  const handleGoBack = () => {
    if (window.confirm("Going back will discard any unsaved changes. Are you sure?")) {
      navigate(`/courses/${id}`);
    }
  };

  return (
    <Layout>

    <div className="quiz-form-container">
    {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      <button className="back-button" onClick={handleGoBack}><FaArrowLeft /> Go Back</button>
      <h1>{isEditing ? 'Edit Quiz' : 'Create New Quiz'}</h1>

      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleInputChange}
            required
            />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleInputChange}
            required
            />
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={quiz.deadline}
            onChange={handleInputChange}
            required
          />
        </div>

        <h2>Questions</h2>
        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question-block">
            <div className="question-header">
              <label>Question {questionIndex + 1}</label>
              <button type="button" className="remove-question" onClick={() => handleRemoveQuestion(questionIndex)}>
                <FaTrash />
              </button>
            </div>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              placeholder="Question text"
              required
              />

            <div className="options-section">
              <h4>Options</h4>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option-block">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'text', e.target.value)}
                    placeholder="Option text"
                    required
                    />
                  <label>
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'isCorrect', e.target.checked)}
                    />
                    Correct Answer
                  </label>
                  <button type="button" className="remove-option" onClick={() => handleRemoveOption(questionIndex, optionIndex)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button type="button" className="add-option" onClick={() => handleAddOption(questionIndex)}>
                <FaPlus /> Add Option
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="add-question" onClick={handleAddQuestion}>
          <FaPlus /> Add Question
        </button>

        <div className="form-actions">
          <button type="submit" className="save-button"><FaSave /> {isEditing ? 'Save Changes' : 'Create Quiz'}</button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default QuizFormPage;
