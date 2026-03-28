import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", role: "user", avatar: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const stats = [
    { label: "Total Users", value: users.length.toString(), trend: "+12%" },
    { label: "Active Packages", value: "48", trend: "+5%" },
    { label: "Destinations", value: "156", trend: "+2%" },
    { label: "Revenue", value: "$84,500", trend: "+24%" }
  ];

  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({ firstName: "", lastName: "", email: "", role: "user", avatar: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ 
      firstName: user.firstName || "", 
      lastName: user.lastName || "", 
      email: user.email, 
      role: user.role,
      avatar: user.avatar || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setUsers(users.filter(u => u._id !== id));
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Delete error", error);
      }
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      if (editingUser) {
        // Update user
        const res = await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const updatedUser = await res.json();
          setUsers(users.map(u => u._id === editingUser._id ? updatedUser : u));
        } else {
          const data = await res.json();
          alert(data.message || "Failed to update user");
        }
      } else {
        // Create user
        const res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const newUser = await res.json();
          setUsers([...users, newUser]);
        } else {
          const data = await res.json();
          alert(data.message || "Failed to add user");
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Submit error", error);
      alert("Something went wrong");
    }
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
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
              <td>{user.createdAt ? user.createdAt.substring(0, 10) : 'N/A'}</td>
              <td>
                <button className="btn-action edit" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn-action delete" onClick={() => handleDelete(user._id)}>Delete</button>
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
                <label>First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName} 
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
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
              <div className="form-group">
                <label>Avatar URL</label>
                <input 
                  type="text" 
                  value={formData.avatar} 
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})} 
                  placeholder="https://example.com/photo.jpg"
                />
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
