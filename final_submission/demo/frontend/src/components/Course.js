import React, {useState} from 'react';

const Course = ({ course }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  
  const handleEnrollCourse = () => {
    setShowDetails(false);
  };

  return (
    <li>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button onClick={handleViewDetails}>View Details</button>
      {showDetails && (
        <div className="course-details">
          <h4>Reading Materials:</h4>
          <ul>
            {course.readingMaterials.map((material, index) => (
              <li key={index}>{material.title}</li>
            ))}
          </ul>
          <h4>Video Contents:</h4>
          <ul>
            {course.videoContents.map((video, index) => (
              <li key={index}>{video.title}</li>
            ))}
          </ul>
          <h4>Quizzes:</h4>
          <ul>
            {course.quizzes.map((quiz, index) => (
              <li key={index}>{quiz.title}</li>
            ))}
          </ul>
          <h4>Assignments:</h4>
          <ul>
            {course.assignments.map((assignment, index) => (
              <li key={index}>{assignment.title}</li>
            ))}
          </ul>
          <button onClick={handleCloseDetails}>Close Details</button>
          <button onClick={handleEnrollCourse}>Enroll</button>
        </div>
      )}
    </li>
  );
};

export default Course;