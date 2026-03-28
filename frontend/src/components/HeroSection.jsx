import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/HeroSection.css";
import slide1 from "../assets/1.png";
import slide2 from "../assets/2.png";
import slide3 from "../assets/3.png";
import slide4 from "../assets/4.png";
import slide5 from "../assets/5.png";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { 
      title: "Discover Your Next Adventure",
      subtitle: "Explore breathtaking destinations around the world",
      cta: "Explore Destinations",
      link: "/destinations",
      image: slide1
    },
    {
      title: "Luxury Travel Experiences",
      subtitle: "Indulge in premium accommodations and services",
      cta: "View Packages",
      link: "/packages",
      image: slide2
    },
    {
      title: "Unforgettable Memories",
      subtitle: "Create moments that last a lifetime",
      cta: "Start Planning",
      link: "/contact",
      image: slide3
    },
    {
      title: "Exotic Destinations",
      subtitle: "Journey to the world's most spectacular places",
      cta: "View Gallery",
      link: "/destinations",
      image: slide4
    },
    {
      title: "Adventure Awaits",
      subtitle: "Experience thrilling activities and outdoor adventures",
      cta: "Book Now",
      link: "/packages",
      image: slide5
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="slider-container">
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              <div className="overlay"></div>
              <div className="slide-content">
                <div className="container">
                  <div className="slide-text">
                    <h1 className="slide-title">{slide.title}</h1>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <div className="slide-actions">
                      <Link to={slide.link} className="slide-cta">
                        {slide.cta}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="cta-icon">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="slider-controls">
          <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="dot-inner"></span>
              </button>
            ))}
          </div>

          <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrows">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;