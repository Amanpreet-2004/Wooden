
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
        // Backend Response check
        console.log("Backend Response:", res.data);

        const token = res.data.token;
        const userId = res.data.userId || res.data.user?._id;
        // Role check logic add ki hai
        const userRole = res.data.role || res.data.user?.role; 

        if (token && userId) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", userRole); // Role ko store kiya
          
          Swal.fire("Success", "Login Successfully!", "success");

          const userRole = res.data.role; // Backend se jo humne abhi add kiya

if (userRole === "admin") {
    navigate("/adminlayout"); // Dashboard par jayega
} else {
    navigate("/products"); // User page par jayega
}
          
          // reload zaroori hai agar Navbar role ke hisab se update hona hai
          window.location.reload(); 
        } else {
          console.error("Token, UserId, or Role missing!");
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid Email or Password',
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