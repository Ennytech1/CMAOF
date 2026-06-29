const Course = require('../models/Course');
const Profile = require('../models/Profile');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all marketplace courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// @desc    Create a course (For testing/admin)
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course
  });
});

// @desc    Enroll in a marketplace course
// @route   POST /api/courses/enroll/:id
// @access  Private
exports.enrollInCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse('Course not found', 404));
  }

  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    profile = await Profile.create({ user: req.user.id });
  }

  // Check if already enrolled
  const isEnrolled = profile.learningRecords.some(
    record => record.course.toString() === req.params.id
  );

  if (isEnrolled) {
    return next(new ErrorResponse('You are already enrolled in this course', 400));
  }

  profile.learningRecords.push({
    course: course._id,
    status: 'in-progress'
  });

  await profile.save();

  res.status(200).json({
    success: true,
    message: `Successfully enrolled in ${course.title}`,
    data: profile
  });
});
