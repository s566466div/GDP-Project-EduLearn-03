import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from '../pages/registration';
import LoginPage from '../pages/loginPage';

const App = () => {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/" element={<LoginPage />} />
        
        </Routes>
      </BrowserRouter>
    
  );
 
};

export default App;