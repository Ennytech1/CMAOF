const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  getDonationStats,
  getDonationByRef,
} = require('../controllers/donationController');

// Public endpoints
router.post('/', createDonation);
router.get('/stats', getDonationStats);
router.get('/ref/:ref', getDonationByRef);
router.get('/', getDonations);

module.exports = router;
