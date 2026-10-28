const express = require('express');
const router = express.Router();
const { submitVolunteer, getVolunteers } = require('../controllers/volunteerController');

router.post('/', submitVolunteer);
router.get('/', getVolunteers);

module.exports = router;
