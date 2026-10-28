const express = require('express');
const router = express.Router();
const {
  getProgrammes,
  getProgrammeById,
  createProgramme,
} = require('../controllers/programmeController');

router.route('/').get(getProgrammes).post(createProgramme);
router.route('/:id').get(getProgrammeById);

module.exports = router;
