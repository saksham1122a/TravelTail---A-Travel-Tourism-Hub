import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDestinations } from "../context/DestinationContext";
import { useAuth } from "../context/AuthContext";
import PaymentModal from "./PaymentModal";
import LoginPromptModal from "./LoginPromptModal";
import "../StyleSheets/Destination.css";

const Destinations = () => {
  const { destinations, isLoading } = useDestinations();
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const { user } = useAuth();

  const handleBookNow = (dest) => {
    if (!user) {
      setIsLoginPromptOpen(true);
      return;
    }
    setSelectedDestination(dest);
    setIsPaymentModalOpen(true);
  };

  const categories = ["All", "Beaches", "Mountains", "Cities", "Cultural"];

  const filteredDestinations = destinations.filter(dest => 
    activeCategory === "All" || dest.category === activeCategory
  );

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Explore the World</h1>
          <p>Discover breathtaking destinations curated just for you.</p>
        </motion.div>
      </div>

      <div className="destinations-content container">
        <motion.div 
          className="filters-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          layout
          className="destinations-grid"
        >
          {isLoading ? (
            <div className="loader">Exploring destinations...</div>
          ) : (
            <AnimatePresence>
              {filteredDestinations.map((dest) => (
                <motion.div 
                  key={dest._id} 
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="destination-card"
                  whileHover={{ y: -10 }}
                >
                  <div className="card-image-wrapper">
                    <motion.img 
                      src={dest.image} 
                      alt={dest.name} 
                      loading="lazy" 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="card-badge">{dest.category}</div>
                  </div>
                  <div className="card-details">
                    <div className="card-header">
                      <h3>{dest.name}</h3>
                      <div className="rating">
                        <span className="star">★</span> {dest.rating} <span className="reviews">({dest.reviews})</span>
                      </div>
                    </div>
                    <p className="description">{dest.description}</p>
                    <div className="card-extra-info">
                      <span><i className="fas fa-clock"></i> {dest.duration}</span>
                      <span><i className="fas fa-plane"></i> {dest.transport}</span>
                    </div>
                    <div className="card-footer">
                      <span className="price">{dest.price}</span>
                      <div className="card-actions">
                        <motion.button 
                          className="btn-explore"
                          onClick={() => navigate(`/destinations/${dest._id}`)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Explore
                        </motion.button>
                        <motion.button 
                          className="btn-book"
                          onClick={() => handleBookNow(dest)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        destination={selectedDestination}
      />

      <LoginPromptModal 
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </div>
  );
};

export default Destinations;
