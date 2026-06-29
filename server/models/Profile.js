const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: String // name of cert body or course
  }
});

const experienceSchema = mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  description: {
    type: String
  }
});

const educationSchema = mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

const portfolioProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  images: [{
    type: String
  }]
});

const profileCertificateSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  issuingAuthority: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  credentialUrl: {
    type: String
  },
  qrCodeId: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: true
  }
});

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    headline: {
      type: String
    },
    summary: {
      type: String
    },
    skills: [skillSchema],
    experience: [experienceSchema],
    education: [educationSchema],
    portfolioProjects: [portfolioProjectSchema],
    certificates: [profileCertificateSchema],
    learningRecords: [{
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
      enrolledAt: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: 'in-progress'
      }
    }],
    aiReadinessScore: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
