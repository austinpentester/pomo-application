import React, { useState } from "react"

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

        if (validateForm())
    }
}


export default Signup;