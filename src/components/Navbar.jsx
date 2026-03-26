import { useState } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="nav-logo">
        <Link to="/">TravelTail</Link>
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

      <div className="nav-actions">
        <Link to="/login" className="btn-outline">
          Login
        </Link>
        <Link to="/signup" className="btn-primary">
          Sign Up
        </Link>
      </div>

      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;