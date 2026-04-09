const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    itemType: {
      type: String,
      enum: ['destination', 'package'],
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    destinationName: {
      type: String, // Specifically for package bookings where a destination was chosen
    },
    amount: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
