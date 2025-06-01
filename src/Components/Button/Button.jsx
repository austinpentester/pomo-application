import React from "react";
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  disabled, 
  type = 'button', 
  isLoading 
}) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled || isLoading}
      className={`custom-button ${isLoading ? 'loading' : ''}`}
      aria-busy={isLoading}
    >
      {isLoading && <span className="spinner" aria-hidden="true"></span>}
      {children}
    </button>
  );
};

export default Button;