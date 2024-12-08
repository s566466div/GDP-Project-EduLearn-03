import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../contexts/CourseContext';
import './NewQuizAttemptPage.css';
import { AuthContext } from '../contexts/AuthContext';

const NewQuizAttemptPage = () => {
    const { courseId, quizId } = useParams();
    const { userId } = useContext(AuthContext);
    const { fetchQuizById, submitQuiz } = useContext(CourseContext);
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    // const userId = 13; // Replace this with the actual logged-in user's ID

    useEffect(() => {
        let isMounted = true; // Track component mount state
        const loadQuiz = async () => {
            const data = await fetchQuizById(courseId, quizId);
            if (isMounted) {
                setQuiz(data);
                setLoading(false);
            }
        };
        loadQuiz();

        return () => {
            isMounted = false; // Prevent state updates on unmounted component
        };
    }, [courseId, quizId, fetchQuizById]);

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = async () => {
        const attemptTime = new Date().toISOString();
        const questionAttempts = quiz.questions.map((question) => ({
            question: {
                id: question.id,
            },
            selectedOptionIds: Array.isArray(answers[question.id]) ? answers[question.id] : [answers[question.id]],
            correct: question.options.some(
                (option) => option.id === answers[question.id] && option.correct
            ),
        }));

        const requestBody = {
            quizAttempt: {
                quiz: {
                    id: parseInt(quizId, 10),
                },
                course: {
                    id: parseInt(courseId, 10),
                },
                user: {
                    id: parseInt(userId, 10),
                },
                score: questionAttempts.filter((attempt) => attempt.correct).length,
                attemptTime,
            },
            questionAttempts,
        };

        console.log('Request Body:', JSON.stringify(requestBody, null, 2)); // For debugging
        try {
            const success = await submitQuiz(requestBody);
            console.log(success)
            if (success) {
                setSubmissionStatus('Quiz submitted successfully!');
            } else {
                setSubmissionStatus('Failed to submit quiz. Please try again.');
            }
        } catch (error) {
            setSubmissionStatus('An error occurred while submitting the quiz.');
        }
    };

    if (loading) return <p>Loading quiz...</p>;

    return (
        <div className="quiz-attempt-page">
            {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
            {quiz?.questions?.length > 0 ? (
                quiz.questions.map((question, index) => (
                    <div key={question.id}>
                        <h2>Question {index + 1}</h2>
                        <p>{question.text}</p>
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                className="option-button"
                                onClick={() => handleAnswer(question.id, option.id)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                ))
            ) : (
                <p>No questions available.</p>
            )}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
};

export default NewQuizAttemptPage;
