import React, { useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import './Signup.css';


const Signup = () => {
    const [formDate, setFormDate] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      };

    const validateForm = () => {
        let valid = true;
        const newErrors = {...errors};

        //Name validation
        if(!formDate.name.trim()){
            newErrors.name = 'Name is required';
            valid = false;
        } else{
            newErrors.name = '';
        }

        //Email validation
        if(!formDate.email.trim()){
            newErrors.email = 'Email is required';
            valid = false;
        } else if(!validateEmail(formDate.email)){
            newErrors.email = 'Please enter a valid email';
            valid = false;
        } else{
            newErrors.email - '';
        }

        //Password validation
        if(!formDate.password.trim()){
            newErrors.password = 'Password is required';
            valid = false;
        } else if(formDate.password.length < 6){
            newErrors.password = 'Password must be atleast 6 charecters';
            valid = false;
        } else{
            newErrors.password = '';
        }

        //Confirm password validation
        if(formDate.password !== formDate.confirmPassword){
            newErrors.confirmPassword = 'Password do not match';
            valid = false;
        }else {
            newErrors.confirmPassword = '';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormDate({
            ...formDate,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()){
            console.log('Form submitted: ', formDate);
            alert('Signup successful!');
        }
    }

    return(
        <div className="signup-container">
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <InputField
                    type="text"
                    name="name"
                    value={formDate.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    error={errors.name}
                    label="Full Name"
                />

                <InputField
                    type="email"
                    name="email"
                    value={formDate.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    error={errors.email}
                    label="Email"
                />

                <InputField
                    type="password"
                    name="password"
                    value={formDate.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    error={errors.password}
                    label="Password"
                />

                <InputField
                    type="password"
                    name="confirmPassword"
                    value={formDate.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                    label="Confirm Password"
                />

                <Button type="submit" disabled={Object.values(errors).some(error => error)}>
                    Sign Up
                </Button>
            </form>
        </div>
    );
}


export default Signup;