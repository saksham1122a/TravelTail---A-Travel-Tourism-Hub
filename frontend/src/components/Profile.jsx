import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../StyleSheets/Profile.css";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", 
    avatar: "",
    objectPosition: "center"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
        objectPosition: user.objectPosition || "center"
      });
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      // Update local context
      updateUser(data);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header-bg"></div>
      
      <div className="profile-content">
        <div className="profile-card">
          <div className={`profile-avatar-large ${isEditing ? 'editable' : ''}`}>
            {isEditing ? (
              <label htmlFor="avatar-upload" className="avatar-upload-label">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Avatar" style={{objectPosition: formData.objectPosition}} />
                ) : (
                  <div className="avatar-placeholder">
                    {user.firstName?.charAt(0).toUpperCase()}
                    <span>Change</span>
                  </div>
                )}
                <input 
                  type="file" 
                  id="avatar-upload" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{display: 'none'}} 
                />
              </label>
            ) : (
              user.avatar ? (
                <img src={user.avatar} alt="Avatar" style={{objectPosition: user.objectPosition || 'center'}} />
              ) : (
                user.firstName ? user.firstName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')
              )
            )}
          </div>
          
          <div className="profile-details">
            <h1 className="profile-title">{user.firstName} {user.lastName}</h1>
            <p className="profile-role">{user.role === 'admin' ? 'Administrator' : 'Traveler'}</p>
            
            {error && <div className="error-message general-error" style={{marginTop: '15px'}}>{error}</div>}

            {isEditing ? (
              <form className="profile-edit-form" onSubmit={handleUpdate} style={{marginTop: '2.5rem', textAlign: 'left'}}>
                <div className="profile-info-grid">
                  <div className="info-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="info-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                  <div className="info-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="info-group">
                    <label>Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  {formData.avatar && (
                    <div className="info-group" style={{gridColumn: 'span 2'}}>
                      <label>Photo Alignment</label>
                      <div className="position-toggle-group">
                        <button 
                          type="button" 
                          className={`pos-btn ${formData.objectPosition === 'top' ? 'active' : ''}`}
                          onClick={() => setFormData({...formData, objectPosition: 'top'})}
                        >Top</button>
                        <button 
                          type="button" 
                          className={`pos-btn ${formData.objectPosition === 'center' ? 'active' : ''}`}
                          onClick={() => setFormData({...formData, objectPosition: 'center'})}
                        >Center</button>
                        <button 
                          type="button" 
                          className={`pos-btn ${formData.objectPosition === 'bottom' ? 'active' : ''}`}
                          onClick={() => setFormData({...formData, objectPosition: 'bottom'})}
                        >Bottom</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="profile-actions">
                  <button type="button" className="btn-outline" onClick={handleEditToggle} style={{marginRight: '10px'}} disabled={isLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <>
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
                  <button className="btn-primary edit-profile-btn" onClick={handleEditToggle}>
                    Edit Profile
                  </button>
                </div>
              </>
            )}
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
