import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import RegistrationForm from '../components/registrationForm';
import LoginForm from '../components/loginForm';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const handleSubmit = (data) => {
  //   // Handle form submission, e.g., send data to server
  //   console.log(data);
  // };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // if (validateForm()) {
      console.log(typeof formData)
      console.log(JSON.stringify(formData))

      const formDataForSubmission = {
        // firstName: formData.firstName,
        // lastName: formData.lastName,
        email: formData.email,
        // name:  `${formData.firstName} ${formData.lastName}`,
        password: formData.password,
        // role: formData.role.toUpperCase() // Assuming UserRole enum uses uppercase
      };
      try {
        const response = await fetch('http://localhost:5050/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(formDataForSubmission),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }

        const data = await response.json();
        // onSubmit(data);
        localStorage.setItem('accessToken', data.token);
        console.log(data);
        navigate('/dashboard');
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle error, maybe set an error state to display a message to the user
      }
    }
    
  return (
    <div>
    <h1>EDU-LEARN</h1>
      <h1>LOGIN</h1>
      <LoginForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        onSubmit={handleSubmit}
      />
      <div className="signup-message">
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
