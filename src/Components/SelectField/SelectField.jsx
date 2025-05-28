import React from "react";

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
                    {options.map((option) =>(
                        <option key={option.value}
                    ))}
                </select>
        </div>
    )
}