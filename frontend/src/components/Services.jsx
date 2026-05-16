import React from 'react';
import "../App.css";

const Services = () => {
  const serviceData = [
    {
      id: 1,
      title: "Custom Furniture Design",
      desc: "Tailor-made bedroom sets, dining tables, and sofas crafted to match your interior theme.",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14M9 21V11m6 10V11"/></svg>
    },
    {
      id: 2,
      title: "Modular Solutions",
      desc: "Smart modular kitchens and designer wardrobes with high-quality hinges and wood finishes.",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
    },
    {
      id: 3,
      title: "Wall & Ceiling Panels",
      desc: "Premium fluted panels and louvers for a modern architectural look in living rooms and offices.",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
    },
    {
      id: 4,
      title: "Exterior Cladding",
      desc: "Weatherproof wooden cladding and decking for exterior elevations that stand the test of time.",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <span className="subtitle">What We Offer</span>
          <h2 className="title">Our Specialized Services</h2>
          <p className="description">From residential comfort to commercial elegance, we provide comprehensive wooden solutions.</p>
        </div>

        <div className="services-grid">
          {serviceData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-box">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="service-hover-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;