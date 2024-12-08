// src/components/InstructorDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Layout from './Layout';

const InstructorDashboard = () => {
  const courses = useSelector((state) => state.courses);
  const students = useSelector((state) => state.students); // Assuming students data is in store
  const navigate = useNavigate();

  return (
    <Layout>
        <div className="instructor-dashboard">
        <div className="dashboard-section">
            <h2>Course Management</h2>
            <button className="dashboard-action-btn" onClick={() => navigate('/create-course')}>Create New Course</button>
            <div className="dashboard-cards">
            {courses && courses.map((course) => (
                <div key={course.id} className="dashboard-card">
                <h3>{course.title}</h3>
                <button onClick={() => navigate(`/courses/edit/${course.id}`)}>Edit Course</button>
                <button onClick={() => navigate(`/courses/${course.id}`)}>View Course</button>
                </div>
            ))}
            </div>
        </div>

        <div className="dashboard-section">
            <h2>Student Progress</h2>
            <div className="dashboard-cards">
            {students && students.map((student) => (
                <div key={student.id} className="dashboard-card">
                <h3>{student.name}</h3>
                <p>Progress: {student.progress}%</p>
                </div>
            ))}
            </div>
        </div>

        <div className="dashboard-section">
            <h2>Assignments & Quizzes</h2>
            <button className="dashboard-action-btn" onClick={() => navigate('/quiz/create')}>Create New Quiz</button>
            <button className="dashboard-action-btn" onClick={() => navigate('/assignment/create')}>Create New Assignment</button>
        </div>
        </div>
    </Layout>
  );
};

export default InstructorDashboard;
