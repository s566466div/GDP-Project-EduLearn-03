import { useSelector } from "react-redux";
import Course from "./Course";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CourseContext } from "../contexts/CourseContext";
import './CourseListSection.css';

const CourseListSection = () => {
    // const courses = useSelector((state) => state.courses);
    const { courses } = useContext(CourseContext);
    const navigate = useNavigate();

    return (
    <div className="course-list-section">
      <h1>Courses</h1>
        <button onClick={() => navigate('/create-course')}>Create New Course</button>
      <ul className="course-list-1">
        {courses?.length > 0 ? (
          courses.map((course) => (
            <Course key={course.id} course={course} />
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
    </div>
    )
}

export default CourseListSection;

