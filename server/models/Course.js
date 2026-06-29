const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    modality: {
      type: String,
      enum: ['self-paced', 'virtual-class', 'physical-workshop', 'internship'],
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    curriculum: [{
      type: String
    }],
    duration: {
      type: String // e.g., '6 weeks', '3 days'
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
