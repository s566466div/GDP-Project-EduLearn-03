// src/components/StudentDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const StudentDashboard = () => {
  const enrolledCourses = useSelector((state) => state.courses?.enrolled);
  const assignments = useSelector((state) => state.assignments?.pending);
  const quizzes = useSelector((state) => state.quizzes?.upcoming);
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">
      <div className="dashboard-section">
        <h2>Enrolled Courses</h2>
        <div className="dashboard-cards">
          {enrolledCourses && enrolledCourses?.map((course) => (
            <div key={course.id} className="dashboard-card">
              <h3>{course.title}</h3>
              <button onClick={() => navigate(`/courses/${course.id}`)}>Go to Course</button>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Pending Assignments</h2>
        <div className="dashboard-cards">
          {assignments && assignments.map((assignment) => (
            <div key={assignment.id} className="dashboard-card">
              <h3>{assignment.title}</h3>
              <p>Due Date: {assignment.deadline}</p>
              <button onClick={() => navigate(`/assignments/${assignment.id}`)}>Attempt Assignment</button>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Upcoming Quizzes</h2>
        <div className="dashboard-cards">
          {quizzes && quizzes.map((quiz) => (
            <div key={quiz.id} className="dashboard-card">
              <h3>{quiz.title}</h3>
              <p>Scheduled: {quiz.date}</p>
              <button onClick={() => navigate(`/quizzes/${quiz.id}`)}>Take Quiz</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
