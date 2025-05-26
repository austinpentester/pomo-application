import React from "react";
import './InputField.css'

const InputField = ({
    type,
    value, 
    onChange,
    placeholder,
    error,
    label,
    name
}) => {
    return (
      <div className="input-field">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={name}
          className={error ? 'error' : ''}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  };
  

export default InputField;