


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../App.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
   
    role: 'user' // Default role 'user' rakha hai
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

  
    try {
      // 2. API Call with Role
      const res = await axios.post("https://wooden-backend.onrender.com/User/signUp", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role // Role backend ko bhej rahe hain
      });

      // 3. Success Response Handling
      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          title: 'Registration Successful!',
          text: `Welcome! Your account as ${formData.role} has been created.`,
          icon: 'success',
          confirmButtonColor: '#a66d3b',
        });
        
        // Redirect to login after a short delay
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire({
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonColor: '#1a1a1a'
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left Side: Image & Info */}
        <div className="auth-image signup-bg">
          <div className="auth-overlay">
            <h2>Join the Craft</h2>
            <p>Create an account to start your premium interior journey and track your wooden projects.</p>
          </div>
        </div>
        
        {/* Right Side: Form */}
        <div className="auth-form-container">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Please fill in the details to register.</p>
          </div>

          <form onSubmit={handleSignup} className="main-auth-form">
            <div className="auth-input-group">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required />
            </div>

            <div className="auth-input-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} required />
            </div>

            {/* --- Role Selection Dropdown --- */}
            <div className="auth-input-group">
              <label>Join As</label>
              <select 
                name="role" 
                className="auth-select" 
                value={formData.role} 
                onChange={handleChange}
                required
              >
                <option value="user">Customer (User)</option>
                <option value="admin">Administrator (Admin)</option>
              </select>
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
            </div>

          

            <button type="submit" className="auth-btn">Register Now</button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;