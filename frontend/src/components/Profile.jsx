import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header-bg"></div>
      
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-large">
            {user.firstName ? user.firstName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
          </div>
          
          <div className="profile-details">
            <h1 className="profile-title">{user.firstName} {user.lastName}</h1>
            <p className="profile-role">{user.role === 'admin' ? 'Administrator' : 'Traveler'}</p>
            
            <div className="profile-info-grid">
              <div className="info-group">
                <label>First Name</label>
                <div className="info-value">{user.firstName || "N/A"}</div>
              </div>
              <div className="info-group">
                <label>Last Name</label>
                <div className="info-value">{user.lastName || "N/A"}</div>
              </div>
              <div className="info-group">
                <label>Email Address</label>
                <div className="info-value">{user.email || "N/A"}</div>
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                <div className="info-value">{user.phone || "Not provided"}</div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn-primary edit-profile-btn" onClick={() => alert("Edit profile feature coming soon!")}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>Trips Booked</h3>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-card">
            <h3>Saved Places</h3>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-card">
            <h3>Reviews</h3>
            <div className="stat-value">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
