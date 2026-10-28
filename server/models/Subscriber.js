const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    source: {
      type: String,
      default: 'website_footer',
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const memorySubscribers = [];

const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);

SubscriberModel.inMemory = {
  create: async (data) => {
    const existing = memorySubscribers.find(s => s.email === data.email.toLowerCase());
    if (existing) {
      return existing;
    }
    const record = {
      _id: 'mem_' + Date.now() + Math.random().toString(36).substring(2, 7),
      email: data.email.toLowerCase(),
      source: data.source || 'website_footer',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memorySubscribers.unshift(record);
    return record;
  },
  find: async () => [...memorySubscribers],
  findOne: async (query) => {
    return memorySubscribers.find(s => s.email === query.email?.toLowerCase()) || null;
  },
  countDocuments: async () => memorySubscribers.length,
};

module.exports = SubscriberModel;
