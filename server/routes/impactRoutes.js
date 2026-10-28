const express = require('express');
const router = express.Router();
const { getImpactOverview } = require('../controllers/impactController');

router.get('/', getImpactOverview);

module.exports = router;
