const Certification = require('../models/Certification');
const ExamBooking = require('../models/ExamBooking');
const Profile = require('../models/Profile');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
exports.getCertifications = asyncHandler(async (req, res, next) => {
  const certs = await Certification.find();

  res.status(200).json({
    success: true,
    count: certs.length,
    data: certs
  });
});

// @desc    Create certification exam template (Admin/Dev helper)
// @route   POST /api/certifications
// @access  Private
exports.createCertification = asyncHandler(async (req, res, next) => {
  const cert = await Certification.create(req.body);

  res.status(201).json({
    success: true,
    data: cert
  });
});

// @desc    Book a certification exam slot
// @route   POST /api/certifications/book
// @access  Private
exports.bookExam = asyncHandler(async (req, res, next) => {
  const { certificationId, bookingDate } = req.body;

  const cert = await Certification.findById(certificationId);
  if (!cert) {
    return next(new ErrorResponse('Certification exam not found', 404));
  }

  // Create scheduled booking
  const booking = await ExamBooking.create({
    user: req.user.id,
    certification: certificationId,
    bookingDate: bookingDate || new Date(),
    status: 'scheduled'
  });

  res.status(201).json({
    success: true,
    message: `Exam for ${cert.title} successfully booked.`,
    data: booking
  });
});

// @desc    Submit answers & grade exam
// @route   POST /api/certifications/submit-exam
// @access  Private
exports.submitExam = asyncHandler(async (req, res, next) => {
  const { bookingId, answers } = req.body; // answers is array of index integers

  const booking = await ExamBooking.findById(bookingId).populate('certification');
  if (!booking) {
    return next(new ErrorResponse('Exam booking not found', 404));
  }

  if (booking.status === 'completed') {
    return next(new ErrorResponse('This exam attempt has already been graded', 400));
  }

  const cert = booking.certification;
  let correctCount = 0;

  // Grade exam based on answers
  cert.examQuestions.forEach((q, index) => {
    if (answers && answers[index] === q.correctAnswerIndex) {
      correctCount++;
    }
  });

  const totalQuestions = cert.examQuestions.length || 1;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= cert.passingScore;
  const qrCodeId = crypto.randomBytes(12).toString('hex');

  // Update Booking Status
  booking.examScore = score;
  booking.passed = passed;
  booking.status = 'completed';
  booking.qrCodeId = passed ? qrCodeId : undefined;
  await booking.save();

  // If passed, automatically add to User Career Profile
  if (passed) {
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      profile = await Profile.create({ user: req.user.id });
    }

    profile.certificates.push({
      title: cert.title,
      issuingAuthority: 'CareerMAX Accreditation Council',
      issueDate: new Date(),
      credentialUrl: `/verify-credential/${qrCodeId}`,
      qrCodeId: qrCodeId,
      isVerified: true
    });

    // Also auto-verify matching skills if profile exists
    const matchingSkill = profile.skills.find(
      s => s.name.toLowerCase() === cert.title.toLowerCase() || cert.title.toLowerCase().includes(s.name.toLowerCase())
    );
    if (matchingSkill) {
      matchingSkill.isVerified = true;
      matchingSkill.verifiedBy = cert.code;
    } else {
      profile.skills.push({
        name: cert.title,
        isVerified: true,
        verifiedBy: cert.code
      });
    }

    await profile.save();
  }

  res.status(200).json({
    success: true,
    score,
    passed,
    qrCodeId: passed ? qrCodeId : null,
    message: passed ? 'Congratulations! You passed and earned your certification.' : 'Assessment complete. Unfortunately, you did not meet the passing grade.'
  });
});

// @desc    Verify QR Code / Public Credential Validation
// @route   GET /api/certifications/verify/:qrCodeId
// @access  Public
exports.verifyCertificate = asyncHandler(async (req, res, next) => {
  const booking = await ExamBooking.findOne({ qrCodeId: req.params.qrCodeId })
    .populate('user', 'name email')
    .populate('certification', 'title code');

  if (!booking || !booking.passed) {
    return next(new ErrorResponse('Invalid or expired certification credential', 404));
  }

  res.status(200).json({
    success: true,
    verified: true,
    credential: {
      recipientName: booking.user.name,
      certificationName: booking.certification.title,
      code: booking.certification.code,
      issueDate: booking.updatedAt,
      issuingAuthority: 'CareerMAX Accreditation Council',
      status: 'Active / Verified'
    }
  });
});
