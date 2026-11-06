const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadImage, uploadMultipleImages } = require('../controllers/uploadController');

// Multer in-memory storage config
const storage = multer.memoryStorage();

// File filter (accept images only)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, webp, svg) are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

router.post('/', upload.single('image'), uploadImage);
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);

module.exports = router;

