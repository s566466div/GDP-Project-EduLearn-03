import { useContext } from "react";
import { CourseContext } from "../contexts/CourseContext";

const OngoingCourses = () => {
    const { enrolledCourses } = useContext(CourseContext);
    // const courses = [
    //     { name: 'React Basics', progress: 60 },
    //     { name: 'Advanced Node.js', progress: 40 },
    //     { name: 'UI/UX Design', progress: 75 }
    // ];

    return (
        <div className="ongoing-courses">
            <h2>Ongoing Courses</h2>
            <ul>
                {enrolledCourses?.map((course, index) => (
                    <li key={index}>
                        {course.title} - {course.progress}% complete
                        <progress value={course.progress} max="100"></progress>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OngoingCourses;
