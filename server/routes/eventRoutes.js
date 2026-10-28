const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  registerForEvent,
  createEvent,
} = require('../controllers/eventController');

router.route('/').get(getEvents).post(createEvent);
router.route('/:id').get(getEventById);
router.route('/:id/register').post(registerForEvent);

module.exports = router;
