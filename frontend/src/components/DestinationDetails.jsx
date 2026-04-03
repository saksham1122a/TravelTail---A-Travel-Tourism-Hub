import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PaymentModal from "./PaymentModal";
import LoginPromptModal from "./LoginPromptModal";
import { API_BASE } from "../config/api";
import { useAuth } from "../context/AuthContext";
import "../StyleSheets/DestinationDetails.css";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const handleBookNow = () => {
    if (!user) {
      setIsLoginPromptOpen(true);
      return;
    }
    setIsPaymentModalOpen(true);
  };

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE}/api/destinations/${id}`);
        if (res.ok) {
          const data = await res.json();
          setDestination(data);
        }
      } catch (error) {
        console.error("Failed to fetch destination details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestination();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <div className="loading">Exploring destination details...</div>;
  }

  if (!destination) {
    return (
      <div className="loading">
        <h2>Destination not found</h2>
        <button className="btn-back" onClick={() => navigate("/destinations")}>Back to Gallery</button>
      </div>
    );
  }

  return (
    <div className="destination-details-page">
      <motion.div 
        className="details-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${destination.image})` }}
      >
        <div className="container">
          <motion.div 
            className="hero-text"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="category-tag">{destination.category}</span>
            <h1>{destination.name}</h1>
            <div className="meta-info">
              <span>★ {destination.rating} ({destination.reviews} reviews)</span> | 
              <span><i className="fas fa-clock"></i> {destination.duration}</span> | 
              <span><i className="fas fa-plane"></i> {destination.transport}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="details-content container">
        <div className="main-info">
          <section className="overview">
            <h2>Overview</h2>
            <p className="long-desc">{destination.longDescription}</p>
          </section>

          {destination.highlights && destination.highlights.length > 0 && (
            <section className="highlights">
              <h2>Tour Highlights</h2>
              <div className="highlights-grid">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="highlight-item">
                    <i className="fas fa-check-circle"></i> {h}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="booking-sidebar">
          <div className="booking-card">
            <div className="card-header">
              <span className="price-label">Price from</span>
              <span className="price-amount">{destination.price}</span>
            </div>
            <p className="price-info">Per person inclusive of taxes</p>
            <button className="btn-book-now" onClick={handleBookNow}>
              Book Now
            </button>
            <div className="extra-benefits">
                <div className="benefit">
                    <i className="fas fa-shield-alt"></i> <span>Secure Checkout</span>
                </div>
                <div className="benefit">
                    <i className="fas fa-calendar-alt"></i> <span>Flexible Dates</span>
                </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="navigation-actions container">
          <button className="btn-back" onClick={() => navigate("/destinations")}>
              <i className="fas fa-arrow-left"></i> Back to Destinations
          </button>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        destination={destination}
      />

      <LoginPromptModal 
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </div>
  );
};

export default DestinationDetails;
