const express = require('express');
const router = express.Router();
const {
  getCertifications,
  createCertification,
  bookExam,
  submitExam,
  verifyCertificate
} = require('../controllers/certificationController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getCertifications)
  .post(protect, createCertification);

router.post('/book', protect, bookExam);
router.post('/submit-exam', protect, submitExam);
router.get('/verify/:qrCodeId', verifyCertificate); // Public route, no protect middleware needed!

module.exports = router;
