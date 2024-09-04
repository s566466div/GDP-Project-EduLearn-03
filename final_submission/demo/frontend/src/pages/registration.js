import React, { useState } from 'react';
import RegistrationForm from '../components/registrationForm';
import { json, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
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
        name:  `${formData.firstName} ${formData.lastName}`,
        password: formData.password,
        role: formData.role.toUpperCase() // Assuming UserRole enum uses uppercase
      };
      try {
        const response = await fetch('http://localhost:5050/api/auth/register', {
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
        console.log(data);
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle error, maybe set an error state to display a message to the user
      }
    }
  // };

  return (
    <div>
      <h1>REGISTER</h1>
      <RegistrationForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default RegistrationPage;
