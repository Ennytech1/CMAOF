const express = require('express');
const router = express.Router();
const { getCourses, createCourse, enrollInCourse } = require('../controllers/marketplaceController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getCourses)
  .post(protect, createCourse);

router.post('/enroll/:id', protect, enrollInCourse);

module.exports = router;
