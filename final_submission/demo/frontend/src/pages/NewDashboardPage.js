// src/pages/DashboardPage.js
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import InstructorDashboard from '../components/InstructorDashboard';
import StudentDashboard from '../components/StudentDashboard';
import './NewDashboardPage.css';
import NewInstructorDashboard from '../components/NewInstructorDashboard';
import NewStudentDashboard from '../components/NewStudentDashboard';
import { AuthContext } from '../contexts/AuthContext';

const NewDashboardPage = () => {
  const { userRole} = useContext(AuthContext)
  console.log(userRole)

//   if (!user) {
//     return <p>Loading...</p>; // Show loading or redirect to login if user is not authenticated
//   }

  return (
    <>
      {userRole === 'INSTRUCTOR' ? <NewInstructorDashboard /> : <NewStudentDashboard />}
    </>
    
  );
};

export default NewDashboardPage;
