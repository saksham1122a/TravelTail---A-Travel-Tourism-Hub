import { useState } from "react";
import "../StyleSheets/Destination.css";

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Beaches", "Mountains", "Cities", "Cultural"];

  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      rating: 4.8,
      reviews: "1.2k",
      description: "Experience tropical paradise with pristine beaches, ancient temples, and vibrant culture.",
      price: "From $899"
    },
    {
      id: 2,
      name: "Swiss Alps, Switzerland",
      category: "Mountains",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
      rating: 4.9,
      reviews: "2.5k",
      description: "Majestic snow-capped peaks perfect for skiing, hiking, and breathtaking views.",
      price: "From $1,299"
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      category: "Cities",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      rating: 4.9,
      reviews: "3.1k",
      description: "A mesmerizing blend of neon-lit skyscrapers, historic temples, and incredible cuisine.",
      price: "From $1,499"
    },
    {
      id: 4,
      name: "Santorini, Greece",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
      rating: 4.7,
      reviews: "1.8k",
      description: "Iconic white-washed buildings overlooking the crystal-clear Aegean Sea.",
      price: "From $1,199"
    },
    {
      id: 5,
      name: "Machu Picchu, Peru",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
      rating: 4.9,
      reviews: "4.2k",
      description: "Explore the ancient Incan citadel set high in the Andes Mountains.",
      price: "From $999"
    },
    {
      id: 6,
      name: "New York City, USA",
      category: "Cities",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
      rating: 4.8,
      reviews: "5.5k",
      description: "The city that never sleeps, featuring world-class shows, dining, and iconic sights.",
      price: "From $850"
    }
  ];

  const filteredDestinations = destinations.filter(dest => 
    activeCategory === "All" || dest.category === activeCategory
  );

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <div className="hero-content">
          <h1>Explore the World</h1>
          <p>Discover breathtaking destinations curated just for you.</p>
        </div>
      </div>

      <div className="destinations-content container">
        <div className="filters-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="destinations-grid">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="destination-card">
              <div className="card-image-wrapper">
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <div className="card-badge">{dest.category}</div>
              </div>
              <div className="card-details">
                <div className="card-header">
                  <h3>{dest.name}</h3>
                  <div className="rating">
                    <span className="star">★</span> {dest.rating} <span className="reviews">({dest.reviews})</span>
                  </div>
                </div>
                <p className="description">{dest.description}</p>
                <div className="card-footer">
                  <span className="price">{dest.price}</span>
                  <button className="btn-primary">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
