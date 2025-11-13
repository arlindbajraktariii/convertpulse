const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  url: String,
  eventType: {
    type: String,
    required: true,
    enum: ['cta_click', 'form_submit', 'conversion', 'scroll', 'click', 'time', 'pageview', 'custom'],
    index: true
  },
  eventData: mongoose.Schema.Types.Mixed,
  
  // Legacy fields for backward compatibility
  section: {
    type: String,
    default: null
  },
  value: mongoose.Schema.Types.Mixed,
  userAgent: String,
  pageUrl: String,
  
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Indexes
eventSchema.index({ siteId: 1, timestamp: -1 });
eventSchema.index({ siteId: 1, eventType: 1 });
eventSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 }); // 90 days

module.exports = mongoose.model('Event', eventSchema);
