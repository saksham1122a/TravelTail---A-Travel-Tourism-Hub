import React, { useState, useEffect } from "react";
import "./Packages.css";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../src/config/api";
import { useDestinations } from "../src/context/DestinationContext";
import { getFrontendPackages } from "../src/components/Packages";

const Packages = () => {
  const { destinations, isLoading: destLoading } = useDestinations();
  const packages = getFrontendPackages("person");
  
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingBookings(false);
      }
    };
    fetchBookings();
  }, []);

  const destinationBookings = bookings.filter(b => b.itemType === "destination");
  const packageBookings = bookings.filter(b => b.itemType === "package");

  return (
    <div className="admin-packages-container">
      <div className="packages-header-top">
        <h1>Overview Dashboard</h1>
      </div>

      {error && <div className="admin-error-banner"><p>⚠️ Error loading bookings: {error}</p></div>}

      <div className="partitions-layout">
        {/* Left Partition: Destinations */}
        <div className="partition partition-destinations">
          <div className="partition-header">
            <h2>🌍 Live Destinations</h2>
            <span className="live-badge">{destinations.length} Available</span>
          </div>
          <div className="partition-content">
            {destLoading ? (
              <div className="loading-state">
                <div className="loader"></div>
                <p>Loading destinations...</p>
              </div>
            ) : destinations.length === 0 ? (
               <div className="empty-state">No destinations found.</div>
            ) : (
              <div className="item-list">
                <AnimatePresence>
                  {destinations.map(dest => {
                    // Find bookings for this destination
                    const destBooks = destinationBookings.filter(
                      b => b.itemName.toLowerCase() === dest.name.toLowerCase()
                    );
                    
                    return (
                      <motion.div 
                        key={dest._id} 
                        className="main-item-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="main-item-header">
                           <div className="main-item-info">
                             <img src={dest.image} alt={dest.name} className="main-item-img" />
                             <div>
                               <h3>{dest.name}</h3>
                               <span className="category-label">{dest.category}</span>
                             </div>
                           </div>
                           <div className="booking-stats">
                              {destBooks.length} Booking{destBooks.length !== 1 ? 's' : ''}
                           </div>
                        </div>

                        {destBooks.length > 0 && (
                          <div className="nested-bookings-list">
                            <h4>Recent Bookings</h4>
                            {destBooks.map(b => (
                              <div key={b._id} className="nested-booking-item">
                                <div className="nested-top">
                                  <span className="nested-customer"><i className="fas fa-user"></i> {b.customerName}</span>
                                  <span className={`status-dot status-${b.status.toLowerCase()}`}></span>
                                </div>
                                <div className="nested-bottom">
                                  <span className="nested-detail"><i className="fas fa-tag"></i> {b.amount}</span>
                                  <span className="nested-detail"><i className="fas fa-credit-card"></i> {b.paymentMethod}</span>
                                  <span className="nested-detail"><i className="fas fa-calendar"></i> {new Date(b.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {destBooks.length === 0 && (
                          <div className="no-bookings-txt">No bookings yet for this destination.</div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Right Partition: Packages */}
        <div className="partition partition-packages">
          <div className="partition-header">
            <h2>📦 Active Packages</h2>
            <span className="live-badge">{packages.length} Available</span>
          </div>
          <div className="partition-content">
            <div className="item-list">
              <AnimatePresence>
                {packages.map((pkg) => {
                   // Find bookings for this package
                   const pkgBooks = packageBookings.filter(
                     b => b.itemName.toLowerCase() === pkg.name.toLowerCase()
                   );

                   return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={pkg.id}
                      className="main-item-card"
                    >
                      <div className="main-item-header">
                        <div className="main-item-info">
                           <div className="pkg-icon-placeholder">📦</div>
                           <div>
                             <h3>{pkg.name}</h3>
                             <span className="category-label">{pkg.type} Package</span>
                           </div>
                        </div>
                        <div className="booking-stats">
                           {pkgBooks.length} Booking{pkgBooks.length !== 1 ? 's' : ''}
                        </div>
                      </div>

                      {pkgBooks.length > 0 && (
                        <div className="nested-bookings-list">
                          <h4>Recent Bookings</h4>
                          {pkgBooks.map(b => (
                            <div key={b._id} className="nested-booking-item">
                              <div className="nested-top">
                                <span className="nested-customer"><i className="fas fa-user"></i> {b.customerName}</span>
                                <span className={`status-dot status-${b.status.toLowerCase()}`}></span>
                              </div>
                              <div className="nested-bottom">
                                {b.destinationName && (
                                  <span className="nested-detail" style={{color: '#4f46e5', fontWeight: 600}}>
                                    <i className="fas fa-map-marker-alt"></i> {b.destinationName}
                                  </span>
                                )}
                                <span className="nested-detail"><i className="fas fa-tag"></i> {b.amount}</span>
                                <span className="nested-detail"><i className="fas fa-calendar"></i> {new Date(b.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {pkgBooks.length === 0 && (
                         <div className="no-bookings-txt">No bookings yet for this package.</div>
                      )}
                    </motion.div>
                   )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Activity Below Partitions */}
      <div className="new-bookings-section">
        <div className="new-bookings-header">
          <h2>🕒 Recent Bookings Activity</h2>
          <span className="live-badge">{bookings.length} Total Bookings</span>
        </div>
        <div className="new-bookings-list">
          {isLoadingBookings ? (
            <div className="loading-state">
              <div className="loader"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="empty-state">No new bookings found in the system.</div>
          ) : (
            <AnimatePresence>
              {bookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="new-booking-card"
                >
                  <div className="nb-card-left">
                    <div className={`nb-icon-type nb-${booking.itemType}`}>
                      {booking.itemType === 'destination' ? '🌍' : '📦'}
                    </div>
                    <div className="nb-info-main">
                      <h4>{booking.itemName}</h4>
                      <p>
                        Booked by <strong>{booking.customerName}</strong>
                        <br />
                        <span className="nb-email">({booking.customerEmail})</span>
                      </p>
                    </div>
                  </div>
                  <div className="nb-card-right">
                    <div className="nb-detail">
                      <span><i className="fas fa-calendar-alt"></i> Date</span>
                      <strong>{new Date(booking.createdAt).toLocaleDateString()}</strong>
                    </div>
                    {booking.destinationName && (
                      <div className="nb-detail">
                        <span><i className="fas fa-map-marker-alt"></i> Location</span>
                        <strong>{booking.destinationName}</strong>
                      </div>
                    )}
                    <div className="nb-detail">
                      <span><i className="fas fa-tag"></i> Amount</span>
                      <strong style={{color: 'var(--primary-color)'}}>{booking.amount}</strong>
                    </div>
                    <div className="nb-detail">
                      <span>Status</span>
                      <span className={`status-badge status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
