// src/pages/CourseDetailPage.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../api/courses';
import Layout from '../components/Layout';
import { CourseContext } from '../contexts/CourseContext';
import './courseDetailPage.css'; // Add any specific styles here

const CourseDetailsPage = () => {
  const { courseId } = useParams(); // Retrieve courseId from the URL
  const navigate = useNavigate(); // Hook for navigating programmatically
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enrollInCourse } = useContext(CourseContext); // Access enrollInCourse function from context


  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const fetchedCourse = await fetchCourseById(courseId); // Fetch course details by ID
        setCourse(fetchedCourse);
      } catch (err) {
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const handleEnroll = () => {
    enrollInCourse(course);
    navigate('/enrolled-courses');
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    // <Layout>
    //     <div className="course-detail-page">
    //     <button onClick={() => navigate('/courses')} className="back-button">Back to All Courses</button>
    //     <h1>{course.title}</h1>
    //     <p><strong>Instructor:</strong> {course.instructor}</p>
    //     <p><strong>Category:</strong> {course.category}</p>
    //     <p><strong>Level:</strong> {course.level}</p>
    //     <p><strong>Duration:</strong> {course.duration}</p>
    //     <p><strong>Rating:</strong> {course.rating}</p>
    //     <p><strong>Description:</strong> {course.description}</p>
    //     <button onClick={handleEnroll} className="enroll-button">Enroll</button>
    //     </div>
    // </Layout>
    <Layout>
      <div className="course-detail-page">
        <button onClick={() => navigate('/courses')} className="back-button">
          ← Back to All Courses
        </button>

        <div className="course-detail-card">
          <h1 className="course-title">{course.title}</h1>
          <div className="course-info">
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Rating:</strong> {course.rating}</p>
          </div>
          <p className="course-description"><strong>Description:</strong> {course.description}</p>
          
          <button onClick={handleEnroll} className="enroll-button">
            Enroll Now
          </button>
        </div>
      </div>
    </Layout>

  );
};

export default CourseDetailsPage;
