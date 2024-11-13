import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseContext } from '../contexts/CourseContext';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext exists
import { FaVideo, FaBook, FaClipboardList, FaUsers, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import './InstructorCourseDashboard.css';

const InstructorCourseDashboard = () => {
  const { id } = useParams();
  const { getCourseById, loading, editCourse, deleteCourseContent } = useContext(CourseContext);
  const { userId } = useContext(AuthContext); // Get the logged-in user ID from AuthContext
  const [course, setCourse] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const navigate = useNavigate();
    console.log(userId)
//   const history = useHistory();

  useEffect(() => {
    const courseData = getCourseById(id);
    setCourse(courseData);
    console.log(course)
    // Check if the logged-in user is the instructor for this course
    if (courseData && String(courseData.instructor?.id) === userId) {
      setIsInstructor(true);
    }
  }, [id, getCourseById, userId]);

  const handleEditCourse = (updatedCourse) => {
    // Handle course editing logic (title, description, etc.)
    editCourse(id, updatedCourse);
  };

  const handleDeleteContent = (contentId, contentType) => {
    deleteCourseContent(id, contentId, contentType);
  };

  const handleAddQuiz = () => {
    // Navigate to QuizFormPage for creating a new quiz
    navigate(`/course/${id}/add-quiz`);
  };

  const handleAddAssignment = () => {
    // Navigate to QuizFormPage for creating a new quiz
    navigate(`/course/${id}/add-assignment`);
  };

  const handleEditQuiz = (quizId) => {
    // Navigate to QuizFormPage for editing an existing quiz
    navigate(`/course/${id}/edit-quiz/${quizId}`);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz(quizId);
      // Refresh course data to reflect the deleted quiz
      const updatedCourse = getCourseById(id);
      setCourse(updatedCourse);
    }
  };


  const handleNavigateToQuizCreate = () => {
    // history.push(`/course/${id}/create-quiz`);
  };

  const handleNavigateToAssignmentCreate = () => {
    // history.push(`/course/${id}/create-assignment`);
  };

  if (loading) return <p>Loading course data...</p>;
  if (!course) return <p>Course not found.</p>;

  // Separate contents by type
  const videos = course?.videoLectures;
  const readingMaterials = course?.readingMaterials;
  const quizzes = course?.quizzes;
  const assignments = course?.assignments;

  return (
    <div className="course-dashboard">
      <h1>Instructor Dashboard</h1>
      
      {/* Course Details */}
      <section className="course-details">
        <h2>{course.title}</h2>
        <p><strong>Subject:</strong> {course.subject}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Instructor:</strong> {course.instructor?.name}</p>

        {/* Edit Course Button */}
        {isInstructor && (
          <button onClick={() => handleEditCourse(course)}>
            <FaEdit /> Edit Course
          </button>
        )}
      </section>

      {/* Course Contents by Type */}
      <section className="course-contents">
        <h3>Course Contents</h3>

        {/* Video Lectures */}
        {isInstructor && (
          <div className="content-section">
            <h4><FaVideo /> Video Lectures</h4>
            {/* <button onClick={() => history.push(`/course/${id}/create-video`)}> */}
            <button onClick={() => {}}>
              Add Video Lecture
            </button>
          </div>
        )}
        <div className="content-section">
          {videos.length > 0 ? (
            <ul>
              {videos.map((video) => (
                <li key={video.id}>
                  <p><strong>Title:</strong> {video.title}</p>
                  <a href={video.filePath} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteContent(video.id, 'VIDEO_LECTURE')}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No video lectures available.</p>
          )}
        </div>

        {/* Reading Materials */}
        {isInstructor && (
          <div className="content-section">
            <h4><FaBook /> Reading Materials</h4>
            {/* <button onClick={() => history.push(`/course/${id}/create-reading-material`)}> */}
            <button onClick={() => {}}>
              Add Reading Material
            </button>
          </div>
        )}
        <div className="content-section">
          {readingMaterials.length > 0 ? (
            <ul>
              {readingMaterials.map((material) => (
                <li key={material.id}>
                  <p><strong>Title:</strong> {material.title}</p>
                  <a href={material.filePath} target="_blank" rel="noopener noreferrer">
                    View Material
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteContent(material.id, 'READING_MATERIAL')}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reading materials available.</p>
          )}
        </div>

        {/* Quizzes */}
        {isInstructor && (
          <div className="content-section">
            <h4><FaClipboardList /> Quizzes</h4>
            <button onClick={handleAddQuiz}>Create Quiz</button>
          </div>
        )}
        <div className="content-section">
          {quizzes.length > 0 ? (
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz.id}>
                  <p><strong>Title:</strong> {quiz.title}</p>
                  <a href={`/quiz/attempt/${quiz.id}`} target="_blank" rel="noopener noreferrer">
                    Start Quiz
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteContent(quiz.id, 'QUIZZES')}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No quizzes available.</p>
          )}
        </div>

        {/* Assignments */}
        {isInstructor && (
          <div className="content-section">
            <h4><FaClipboardList /> Assignments</h4>
            <button onClick={handleAddAssignment}>Create Assignment</button>
          </div>
        )}
        <div className="content-section">
          {assignments.length > 0 ? (
            <ul>
              {assignments.map((assignment) => (
                <li key={assignment.id}>
                  <p><strong>Title:</strong> {assignment.title}</p>
                  <a href={`/assignment/attempt/${assignment.id}`} target="_blank" rel="noopener noreferrer">
                    Start Assignment
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteContent(assignment.id, 'ASSIGNMENTS')}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
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

export default InstructorCourseDashboard;
