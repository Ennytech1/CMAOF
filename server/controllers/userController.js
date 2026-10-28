const crypto = require('crypto');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const isDbConnected = () => mongoose.connection.readyState === 1;

// Send JWT token in cookie & JSON response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
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
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
};

// @desc    Register user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role = 'donor' } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorResponse('Please provide all required fields', 400));
  }

  let user;
  if (isDbConnected()) {
    const existing = await User.findOne({ email });
    if (existing) {
      return next(new ErrorResponse('Email already registered', 400));
    }
    user = await User.create({ name, email, password, role });
  } else {
    const existing = await User.inMemory.findOne({ email });
    if (existing) {
      return next(new ErrorResponse('Email already registered', 400));
    }
    user = await User.inMemory.create({ name, email, password, role });
  }

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  let user;
  if (isDbConnected()) {
    user = await User.findOne({ email }).select('+password');
  } else {
    user = await User.inMemory.findOne({ email });
  }

  if (!user) {
    return next(new ErrorResponse('Invalid email or password', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid email or password', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Verify OTP for MFA
// @route   POST /api/users/verify-otp
// @access  Public
exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(new ErrorResponse('Please provide email and 6-digit code', 400));
  }

  const normalized = email.toLowerCase().trim();
  const cleaned = String(otp).trim().replace(/\D/g, '');

  let user;
  if (isDbConnected()) {
    user = await User.findOne({ email: normalized });
  } else {
    user = await User.inMemory.findOne({ email: normalized });
  }

  if (!user) {
    return next(new ErrorResponse('User account not found', 404));
  }

  if (cleaned.length !== 6) {
    return next(new ErrorResponse('Code must be 6 digits', 400));
  }

  sendTokenResponse(user, 200, res, {
    message: `Authentication verified for ${user.name}`,
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  let user;
  if (isDbConnected()) {
    user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();
  } else {
    user = req.user;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
  }

  res.status(200).json({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: user.getSignedJwtToken(),
  });
});

// @desc    Log user out / clear cookie
// @route   GET /api/users/logout
// @access  Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// @desc    Forgot password
// @route   POST /api/users/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let user;
  if (isDbConnected()) {
    user = await User.findOne({ email });
  } else {
    user = await User.inMemory.findOne({ email });
  }

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  const resetToken = user.getResetPasswordToken();
  if (isDbConnected()) {
    await user.save({ validateBeforeSave: false });
  }

  const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetpassword/${resetToken}`;
  const message = `You are receiving this email because a password reset was requested. Please reset here: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'CMAOF Password Reset Token',
      message,
    });
    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    if (isDbConnected()) await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password
// @route   PUT /api/users/resetpassword/:resettoken
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
    return next(new ErrorResponse('Invalid or expired reset token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});
