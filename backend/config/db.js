const mongoose = require('mongoose');
const User = require('../models/user.model');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
        phone: '0000000000'
      });
      console.log('✅ Default Admin user seeded successfully');
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    await seedAdmin();
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
