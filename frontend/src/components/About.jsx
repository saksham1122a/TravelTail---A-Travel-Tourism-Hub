import { useState } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/About.css";
import heroImage from "../assets/4.png";
import sakshamImage from "../assets/profiles/saksham.jpeg";
import rajanImage from "../assets/profiles/rajan.jpeg";
import dhanshreeImage from "../assets/profiles/dhanshree.jpeg";
import rahulImage from "../assets/profiles/rahul.jpeg";

const About = ({ showHero = false }) => {
  const [activeTab, setActiveTab] = useState("mission");

  const teamMembers = [
    {
      name: "Rajan Abrol",
      role: "CEO & Founder",
      image: rajanImage,
      description: "With over 15 years in travel industry, Rajan founded TravelTail with a vision to make travel accessible to everyone."
    },
    {
      name: "Dhanshree Slathia",
      role: "Head of Operations",
      image: dhanshreeImage,
      description: "Dhanshree ensures smooth operations and exceptional customer experiences across all our destinations."
    },
    {
      name: "Saksham Nanda",
      role: "Marketing Director",
      image: sakshamImage,
      description: "Saksham brings creative marketing strategies to connect travelers with their dream destinations."
    },
    {
      name: "Rahul Abrol",
      role: "Lead Travel Consultant",
      image: rahulImage,
      description: "Rahul's extensive travel experience helps clients create unforgettable journeys around the world."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "100+", label: "Destinations" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: "🌍",
      title: "Global Reach",
      description: "We connect travelers with destinations across 6 continents, ensuring authentic experiences everywhere."
    },
    {
      icon: "💎",
      title: "Quality First",
      description: "Every partner and destination is carefully vetted to ensure the highest standards of service and safety."
    },
    {
      icon: "🤝",
      title: "Personalized Service",
      description: "We understand that every traveler is unique, and we customize each journey to match your dreams."
    },
    {
      icon: "",
      title: "Sustainable Travel",
      description: "We're committed to responsible tourism that supports local communities and preserves our planet."
    }
  ];

  return (
    <section className="about-section">
      {showHero && (
        <div className="about-hero">
          <div className="hero-content">
            <h1>About TravelTail</h1>
            <p className="hero-subtitle">Your Gateway to Extraordinary Travel Experiences</p>
            <p className="hero-description">
              Since 2008, we've been crafting unforgettable journeys that connect travelers with the world's most amazing destinations. Our passion for travel and commitment to excellence has made us a trusted name in the industry.
            </p>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="About TravelTail" />
          </div>
        </div>
      )}

      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tabs-section">
        <div className="container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "mission" ? "active" : ""}`}
              onClick={() => setActiveTab("mission")}
            >
              Our Mission
            </button>
            <button
              className={`tab-btn ${activeTab === "vision" ? "active" : ""}`}
              onClick={() => setActiveTab("vision")}
            >
              Our Vision
            </button>
            <button
              className={`tab-btn ${activeTab === "values" ? "active" : ""}`}
              onClick={() => setActiveTab("values")}
            >
              Our Values
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "mission" && (
              <div className="tab-pane">
                <h2>Empowering Your Travel Dreams</h2>
                <p>
                  Our mission is to make extraordinary travel experiences accessible to everyone. We believe that travel has the power to transform lives, broaden perspectives, and create lasting memories. Through careful planning, personalized service, and deep destination knowledge, we ensure every journey is nothing short of exceptional.
                </p>
                <div className="mission-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">✈️</span>
                    <div>
                      <h4>Seamless Planning</h4>
                      <p>From booking to return, we handle every detail</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🎯</span>
                    <div>
                      <h4>Personalized Experience</h4>
                      <p>Tailored journeys that match your unique preferences</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🌟</span>
                    <div>
                      <h4>Exceptional Service</h4>
                      <p>24/7 support throughout your travel journey</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="tab-pane">
                <h2>Redefining the Future of Travel</h2>
                <p>
                  We envision a world where travel is not just a destination, but a transformative experience that enriches lives and fosters global understanding. Our goal is to be the leading travel company that combines innovation, sustainability, and authentic cultural connections to create journeys that matter.
                </p>
                <div className="vision-goals">
                  <div className="goal-item">
                    <h4>🚀 Innovation</h4>
                    <p>Leveraging technology to enhance travel experiences</p>
                  </div>
                  <div className="goal-item">
                    <h4>🌍 Global Impact</h4>
                    <p>Creating positive change through responsible tourism</p>
                  </div>
                  <div className="goal-item">
                    <h4>🤝 Community</h4>
                    <p>Building a global family of passionate travelers</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="tab-pane">
                <h2>The Principles That Guide Us</h2>
                <div className="values-grid">
                  {values.map((value, index) => (
                    <div key={index} className="value-card">
                      <div className="value-icon">{value.icon}</div>
                      <h3>{value.title}</h3>
                      <p>{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind your perfect travel experiences</p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of happy travelers who have discovered the world with TravelTail</p>
            <button className="cta-btn">
              Explore Destinations
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;