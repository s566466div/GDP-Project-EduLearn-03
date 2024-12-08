import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useCourseContext } from '../context/CourseContext';
import './AssignmentAttemptPage.css';
import { CourseContext } from '../contexts/CourseContext';

const NewAssignmentAttemptPage = () => {
    const { courseId, assignmentId } = useParams();
    const { fetchAssignmentById, submitAssignment } = useContext(CourseContext);
    const [assignment, setAssignment] = useState(null);
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAssignment = async () => {
            const data = await fetchAssignmentById(courseId, assignmentId);
            setAssignment(data);
            setLoading(false);
        };

        loadAssignment();
    }, [assignmentId, fetchAssignmentById]);

    const handleResponseChange = (questionId, value) => {
        setResponses({ ...responses, [questionId]: value });
    };

    const handleSubmit = async () => {
        const formattedResponses = assignment?.questions.map((question) => ({
            questionId: question.id,
            response: responses[question.id] || null, // Default to null if no response
        }));
        const success = await submitAssignment(assignmentId, formattedResponses);
        if (success) alert('Assignment submitted successfully!');
    };

    if (loading) return <p>Loading assignment...</p>;

    return (
        <div className="assignment-attempt-page">
            <h2>{assignment?.title}</h2>
            <p>{assignment?.description}</p>
            <div className="questions-section">
                {assignment?.questions.map((question) => (
                    <div key={question.id} className="question-container">
                        <h3>{question.questionText}</h3>
                        {question.questionType === 'MULTIPLE_CHOICE' && (
                            <div>
                                {question.options.map((option) => (
                                    <label key={option.id} className="option-label">
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option.id}
                                            onChange={() => handleResponseChange(question.id, option.id)}
                                        />
                                        {option.optionText}
                                    </label>
                                ))}
                            </div>
                        )}
                        {question.questionType === 'SINGLE_ANSWER' && (
                            <select
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select an answer
                                </option>
                                {question.options.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.optionText}
                                    </option>
                                ))}
                            </select>
                        )}
                        {question.questionType === 'SHORT_ANSWER' && (
                            <textarea
                                placeholder="Type your answer here..."
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            />
                        )}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit Assignment</button>
        </div>
    );
};

export default NewAssignmentAttemptPage;
