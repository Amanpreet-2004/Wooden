
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://wooden-backend.onrender.com/user/login", formData);

      if (res.data.success) {
        const token = res.data.token;
        const userId = res.data.userId || res.data.user?._id;

        if (token && userId) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          
          await Swal.fire({
            title: "Success",
            text: "Login Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });

         
          window.location.href = "/products"; 
          
        } else {
          setLoading(false);
          Swal.fire("Error", "Login data missing from server", "error");
        }
      } else {
        setLoading(false);
        Swal.fire("Login Failed", res.data.message || "Invalid Credentials", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      Swal.fire({
        title: 'Login Failed',
        text: error.response?.data?.message || 'Server connection error',
        icon: 'error',
        confirmButtonColor: '#1a1a1a'
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Visual Side */}
        <div className="auth-image login-bg">
          <div className="auth-overlay">
            <h2>Welcome Back</h2>
            <p>Login to manage your furniture orders and explore our latest wooden designs.</p>
          </div>
        </div>
        
        {/* Form Side */}
        <div className="auth-form-container">
          <div className="auth-header">
            <h1>Login</h1>
            <p>Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="main-auth-form">
            <div className="auth-input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="example@wood.com" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Checking..." : "Login Now"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;