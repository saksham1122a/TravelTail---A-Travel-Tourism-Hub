import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../StyleSheets/Login.css";
import loginImage from "../assets/4.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      login(data.user, data.token);

      if (data.user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">

        {/* Left Side - Image */}
        <div className="login-image">
          <img src={loginImage} alt="Login" />
          <div className="image-overlay">
            <div className="overlay-content">
              <h2>Welcome Back to TravelTail</h2>
              <p>Your next adventure is just a login away</p>

              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon">🌍</div>
                  <div className="feature-text">
                    <h4>Explore the World</h4>
                    <p>Discover breathtaking destinations across the globe</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✈️</div>
                  <div className="feature-text">
                    <h4>Curated Packages</h4>
                    <p>Hand-picked travel experiences for every budget</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🛡️</div>
                  <div className="feature-text">
                    <h4>Safe & Secure</h4>
                    <p>Book with confidence using our secure platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-container">
          <div className="form-header">
            <h1>Sign In</h1>
            <p>Welcome back! Please enter your details.</p>
          </div>

          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="you@example.com"
                autoFocus
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "16px",
                    userSelect: "none",
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Options Row */}
            <div className="form-options">
              <div className="checkbox-group">
                <label className="checkbox-label" htmlFor="rememberMe">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="form-footer">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button type="button" className="social-btn google">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button type="button" className="social-btn facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;