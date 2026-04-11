require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('./models/booking.model');
const User = require('./models/user.model');
const connectDB = require('./config/db');

const seedBookings = async () => {
  await connectDB();
  
  try {
    const adminUser = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminUser) {
      console.log('Admin user not found. Cannot seed bookings without a user id reference.');
      process.exit(1);
    }

    // Clear existing to prevent duplicates if ran multiple times
    await Booking.deleteMany({});

    const mockBookings = [
      {
        user: adminUser._id,
        itemType: 'destination',
        itemName: 'Bali, Indonesia',
        amount: '$800',
        paymentMethod: 'card',
        status: 'confirmed',
        customerName: 'Alice Anderson',
        customerEmail: 'alice@example.com'
      },
      {
        user: adminUser._id,
        itemType: 'package',
        itemName: 'Tropical Escape',
        destinationName: 'Maldives',
        amount: '$1399',
        paymentMethod: 'card',
        status: 'completed',
        customerName: 'Bob Brown',
        customerEmail: 'bob.b@example.com'
      },
      {
        user: adminUser._id,
        itemType: 'destination',
        itemName: 'Kyoto, Japan',
        amount: '$1200',
        paymentMethod: 'cash',
        status: 'pending',
        customerName: 'Charlie Chaplin',
        customerEmail: 'charlie123@example.com'
      },
      {
        user: adminUser._id,
        itemType: 'package',
        itemName: 'Weekend Getaway',
        destinationName: 'Paris, France',
        amount: '$299',
        paymentMethod: 'card',
        status: 'confirmed',
        customerName: 'Diana Prince',
        customerEmail: 'diana.xyz@example.com'
      }
    ];

    await Booking.insertMany(mockBookings);
    console.log('✅ Successfully seeded mock bookings!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding bookings:', error);
    process.exit(1);
  }
};

seedBookings();
