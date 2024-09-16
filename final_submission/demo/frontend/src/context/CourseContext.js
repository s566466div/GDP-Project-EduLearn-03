// src/contexts/CourseContext.js

import React, { createContext, useState } from 'react';

// Create a new context for managing course-related state
export const CourseContext = createContext();

// Create a provider component
export const CourseProvider = ({ children }) => {
  // State to manage filter criteria
  const [filterCriteria, setFilterCriteria] = useState({
    searchTerm: '',
    sortOption: 'title',
    selectedCategory: '',
    selectedLevel: '',
    // Add more filter criteria as needed
  });

  const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Function to update filter criteria
    const updateFilterCriteria = (newCriteria) => {
        setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        ...newCriteria,
        }));
    };

    // Function to enroll in a course
    const enrollInCourse = (course) => {
        // Prevent enrolling in the same course multiple times
        if (!enrolledCourses.some((enrolledCourse) => enrolledCourse.id === course.id)) {
        setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);
        }
    };

     // Function to check if a course is already enrolled
    const isEnrolled = (courseId) => {
        return enrolledCourses.some((course) => course.id === courseId);
    }

  return (
    <CourseContext.Provider 
        value={{ 
            filterCriteria, 
            updateFilterCriteria,
            enrolledCourses,
            enrollInCourse,
            isEnrolled 
        }}>
      {children}
    </CourseContext.Provider>
  );
};
