import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import { CourseProvider } from '../contexts/CourseContext';
import RegistrationPage from '../pages/registration';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import CourseCatalogPage from '../pages/courseCatalogPage';
import CourseDetailsPage from '../pages/courseDetailsPage';
import EnrolledCoursesPage from '../pages/enrolledCoursesPage';

const App = () => {
  return (
    <CourseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/" element={<LoginPage />} />
         
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CourseCatalogPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="/enrolled-courses" element={<EnrolledCoursesPage />} />
         
          <Route path="/create-course" element={<CourseForm />} />
        </Routes>
      </BrowserRouter>
    </CourseProvider>
  );
  
};

export default App;