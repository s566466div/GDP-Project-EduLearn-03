import React from 'react';
import InputField from './inputField';
import './registrationForm.css';
import { validateName, validateEmail, validatePassword, validatePasswordMatching } from '../utils/formValidation';

function RegistrationForm({ formData, setFormData, errors, setErrors, onSubmit }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.firstName = validateName(formData.firstName);
    newErrors.lastName = validateName(formData.lastName);
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.comfirmPassword = validatePassword(formData.comfirmPassword);
    newErrors.role = validateName(formData.role);
    newErrors.form = validatePasswordMatching(formData.password, formData.comfirmPassword)
    setErrors(newErrors);
    // console.log(Object.values(newErrors));
    for (let error of Object.values(newErrors)) {
        if (error.length != 0) {
            return false;
        }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation here
    // If valid, call onSubmit
    if (validateForm()) {
        onSubmit(formData);   
    } else {
        // console.log(validateForm())
    }
    // onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
        {errors.form && <span className="error">{errors.form}</span>}
      <InputField
        label="First Name"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <InputField
        label="Last Name"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <InputField
        label="Confirm Password"
        name="comfirmPassword"
        type="password"
        value={formData.comfirmPassword}
        onChange={handleChange}
        error={errors.comfirmPassword}
      />
      <div>
        <label>Role:</label>
        <input type="radio" value="student" name="role" checked={formData.role === 'student'} onChange={handleRoleChange} /> Student
        <input type="radio" value="instructor" name="role" checked={formData.role === 'instructor'} onChange={handleRoleChange} /> Instructor
        {errors.role && <span className="error">{errors.role}</span>}
      </div>
      {/* Other input fields */}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
