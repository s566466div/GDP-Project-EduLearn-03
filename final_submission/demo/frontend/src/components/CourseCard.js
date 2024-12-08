// // src/components/Courses/CourseCard.js

// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// // import './CourseCard.css'; // Import any styles specific to this component

// const CourseCard = ({ course }) => {
//   return (
//     <div className="course-card">
//       <h2>{course.title}</h2>
//       <p>{course.instructor}</p>
//       <p>{course.description}</p>
//       <Link to={`/courses/${course.id}`} className="view-details-link">View Details</Link>
//       {/* Add more course details as needed */}
//     </div>
//   );
// };

// CourseCard.propTypes = {
//   course: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     // Add more course properties as needed
//   }).isRequired,
// };

// export default CourseCard;


import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CourseCard.css'; // Import the styles

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      {/* Course Image */}
      {course.image && (
        <img src={course.image} alt={course.title} className="course-card-image" />
      )}
      
      {/* Course Details */}
      <div className="course-card-content">
        <h2 className="course-card-title">{course.title}</h2>
        <p className="course-card-instructor">By {course.instructor}</p>
        <p className="course-card-description">
          {course.description.length > 100 ? course.description.substring(0, 100) + '...' : course.description}
        </p>
        <Link to={`/courses/${course.id}`} className="course-card-button">View Details</Link>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string, // Optional course image
  }).isRequired,
};

export default CourseCard;
