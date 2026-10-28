const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cmaof_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000, // Timeout after 3s if not reachable
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️  MongoDB not available (${error.message}).`);
    console.warn(`🚀 Server running with in-memory persistence fallback for seamless local development.`);
  }
};

module.exports = connectDB;
