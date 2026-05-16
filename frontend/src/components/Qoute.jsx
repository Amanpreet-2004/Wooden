import React from 'react';
import '../App.css';

const QuotePage = () => {
  return (
    <section className="quote-page">
      <div className="quote-container">
        {/* Left Side: Visual Inspiration */}
        <div className="quote-visual">
          <div className="overlay-text">
            <h2>Let's Craft Your Vision</h2>
            <p>Tell us about your project, and our wood experts will provide a customized estimate tailored to your style.</p>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="quote-form-side">
          <form className="premium-form">
            <span className="form-step">Step 01 / Project Details</span>
            <h3>What are you looking for?</h3>
            
            <div className="project-grid">
              {['Main Door', 'Wall Paneling', 'Bedroom Set', 'Louvers', 'Exterior Cladding'].map((item) => (
                <label key={item} className="checkbox-card">
                  <input type="checkbox" name="service" value={item} />
                  <span className="custom-check">{item}</span>
                </label>
              ))}
            </div>

            <div className="input-row">
              <div className="input-field">
                <label>Full Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="input-field">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91" required />
              </div>
            </div>

            <div className="input-field">
              <label>Project Location</label>
              <input type="text" placeholder="City / Area" />
            </div>

            <div className="input-field">
              <label>Any specific details? (Optional)</label>
              <textarea placeholder="Tell us more about the dimensions or wood type..."></textarea>
            </div>

            <button type="submit" className="submit-quote-btn">Get My Custom Estimate</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuotePage;