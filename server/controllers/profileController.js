const Profile = require('../models/Profile');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get current user profile
// @route   GET /api/profiles/me
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    // Fallback: create one if it doesn't exist
    profile = await Profile.create({
      user: req.user.id,
      headline: '',
      summary: '',
      skills: [],
      experience: [],
      education: [],
      portfolioProjects: [],
      certificates: []
    });
  }

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Update user profile
// @route   PUT /api/profiles/me
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    profile = new Profile({ user: req.user.id });
  }

  // Update fields if provided
  if (req.body.headline !== undefined) profile.headline = req.body.headline;
  if (req.body.summary !== undefined) profile.summary = req.body.summary;
  if (req.body.skills !== undefined) profile.skills = req.body.skills;
  if (req.body.experience !== undefined) profile.experience = req.body.experience;
  if (req.body.education !== undefined) profile.education = req.body.education;
  if (req.body.portfolioProjects !== undefined) profile.portfolioProjects = req.body.portfolioProjects;

  // Re-estimate a simple dynamic readiness score based on completeness
  let score = 0;
  if (profile.headline) score += 10;
  if (profile.summary) score += 20;
  if (profile.skills && profile.skills.length > 0) score += 20;
  if (profile.experience && profile.experience.length > 0) score += 20;
  if (profile.education && profile.education.length > 0) score += 15;
  if (profile.portfolioProjects && profile.portfolioProjects.length > 0) score += 15;
  
  profile.aiReadinessScore = score;

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    AI CV Optimizer Suggestions
// @route   POST /api/profiles/ai-optimize
// @access  Private
exports.optimizeCV = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new ErrorResponse('Profile not found', 404));
  }

  // Simulated AI analysis based on profile content
  const missingCategories = [];
  if (!profile.summary) missingCategories.push('Professional Summary');
  if (profile.skills.length < 5) missingCategories.push('Core Technical Skills (suggest adding at least 5)');
  if (profile.experience.length === 0) missingCategories.push('Work History / Practical Internships');
  if (profile.portfolioProjects.length === 0) missingCategories.push('Portfolio Project Showcases');

  const recommendations = missingCategories.map((item, idx) => ({
    id: idx + 1,
    tip: `Add details for ${item} to improve ATS tracking.`,
    priority: item.includes('Skills') || item.includes('Summary') ? 'High' : 'Medium'
  }));

  if (recommendations.length === 0) {
    recommendations.push({
      id: 1,
      tip: 'Your CV is highly complete! We recommend adding professional certifications (CLP, CLAFP) to stand out.',
      priority: 'Low'
    });
  }

  res.status(200).json({
    success: true,
    readinessScore: profile.aiReadinessScore,
    suggestions: recommendations,
    marketDemandEstimate: profile.skills.length > 3 ? 'High Demand' : 'Moderate'
  });
});
