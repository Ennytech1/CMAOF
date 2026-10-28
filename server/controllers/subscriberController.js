const mongoose = require('mongoose');
const Subscriber = require('../models/Subscriber');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Subscribe to CMAOF newsletter
// @route   POST /api/newsletter OR POST /api/subscribers
// @access  Public
exports.subscribe = asyncHandler(async (req, res, next) => {
  const { email, source = 'website' } = req.body;

  if (!email || !email.includes('@')) {
    return next(new ErrorResponse('Please provide a valid email address', 400));
  }

  const cleanEmail = email.trim().toLowerCase();

  let subscriber;
  if (isDbConnected()) {
    subscriber = await Subscriber.findOne({ email: cleanEmail });
    if (!subscriber) {
      subscriber = await Subscriber.create({ email: cleanEmail, source });
    } else if (subscriber.status === 'unsubscribed') {
      subscriber.status = 'active';
      await subscriber.save();
    }
  } else {
    subscriber = await Subscriber.inMemory.create({ email: cleanEmail, source });
  }

  // Send welcome confirmation email
  try {
    await sendEmail({
      email: cleanEmail,
      subject: 'Welcome to the Chief Michael Ade.Ojo Foundation Community',
      message: 'Thank you for subscribing to CMAOF updates.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h2 style="color: #06402B;">Welcome to the CMAOF Community!</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Thank you for subscribing to updates from the <strong>Chief Michael Ade.Ojo Foundation</strong>.
          </p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            You will now receive regular stories on our community development milestones, scholarship programmes, healthcare outreaches, and upcoming events.
          </p>
          <div style="background-color: #f0fdf4; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="color: #06402B; font-weight: bold; margin: 0 0 6px 0;">Our Core Pillars:</p>
            <ul style="color: #166534; font-size: 13px; margin: 0; padding-left: 20px;">
              <li>Education & Human Capital Development</li>
              <li>Healthcare & Medical Outreaches</li>
              <li>Community Resilience & Water Infrastructure</li>
            </ul>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
            Chief Michael Ade.Ojo Foundation • Ilara-Mokin & Lagos, Nigeria
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err.message);
  }

  res.status(200).json({
    success: true,
    message: 'Subscribed successfully! Welcome to the CMAOF community.',
    data: subscriber,
  });
});

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Public (or protected)
exports.getSubscribers = asyncHandler(async (req, res, next) => {
  let subscribers;
  if (isDbConnected()) {
    subscribers = await Subscriber.find().sort({ createdAt: -1 });
  } else {
    subscribers = await Subscriber.inMemory.find();
  }

  res.status(200).json({
    success: true,
    count: subscribers.length,
    data: subscribers,
  });
});
