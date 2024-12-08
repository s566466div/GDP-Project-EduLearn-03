import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import CourseListSection from "./CourseListSection";

const NewInstructorDashboard = () => {
    const navigate = useNavigate();

    return ( 
        <Layout>
             <div className="dashboard-container">
                <div className="dashboard-section">
                    <CourseListSection />
                </div>
            </div>
        </Layout>
    )
}

export default NewInstructorDashboard;