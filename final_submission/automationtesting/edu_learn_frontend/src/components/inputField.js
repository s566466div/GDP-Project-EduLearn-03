// import React from 'react';
import './inputField.css'

function InputField({ label, name, type, value, onChange, error }) {
  return (
    <div className="input-field-container"> 
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default InputField;
