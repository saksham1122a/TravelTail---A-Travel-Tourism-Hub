import React from "react";
import "./Packages.css";
import { motion, AnimatePresence } from "framer-motion";
import { useDestinations } from "../src/context/DestinationContext";
import { getFrontendPackages } from "../src/components/Packages";

const Packages = () => {
  const { destinations, isLoading: destLoading } = useDestinations();
  const packages = getFrontendPackages("person");

  return (
    <div className="admin-packages-container">
      <div className="packages-header-top">
        <h1>Overview Dashboard</h1>
      </div>

      <div className="partitions-layout">
        {/* Left Partition: Destinations */}
        <div className="partition partition-destinations">
          <div className="partition-header">
            <h2>🌍 Live Destinations</h2>
            <span className="live-badge">Real-Time Data</span>
          </div>
          <div className="partition-content">
            {destLoading ? (
              <div className="loading-state">Loading destinations...</div>
            ) : (
              <div className="mini-grid">
                {destinations.map(dest => (
                  <div key={dest._id} className="mini-card dest-card">
                    <img src={dest.image} alt={dest.name} />
                    <div className="mini-card-info">
                      <h4>{dest.name}</h4>
                      <p>{dest.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Partition: Packages */}
        <div className="partition partition-packages">
          <div className="partition-header">
            <h2>📦 Active Packages</h2>
            <span className="live-badge" style={{background: "#e0e7ff", color: "#4338ca", borderColor: "#c7d2fe"}}>Frontend Data</span>
          </div>
          
          <div className="partition-content">
            <div className="mini-grid">
              <AnimatePresence>
                {packages.map((pkg) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={pkg.id}
                    className="mini-card pkg-card"
                  >
                    <div className="pkg-image-wrapper" style={{width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', padding: '1rem'}}>
                      <span style={{fontSize: '2rem'}}>🧳</span>
                    </div>
                    <div className="mini-card-info">
                      <h4>{pkg.name}</h4>
                      <p className="destination">{pkg.type} Package</p>
                      <div className="card-meta">
                        <span>{pkg.duration}</span>
                        <span className="price">{pkg.price}</span>
                      </div>
                      <div className="actions" style={{gap: '0.25rem', marginTop: '0.25rem'}}>
                        {pkg.features.slice(0, 2).map((feat, i) => (
                          <span key={i} style={{fontSize: '0.7rem', background: '#cbd5e1', padding: '0.2rem 0.4rem', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>✓ {feat}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
