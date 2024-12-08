import React, { useEffect, useState } from 'react';
import './InstructorSubmissionsPage.css';

const InstructorSubmissionsPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all'); // 'all', 'quiz', 'assignment'

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch('/api/submissions'); // Replace with actual endpoint
                const data = await response.json();
                setSubmissions(data);
            } catch (err) {
                console.error('Failed to fetch submissions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const filteredSubmissions = submissions.filter((submission) => {
        if (filterType === 'all') return true;
        return submission.type === filterType;
    });

    if (loading) return <p>Loading submissions...</p>;

    return (
        <div className="instructor-submissions-page">
            <h2>Student Submissions</h2>
            <div className="filters">
                <label>
                    Filter by:
                    <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                        <option value="all">All</option>
                        <option value="quiz">Quizzes</option>
                        <option value="assignment">Assignments</option>
                    </select>
                </label>
            </div>
            {filteredSubmissions.length > 0 ? (
                <div className="submissions-list">
                    {filteredSubmissions.map((submission) => (
                        <div key={submission.id} className="submission-item">
                            <h3>
                                {submission.type === 'quiz' ? 'Quiz' : 'Assignment'}: {submission.title}
                            </h3>
                            <p><strong>Submitted by:</strong> {submission.studentName}</p>
                            <p><strong>Submission Date:</strong> {new Date(submission.date).toLocaleString()}</p>
                            <div className="responses">
                                <h4>Responses:</h4>
                                {submission.responses.map((response) => (
                                    <div key={response.questionId} className="response-item">
                                        <p><strong>Question:</strong> {response.questionText}</p>
                                        <p><strong>Answer:</strong> {response.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No submissions available.</p>
            )}
        </div>
    );
};

export default InstructorSubmissionsPage;
