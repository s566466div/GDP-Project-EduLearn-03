import React, { useContext, useState } from 'react';
import Layout from "../components/Layout";
import EngagementStats from "../components/EngagementStats";
import CalendarComponent from "../components/CalendarComponent";
import EnrollmentPieChart from "../components/EnrollmentPieChart";
import OngoingCourses from "../components/OngoingCourses";
import { AuthContext } from '../contexts/AuthContext';

const DashboardPage = () => {
    const { userRole } = useContext(AuthContext);
    return (
        <Layout>
            <div className="dashboard-container">
                <div className="dashboard-section">
                    <EngagementStats />
                </div>
                {/* <div className="dashboard-section">
                    <CalendarComponent />
                </div> */}
                <div className="dashboard-section">
                    <EnrollmentPieChart />
                </div>
                <div className="dashboard-section">
                    <OngoingCourses />
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
