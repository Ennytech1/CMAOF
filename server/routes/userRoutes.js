const express = require('express');
const router = express.Router();
const {
  authUser,
  verifyOtp,
  registerUser,
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validator');

router.route('/').get(getUsers).post(validateRegister, registerUser);
router.route('/:id').delete(deleteUser);
router.post('/login', validateLogin, authUser);
router.post('/verify-otp', verifyOtp);
router.get('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
