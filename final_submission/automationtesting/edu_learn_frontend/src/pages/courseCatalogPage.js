// src/pages/CourseCatalogPage.js

import React, { useState, useEffect, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import CourseCatalog from '../components/CourseCatalog';
import { fetchCourses } from '../api/courses';
import Layout from '../components/Layout';
// import './CourseCatalogPage.css';  // Import any styles specific to this page

const CourseCatalogPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filterCriteria } = useContext(CourseContext);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await fetchCourses(filterCriteria);
        setCourses(fetchedCourses);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [filterCriteria]);

  const handleFilterChange = (newCriteria) => {
    // Update filter criteria in the CourseContext
  };

  return (
    <Layout>
        <div className="course-catalog-page">
        <h1>Course Catalog</h1>
        {loading && <p>Loading courses...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
            <CourseCatalog 
            courses={courses} 
            onFilterChange={handleFilterChange} 
            />
        )}
        </div>
    </Layout>
  );
};

export default CourseCatalogPage;
