import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from '../pages/registration';
import LoginPage from '../pages/loginPage';
import { CourseProvider } from '../contexts/CourseContext';
import DashboardPage from '../pages/dashboardPage';

const App = () => {
  return (
    <CourseProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

        </Routes>
      </BrowserRouter>
    </CourseProvider>
  );
};

export default App;