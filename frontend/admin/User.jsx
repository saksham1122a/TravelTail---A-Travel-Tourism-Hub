import React, { useState, useEffect } from "react";
import "./User.css";
import { motion } from "framer-motion";
import { API_BASE } from "../src/config/api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    role: "user", 
    avatar: "" 
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/users`, {
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
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setUsers(users.filter(u => u._id !== id));
        }
      } catch (error) {
        console.error("Delete error", error);
      }
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const url = editingUser 
        ? `${API_BASE}/api/users/${editingUser._id}`
        : `${API_BASE}/api/users`;
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchUsers();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  return (
    <div className="admin-user-container">
      <div className="user-header">
        <h1>User Management</h1>
        {/* <button className="btn-add-primary" onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>+ Add User</button> */}
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={user._id}
              >
                <td>
                  <div className="user-info">
                    <img src={user.avatar || "https://ui-avatars.com/api/?name=" + user.firstName} alt="" />
                    <span>{user.firstName} {user.lastName}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="admin-modal"
          >
            <h2>{editingUser ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default User;
