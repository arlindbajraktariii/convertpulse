const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subscriptionTier: {
    type: String,
    enum: ['free', 'growth'],
    default: 'free'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'cancelled', 'past_due'],
    default: 'active'
  },
  stripeCustomerId: {
    type: String,
    default: null
  },
  stripeSubscriptionId: {
    type: String,
    default: null
  },
  renewalDate: {
    type: Date,
    default: null
  },
  sitesLimit: {
    type: Number,
    default: 1  // free tier limit
  },
  pageviewsLimit: {
    type: Number,
    default: 0  // 0 = unlimited for free tier
  },
  dataRetentionDays: {
    type: Number,
    default: 30
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
