import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../contexts/CourseContext';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext exists
import { FaVideo, FaBook, FaClipboardList, FaUsers } from 'react-icons/fa'; // Importing icons
import EnrollStepperModal from '../components/EnrollStepperModal';
import './StudentCourseDashboard.css';

const StudentCourseDashboard = () => {
  const { id } = useParams();
  const { getCourseById, loading, enrollCourse } = useContext(CourseContext);
  const { userId } = useContext(AuthContext); // Get the logged-in user ID from AuthContext
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const courseData = getCourseById(id);
    setCourse(courseData);
    console.log(course)

    // Check if the logged-in user is enrolled in this course
    if (courseData) {
      const enrolled = courseData.students.some(student => String(student.id) === userId);
      setIsEnrolled(enrolled);
    }
  }, [id, getCourseById, userId]);

  const handleEnroll = async () => {
    const success = await enrollCourse(id, userId);
    if (success) {
      setIsEnrolled(true);
    }
  };

  if (loading) return <p>Loading course data...</p>;
  if (!course) return <p>Course not found.</p>;

  // Separate contents by type
  const videos = course?.videoLectures;
  console.log(videos)
  const readingMaterials = course?.readingMaterials;
  const quizzes = course?.quizzes;
  const assignments = course?.assignments;

  return (
    <div className="course-dashboard">
      <h1>Course Dashboard</h1>
      
      {/* Course Details */}
      <section className="course-details">
        <h2>{course.title}</h2>
        <p><strong>Subject:</strong> {course.subject}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Instructor:</strong> {course.instructor?.name}</p>
      </section>

      {/* Enroll Button */}
      {!isEnrolled && (
        <button onClick={() => setShowModal(true)}>Enroll in Course</button>
      )}

      {/* Enroll Stepper Modal */}
      {showModal && (
        <EnrollStepperModal
          course={course}
          onClose={() => setShowModal(false)}
          onEnroll={handleEnroll}
        />
      )}

      {/* Enrolled Students */}
      <section className="course-students">
        <h3><FaUsers /> Enrolled Students</h3>
        {course.students && course.students.length > 0 ? (
          <ul>
            {course.students.map((student) => (
              <li key={student.id}>
                {student.id === userId ? (
                  <strong>You (Enrolled)</strong> // Highlight if the logged-in user is enrolled
                ) : (
                  <>
                    <strong>Name:</strong> {student.name} <br />
                    <strong>Email:</strong> {student.email}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students enrolled in this course.</p>
        )}
      </section>

      {/* Course Contents by Type */}
      <section className="course-contents">
        <h3>Course Contents</h3>

        {/* Video Lectures */}
        <div className="content-section">
          <h4><FaVideo /> Video Lectures</h4>
          {videos.length > 0 ? (
            <ul>
              {videos.map((video) => (
                <li key={video.id}>
                  <p><strong>Title:</strong> {video.title}</p>
                  <a href={video.filePath} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No video lectures available.</p>
          )}
        </div>

        {/* Reading Materials */}
        <div className="content-section">
          <h4><FaBook /> Reading Materials</h4>
          {readingMaterials.length > 0 ? (
            <ul>
              {readingMaterials.map((material) => (
                <li key={material.id}>
                  <p><strong>Title:</strong> {material.title}</p>
                  <a href={material.filePath} target="_blank" rel="noopener noreferrer">
                    View Material
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reading materials available.</p>
          )}
        </div>

        {/* Quizzes */}
        <div className="content-section">
          <h4><FaClipboardList /> Quizzes</h4>
          {quizzes.length > 0 ? (
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz.id}>
                  <p><strong>Title:</strong> {quiz.title}</p>
                  <a href={`/quiz/attempt/${quiz.id}`} target="_blank" rel="noopener noreferrer">
                    Start Quiz
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No quizzes available.</p>
          )}
        </div>

        {/* Assignments */}
        <div className="content-section">
          <h4><FaClipboardList /> Assignments</h4>
          {assignments.length > 0 ? (
            <ul>
              {assignments.map((assignment) => (
                <li key={assignment.id}>
                  <p><strong>Title:</strong> {assignment.title}</p>
                  <a href={`/assignment/attempt/${assignment.id}`} target="_blank" rel="noopener noreferrer">
                    Start Assignment
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No assignments available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentCourseDashboard;
