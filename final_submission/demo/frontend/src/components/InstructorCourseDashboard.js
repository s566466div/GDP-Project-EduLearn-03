import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseContext } from '../contexts/CourseContext';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext exists
import { FaVideo, FaBook, FaClipboardList, FaUsers, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import './InstructorCourseDashboard.css';
import Layout from './Layout';

const InstructorCourseDashboard = () => {
  const { id } = useParams();
  const { getCourseById, fetchCourseById, loading, editCourse, deleteQuiz, deleteAssignment, deleteReadingMaterial, deleteVideoLecture, deleteCourseContent } = useContext(CourseContext);
  const { userId } = useContext(AuthContext); // Get the logged-in user ID from AuthContext
  const [course, setCourse] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [readingMaterials, setReadingMaterials] = useState([]);
  const [videoLectures, setVideoLectures] = useState([]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
    console.log(userId)
//   const history = useHistory();

  useEffect(async () => {
    const courseData = await fetchCourseById(id);
    setCourse(courseData);
    console.log(course)
    // Check if the logged-in user is the instructor for this course
    if (courseData && String(courseData.instructor?.id) === userId) {
      setIsInstructor(true);
    }

  }, [id, getCourseById, userId]);

  useEffect(() => {
    setVideoLectures(course?.videoLectures);
    setReadingMaterials(course?.readingMaterials);
    setQuizzes(course?.quizzes);
    setAssignments(course?.assignments);
  }, [course])

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification disappears after 3 seconds
  };

  const handleGoBack = () => {
    navigate(-1); // Go to the previous page
  };
  const handleEditCourse = (updatedCourse) => {
    // Handle course editing logic (title, description, etc.)
    editCourse(id, updatedCourse);
  };

  const handleDeleteContent = (contentId, contentType) => {
    deleteCourseContent(id, contentId, contentType);
  };

  const handleAddReadingMaterial = () => {
    navigate(`/course/${id}/add-reading-material`);
  };

  const handleAddVideoLecture = () => {
    navigate(`/course/${id}/add-video-lecture`);
  };

  const handleAddQuiz = () => {
    navigate(`/course/${id}/add-quiz`);
  };

  const handleAddAssignment = () => {
    navigate(`/course/${id}/add-assignment`);
  };

  const handleEditQuiz = (quizId) => {
    // Navigate to QuizFormPage for editing an existing quiz
    navigate(`/course/${id}/edit-quiz/${quizId}`);
  };

  const handleDeleteQuiz = async (courseId, quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const resp = await deleteQuiz(courseId, quizId);
        if (!resp) {
          throw new Error();
        }
        const course = await fetchCourseById(courseId);
        setCourse(course);
        showNotification(`Quiz deleted successfully!`, 'success');
      } catch (error) {
        showNotification(`Failed to delete Quiz. Please try again.`, 'error');
      }

    }
  };

  const handleDeleteAssignment = async (courseId, assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        const resp = await deleteAssignment(courseId, assignmentId);
        if (!resp) {
          throw new Error();
        }
        const course = await fetchCourseById(courseId);
        setCourse(course);
        showNotification(`Assignment deleted successfully!`, 'success');
      } catch (error) {
        showNotification(`Failed to delete assignment. Please try again.`, 'error');
      }
    }
  };

  const handleDeleteReadingMaterial = async (courseId, readingMaterialId) => {
    if (window.confirm("Are you sure you want to delete this reading material?")) {
      try {
        const resp = await deleteReadingMaterial(courseId, readingMaterialId);
        if (!resp) {
          throw new Error();
        }
        const course = await fetchCourseById(courseId);
        setCourse(course);
        showNotification(`Reading Material deleted successfully!`, 'success');
      } catch (error) {
        showNotification(`Failed to delete Reading Material. Please try again.`, 'error');
      }
      
    }
  };
  
  const handleDeleteVideoLecture = async (courseId, videoLectureId) => {
    if (window.confirm("Are you sure you want to delete this video lecture?")) {
      try {
        const resp = await deleteVideoLecture(courseId, videoLectureId);
        if (!resp) {
          throw new Error();
        }
        const course = await fetchCourseById(courseId);
        setCourse(course);
        showNotification(`Video Lecture deleted successfully!`, 'success');
      } catch (error) {
        showNotification(`Failed to delete Video Lecture. Please try again.`, 'error');
      }
      
    }
  };


  const handleNavigateToQuizCreate = () => {
    // history.push(`/course/${id}/create-quiz`);
  };

  const handleNavigateToAssignmentCreate = () => {
    // history.push(`/course/${id}/create-assignment`);
  };

  if (loading || !course) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading course data...</p>
      </div>
    );
  }


  return (
    <Layout>

    <div className="course-dashboard">
    {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      {/* <h1>Instructor Dashboard</h1> */}
      <button className="go-back-button" onClick={handleGoBack}>
          &larr; Go Back
      </button>
      {/* Course Details */}
      <section className="course-details">
        <h2>{course.title}</h2>
        <p><strong>Subject:</strong> {course.subject}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Instructor:</strong> {course.instructor?.name}</p>

        {/* Edit Course Button */}
        {/* {isInstructor && (
          <button onClick={() => handleEditCourse(course)}>
            <FaEdit /> Edit Course
          </button>
        )} */}
      </section>

      {/* Course Contents by Type */}
      <section className="course-contents">
        <h3>Course Contents</h3>

        {/* Video Lectures */}
        {isInstructor && (
          <div className="content-section">
            <h4><FaVideo /> Video Lectures</h4>
            {/* <button onClick={() => history.push(`/course/${id}/create-video`)}> */}
            <button onClick={handleAddVideoLecture}>
              Add Video Lecture
            </button>
          </div>
        )}
        <div className="content-section">
          {videoLectures?.length > 0 ? (
            <ul>
              {videoLectures.map((video) => (
                <li key={video.id}>
                  <p><strong>Title:</strong> {video.title}</p>
                  <a href={video.filePath} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteVideoLecture(id, video.id)}>
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
            <button onClick={handleAddReadingMaterial}>
              Add Reading Material
            </button>
          </div>
        )}
        <div className="content-section">
          {readingMaterials?.length > 0 ? (
            <ul>
              {readingMaterials?.map((material) => (
                <li key={material.id}>
                  <p><strong>Title:</strong> {material.title}</p>
                  <a href={material.filePath} target="_blank" rel="noopener noreferrer">
                    View Material
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteReadingMaterial(id, material?.id)}>
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
          {quizzes?.length > 0 ? (
            <ul>
              {quizzes?.map((quiz) => (
                <li key={quiz.id}>
                  <p><strong>Title:</strong> {quiz.title}</p>
                  <a href={`/quiz/attempt/${quiz.id}`} target="_blank" rel="noopener noreferrer">
                    Start Quiz
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteQuiz(id, quiz?.id)}>
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
          {assignments?.length > 0 ? (
            <ul>
              {assignments?.map((assignment) => (
                <li key={assignment.id}>
                  <p><strong>Title:</strong> {assignment.title}</p>
                  <a href={`/assignment/attempt/${assignment.id}`} target="_blank" rel="noopener noreferrer">
                    Start Assignment
                  </a>
                  {isInstructor && (
                    <div className="content-actions">
                      <button onClick={() => handleDeleteAssignment(id, assignment?.id)}>
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
    </Layout>
  );
};

export default InstructorCourseDashboard;
