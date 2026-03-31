import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../StyleSheets/PaymentModal.css";

const PaymentModal = ({ isOpen, onClose, destination }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: -20 },
    visible: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, y: 20 }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="payment-modal-overlay"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={handleClose}
      >
        <motion.div 
          className="payment-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{isSubmitted ? "Booking Confirmed!" : "Secure Checkout"}</h2>
            <button className="btn-close" onClick={handleClose}>&times;</button>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="order-summary">
                  <div className="summary-item">
                    <span className="label">Destination:</span>
                    <span className="value">{destination?.name}</span>
                  </div>
                  <div className="summary-item total">
                    <span className="label">Total Amount:</span>
                    <span className="value">{destination?.price}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="payment-form">
                  <div className="payment-method-toggle">
                    <button 
                      type="button" 
                      className={`method-btn ${paymentMethod === "card" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <i className="fas fa-credit-card"></i> Pay Online
                    </button>
                    <button 
                      type="button" 
                      className={`method-btn ${paymentMethod === "cash" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <i className="fas fa-money-bill-wave"></i> Pay on Arrival (Cash)
                    </button>
                  </div>

                  <div className="form-group full">
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>

                  <div className="form-group full">
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>

                  <AnimatePresence>
                    {paymentMethod === "card" && (
                      <motion.div 
                        className="card-details-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="form-group full">
                          <label>Card Number</label>
                          <div className="card-input-wrapper">
                            <i className="fas fa-credit-card"></i>
                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" required={paymentMethod === "card"} />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="text" placeholder="MM/YY" required={paymentMethod === "card"} />
                          </div>
                          <div className="form-group">
                            <label>CVV</label>
                            <input type="password" placeholder="XXX" required={paymentMethod === "card"} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button 
                    type="submit" 
                    className="btn-pay"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                      {paymentMethod === "card" ? `Pay ${destination?.price}` : "Confirm Booking"}
                  </motion.button>
                  <button type="button" className="btn-return" onClick={handleClose}>
                    Cancel & Return
                  </button>

                  <p className="payment-disclaimer">
                    <i className="fas fa-lock"></i> All transactions are secure and encrypted.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                className="success-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Bon Voyage!</h3>
                <p>
                  Thank you! Your trip to <strong>{destination?.name}</strong> has been {paymentMethod === "card" ? "fully paid and confirmed" : "pre-confirmed with Cash on Delivery"}.
                </p>
                <div className="confirmation-details">
                  <div className="conf-item">
                    <span>Total Amount:</span>
                    <strong>{destination?.price}</strong>
                  </div>
                  <div className="conf-item">
                    <span>Booking ID:</span>
                    <strong>#TT-{Math.floor(Math.random() * 100000)}</strong>
                  </div>
                </div>
                <button className="btn-return-gallery" onClick={handleClose}>
                  Return to Destinations
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
