const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  itinerary: [{
    day: Number,
    activity: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model("Package", packageSchema);
