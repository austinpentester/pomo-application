import React from "react";
import { Link } from "react-router-dom";
import './Home.css';


const Home = () => {
    return (
      <div className="home-container">
        <h1>Welcome to Our App</h1>
        <div className="auth-links">
          <Link to="/login" className="auth-link">Log In</Link>
          <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    );
  };

export default Home;