import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
      icon: "🌱",
      title: "Sustainable Travel",
      description: "We're committed to responsible tourism that supports local communities and preserves our planet."
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  return (
    <section className="about-section">
      {showHero && (
        <div className="about-hero">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About TravelTail</h1>
            <p className="hero-subtitle">Your Gateway to Extraordinary Travel Experiences</p>
            <p className="hero-description">
              Since 2008, we've been crafting unforgettable journeys that connect travelers with the world's most amazing destinations. Our passion for travel and commitment to excellence has made us a trusted name in the industry.
            </p>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={heroImage} alt="About TravelTail" />
          </motion.div>
        </div>
      )}

      <div className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-card"
                variants={fadeInUp}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="tabs-section">
        <div className="container">
          <motion.div 
            className="tabs-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {["mission", "vision", "values"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                Our {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>

          <div className="tab-content">
            <AnimatePresence mode="wait">
              {activeTab === "mission" && (
                <motion.div 
                  key="mission"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="tab-pane"
                >
                  <h2>Empowering Your Travel Dreams</h2>
                  <p>
                    Our mission is to make extraordinary travel experiences accessible to everyone. We believe that travel has the power to transform lives, broaden perspectives, and create lasting memories. Through careful planning, personalized service, and deep destination knowledge, we ensure every journey is nothing short of exceptional.
                  </p>
                  <div className="mission-highlights">
                    {[
                      { icon: "✈️", title: "Seamless Planning", text: "From booking to return, we handle every detail" },
                      { icon: "🎯", title: "Personalized Experience", text: "Tailored journeys that match your unique preferences" },
                      { icon: "🌟", title: "Exceptional Service", text: "24/7 support throughout your travel journey" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="highlight-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="highlight-icon">{item.icon}</span>
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "vision" && (
                <motion.div 
                  key="vision"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="tab-pane"
                >
                  <h2>Redefining the Future of Travel</h2>
                  <p>
                    We envision a world where travel is not just a destination, but a transformative experience that enriches lives and fosters global understanding. Our goal is to be the leading travel company that combines innovation, sustainability, and authentic cultural connections to create journeys that matter.
                  </p>
                  <div className="vision-goals">
                    {[
                      { icon: "🚀", title: "Innovation", text: "Leveraging technology to enhance travel experiences" },
                      { icon: "🌍", title: "Global Impact", text: "Creating positive change through responsible tourism" },
                      { icon: "🤝", title: "Community", text: "Building a global family of passionate travelers" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="goal-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <h4>{item.icon} {item.title}</h4>
                        <p>{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div 
                  key="values"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="tab-pane"
                >
                  <h2>The Principles That Guide Us</h2>
                  <div className="values-grid">
                    {values.map((value, index) => (
                      <motion.div 
                        key={index} 
                        className="value-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="value-icon">{value.icon}</div>
                        <h3>{value.title}</h3>
                        <p>{value.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="container">
          <motion.div 
            className="section-header"
            {...fadeInUp}
          >
            <h2>Meet Our Team</h2>
            <p>The passionate people behind your perfect travel experiences</p>
          </motion.div>

          <motion.div 
            className="team-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="team-card"
                variants={fadeInUp}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p>{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of happy travelers who have discovered the world with TravelTail</p>
            <Link to="/destinations" className="cta-btn">
              Explore Destinations
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;