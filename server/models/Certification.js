const mongoose = require('mongoose');

const examQuestionSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswerIndex: {
    type: Number,
    required: true
  }
});

const certificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true // CLP, CLAFP, CAFS, FELAF
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    examDurationMinutes: {
      type: Number,
      required: true,
      default: 60
    },
    passingScore: {
      type: Number,
      required: true,
      default: 70
    },
    examQuestions: [examQuestionSchema]
  },
  {
    timestamps: true
  }
);

const Certification = mongoose.model('Certification', certificationSchema);

module.exports = Certification;
