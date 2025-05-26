import React from "react";
import './Button.css'

const Button = ({ children, onClick, disabled, type = 'button'}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="custom-button"
        >
            {children}
        </button>
    );
};

export default Button;