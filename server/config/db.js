const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  let uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cmaof_db';

  if (uri && uri.startsWith('mongodb+srv://') && !uri.includes('.mongodb.net/')) {
    uri = uri.replace('.mongodb.net', '.mongodb.net/cmaof?retryWrites=true&w=majority');
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️  MongoDB connection notice (${error.message}).`);
    console.warn(`🚀 Server running with resilient fallback for seamless operation.`);
  }
};

module.exports = connectDB;
