// MongoDB connection setup
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/krishisetu');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.log('❌ Database connection failed:', error);
  }
};

module.exports = connectDB;