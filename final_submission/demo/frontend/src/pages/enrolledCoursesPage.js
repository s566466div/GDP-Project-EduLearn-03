// src/pages/EnrolledCoursesPage.js

import React, { useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import Layout from '../components/Layout';
// import './EnrolledCoursesPage.css'; // Add any specific styles here

const EnrolledCoursesPage = () => {
  const { enrolledCourses } = useContext(CourseContext); // Access enrolled courses from context
    console.log(enrolledCourses);
  return (
    <Layout>
        <div className="enrolled-courses-page">
        <h1>Enrolled Courses</h1>
        {!enrolledCourses || enrolledCourses?.length === 0 ? (
            <p>You have not enrolled in any courses yet.</p>
        ) : (
            <div className="enrolled-courses-list">
            {enrolledCourses?.map((course) => (
                <div key={course.id} className="enrolled-course-item">
                <h2>{course.title}</h2>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Level:</strong> {course.level}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Rating:</strong> {course.rating}</p>
                <p><strong>Description:</strong> {course.description}</p>
                {/* You can add more course details as needed */}
                </div>
            ))}
            </div>
        )}
        </div>
    </Layout>
  );
};

export default EnrolledCoursesPage;
