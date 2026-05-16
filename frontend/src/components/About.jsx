import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        
        {/* Left Side: Professional Image */}
        <div className="about-image-side">
          <div className="main-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=800" 
              alt="Premium Wood Work" 
              className="about-img-main"
            />
            <div className="experience-tag">
              <span className="years">24+</span>
              <p>Years of <br/> Crafting Dreams</p>
            </div>
          </div>
        </div>

        {/* Right Side: Professional English Content */}
        <div className="about-content-side">
          <span className="brand-tag">Expert Wood Engineering</span>
          <h2 className="title">Complete Interior & Exterior Wooden Solutions</h2>
          
          <p className="description">
            We don't just manufacture furniture; we give wood a soul. Whether it’s a grand <strong>Main Entrance Door</strong>, a luxurious <strong>Bedroom Suite</strong>, or high-end <strong>Wall Paneling and Louvers</strong>, we customize every detail to fit your vision. 
            From elegant indoor aesthetics to durable <strong>Exterior Wooden Cladding</strong>, we bring timeless craftsmanship to every corner of your property.
          </p>

          <div className="product-tags">
            <span>Designer Doors</span>
            <span>Modular Kitchens</span>
            <span>Wall Paneling</span>
            <span>Louvers</span>
            <span>Exterior Cladding</span>
            <span>Wooden Decking</span>
          </div>

          <div className="features-list">
            <div className="f-item">
              <span className="f-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <div>
                <h4>End-to-End Customization</h4>
                <p>Tailored designs for both interior comfort and exterior durability.</p>
              </div>
            </div>
            <div className="f-item">
              <span className="f-icon">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <div>
                <h4>Weather-Resistant Quality</h4>
                <p>Specialized treatments for exterior wood to withstand sun and rain.</p>
              </div>
            </div>
          </div>

          <div className="about-actions">
            <Link to="/contact" className="btn-dark">Get a Free Consultation</Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;