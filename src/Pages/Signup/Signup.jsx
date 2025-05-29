import React, { useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import SelectField from "../../Components/SelectField/SelectField";
import {countries} from "../../Data/countries";
import './Signup.css';


const Signup = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      country: '',
      password: '',
      confirmPassword: ''
    });
  
    const [errors, setErrors] = useState({
      name: '',
      email: '',
      country: '',
      password: '',
      confirmPassword: ''
    });
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
  
    const validateForm = () => {
      let valid = true;
      const newErrors = { ...errors };
  
      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        valid = false;
      } else {
        newErrors.name = '';
      }
  
      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email';
        valid = false;
      } else {
        newErrors.email = '';
      }
  
      // Country validation
      if (!formData.country) {
        newErrors.country = 'Country is required';
        valid = false;
      } else {
        newErrors.country = '';
      }
  
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
        valid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        valid = false;
      } else {
        newErrors.password = '';
      }
  
      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        valid = false;
      } else {
        newErrors.confirmPassword = '';
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        console.log('Form submitted:', formData);
        alert(`Signup successful for ${formData.name} from ${countries.find(c => c.value === formData.country)?.label}`);
      }
    };
  
    return (
      <div className="signup-container">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            error={errors.name}
            label="Full Name"
          />
          
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            label="Email"
          />
          
          <SelectField
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={countries}
            error={errors.country}
            label="Country"
            placeholder="Select your country"
          />
          
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            label="Password"
          />
          
          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
  };
  
  export default Signup;