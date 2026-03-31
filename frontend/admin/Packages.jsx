import React, { useState, useEffect } from "react";
import "./Packages.css";
import { motion, AnimatePresence } from "framer-motion";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/packages");
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (error) {
      console.error("Failed to fetch packages", error);
    }
  };

  const handleAddNew = () => {
    setEditingPackage(null);
    setFormData({
      title: "",
      destination: "",
      duration: "",
      price: "",
      image: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (p) => {
    setEditingPackage(p);
    setFormData({
      title: p.title,
      destination: p.destination,
      duration: p.duration,
      price: p.price,
      image: p.image,
      description: p.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/packages/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setPackages(packages.filter((p) => p._id !== id));
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
      const url = editingPackage
        ? `http://localhost:5000/api/packages/${editingPackage._id}`
        : "http://localhost:5000/api/packages";
      const method = editingPackage ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchPackages();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  return (
    <div className="admin-packages-container">
      <div className="packages-header">
        <h1>Manage Tour Packages</h1>
        <button className="btn-add-primary" onClick={handleAddNew}>
          + Add New Package
        </button>
      </div>

      <div className="packages-grid">
        <AnimatePresence>
          {packages.map((pkg) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={pkg._id}
              className="package-card"
            >
              <div className="card-image">
                <img src={pkg.image} alt={pkg.title} />
              </div>
              <div className="card-details">
                <h3>{pkg.title}</h3>
                <p className="destination">{pkg.destination}</p>
                <div className="card-meta">
                  <span>{pkg.duration}</span>
                  <span className="price">${pkg.price}</span>
                </div>
                <div className="actions">
                  <button className="btn-edit" onClick={() => handleEdit(pkg)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(pkg._id)}>Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-modal"
          >
            <h2>{editingPackage ? "Edit Package" : "Add New Package"}</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Destination</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Packages;
