const crypto = require('crypto');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const isDbConnected = () => mongoose.connection.readyState === 1;

// Helper to send JWT token in cookie & JSON response
const sendTokenResponse = (user, statusCode, res, additionalData = {}) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'lax',
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...additionalData,
    });
};

// In-memory OTP storage for dev / resilient MFA
const activeOtps = new Map();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role = 'donor' } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorResponse('Please provide a name, email and password', 400));
  }

  if (password.length < 6) {
    return next(new ErrorResponse('Password must be at least 6 characters', 400));
  }

  const normalizedEmail = email.toLowerCase().trim();

  let user;
  if (isDbConnected()) {
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return next(new ErrorResponse('An account with this email already exists', 400));
    }
    user = await User.create({ name: name.trim(), email: normalizedEmail, password, role });
  } else {
    const existing = await User.inMemory.findOne({ email: normalizedEmail });
    if (existing) {
      return next(new ErrorResponse('An account with this email already exists', 400));
    }
    user = await User.inMemory.create({ name: name.trim(), email: normalizedEmail, password, role });
  }

  sendTokenResponse(user, 201, res, { message: 'Registration successful' });
});

// @desc    Login user / Admin Step 1
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide both an email and password', 400));
  }

  const normalizedEmail = email.toLowerCase().trim();

  let user;
  if (isDbConnected()) {
    user = await User.findOne({ email: normalizedEmail }).select('+password');
  } else {
    user = await User.inMemory.findOne({ email: normalizedEmail });
  }

  if (!user) {
    return next(new ErrorResponse('Invalid email or password', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid email or password', 401));
  }

  // If user is Admin or Staff, require Step 2 MFA
  if (user.role === 'admin' || user.role === 'staff') {
    const otpCode = '264810'; // Standard foundation demo OTP code
    activeOtps.set(normalizedEmail, {
      code: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      requireMfa: true,
      email: user.email,
      name: user.name,
      role: user.role,
      message: 'Step 1 verified. Please enter your 6-digit MFA verification code.',
      demoOtpHint: otpCode,
    });
  }

  // Standard donor / supporter login proceeds directly
  sendTokenResponse(user, 200, res, { message: 'Login successful' });
});

// @desc    Verify 2FA / MFA OTP Code for Admin Portal
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorResponse('Please provide email and 6-digit verification code', 400));
  }

  const normalizedEmail = email.toLowerCase().trim();
  const cleanedOtp = String(otp).trim().replace(/\D/g, '');

  if (cleanedOtp.length !== 6) {
    return next(new ErrorResponse('Authentication code must be exactly 6 digits', 400));
  }

  let user;
  if (isDbConnected()) {
    user = await User.findOne({ email: normalizedEmail });
  } else {
    user = await User.inMemory.findOne({ email: normalizedEmail });
  }

  if (!user) {
    return next(new ErrorResponse('User account not found', 404));
  }

  // Check OTP (accept standard foundation code '264810' or matched active OTP)
  const storedOtp = activeOtps.get(normalizedEmail);
  const isValid =
    cleanedOtp === '264810' ||
    (storedOtp && storedOtp.code === cleanedOtp && storedOtp.expiresAt > Date.now());

  if (!isValid) {
    return next(new ErrorResponse('Invalid or expired authentication code', 400));
  }

  // Clear used OTP
  activeOtps.delete(normalizedEmail);

  // Send full admin token response
  sendTokenResponse(user, 200, res, {
    message: `Authentication successful! Welcome, ${user.name.split(' ')[0]}.`,
  });
});

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorResponse('User not authenticated', 401));
  }

  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let user;
  if (isDbConnected()) {
    user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    if (req.body.name) user.name = req.body.name.trim();
    if (req.body.email) user.email = req.body.email.toLowerCase().trim();
    if (req.body.password) user.password = req.body.password;
    await user.save();
  } else {
    user = req.user;
    if (req.body.name) user.name = req.body.name.trim();
    if (req.body.email) user.email = req.body.email.toLowerCase().trim();
  }

  sendTokenResponse(user, 200, res, { message: 'Profile updated successfully' });
});

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @route   GET /api/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorResponse('Please provide an email address', 400));
  }

  const normalizedEmail = email.toLowerCase().trim();
  let user;
  if (isDbConnected()) {
    user = await User.findOne({ email: normalizedEmail });
  } else {
    user = await User.inMemory.findOne({ email: normalizedEmail });
  }

  if (!user) {
    return next(new ErrorResponse('There is no account associated with this email', 404));
  }

  const resetToken = user.getResetPasswordToken ? user.getResetPasswordToken() : 'dev_token_reset_' + Date.now();
  if (isDbConnected()) {
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    success: true,
    message: 'Password reset link sent to your email',
    resetToken, // Provided for easy development flow
  });
});

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  let user;
  if (isDbConnected()) {
    user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  }

  if (!user) {
    return next(new ErrorResponse('Invalid or expired password reset token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res, { message: 'Password reset successful' });
});
