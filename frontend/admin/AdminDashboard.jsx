import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Destination from "./Destination";
import Packages from "./Packages";
import User from "./User";
import { useDestinations } from "../src/context/DestinationContext";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const { destinations } = useDestinations();
  const [activeTab, setActiveTab] = useState("Overview");
  const [stats, setStats] = useState([
    { label: "Total Users", value: "0", trend: "+0%" },
    { label: "Active Packages", value: "0", trend: "+0%" },
    { label: "Destinations", value: "0", trend: "+0%" },
    { label: "Revenue", value: "$0", trend: "+0%" }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const [usersRes, pkgsRes] = await Promise.all([
          fetch("http://localhost:5001/api/users", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5001/api/packages")
        ]);

        if (usersRes.ok && pkgsRes.ok) {
          const users = await usersRes.json();
          const pkgs = await pkgsRes.json();

          setStats([
            { label: "Total Users", value: users.length.toString(), trend: "+12%" },
            { label: "Active Packages", value: pkgs.length.toString(), trend: "+5%" },
            { label: "Destinations", value: destinations.length.toString(), trend: "+2%" },
            { label: "Revenue", value: "$84,500", trend: "+24%" }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, [destinations]);


  const renderOverview = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="admin-overview"
    >
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            className="stat-card"
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          >
            <h3>{stat.label}</h3>
            <div className="stat-value">
              <span className="value">{stat.value}</span>
              <span className="trend positive">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="recent-activity-section">
        <h3>System Overview</h3>
        <div className="overview-chart-placeholder">
           {/* Chart or more stats could go here */}
           <div className="activity-placeholder-box">
             <p>Welcome to the Admin Dashboard. Use the sidebar to manage your application data.</p>
           </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            TravelTales <span>Admin</span>
          </motion.h2>
        </div>
        <nav className="sidebar-nav">
          {[
            { id: "Overview", icon: "📊" },
            { id: "Users", icon: "👥" },
            { id: "Packages", icon: "📦" },
            { id: "Destinations", icon: "📍" },
            { id: "Settings", icon: "⚙️" }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-text">{tab.id}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={() => window.location.href = "/"}>
             Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <header className="admin-header">
          <div className="header-search">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search anything..." />
          </div>
          <div className="header-profile">
            <div className="notifications">
              <span className="noti-badge"></span>
              🔔
            </div>
            <div className="profile-info">
              <div className="avatar">A</div>
              <span>Admin User</span>
            </div>
          </div>
        </header>

        <div className="admin-content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "Overview" && renderOverview()}
              {activeTab === "Users" && <User />}
              {activeTab === "Packages" && <Packages />}
              {activeTab === "Destinations" && <Destination />}
              {activeTab === "Settings" && (
                <div className="placeholder-content">
                  <h2>Settings</h2>
                  <p>Configuration panel coming soon.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
