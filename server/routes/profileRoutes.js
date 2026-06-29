const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, optimizeCV } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.route('/me')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.post('/ai-optimize', protect, optimizeCV);

module.exports = router;
