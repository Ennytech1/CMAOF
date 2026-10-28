const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Submit an official contact enquiry
// @route   POST /api/contact
// @access  Public
exports.submitContact = asyncHandler(async (req, res, next) => {
  const { name, email, category = 'general', message } = req.body;

  if (!name || !name.trim()) {
    return next(new ErrorResponse('Please provide your full name', 400));
  }

  if (!email || !email.includes('@')) {
    return next(new ErrorResponse('Please provide a valid email address', 400));
  }

  if (!message || !message.trim()) {
    return next(new ErrorResponse('Please enter your message', 400));
  }

  const contactData = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    category,
    message: message.trim(),
  };

  let contact;
  if (isDbConnected()) {
    contact = await Contact.create(contactData);
  } else {
    contact = await Contact.inMemory.create(contactData);
  }

  // Send auto-acknowledgment email
  try {
    await sendEmail({
      email: contactData.email,
      subject: 'We have received your enquiry - Chief Michael Ade.Ojo Foundation',
      message: `Dear ${contactData.name}, thank you for reaching out to CMAOF. Our secretariat has received your enquiry and will respond promptly.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h2 style="color: #06402B;">Chief Michael Ade.Ojo Foundation</h2>
          <p style="color: #1e293b; font-size: 15px;">Dear ${contactData.name},</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Thank you for contacting the foundation secretariat. We have successfully logged your enquiry regarding <strong>${contactData.category}</strong>.
          </p>
          <div style="background-color: #f8fafc; border-left: 4px solid #06402B; padding: 12px 16px; margin: 20px 0; font-size: 13px; color: #334155;">
            <em>"${contactData.message}"</em>
          </div>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            A representative from our team will review your message and respond within 24 to 48 business hours.
          </p>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
            Secretariat: Ilara-Mokin Community Complex & Victoria Island, Lagos, Nigeria<br/>
            Email: info@cmaofoundation.org
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to dispatch contact confirmation email:', err.message);
  }

  res.status(201).json({
    success: true,
    message: 'Your message has been received by CMAOF team.',
    data: contact,
  });
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Public (or protected)
exports.getContacts = asyncHandler(async (req, res, next) => {
  let contacts;
  if (isDbConnected()) {
    contacts = await Contact.find().sort({ createdAt: -1 });
  } else {
    contacts = await Contact.inMemory.find();
  }

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});
