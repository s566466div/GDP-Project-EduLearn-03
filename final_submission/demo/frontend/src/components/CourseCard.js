// src/components/Courses/CourseCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import './CourseCard.css'; // Import any styles specific to this component

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h2>{course.title}</h2>
      <p>{course.instructor}</p>
      <p>{course.description}</p>
      <Link to={`/courses/${course.id}`} className="view-details-link">View Details</Link>
      {/* Add more course details as needed */}
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    // Add more course properties as needed
  }).isRequired,
};

export default CourseCard;
