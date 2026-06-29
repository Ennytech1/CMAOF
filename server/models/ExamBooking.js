const mongoose = require('mongoose');

const examBookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    certification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certification',
      required: true
    },
    bookingDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    examScore: {
      type: Number
    },
    passed: {
      type: Boolean
    },
    qrCodeId: {
      type: String,
      unique: true,
      sparse: true // Allows empty value for uncompleted or cancelled exams
    }
  },
  {
    timestamps: true
  }
);

const ExamBooking = mongoose.model('ExamBooking', examBookingSchema);

module.exports = ExamBooking;
