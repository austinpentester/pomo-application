// src/components/SelectField/SelectField.js
import React from 'react';
import './SelectField.css';

const SelectField = ({ 
  value, 
  onChange, 
  options, 
  error, 
  label,
  name,
  placeholder
}) => {
  return (
    <div className="select-field">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={error ? 'error' : ''}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default SelectField;