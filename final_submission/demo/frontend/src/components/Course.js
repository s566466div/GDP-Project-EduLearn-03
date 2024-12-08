import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Course.css';

const Course = ({ course }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // setShowDetails(true);
    navigate(`/courses/${course?.id}`)
    // <Navigate to=`courses/${course.id}` />
  };

  return (
    <li className="course-item">
      <h2>{course?.title}</h2>
      <h4>{course?.instructor?.name}</h4>
      <p><strong>Subject:</strong> {course?.subject}</p>
      <p><strong>Description:</strong> {course?.description}</p>
      <button onClick={handleViewDetails}>View Details</button>
    </li>
  );
};

export default Course;