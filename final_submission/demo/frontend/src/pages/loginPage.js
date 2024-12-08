import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import './loginPage.css';
import { AuthContext } from '../contexts/AuthContext';

function LoginPage() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState(''); // State for server error messages
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoginMessage(''); // Clear previous errors

    // Prepare form data for submission
    const formDataForSubmission = {
      email: formData.email,
      password: formData.password,
      role: formData.role?.toUpperCase() || '', // Assuming role is optional
    };

    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataForSubmission),
      });

      console.log(response)
      if (response.status != 200) {
        // Extract error message from response
        // const error = response;
        // console.log(error, "hellow")
        throw new Error('Login failed. Please try again.');
      } 

      const data = await response.json();
      const { token, role, id } = data;

      // Call login function from AuthContext
      login(token, role, id);
      setLoginMessage({type: 'success', text: 'Login successfull Redirecting to Dashboard....'})

      // Redirect to the dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage({ type: 'error', text: error.message || 'Invalid credentials. Please try again.' });
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {loginMessage && (
        <div
          className={`login-message ${
            loginMessage.type === 'success' ? 'login-success' : 'login-error'
          }`}
        >
          {loginMessage.text}
        </div>
      )}
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
