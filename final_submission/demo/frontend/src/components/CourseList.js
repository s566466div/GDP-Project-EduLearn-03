import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';
import courses from '../data/courses';
import { filterCourses, searchCourses } from '../utils/courseUtil';
import Layout from './Layout';

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const filtered = filterCourses(courses, filter);
    const searched = searchCourses(filtered, searchTerm);
    setFilteredCourses(searched);
  }, [searchTerm, filter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Layout>

      <div>
        <h2>Course Catalog</h2>
        <button >
          <Link to="/create-course">Create Course</Link>
        </button>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search courses"
        />
        <select value={filter} onChange={handleFilter}>
          <option value="all">All</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="history">History</option>
        </select>
        <ul className="course-list" style={{display: flex}}>
          {filteredCourses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default CourseList;