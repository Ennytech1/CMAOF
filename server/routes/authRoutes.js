const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyOtp,
  getMe,
  updateProfile,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', logout);
router.get('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
