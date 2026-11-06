const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'papng0nl',
  api_key: process.env.CLOUDINARY_API_KEY || '631757391163758',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'UYhnPdYhW14nyKAGKlysz8lJaX8',
  secure: true,
});

module.exports = cloudinary;

