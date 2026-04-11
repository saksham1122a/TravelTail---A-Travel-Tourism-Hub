import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDestinations } from "../context/DestinationContext";
import PaymentModal from "./PaymentModal";
import LoginPromptModal from "./LoginPromptModal";
import "../StyleSheets/Packages.css";

export const getFrontendPackages = (billingCycle) => [
  {
    id: 1,
    name: "Weekend Getaway",
    type: "Basic",
    price: billingCycle === "person" ? "$299" : "$499",
    billing: billingCycle === "person" ? "/ person" : "/ couple",
    duration: "3 Days, 2 Nights",
    featured: false,
    features: [
      "3-Star Hotel Accommodation",
      "Round-trip Airport Transfers",
      "Daily Breakfast",
      "Half-day City Tour",
      "24/7 Phone Support"
    ]
  },
  {
    id: 2,
    name: "Tropical Escape",
    type: "Popular",
    price: billingCycle === "person" ? "$799" : "$1,399",
    billing: billingCycle === "person" ? "/ person" : "/ couple",
    duration: "7 Days, 6 Nights",
    featured: true,
    badgeText: "Best Value",
    features: [
      "4-Star Beachfront Resort",
      "All Flights & Transfers",
      "All-inclusive Meals & Drinks",
      "2 Guided Excursions",
      "Snorkeling Gear Rental",
      "Spa Discount (20%)"
    ]
  },
  {
    id: 3,
    name: "Luxury Retreat",
    type: "Premium",
    price: billingCycle === "person" ? "$1,899" : "$3,499",
    billing: billingCycle === "person" ? "/ person" : "/ couple",
    duration: "10 Days, 9 Nights",
    featured: false,
    features: [
      "5-Star Luxury Villa",
      "First-class Flight Upgrades",
      "Private Chef & Dining",
      "Private Yacht Tour (1 Day)",
      "VIP Fast-track Airport Entry",
      "Dedicated Concierge Service"
    ]
  }
];

const Packages = () => {
  const [billingCycle, setBillingCycle] = useState("person");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { destinations } = useDestinations();

  const handleBookNow = (pkg) => {
    if (!user) {
      setIsLoginPromptOpen(true);
      return;
    }
    // For packages, we pass the package object. 
    // We'll tell the modal that it's a package so it can offer destination selection.
    setSelectedPackage({ ...pkg, isPackage: true });
    setIsPaymentModalOpen(true);
  };

  const packages = getFrontendPackages(billingCycle);

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    hover: { 
      y: -10, 
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="packages-page">
      <div className="packages-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Curated Travel Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Find the perfect itinerary for your next adventure.
          </motion.p>
        </motion.div>
      </div>

      <div className="packages-content container">
        <motion.div 
          className="billing-toggle-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="billing-toggle">
            <button
              className={billingCycle === "person" ? "active" : ""}
              onClick={() => setBillingCycle("person")}
            >
              Per Person
            </button>
            <button
              className={billingCycle === "couple" ? "active" : ""}
              onClick={() => setBillingCycle("couple")}
            >
              For Couples
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="packages-grid"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.id} 
              className={`package-card ${pkg.featured ? "featured" : ""}`}
              variants={cardVariants}
              whileHover="hover"
            >
              {pkg.featured && (
                <motion.div 
                  className="package-badge"
                  initial={{ rotate: -15, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  {pkg.badgeText}
                </motion.div>
              )}
              
              <div className="package-header">
                <h4>{pkg.type}</h4>
                <h3>{pkg.name}</h3>
                <div className="package-price">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={pkg.price}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="amount"
                    >
                      {pkg.price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="billing">{pkg.billing}</span>
                </div>
                <div className="package-duration">
                  <span className="icon">⏱️</span> {pkg.duration}
                </div>
              </div>

              <div className="package-features">
                <ul>
                  {pkg.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="package-footer">
                <motion.button 
                  className={`btn-book ${pkg.featured ? "btn-primary" : "btn-outline"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookNow(pkg)}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        item={selectedPackage}
        destinations={destinations}
      />

      <LoginPromptModal 
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </div>
  );
};

export default Packages;
