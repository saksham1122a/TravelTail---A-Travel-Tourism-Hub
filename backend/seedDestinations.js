require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/destination.model');

const destinations = [
  {
    name: "Bali, Indonesia",
    category: "Beaches",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    rating: 4.8,
    reviews: "1.2k",
    description: "Experience tropical paradise with pristine beaches, ancient temples, and vibrant culture.",
    longDescription: "The Indonesian island of Bali is a favorite destination for both adventurers and those in need of a little relaxation. The waters off the coast of Bali's white beaches are an ideal setting for diving, while the dense jungles, teeming with monkeys and hidden stone temples, call out for exploration.",
    price: "$899",
    duration: "5 Days",
    transport: "Flight included",
    highlights: ["Uluwatu Temple", "Tegalalang Rice Terrace", "Ubud Monkey Forest", "Scuba Diving in Nusa Penida"],
    isPopular: true
  },
  {
    name: "Swiss Alps, Switzerland",
    category: "Mountains",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
    rating: 4.9,
    reviews: "2.5k",
    description: "Majestic snow-capped peaks perfect for skiing, hiking, and breathtaking views.",
    longDescription: "The Swiss Alps are the portion of the Alps mountain range that lies within Switzerland. Because of their central location within the entire Alpine range, they are also known as the Central Alps. The highest summit in the Swiss Alps is Monte Rosa (4,634 metres).",
    price: "$1,299",
    duration: "7 Days",
    transport: "Train & Flight",
    highlights: ["Matterhorn Peak", "Jungfraujoch Sphinx Observatory", "Glacier Express Train", "Lake Lucerne Boat Tour"],
    isPopular: true
  },
  {
    name: "Tokyo, Japan",
    category: "Cities",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    rating: 4.9,
    reviews: "3.1k",
    description: "A mesmerizing blend of neon-lit skyscrapers, historic temples, and incredible cuisine.",
    longDescription: "Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.",
    price: "$1,499",
    duration: "6 Days",
    transport: "Local Transport",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Akihabara Electronic Town"],
    isPopular: false
  },
  {
    name: "Santorini, Greece",
    category: "Beaches",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
    rating: 4.7,
    reviews: "1.8k",
    description: "Iconic white-washed buildings overlooking the crystal-clear Aegean Sea.",
    longDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera.",
    price: "$1,199",
    duration: "4 Days",
    transport: "Ferry & Flight",
    highlights: ["Sunset at Oia", "Black Sand Beaches", "Akrotiri Archaeological Site", "Wine Tasting in Pyrgos"],
    isPopular: true
  },
  {
    name: "Machu Picchu, Peru",
    category: "Cultural",
    location: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    rating: 4.9,
    reviews: "4.2k",
    description: "Explore the ancient Incan citadel set high in the Andes Mountains.",
    longDescription: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar.",
    price: "$999",
    duration: "5 Days",
    transport: "Hiking & Train",
    highlights: ["Inca Trail Hike", "Temple of the Sun", "Sacred Valley Tour", "Cusco City Exploration"],
    isPopular: false
  },
  {
    name: "Paris, France",
    category: "Cities",
    location: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    rating: 4.8,
    reviews: "3.9k",
    description: "The city of light, home to the Eiffel Tower, world-class art, and romantic cafes.",
    longDescription: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
    price: "$1,100",
    duration: "5 Days",
    transport: "Flight included",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Seine River Cruise"],
    isPopular: true
  },
  {
    name: "Maldives",
    category: "Beaches",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    rating: 5.0,
    reviews: "2.1k",
    description: "Ultra-luxury water villas surrounded by turquoise lagoons and coral reefs.",
    longDescription: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It’s known for its beaches, blue lagoons and extensive reefs.",
    price: "$2,499",
    duration: "6 Days",
    transport: "Speedboat & Flight",
    highlights: ["Overwater Bungalows", "Snorkeling Safaris", "Private Island Dinners", "Underwater Spa Experience"],
    isPopular: true
  },
  {
    name: "Banff, Canada",
    category: "Mountains",
    location: "Canada",
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7",
    rating: 4.9,
    reviews: "1.5k",
    description: "Turquoise glacial lakes and soaring peaks in the heart of the Canadian Rockies.",
    longDescription: "Banff National Park is Canada's oldest national park, established in 1885. Located in the Rocky Mountains, west of Calgary in the province of Alberta, it encompasses 6,641 square kilometres of mountainous terrain.",
    price: "$1,350",
    duration: "7 Days",
    transport: "Car Rental",
    highlights: ["Lake Louise", "Moraine Lake", "Banff Gondola", "Johnston Canyon Ice Walk"],
    isPopular: false
  },
  {
    name: "Rome, Italy",
    category: "Cultural",
    location: "Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    rating: 4.9,
    reviews: "4.8k",
    description: "A living museum of ancient history, magnificent architecture, and exquisite gelato.",
    longDescription: "Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire.",
    price: "$1,050",
    duration: "5 Days",
    transport: "Walking & Train",
    highlights: ["Colosseum", "Vatican Museums", "Pantheon", "Trevi Fountain"],
    isPopular: false
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/traveltail');
        console.log('Connected to MongoDB for seeding...');
        
        // Clear existing destinations
        await Destination.deleteMany({});
        console.log('Cleared existing destinations');
        
        // Insert new ones
        await Destination.insertMany(destinations);
        console.log('Successfully seeded 9 destinations!');
        
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDB();
