import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PaymentModal from "./PaymentModal";
import "../StyleSheets/DestinationDetails.css";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Sample data (matching what's in Destinations.jsx)
  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      rating: 4.8,
      reviews: "1.2k",
      description: "Experience tropical paradise with pristine beaches, ancient temples, and vibrant culture. Bali is well known for its highly developed arts, including traditional and modern dance, sculpture, painting, leather, metalworking, and music.",
      longDescription: "The Indonesian island of Bali is a favorite destination for both adventurers and those in need of a little relaxation. The waters off the coast of Bali's white beaches are an ideal setting for diving, while the dense jungles, teeming with monkeys and hidden stone temples, call out for exploration.",
      price: "$899",
      duration: "5 Days",
      transport: "Flight included",
      highlights: ["Uluwatu Temple", "Tegalalang Rice Terrace", "Ubud Monkey Forest", "Scuba Diving in Nusa Penida"]
    },
    {
      id: 2,
      name: "Swiss Alps, Switzerland",
      category: "Mountains",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
      rating: 4.9,
      reviews: "2.5k",
      description: "Majestic snow-capped peaks perfect for skiing, hiking, and breathtaking views.",
      longDescription: "The Swiss Alps are the portion of the Alps mountain range that lies within Switzerland. Because of their central location within the entire Alpine range, they are also known as the Central Alps. The highest summit in the Swiss Alps is Monte Rosa (4,634 metres).",
      price: "$1,299",
      duration: "7 Days",
      transport: "Train & Flight",
      highlights: ["Matterhorn Peak", "Jungfraujoch Sphinx Observatory", "Glacier Express Train", "Lake Lucerne Boat Tour"]
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      category: "Cities",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      rating: 4.9,
      reviews: "3.1k",
      description: "A mesmerizing blend of neon-lit skyscrapers, historic temples, and incredible cuisine.",
      longDescription: "Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.",
      price: "$1,499",
      duration: "6 Days",
      transport: "Local Transport",
      highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Akihabara Electronic Town"]
    },
    {
      id: 4,
      name: "Santorini, Greece",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
      rating: 4.7,
      reviews: "1.8k",
      description: "Iconic white-washed buildings overlooking the crystal-clear Aegean Sea.",
      longDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera.",
      price: "$1,199",
      duration: "4 Days",
      transport: "Ferry & Flight",
      highlights: ["Sunset at Oia", "Black Sand Beaches", "Akrotiri Archaeological Site", "Wine Tasting in Pyrgos"]
    },
    {
        id: 5,
        name: "Machu Picchu, Peru",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
        rating: 4.9,
        reviews: "4.2k",
        description: "Explore the ancient Incan citadel set high in the Andes Mountains.",
        longDescription: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar.",
        price: "$999",
        duration: "5 Days",
        transport: "Hiking & Train",
        highlights: ["Inca Trail Hike", "Temple of the Sun", "Sacred Valley Tour", "Cusco City Exploration"]
      },
      {
        id: 6,
        name: "Paris, France",
        category: "Cities",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        rating: 4.8,
        reviews: "3.9k",
        description: "The city of light, home to the Eiffel Tower, world-class art, and romantic cafes.",
        longDescription: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
        price: "$1,100",
        duration: "5 Days",
        transport: "Flight included",
        highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Seine River Cruise"]
      },
      {
        id: 7,
        name: "Maldives",
        category: "Beaches",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
        rating: 5.0,
        reviews: "2.1k",
        description: "Ultra-luxury water villas surrounded by turquoise lagoons and coral reefs.",
        longDescription: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It’s known for its beaches, blue lagoons and extensive reefs.",
        price: "$2,499",
        duration: "6 Days",
        transport: "Speedboat & Flight",
        highlights: ["Overwater Bungalows", "Snorkeling Safaris", "Private Island Dinners", "Underwater Spa Experience"]
      },
      {
        id: 8,
        name: "Banff, Canada",
        category: "Mountains",
        image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7",
        rating: 4.9,
        reviews: "1.5k",
        description: "Turquoise glacial lakes and soaring peaks in the heart of the Canadian Rockies.",
        longDescription: "Banff National Park is Canada's oldest national park, established in 1885. Located in the Rocky Mountains, west of Calgary in the province of Alberta, it encompasses 6,641 square kilometres of mountainous terrain.",
        price: "$1,350",
        duration: "7 Days",
        transport: "Car Rental",
        highlights: ["Lake Louise", "Moraine Lake", "Banff Gondola", "Johnston Canyon Ice Walk"]
      },
      {
        id: 9,
        name: "Rome, Italy",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        rating: 4.9,
        reviews: "4.8k",
        description: "A living museum of ancient history, magnificent architecture, and exquisite gelato.",
        longDescription: "Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire.",
        price: "$1,050",
        duration: "5 Days",
        transport: "Walking & Train",
        highlights: ["Colosseum", "Vatican Museums", "Pantheon", "Trevi Fountain"]
      }
  ];

  useEffect(() => {
    const foundDest = destinations.find((d) => d.id === parseInt(id));
    setDestination(foundDest);
    window.scrollTo(0, 0);
  }, [id]);

  if (!destination) {
    return <div className="loading">Loading destination details...</div>;
  }

  return (
    <div className="destination-details-page">
      <motion.div 
        className="details-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${destination.image})` }}
      >
        <div className="container">
          <motion.div 
            className="hero-text"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="category-tag">{destination.category}</span>
            <h1>{destination.name}</h1>
            <div className="meta-info">
              <span>★ {destination.rating} ({destination.reviews} reviews)</span> | 
              <span><i className="fas fa-clock"></i> {destination.duration}</span> | 
              <span><i className="fas fa-plane"></i> {destination.transport}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="details-content container">
        <div className="main-info">
          <section className="overview">
            <h2>Overview</h2>
            <p className="long-desc">{destination.longDescription}</p>
          </section>

          <section className="highlights">
            <h2>Tour Highlights</h2>
            <div className="highlights-grid">
              {destination.highlights.map((h, i) => (
                <div key={i} className="highlight-item">
                  <i className="fas fa-check-circle"></i> {h}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="booking-sidebar">
          <div className="booking-card">
            <div className="card-header">
              <span className="price-label">Price from</span>
              <span className="price-amount">{destination.price}</span>
            </div>
            <p className="price-info">Per person inclusive of taxes</p>
            <button className="btn-book-now" onClick={() => setIsPaymentModalOpen(true)}>
              Book Now
            </button>
            <div className="extra-benefits">
                <div className="benefit">
                    <i className="fas fa-shield-alt"></i> <span>Secure Checkout</span>
                </div>
                <div className="benefit">
                    <i className="fas fa-calendar-alt"></i> <span>Flexible Dates</span>
                </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="navigation-actions container">
          <button className="btn-back" onClick={() => navigate("/destinations")}>
              <i className="fas fa-arrow-left"></i> Back to Destinations
          </button>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        destination={destination}
      />
    </div>
  );
};

export default DestinationDetails;
