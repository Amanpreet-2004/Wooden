import React from 'react';
import "../App.css";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Arjun Sharma",
      project: "Main Entrance Door",
      text: "The quality of the teak wood used for our main door is exceptional. The craftsmanship truly makes our entrance stand out in the neighborhood.",
      stars: 5
    },
    {
      id: 2,
      name: "Priya Verma",
      project: "Luxury Bedroom Set",
      text: "We wanted a custom bedroom suite that felt modern yet timeless. Wooden Interior delivered exactly what we envisioned with perfect finishing.",
      stars: 5
    },
    {
      id: 3,
      name: "Rajesh Malhotra",
      project: "Exterior Wall Cladding",
      text: "Their exterior cladding solutions are both durable and beautiful. It has completely transformed the elevation of our bungalow.",
      stars: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <span className="subtitle">Client Experiences</span>
          <h2 className="title">What Our Customers Say</h2>
        </div>

        <div className="testimonial-grid">
          {reviews.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="quote-icon">“</div>
              <p className="review-text">{review.text}</p>
              <div className="client-info">
                <div className="client-meta">
                  <h4>{review.name}</h4>
                  <span>{review.project}</span>
                </div>
                <div className="stars">
                  {"★".repeat(review.stars)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;