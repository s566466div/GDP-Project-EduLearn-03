import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext exists
import StudentCourseDashboard from '../components/StudentCourseDashboard';
import InstructorCourseDashboard from '../components/InstructorCourseDashboard';

const CourseDashboard = () => {
  const { userRole} = useContext(AuthContext)
  
  return (
    <>
      {userRole === 'INSTRUCTOR' ? <InstructorCourseDashboard /> : <StudentCourseDashboard />}
    </>
    
  );
};

export default CourseDashboard;
