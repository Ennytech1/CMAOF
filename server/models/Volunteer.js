const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    interestArea: {
      type: String,
      enum: ['education', 'healthcare', 'community', 'technical', 'event_support', 'csr_partner'],
      default: 'community',
    },
    skills: {
      type: [String],
      default: [],
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'approved', 'archived'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const memoryVolunteers = [];

const VolunteerModel = mongoose.model('Volunteer', volunteerSchema);

VolunteerModel.inMemory = {
  create: async (data) => {
    const record = {
      _id: 'mem_' + Date.now() + Math.random().toString(36).substring(2, 7),
      ...data,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryVolunteers.unshift(record);
    return record;
  },
  find: async () => [...memoryVolunteers],
  findOne: async (query) => {
    return memoryVolunteers.find(v => v._id === query._id) || null;
  },
  countDocuments: async () => memoryVolunteers.length,
};

module.exports = VolunteerModel;
