import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import "../StyleSheets/Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();



  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="TravelTail Logo" className="logo-img" />
          <span>TravelTail</span>
        </Link>
      </div>

      <nav className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </Link>
        <Link to="/destinations" onClick={() => setIsMobileMenuOpen(false)}>
          Destinations
        </Link>
        <Link to="/packages" onClick={() => setIsMobileMenuOpen(false)}>
          Packages
        </Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
          About
        </Link>
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
          Contact
        </Link>
      </nav>

      {user ? (
        <div className="profile-menu-container">
          <div 
            className="user-avatar" 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
            ) : (
              user.firstName ? user.firstName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')
            )}
          </div>
          
          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <p className="profile-name">
                  {user.firstName} {user.lastName}
                </p>
                <p className="profile-email">{user.email}</p>
              </div>
              <div className="profile-items">
                <Link 
                  to="/profile" 
                  className="profile-link"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  My Profile
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="profile-link"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  className="profile-logout-btn" 
                  onClick={() => {
                    handleLogout();
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="nav-actions">
          <Link to="/login" className="btn-outline">
            Login
          </Link>
          <Link to="/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>
      )}

      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;