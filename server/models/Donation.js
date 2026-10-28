const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please specify donation amount'],
      min: [100, 'Minimum donation amount is ₦100'],
    },
    currency: {
      type: String,
      default: 'NGN',
    },
    frequency: {
      type: String,
      enum: ['one-time', 'monthly', 'quarterly', 'annually'],
      default: 'one-time',
    },
    pillar: {
      type: String,
      enum: ['general', 'education', 'healthcare', 'community'],
      default: 'general',
    },
    donorName: {
      type: String,
      trim: true,
      default: 'Anonymous Supporter',
    },
    donorEmail: {
      type: String,
      required: [true, 'Please provide donor email address'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    donorPhone: {
      type: String,
      trim: true,
      default: '',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'transfer', 'ussd', 'wallet', 'bank_transfer'],
      default: 'card',
    },
    transactionRef: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
    notes: {
      type: String,
      default: '',
    },
    receiptSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Fallback in-memory store for dev when Mongo is offline
const memoryDonations = [];

const DonationModel = mongoose.model('Donation', donationSchema);

DonationModel.inMemory = {
  create: async (data) => {
    const record = {
      _id: 'mem_' + Date.now() + Math.random().toString(36).substring(2, 7),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryDonations.unshift(record);
    return record;
  },
  find: async (query = {}) => {
    let result = [...memoryDonations];
    if (query.pillar) result = result.filter(d => d.pillar === query.pillar);
    if (query.status) result = result.filter(d => d.status === query.status);
    return result;
  },
  findOne: async (query = {}) => {
    return memoryDonations.find(d => {
      if (query.transactionRef) return d.transactionRef === query.transactionRef;
      if (query._id) return d._id === query._id;
      return false;
    }) || null;
  },
  countDocuments: async () => memoryDonations.length,
  aggregateTotal: async () => memoryDonations.reduce((acc, d) => acc + (d.amount || 0), 0),
};

module.exports = DonationModel;
