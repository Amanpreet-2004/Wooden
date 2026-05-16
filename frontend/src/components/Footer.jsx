import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        
        {/* Brand Info */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/public/Gemini_Generated_Image_jg7mbcjg7mbcjg7m-removebg-preview.png" alt="Logo" />
            <div className="logo-text">
              <h2 className="brand-name">Wooden Interior</h2>
              <p className="tagline">Designing Dreams in Wood</p>
            </div>
          </Link>
          <p className="brand-desc">
            Specializing in premium interior and exterior wooden solutions. From designer doors to custom louvers, we bring craftsmanship to your doorstep.
          </p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-pinterest-p"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/projects">Our Projects</Link></li>
            <li><Link to="/blog">Latest Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services List */}
        <div className="footer-links">
          <h3>Our Products</h3>
          <ul>
            <li><Link to="/category/doors">Designer Doors</Link></li>
            <li><Link to="/category/bedroom">Luxury Bedrooms</Link></li>
            <li><Link to="/category/panels">Wall Paneling</Link></li>
            <li><Link to="/category/louvers">Modern Louvers</Link></li>
            <li><Link to="/category/exterior">Exterior Cladding</Link></li>
          </ul>
        </div>

        {/* Newsletter / Contact info */}
        <div className="footer-contact">
          <h3>Stay Updated</h3>
          <p>Subscribe to get the latest design trends and offers.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Your Email" />
            <button>Join</button>
          </div>
          <div className="direct-contact">
            <p><strong>Call:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> support@woodeninterior.com</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2026 Wooden Interior. All Rights Reserved.</p>
        <div className="bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;