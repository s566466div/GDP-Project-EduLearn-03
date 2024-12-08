import React from 'react';

const CourseDetails = ({ course }) => {
  return (
    <div className="course-details">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Subject: {course.subject}</p>
    </div>
  );
};

export default CourseDetails;