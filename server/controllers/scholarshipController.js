const Scholarship = require('../models/Scholarship');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @access  Public
exports.getScholarships = asyncHandler(async (req, res, next) => {
  const scholarships = await Scholarship.find();

  res.status(200).json({
    success: true,
    count: scholarships.length,
    data: scholarships
  });
});

// @desc    Create a scholarship program (Admin/Sponsor)
// @route   POST /api/scholarships
// @access  Private
exports.createScholarship = asyncHandler(async (req, res, next) => {
  const scholarship = await Scholarship.create(req.body);

  res.status(201).json({
    success: true,
    data: scholarship
  });
});

// @desc    Apply for an open scholarship
// @route   POST /api/scholarships/apply
// @access  Private
exports.applyScholarship = asyncHandler(async (req, res, next) => {
  const { scholarshipId } = req.body;

  const scholarship = await Scholarship.findById(scholarshipId);
  if (!scholarship) {
    return next(new ErrorResponse('Scholarship program not found', 404));
  }

  if (scholarship.type !== 'open') {
    return next(new ErrorResponse('This scholarship is not open for standard direct applications', 400));
  }

  // Check if candidate already applied
  const alreadyApplied = scholarship.applicants.some(
    app => app.user.toString() === req.user.id
  );

  if (alreadyApplied) {
    return next(new ErrorResponse('You have already applied for this scholarship', 400));
  }

  scholarship.applicants.push({
    user: req.user.id,
    status: 'pending'
  });

  await scholarship.save();

  res.status(200).json({
    success: true,
    message: 'Scholarship application submitted successfully.'
  });
});

// @desc    Submit a nomination for a scholarship
// @route   POST /api/scholarships/nominate
// @access  Public
exports.nominateScholarship = asyncHandler(async (req, res, next) => {
  const { scholarshipId, nominator, candidateName, candidateEmail, reason } = req.body;

  const scholarship = await Scholarship.findById(scholarshipId);
  if (!scholarship) {
    return next(new ErrorResponse('Scholarship program not found', 404));
  }

  if (scholarship.type !== 'nomination') {
    return next(new ErrorResponse('This scholarship does not accept nomination-based entries', 400));
  }

  scholarship.nominations.push({
    nominator,
    candidateName,
    candidateEmail,
    reason,
    status: 'pending'
  });

  await scholarship.save();

  res.status(200).json({
    success: true,
    message: `Nomination for ${candidateName} submitted successfully.`
  });
});

// @desc    Update Sponsored Cohort progress
// @route   PUT /api/scholarships/pipeline/:id/progress
// @access  Private
exports.updateSponsoredProgress = asyncHandler(async (req, res, next) => {
  const { userId, progressPercentage, certified } = req.body;

  const scholarship = await Scholarship.findById(req.params.id);
  if (!scholarship) {
    return next(new ErrorResponse('Scholarship pipeline not found', 404));
  }

  if (scholarship.type !== 'sponsored-pipeline') {
    return next(new ErrorResponse('This program is not a sponsored pipeline', 400));
  }

  const candidate = scholarship.sponsoredPipeline.candidates.find(
    c => c.user.toString() === userId
  );

  if (!candidate) {
    return next(new ErrorResponse('Candidate not found in this pipeline cohort', 404));
  }

  if (progressPercentage !== undefined) candidate.progressPercentage = progressPercentage;
  if (certified !== undefined) candidate.certified = certified;

  await scholarship.save();

  res.status(200).json({
    success: true,
    message: 'Candidate progress successfully updated.',
    data: scholarship.sponsoredPipeline
  });
});
