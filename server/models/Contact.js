const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    category: {
      type: String,
      enum: ['general', 'partnership', 'donation', 'programme', 'media', 'other'],
      default: 'general',
    },
    message: {
      type: String,
      required: [true, 'Please write your message or enquiry'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

const memoryContacts = [];

const ContactModel = mongoose.model('Contact', contactSchema);

ContactModel.inMemory = {
  create: async (data) => {
    const record = {
      _id: 'mem_' + Date.now() + Math.random().toString(36).substring(2, 7),
      ...data,
      status: 'unread',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryContacts.unshift(record);
    return record;
  },
  find: async () => [...memoryContacts],
  findOne: async (query) => {
    return memoryContacts.find(c => c._id === query._id) || null;
  },
  countDocuments: async () => memoryContacts.length,
};

module.exports = ContactModel;
