const express = require('express');
const router = express.Router();
const {
  getBeneficiaries,
  getBeneficiaryById,
  createBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
  getBeneficiaryStats,
} = require('../controllers/beneficiaryController');

router.get('/stats', getBeneficiaryStats);
router.route('/').get(getBeneficiaries).post(createBeneficiary);
router.route('/:id').get(getBeneficiaryById).put(updateBeneficiary).delete(deleteBeneficiary);

module.exports = router;
