import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PaymentModal from "./PaymentModal";
import "../StyleSheets/Destination.css";

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleBookNow = (dest) => {
    setSelectedDestination(dest);
    setIsPaymentModalOpen(true);
  };

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
      price: "$899",
      duration: "5 Days",
      transport: "Flight included"
    },
    {
      id: 2,
      name: "Swiss Alps, Switzerland",
      category: "Mountains",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
      rating: 4.9,
      reviews: "2.5k",
      description: "Majestic snow-capped peaks perfect for skiing, hiking, and breathtaking views.",
      price: "$1,299",
      duration: "7 Days",
      transport: "Train & Flight"
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      category: "Cities",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      rating: 4.9,
      reviews: "3.1k",
      description: "A mesmerizing blend of neon-lit skyscrapers, historic temples, and incredible cuisine.",
      price: "$1,499",
      duration: "6 Days",
      transport: "Local Transport"
    },
    {
      id: 4,
      name: "Santorini, Greece",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
      rating: 4.7,
      reviews: "1.8k",
      description: "Iconic white-washed buildings overlooking the crystal-clear Aegean Sea.",
      price: "$1,199",
      duration: "4 Days",
      transport: "Ferry & Flight"
    },
    {
      id: 5,
      name: "Machu Picchu, Peru",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
      rating: 4.9,
      reviews: "4.2k",
      description: "Explore the ancient Incan citadel set high in the Andes Mountains.",
      price: "$999",
      duration: "5 Days",
      transport: "Hiking & Train"
    },
    {
      id: 6,
      name: "Paris, France",
      category: "Cities",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      rating: 4.8,
      reviews: "3.9k",
      description: "The city of light, home to the Eiffel Tower, world-class art, and romantic cafes.",
      price: "$1,100",
      duration: "5 Days",
      transport: "Flight included"
    },
    {
      id: 7,
      name: "Maldives",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
      rating: 5.0,
      reviews: "2.1k",
      description: "Ultra-luxury water villas surrounded by turquoise lagoons and coral reefs.",
      price: "$2,499",
      duration: "6 Days",
      transport: "Speedboat & Flight"
    },
    {
      id: 8,
      name: "Banff, Canada",
      category: "Mountains",
      image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7",
      rating: 4.9,
      reviews: "1.5k",
      description: "Turquoise glacial lakes and soaring peaks in the heart of the Canadian Rockies.",
      price: "$1,350",
      duration: "7 Days",
      transport: "Car Rental"
    },
    {
      id: 9,
      name: "Rome, Italy",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      rating: 4.9,
      reviews: "4.8k",
      description: "A living museum of ancient history, magnificent architecture, and exquisite gelato.",
      price: "$1,050",
      duration: "5 Days",
      transport: "Walking & Train"
    }
  ];

  const filteredDestinations = destinations.filter(dest => 
    activeCategory === "All" || dest.category === activeCategory
  );

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Explore the World</h1>
          <p>Discover breathtaking destinations curated just for you.</p>
        </motion.div>
      </div>

      <div className="destinations-content container">
        <motion.div 
          className="filters-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          layout
          className="destinations-grid"
        >
          <AnimatePresence>
            {filteredDestinations.map((dest) => (
              <motion.div 
                key={dest.id} 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="destination-card"
                whileHover={{ y: -10 }}
              >
                <div className="card-image-wrapper">
                  <motion.img 
                    src={dest.image} 
                    alt={dest.name} 
                    loading="lazy" 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
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
                  <div className="card-extra-info">
                    <span><i className="fas fa-clock"></i> {dest.duration}</span>
                    <span><i className="fas fa-plane"></i> {dest.transport}</span>
                  </div>
                  <div className="card-footer">
                    <span className="price">{dest.price}</span>
                    <div className="card-actions">
                      <motion.button 
                        className="btn-explore"
                        onClick={() => navigate(`/destinations/${dest.id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore
                      </motion.button>
                      <motion.button 
                        className="btn-book"
                        onClick={() => handleBookNow(dest)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        destination={selectedDestination}
      />
    </div>
  );
};

export default Destinations;
