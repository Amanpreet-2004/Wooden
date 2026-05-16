import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Transform Your Space With Wooden Elegance",
      subtitle: "Modern | Elegant | Timeless",
      description: "We craft beautiful, functional and timeless wooden interiors that reflect your personality and lifestyle.",
      image: "https://i.pinimg.com/1200x/40/d0/dd/40d0dd80b459acd747ed23be6c30ed09.jpg" // Yahan apni image ka path daalein
    },
    {
      id: 2,
      title: "Crafting Comfort in Every Corner",
      subtitle: "Luxury | Comfort | Quality",
      description: "Discover the art of wooden craftsmanship with our premium range of luxury living designs.",
      image: "https://i.pinimg.com/736x/5f/9a/ec/5f9aecbc28e94355b4b0147d68a4cdae.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="hero-section">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})` }}
          >
            <div className="hero-content">
              <span className="hero-subtitle">{slide.subtitle}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              
              <div className="hero-btns">
                <Link to="/projects" className="btn-primary">Explore Projects →</Link>
                <Link to="/services" className="btn-secondary">Our Services →</Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button className="ctrl-btn prev" onClick={prevSlide}>❮</button>
        <button className="ctrl-btn next" onClick={nextSlide}>❯</button>

        {/* Dots */}
        <div className="dots-container">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;