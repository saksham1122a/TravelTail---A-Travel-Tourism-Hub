import React, { useState, useEffect } from "react";
import "./Destination.css";
import { motion, AnimatePresence } from "framer-motion";

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    rating: 0,
    isPopular: false,
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/destinations");
      if (res.ok) {
        const data = await res.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error("Failed to fetch destinations", error);
    }
  };

  const handleAddNew = () => {
    setEditingDestination(null);
    setFormData({
      name: "",
      location: "",
      description: "",
      image: "",
      rating: 0,
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (dest) => {
    setEditingDestination(dest);
    setFormData({
      name: dest.name,
      location: dest.location,
      description: dest.description,
      image: dest.image,
      rating: dest.rating,
      isPopular: dest.isPopular,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/destinations/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setDestinations(destinations.filter((d) => d._id !== id));
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
      const url = editingDestination
        ? `http://localhost:5000/api/destinations/${editingDestination._id}`
        : "http://localhost:5000/api/destinations";
      const method = editingDestination ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchDestinations();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  return (
    <div className="admin-destination-container">
      <div className="destination-header">
        <h1>Manage Destinations</h1>
        <button className="btn-add-primary" onClick={handleAddNew}>
          + Add New Destination
        </button>
      </div>

      <div className="destinations-grid">
        <AnimatePresence>
          {destinations.map((dest) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={dest._id}
              className="destination-card"
            >
              <div className="card-image">
                <img src={dest.image} alt={dest.name} />
                {dest.isPopular && <span className="popular-badge">Popular</span>}
              </div>
              <div className="card-details">
                <h3>{dest.name}</h3>
                <p className="location"><i className="fas fa-map-marker-alt"></i> {dest.location}</p>
                <p className="desc">{dest.description.substring(0, 80)}...</p>
                <div className="actions">
                  <button className="btn-explore-preview" onClick={() => window.open("/destinations", "_blank")}>Explore</button>
                  <button className="btn-edit" onClick={() => handleEdit(dest)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(dest._id)}>Delete</button>
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
            <h2>{editingDestination ? "Edit Destination" : "Add New Destination"}</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
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
              <div className="form-row">
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>
                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    />
                    Is Popular?
                  </label>
                </div>
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

export default Destination;
