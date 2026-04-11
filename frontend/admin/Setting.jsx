import React, { useState } from "react";
import "./setting.css";
import { motion, AnimatePresence } from "framer-motion";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");
    // Mock network request delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 1200);
  };

  const renderGeneral = () => (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{opacity: 0, x: -10}} className="settings-section">
      <div className="settings-header">
        <h2>General Settings</h2>
        <p>Manage your website's core configuration and identity.</p>
      </div>
      <form onSubmit={handleSave} className="settings-form">
        <div className="form-group">
          <label>Website Name</label>
          <input type="text" defaultValue="TravelTail" required />
        </div>
        <div className="form-group">
          <label>Support Email</label>
          <input type="email" defaultValue="support@traveltail.com" required />
        </div>
        <div className="form-group">
          <label>Contact Phone Number</label>
          <input type="text" defaultValue="+1 (555) 123-4567" />
        </div>
        <div className="form-group checkbox-group">
          <label className="switch-label">
            <input type="checkbox" />
            Maintenance Mode (Disable public access)
          </label>
        </div>
        <button type="submit" className="btn-save" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{opacity: 0, x: -10}} className="settings-section">
      <div className="settings-header">
        <h2>Admin Profile</h2>
        <p>Update your personal administrator information and security.</p>
      </div>
      <form onSubmit={handleSave} className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" defaultValue="Admin" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" defaultValue="User" required />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" defaultValue="admin@traveltail.com" required />
        </div>
        <div className="form-group">
          <label>New Password (leave blank to keep current)</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button type="submit" className="btn-save" disabled={isSaving}>
          {isSaving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </motion.div>
  );

  const renderNotifications = () => (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{opacity: 0, x: -10}} className="settings-section">
      <div className="settings-header">
        <h2>Notification Preferences</h2>
        <p>Control what emails and system alerts you receive.</p>
      </div>
      <form onSubmit={handleSave} className="settings-form">
        <div className="form-group checkbox-group">
          <label className="switch-label">
            <input type="checkbox" defaultChecked />
            New User Registrations
          </label>
        </div>
        <div className="form-group checkbox-group">
          <label className="switch-label">
            <input type="checkbox" defaultChecked />
            New Package Bookings Alerts
          </label>
        </div>
        <div className="form-group checkbox-group">
          <label className="switch-label">
            <input type="checkbox" />
            System Performance Reports
          </label>
        </div>
        <button type="submit" className="btn-save" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Preferences"}
        </button>
      </form>
    </motion.div>
  );

  return (
    <div className="admin-settings-container">
      <div className="settings-sidebar">
        <ul>
          <li className={activeTab === "General" ? "active" : ""} onClick={() => setActiveTab("General")}>
            <i className="fas fa-sliders-h"></i> General
          </li>
          <li className={activeTab === "Profile" ? "active" : ""} onClick={() => setActiveTab("Profile")}>
            <i className="fas fa-user-circle"></i> Profile
          </li>
          <li className={activeTab === "Notifications" ? "active" : ""} onClick={() => setActiveTab("Notifications")}>
            <i className="fas fa-bell"></i> Notifications
          </li>
        </ul>
      </div>
      <div className="settings-content">
        <AnimatePresence>
          {saveMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="save-message"
            >
              <i className="fas fa-check-circle"></i> {saveMessage}
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {activeTab === "General" && <React.Fragment key="general">{renderGeneral()}</React.Fragment>}
          {activeTab === "Profile" && <React.Fragment key="profile">{renderProfile()}</React.Fragment>}
          {activeTab === "Notifications" && <React.Fragment key="notifications">{renderNotifications()}</React.Fragment>}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Setting;
