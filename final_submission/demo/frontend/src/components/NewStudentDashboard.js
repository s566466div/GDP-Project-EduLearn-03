import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { CourseContext } from '../contexts/CourseContext';
import { useContext } from "react";
import './NewStudentDashboard.css';

const NewStudentDashboard = () => {
    const { enrolledCourses, loading } = useContext(CourseContext);
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading....</div>
    }
    return ( 
        <Layout>
            <div className="dashboard-container">
                <div className="enrolled-courses-page">
                    <h1>Enrolled Courses</h1>
                    {!enrolledCourses || enrolledCourses?.length === 0 ? 
                        <p>You have not enrolled in any courses yet.</p>
                     : (
                        <div className="enrolled-courses-list">
                        {enrolledCourses?.map((course) => (
                            <Link to={`/courses/${course.id}`} key={course.id} className="enrolled-course-item">
                            <h2>{course.title}</h2>
                            <p><strong>Instructor:</strong> {course.instructor?.name}</p>
                            <p><strong>Subject:</strong> {course.subject}</p>
                            {/* <p><strong>Level:</strong> {course.level}</p> */}
                            {/* <p><strong>Duration:</strong> {course.duration}</p> */}
                            {/* <p><strong>Rating:</strong> {course.rating}</p> */}
                            <p><strong>Description:</strong> {course.description}</p>
                            {/* You can add more course details as needed */}
                            </Link>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )

}

export default NewStudentDashboard;