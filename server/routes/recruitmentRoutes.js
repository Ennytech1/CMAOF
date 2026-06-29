const express = require('express');
const router = express.Router();
const { getJobs, postJob, applyJob, getJobApplicants } = require('../controllers/recruitmentController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, postJob);

router.post('/apply/:id', protect, applyJob);
router.get('/:id/applicants', protect, getJobApplicants);

module.exports = router;
