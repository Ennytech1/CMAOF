const Job = require('../models/Job');
const Profile = require('../models/Profile');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find({ status: 'open' }).populate('employer', 'name');

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

// @desc    Post a job opening
// @route   POST /api/jobs
// @access  Private
exports.postJob = asyncHandler(async (req, res, next) => {
  // Validate that user is employer or admin
  if (req.user.role !== 'employer' && req.user.role !== 'admin') {
    return next(new ErrorResponse('Unauthorized to post jobs. Must be an employer account.', 403));
  }

  req.body.employer = req.user.id;
  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    data: job
  });
});

// @desc    Apply for a job (Calculate AI Match Score)
// @route   POST /api/jobs/:id/apply
// @access  Private
exports.applyJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorResponse('Job listing not found', 404));
  }

  if (job.status === 'closed') {
    return next(new ErrorResponse('This job listing is closed', 400));
  }

  // Check if candidate has already applied
  const alreadyApplied = job.applicants.some(
    app => app.user.toString() === req.user.id
  );

  if (alreadyApplied) {
    return next(new ErrorResponse('You have already applied for this job', 400));
  }

  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new ErrorResponse('Please complete your profile before applying', 400));
  }

  // AI Matching logic simulation: compare profile skills with job requirements
  let matchCount = 0;
  if (job.requirements && job.requirements.length > 0 && profile.skills && profile.skills.length > 0) {
    job.requirements.forEach(reqSkill => {
      const match = profile.skills.some(
        pSkill => pSkill.name.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(pSkill.name.toLowerCase())
      );
      if (match) {
        matchCount++;
      }
    });
  }

  const totalRequirements = job.requirements.length || 1;
  let aiScore = Math.round((matchCount / totalRequirements) * 100);

  // Bonus for verification or profile completeness
  if (profile.certificates && profile.certificates.length > 0) {
    aiScore += 10;
  }
  if (profile.aiReadinessScore > 80) {
    aiScore += 10;
  }
  
  // Cap at 100%
  aiScore = Math.min(aiScore, 100);

  // Add applicant
  job.applicants.push({
    user: req.user.id,
    aiMatchScore: aiScore
  });

  await job.save();

  res.status(200).json({
    success: true,
    message: 'Application submitted successfully.',
    aiMatchScore: aiScore
  });
});

// @desc    Get job applicants (Employer only)
// @route   GET /api/jobs/:id/applicants
// @access  Private
exports.getJobApplicants = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id)
    .populate('applicants.user', 'name email')
    .populate('employer');

  if (!job) {
    return next(new ErrorResponse('Job listing not found', 404));
  }

  // Verify that requester is the job posting owner
  if (job.employer._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to view applicant registry for this job', 403));
  }

  res.status(200).json({
    success: true,
    count: job.applicants.length,
    data: job.applicants
  });
});
