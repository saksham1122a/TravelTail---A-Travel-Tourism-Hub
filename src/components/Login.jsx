import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../StyleSheets/Login.css";
import loginImage from "../assets/4.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Login data:", formData);
      navigate("/");
    } catch (error) {
      setErrors({ general: "Login failed. Please check your credentials." });
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
              <h2>Welcome Back</h2>
              <p>Sign in to access your travel dashboard and continue your journey with TravelTail</p>
              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4>Book Your Dream Trip</h4>
                    <p>Access exclusive deals and destinations</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4>Manage Bookings</h4>
                    <p>View and modify your travel plans</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.9142 16.3421C15.2496 15.7626 14.7134 15.0232 14.3451 14.1716C13.9767 13.3199 13.7893 12.3913 13.803 11.4618C13.8167 10.5323 14.031 9.60922 14.4231 8.75645C14.8152 7.90368 15.3697 7.16306 16.049 6.58579C16.7283 6.00851 17.5446 5.6087 18.4142 5.41421C19.2838 5.21973 20.1672 5.21973 21.0366 5.41421C21.9061 5.6087 22.7224 6.00851 23.4017 6.58579C24.0809 7.16306 24.6355 7.90368 25.0276 8.75645C25.4197 9.60922 25.634 10.5323 25.6477 11.4618C25.6613 12.3913 25.4739 13.3199 25.1056 14.1716C24.7372 15.0232 24.201 15.7626 23.5364 16.3421C22.8719 16.9217 22.4506 17.9391 22.4506 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 21V12C8 10.9391 7.57857 9.92172 6.91421 9.34215C6.24985 8.76257 5.71354 8.02318 5.34515 7.17157C4.97676 6.31996 4.78934 5.3913 4.80302 4.46183C4.8167 3.53236 5.03098 2.60922 5.42315 1.75645C5.81532 0.90368 6.36985 0.163064 7.04904 -0.414214C7.72823 -0.991492 8.54451 -1.3913 9.41421 -1.58579C10.2839 -1.78027 11.1672 -1.78027 12.0366 -1.58579C12.9061 -1.3913 13.7224 -0.991492 14.4017 -0.414214C15.0809 0.163064 15.6355 0.90368 16.0276 1.75645C16.4197 2.60922 16.634 3.53236 16.6477 4.46183C16.6613 5.3913 16.4739 6.31996 16.1056 7.17157C15.7372 8.02318 15.201 8.76257 14.5364 9.34215C13.8719 9.92172 13.4506 10.9391 13.4506 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4>24/7 Support</h4>
                    <p>Get help whenever you need it</p>
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
            <p>Welcome back! Please enter your details</p>
          </div>

          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <div className="checkbox-group">
                <label className="checkbox-label">
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

            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  Sign In
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </div>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button type="button" className="social-btn google">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button type="button" className="social-btn facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
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