const mongoose = require('mongoose');
const Programme = require('../models/Programme');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all foundation programmes
// @route   GET /api/programmes
// @access  Public
exports.getProgrammes = asyncHandler(async (req, res, next) => {
  const { pillar, search } = req.query;

  let programmes;
  if (isDbConnected()) {
    const query = {};
    if (pillar && pillar !== 'All') {
      query.pillar = new RegExp(pillar, 'i');
    }
    if (search) {
      query.$or = [{ name: new RegExp(search, 'i') }, { objective: new RegExp(search, 'i') }];
    }
    programmes = await Programme.find(query);
  } else {
    programmes = await Programme.inMemory.find({ pillar, search });
  }

  res.status(200).json({
    success: true,
    count: programmes.length,
    data: programmes,
  });
});

// @desc    Get programme by ID or Slug
// @route   GET /api/programmes/:id
// @access  Public
exports.getProgrammeById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let programme;
  if (isDbConnected()) {
    programme = await Programme.findOne({
      $or: [{ slug: id }, { _id: mongoose.isValidObjectId(id) ? id : null }].filter(Boolean),
    });
  } else {
    programme = await Programme.inMemory.findOne({ slug: id, id });
  }

  if (!programme) {
    return next(new ErrorResponse(`Programme not found with identifier ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: programme,
  });
});

// @desc    Create new programme
// @route   POST /api/programmes
// @access  Admin
exports.createProgramme = asyncHandler(async (req, res, next) => {
  const { name, pillar, objective } = req.body;
  if (!name || !pillar || !objective) {
    return next(new ErrorResponse('Please provide programme name, pillar and objective', 400));
  }

  let created;
  if (isDbConnected()) {
    created = await Programme.create(req.body);
  } else {
    created = await Programme.inMemory.create(req.body);
  }

  res.status(201).json({
    success: true,
    message: 'Programme created successfully',
    data: created,
  });
});
