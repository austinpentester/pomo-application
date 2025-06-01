import React, {useState} from "react";
import {Link} from 'react-router-dom';
import InputField from '../../Components/InputField/InputField';
import Button from '../../Components/Button/Button';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  
    const [errors, setErrors] = useState({
      email: '',
      password: ''
    });
  
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
  
    const validateForm = () => {
      let valid = true;
      const newErrors = { ...errors };
  
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
  
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
        valid = false;
      } else {
        newErrors.password = '';
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        setIsSubmitting(true);
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          console.log('Login successful:', formData);
          alert('Login successful!');
          // Here you would typically redirect to dashboard
        } catch (error) {
          console.error('Login error:', error);
          alert('Login failed. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  
    return (
      <div className="login-container">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            label="Email"
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
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          <Button type="submit" disabled={isSubmitting || Object.values(errors).some(error => error)}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
          
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;