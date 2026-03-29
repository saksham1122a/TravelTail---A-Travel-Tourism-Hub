import { useState, useEffect } from "react";
import "../StyleSheets/animation.css";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 800); // Wait for fade-out animation to finish
    }, 2500); // Show loader for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="preloader-container">
        <div className="compass-icon">
          <svg viewBox="0 0 100 100" className="compass-svg">
            {/* Outer Circle */}
            <circle cx="50" cy="50" r="48" className="outer-circle" />
            <circle cx="50" cy="50" r="42" className="inner-circle" />
            
            {/* Cardinal Points */}
            <text x="50" y="15" className="cardinal-text">N</text>
            <text x="85" y="54" className="cardinal-text">E</text>
            <text x="50" y="93" className="cardinal-text">S</text>
            <text x="15" y="54" className="cardinal-text">W</text>
            
            {/* Compass Needle */}
            <g className="needle-group">
              <path d="M50 15 L55 50 L50 85 L45 50 Z" className="needle-north" />
              <path d="M50 85 L55 50 L50 15 L45 50 Z" className="needle-south" />
              <circle cx="50" cy="50" r="3" className="needle-center" />
            </g>
          </svg>
        </div>
        
        <div className="brand-animation">
          <h1 className="brand-text">
            {"TravelTales".split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                {char}
              </span>
            ))}
          </h1>
          <div className="brand-underline"></div>
        </div>
        
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
