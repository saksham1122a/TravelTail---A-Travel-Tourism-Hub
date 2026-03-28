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
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="overlay"></div>
              <div className="slide-content">
                <div className="slide-text">
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <Link to={slide.link} className="slide-cta">{slide.cta}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-nav prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="slider-nav next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;