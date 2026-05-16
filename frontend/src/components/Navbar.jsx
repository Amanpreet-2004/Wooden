// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import "../App.css";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // Check login status on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You will be logged out and your cart might be cleared!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#a66d3b',
//       cancelButtonColor: '#333',
//       confirmButtonText: 'Yes, Logout'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Clear everything from localStorage
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         // localStorage.removeItem("cart"); // Agar cart local store mein hai toh
        
//         setIsLoggedIn(false);
//         Swal.fire('Logged Out!', 'Successfully logged out.', 'success');
//         navigate('/login');
//       }
//     });
//   };

//   const navLinks = [
//     { name: 'Home', to: '/' },
//     { name: 'Categories', to: '/features' }, 
//     { name: 'About Us', to: '/about' },
//     { name: 'Products', to: '/Products' },
//     { name: 'Services', to: '/services' },
//     { name: 'Contact Us', to: '/contact' },
//   ];

//   return (
//     <nav className="navbar-main">
//       {/* Top Bar */}
//       <div className="top-bar">
//         <div className="contact-info">
//           <span>+1 234 567 8900</span>
//           <span>support@woodeninterior.com</span>
//         </div>
//         <div className="social-icons">
//           {/* Icons remain same */}
//         </div>
//       </div>

//       {/* Main Nav Section */}
//       <div className="nav-container">
//         <Link to="/" className="logo-section">
//           <div className="logo-box">
//             <img src="/3e30e834-abbb-4081-9ce1-58225f981539-removebg-preview.png" alt="Logo" />
//           </div>
//           <div className="logo-text">
//             <h1 className="brand-name">Wooden Interior</h1>
//             <p className="tagline">Designing Dreams in Wood</p>
//           </div>
//         </Link>

//         {/* Desktop Links */}
//         <div className="desktop-menu">
//           {navLinks.map((link) => (
//             <Link key={link.name} to={link.to} className="nav-item">
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* Action Icons (Cart & Auth) */}
//         <div className="cta-container">
//           {/* Cart Icon */}
//           <Link to="/cart" className="cart-icon-btn">
//             <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
//             </svg>
//             <span className="cart-count">0</span>
//           </Link>

//           {/* Login/Logout Button */}
//           {isLoggedIn ? (
//             <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
//           ) : (
//             <Link to="/login" className="login-btn">LOGIN</Link>
//           )}

//           <Link to="/qoute" className="quote-btn">GET FREE QUOTE</Link>
//         </div>

//         {/* Hamburger Toggle */}
//         <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
//           <div className={`burger ${isOpen ? 'open' : ''}`}></div>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
//         <div className="mobile-links">
//           {navLinks.map((link) => (
//             <Link key={link.name} to={link.to} onClick={() => setIsOpen(false)} className="mobile-nav-item">
//               {link.name}
//             </Link>
//           ))}
//           <Link to="/cart" className="mobile-nav-item">Cart (0)</Link>
//           {isLoggedIn ? (
//             <button onClick={handleLogout} className="mobile-nav-item logout-btn-mobile">Logout</button>
//           ) : (
//             <Link to="/login" onClick={() => setIsOpen(false)} className="mobile-nav-item">Login</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios add kiya
import Swal from 'sweetalert2';
import "../App.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Cart count state
  const navigate = useNavigate();

  // 1. Function jo cart items fetch karega
  const getCartCount = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const res = await axios.get(`http://localhost:1987/cart/get/${userId}`);
        // Database mein jitne products hain, unka total length
        setCartCount(res.data.length || 0);
      } catch (err) {
        console.error("Navbar count fetch error:", err);
      }
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getCartCount(); // Mount par count fetch karein
    }

    // 2. Magic Listener: Jab bhi 'cartUpdated' event fire hoga, count refresh hoga
    window.addEventListener('cartUpdated', getCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', getCartCount);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a66d3b',
      cancelButtonColor: '#333',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setCartCount(0); // Logout par count reset
        Swal.fire('Logged Out!', 'Successfully logged out.', 'success');
        navigate('/login');
      }
    });
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Categories', to: '/features' }, 
    { name: 'About Us', to: '/about' },
    { name: 'Products', to: '/Products' },
    { name: 'Services', to: '/services' },
    { name: 'Contact Us', to: '/contact' },
  ];

  return (
    <nav className="navbar-main">
      <div className="top-bar">
        <div className="contact-info">
          <span>+1 234 567 8900</span>
          <span>support@woodeninterior.com</span>
        </div>
      </div>

      <div className="nav-container">
        <Link to="/" className="logo-section">
          <div className="logo-box">
            <img src="/3e30e834-abbb-4081-9ce1-58225f981539-removebg-preview.png" alt="Logo" />
          </div>
          <div className="logo-text">
            <h1 className="brand-name">Wooden Interior</h1>
            <p className="tagline">Designing Dreams in Wood</p>
          </div>
        </Link>

        <div className="desktop-menu">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.to} className="nav-item">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="cta-container">
          {/* Cart Icon with Dynamic Count */}
          <Link to="/cart" className="cart-icon-btn">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="cart-count">{cartCount}</span>
          </Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
          ) : (
            <Link to="/login" className="login-btn">LOGIN</Link>
          )}

          <Link to="/qoute" className="quote-btn">GET FREE QUOTE</Link>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          <div className={`burger ${isOpen ? 'open' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu Update */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-links">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.to} onClick={() => setIsOpen(false)} className="mobile-nav-item">
              {link.name}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setIsOpen(false)} className="mobile-nav-item">
            Cart ({cartCount})
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="mobile-nav-item logout-btn-mobile">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="mobile-nav-item">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;