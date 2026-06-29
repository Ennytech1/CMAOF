const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  aiMatchScore: {
    type: Number,
    default: 0 // Matching rating between 0% and 100%
  }
});

const jobSchema = mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'remote'],
      required: true
    },
    salaryRange: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    requirements: [{
      type: String
    }],
    applicants: [applicantSchema],
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
    }
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
