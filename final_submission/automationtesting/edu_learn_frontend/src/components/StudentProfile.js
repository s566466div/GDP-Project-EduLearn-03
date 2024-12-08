import EngagementStats from "./EngagementStats"
import EnrollmentPieChart from "./EnrollmentPieChart"
import Layout from "./Layout"
import OngoingCourses from "./OngoingCourses"

const StudentProfile = () => {
    return (
        <Layout>
            <div className="dashboard-container">
                <div className="dashboard-section">
                    <EngagementStats />
                </div>
                <div className="dashboard-section">
                    <EnrollmentPieChart />
                </div>
                <div className="dashboard-section">
                    <OngoingCourses />
                </div>
            </div>
        </Layout>
    )
}

export default StudentProfile;