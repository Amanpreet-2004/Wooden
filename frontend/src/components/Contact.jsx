import React from 'react';
import "../App.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="contact-wrapper">
        
        {/* Left Side: Google Map */}
        <div className="map-side">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2229532822744!2d76.68853757537233!3d30.712128574596395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef930263640b%3A0xc39111c1e54f738!2sSahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1715080000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            title="Office Location"
          ></iframe>
        </div>

        {/* Right Side: Contact Details & Inquiry Form */}
        <div className="form-side">
          <div className="form-container">
            <span className="subtitle">Get In Touch</span>
            <h2>Contact Us</h2>
            <p className="form-subtitle">
              Have a custom project in mind? Reach out to our wood experts for a consultation.
            </p>

            <form className="auth-form">
              <div className="input-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="example@wood.com" required />
              </div>

              <div className="input-group">
                <label>Message</label>
                <textarea placeholder="Tell us about your requirements..." rows="4" required></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>

          
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;