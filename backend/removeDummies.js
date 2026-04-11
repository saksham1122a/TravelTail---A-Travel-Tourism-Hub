require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('./models/booking.model');
const connectDB = require('./config/db');

const removeDummies = async () => {
  await connectDB();
  try {
    const deleted = await Booking.deleteMany({
      customerName: { $in: ['Alice Anderson', 'Bob Brown', 'Charlie Chaplin', 'Diana Prince'] }
    });
    console.log(`Deleted ${deleted.deletedCount} dummy bookings.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
removeDummies();
