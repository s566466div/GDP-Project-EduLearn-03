import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import CourseListSection from "./CourseListSection";
import StudentListSection from "./StudentListSection";
import QuizListSection from "./QuizListSection";
import AssignmentListSection from "./AssignmentListSection";


const NewInstructorDashboard = () => {
    const courses = useSelector((state) => state.courses);
    const students = useSelector((state) => state.students);
    const navigate = useNavigate();

    return ( 
        <Layout>
             <div className="dashboard-container">
                <div className="dashboard-section">
                    <CourseListSection />
                </div>
                {/* <div className="dashboard-section">
                    <StudentListSection />
                </div>
                <div className="dashboard-section">
                    <QuizListSection />
                </div>
                <div className="dashboard-section">
                    <AssignmentListSection />
                </div> */}
            </div>
        </Layout>
    )

}

export default NewInstructorDashboard;