const express = require('express');
const router = express.Router();
const {
  getScholarships,
  createScholarship,
  applyScholarship,
  nominateScholarship,
  updateSponsoredProgress
} = require('../controllers/scholarshipController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getScholarships)
  .post(protect, createScholarship);

router.post('/apply', protect, applyScholarship);
router.post('/nominate', nominateScholarship);
router.put('/pipeline/:id/progress', protect, updateSponsoredProgress);

module.exports = router;
