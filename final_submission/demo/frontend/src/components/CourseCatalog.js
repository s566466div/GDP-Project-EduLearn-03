import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import CourseCard from './CourseCard';
import CourseCard from './CourseCard';
import './CourseCatalog.css';

const CourseCatalog = ({ courses, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onFilterChange({ searchTerm: event.target.value, sortOption, selectedCategory, selectedLevel, selectedInstructor });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    onFilterChange({ searchTerm, sortOption: event.target.value, selectedCategory, selectedLevel, selectedInstructor });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange({ searchTerm, sortOption, selectedCategory: event.target.value, selectedLevel, selectedInstructor });
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    onFilterChange({ searchTerm, sortOption, selectedCategory, selectedLevel: event.target.value, selectedInstructor });
  };

  const handleInstructorChange = (event) => {
    setSelectedInstructor(event.target.value);
    onFilterChange({ searchTerm, sortOption, selectedCategory, selectedLevel, selectedInstructor: event.target.value });
  };

  const filteredCourses = courses
    .filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? course.category === selectedCategory : true) &&
      (selectedLevel ? course.level === selectedLevel : true) && 
      (selectedInstructor ? course.instructor === selectedInstructor : true)
    )
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="course-catalog">
      <div className="course-catalog-controls">
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={handleSearchChange}
          className="course-search-input"
        />
        <div className="filter-group">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="course-filter-select"
          >
            <option value="title">Sort by Title</option>
          </select>
          
          <select onChange={handleCategoryChange} value={selectedCategory} className="course-filter-select">
            <option value="">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Data Science">Data Science</option>
            {/* Add more categories as needed */}
          </select>

          <select onChange={handleLevelChange} value={selectedLevel} className="course-filter-select">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select onChange={handleInstructorChange} value={selectedInstructor} className="course-filter-select">
            <option value="">All Instructors</option>
            <option value="John Smith">John Smith</option>
            <option value="Jane Doe">Jane Doe</option>
            <option value="Alice Johnson">Alice Johnson</option>
            <option value="Robert Brown">Robert Brown</option>
          </select>
        </div>
    </div>
      {/* <div className="course-catalog-controls">
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={handleSearchChange}
          className="course-search"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="course-sort"
        >
          <option value="title">Sort by Title</option>
        </select>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select onChange={handleLevelChange} value={selectedLevel}>
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select onChange={handleInstructorChange} value={selectedInstructor}>
          <option value="">All Instructors</option>
          <option value="John Smith">John Smith</option>
          <option value="Jane Doe">Jane Doe</option>
          <option value="Alice Johnson">Alice Johnson</option>
          <option value="Robert Brown">Robert Brown</option>
        </select>
      </div> */}
      <div className="course-list" style={{ display: 'flex'}}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

CourseCatalog.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      category: PropTypes.string,
      level: PropTypes.string,
      instructor: PropTypes.string
      // Add more course properties as needed
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default CourseCatalog;
