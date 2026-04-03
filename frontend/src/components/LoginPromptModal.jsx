import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/LoginPromptModal.css";

const LoginPromptModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="login-prompt-overlay">
          {/* Backdrop */}
          <motion.div 
            className="login-prompt-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            className="login-prompt-modal"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button className="close-prompt-btn" onClick={onClose}>&times;</button>
            
            <div className="login-prompt-icon">
              <motion.div 
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="icon-circle"
              >
                ✈️
              </motion.div>
            </div>
            
            <h2 className="login-prompt-title">Unlock Your Journey</h2>
            <p className="login-prompt-desc">
              Please log in or create an account to book this amazing experience and manage your travel plans securely.
            </p>
            
            <div className="login-prompt-actions">
              <button 
                className="prompt-btn-login" 
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button 
                className="prompt-btn-signup" 
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginPromptModal;
