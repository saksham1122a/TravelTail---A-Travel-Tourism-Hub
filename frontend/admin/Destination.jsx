import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDestinations } from "../src/context/DestinationContext";
import { API_BASE } from "../src/config/api";
import "./Destination.css";

const Destination = () => {
  const { destinations, refreshDestinations } = useDestinations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "General",
    location: "",
    description: "",
    longDescription: "",
    image: "",
    rating: 0,
    reviews: "0",
    price: "",
    duration: "",
    transport: "",
    highlights: "",
    isPopular: false,
  });

  const handleAddNew = () => {
    setEditingDestination(null);
    setFormData({
      name: "",
      category: "General",
      location: "",
      description: "",
      longDescription: "",
      image: "",
      rating: 0,
      reviews: "0",
      price: "",
      duration: "",
      transport: "",
      highlights: "",
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (dest) => {
    setEditingDestination(dest);
    setFormData({
      name: dest.name,
      category: dest.category || "General",
      location: dest.location,
      description: dest.description,
      longDescription: dest.longDescription || "",
      image: dest.image,
      rating: dest.rating,
      reviews: dest.reviews || "0",
      price: dest.price || "",
      duration: dest.duration || "",
      transport: dest.transport || "",
      highlights: dest.highlights ? dest.highlights.join(", ") : "",
      isPopular: dest.isPopular,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/destinations/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          refreshDestinations();
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
      const url = editingDestination
        ? `${API_BASE}/api/destinations/${editingDestination._id}`
        : `${API_BASE}/api/destinations`;
      const method = editingDestination ? "PUT" : "POST";


      const submissionData = {
        ...formData,
        highlights: typeof formData.highlights === "string" 
          ? formData.highlights.split(",").map(h => h.trim()).filter(h => h !== "")
          : formData.highlights
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        refreshDestinations();
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
                <div className="badges">
                  {dest.isPopular && <span className="popular-badge">Popular</span>}
                  <span className="category-badge">{dest.category}</span>
                </div>
              </div>
              <div className="card-details">
                <div className="card-title-row">
                  <h3>{dest.name}</h3>
                  <span className="rating"><i className="fas fa-star"></i> {dest.rating}</span>
                </div>
                <p className="location"><i className="fas fa-map-marker-alt"></i> {dest.location}</p>
                <div className="meta-details">
                   <span><i className="fas fa-clock"></i> {dest.duration}</span>
                   <span><i className="fas fa-tag"></i> {dest.price}</span>
                </div>
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
                  <label>Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              </div>

              <div className="form-group">
                <label>Brief Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Long Description (for Detail Page)</label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$000"
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="X Days"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Transport Info</label>
                  <input
                    type="text"
                    value={formData.transport}
                    onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Highlights (Comma separated)</label>
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="Temple visit, Snorkeling, Sunset tour"
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  />
                  Mark as Popular Destination
                </label>
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
