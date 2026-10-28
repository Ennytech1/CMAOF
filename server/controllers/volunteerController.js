const mongoose = require('mongoose');
const Volunteer = require('../models/Volunteer');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Submit Volunteer / Partner application
// @route   POST /api/volunteers OR POST /api/get-involved
// @access  Public
exports.submitVolunteer = asyncHandler(async (req, res, next) => {
  const { fullName, email, phone = '', interestArea = 'community', skills = [], message = '' } = req.body;

  if (!fullName || !fullName.trim()) {
    return next(new ErrorResponse('Please provide your full name', 400));
  }

  if (!email || !email.includes('@')) {
    return next(new ErrorResponse('Please provide a valid email address', 400));
  }

  const volData = {
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    interestArea,
    skills: Array.isArray(skills) ? skills : [skills].filter(Boolean),
    message: message.trim(),
  };

  let volunteer;
  if (isDbConnected()) {
    volunteer = await Volunteer.create(volData);
  } else {
    volunteer = await Volunteer.inMemory.create(volData);
  }

  try {
    await sendEmail({
      email: volData.email,
      subject: 'Volunteer & Partnership Application Received - CMAOF',
      message: `Dear ${volData.fullName}, thank you for applying to partner with Chief Michael Ade.Ojo Foundation.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h2 style="color: #06402B;">Chief Michael Ade.Ojo Foundation</h2>
          <p style="color: #1e293b; font-size: 15px;">Dear ${volData.fullName},</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Thank you for your interest in getting involved with CMAOF under our <strong>${volData.interestArea}</strong> initiative.
          </p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Our volunteer and outreach coordination team is reviewing your profile and will connect with you ahead of upcoming programmes.
          </p>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
            Chief Michael Ade.Ojo Foundation • Ilara-Mokin & Lagos, Nigeria
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send volunteer confirmation email:', err.message);
  }

  res.status(201).json({
    success: true,
    message: 'Thank you! Your volunteer application has been submitted.',
    data: volunteer,
  });
});

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Public (or protected)
exports.getVolunteers = asyncHandler(async (req, res, next) => {
  let volunteers;
  if (isDbConnected()) {
    volunteers = await Volunteer.find().sort({ createdAt: -1 });
  } else {
    volunteers = await Volunteer.inMemory.find();
  }

  res.status(200).json({
    success: true,
    count: volunteers.length,
    data: volunteers,
  });
});
