import React, { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  // Mock Data states
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "user", joined: "2026-03-20" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", joined: "2026-03-21" },
    { id: 3, name: "Charlie Davis", email: "charlie@example.com", role: "admin", joined: "2026-03-22" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user" });

  const stats = [
    { label: "Total Users", value: users.length.toString(), trend: "+12%" },
    { label: "Active Packages", value: "48", trend: "+5%" },
    { label: "Destinations", value: "156", trend: "+2%" },
    { label: "Revenue", value: "$84,500", trend: "+24%" }
  ];

  // Handlers for Users
  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "user" });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      // Create
      const newUser = {
        id: Date.now(),
        ...formData,
        joined: new Date().toISOString().split("T")[0]
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const renderOverview = () => (
    <div className="admin-overview">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <h3>{stat.label}</h3>
            <div className="stat-value">
              <span className="value">{stat.value}</span>
              <span className="trend positive">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity-section">
        <h3>Recent Registrations</h3>
        {renderUsersTable(users.slice(-3).reverse())}
      </div>
    </div>
  );

  const renderUsersTable = (usersData) => (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.length > 0 ? usersData.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
              <td>{user.joined}</td>
              <td>
                <button className="btn-action edit" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn-action delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderUsersTab = () => (
    <div className="admin-users-tab">
      {renderUsersTable(users)}
    </div>
  );

  const renderPlaceholder = (title) => (
    <div className="placeholder-content">
      <h2>Manage {title}</h2>
      <p>This module is currently under construction.</p>
    </div>
  );

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>TravelTail <span>Admin</span></h2>
        </div>
        <nav className="sidebar-nav">
          {["Overview", "Users", "Packages", "Destinations", "Settings"].map((tab) => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={() => window.location.href = "/"}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <header className="admin-header">
          <div className="header-search">
            <input type="text" placeholder="Search anything..." />
          </div>
          <div className="header-profile">
            <div className="avatar">A</div>
            <span>Admin User</span>
          </div>
        </header>

        <div className="admin-content-area">
          <div className="content-header">
            <h1>{activeTab}</h1>
            {(activeTab === "Users" || activeTab === "Overview") && (
              <button className="btn-primary-add" onClick={handleAddNew}>+ Add New User</button>
            )}
            {activeTab === "Packages" && <button className="btn-primary-add">+ Add Package</button>}
            {activeTab === "Destinations" && <button className="btn-primary-add">+ Add Destination</button>}
          </div>

          {activeTab === "Overview" && renderOverview()}
          {activeTab === "Users" && renderUsersTab()}
          {activeTab !== "Overview" && activeTab !== "Users" && renderPlaceholder(activeTab)}
        </div>
      </main>

      {/* User Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>{editingUser ? "Edit User Profile" : "Add New User"}</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
