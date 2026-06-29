const mongoose = require('mongoose');

const nominationSchema = mongoose.Schema({
  nominator: {
    type: String, // name of NGO, School, Community, Nominator User
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  nominatedAt: {
    type: Date,
    default: Date.now
  }
});

const scholarshipApplicantSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const scholarshipSchema = mongoose.Schema(
  {
    provider: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['open', 'nomination', 'sponsored-pipeline'],
      required: true
    },
    slotsAvailable: {
      type: Number
    },
    requirements: [{
      type: String
    }],
    deadline: {
      type: Date
    },
    nominations: [nominationSchema],
    applicants: [scholarshipApplicantSchema],
    sponsoredPipeline: {
      cohortSize: { type: Number },
      learningPath: [{ type: String }],
      candidates: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        progressPercentage: { type: Number, default: 0 },
        certified: { type: Boolean, default: false }
      }]
    }
  },
  {
    timestamps: true
  }
);

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
