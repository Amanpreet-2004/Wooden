import React from 'react';
import "../App.css";

const Features = () => {
  const featureList = [
    {
      id: 1,
      title: "Premium Quality",
      desc: "High quality wood & materials",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15l-2 5L9 9l11 4-5 2zm0 0l-5-2L2 9l8 2 2 5z"/></svg>
    },
    {
      id: 2,
      title: "Custom Design",
      desc: "Tailored to your style",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l5 5"></path><path d="M9.5 14.5L16 8"></path></svg>
    },
    {
      id: 3,
      title: "On-time Delivery",
      desc: "We value your time",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    },
    {
      id: 4,
      title: "Eco Friendly",
      desc: "Sustainable & natural",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8h-2c0-2.26-1.18-4.54-2-6-1.26 1.28-2.68 2.4-5.11 2.78a5 5 0 0 0 .11 9.22H11z"></path></svg>
    },
    {
      id: 5,
      title: "Expert Team",
      desc: "Experienced designers",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {featureList.map((item) => (
          <div key={item.id} className="feature-item">
            <div className="feature-icon">
              {item.icon}
            </div>
            <div className="feature-text">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;