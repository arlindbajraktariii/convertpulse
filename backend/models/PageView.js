const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
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
  url: {
    type: String,
    required: true
  },
  pathname: String,
  referrer: String,
  
  // Performance Metrics
  ttfb: Number, // Time to First Byte
  domReady: Number, // DOM Content Loaded
  totalLoad: Number, // Full page load
  pageSize: Number, // KB
  requestCount: Number,
  lazyImages: Number,
  lcp: Number, // Largest Contentful Paint
  cls: Number, // Cumulative Layout Shift
  fid: Number, // First Input Delay
  
  // Engagement Metrics
  timeOnPage: Number, // seconds
  scrollDepth: Number, // percentage
  ctaClicks: Number,
  totalClicks: Number,
  bounced: {
    type: Boolean,
    default: true
  },
  
  // Conversion Metrics
  formSubmissions: Number,
  navigationClicks: Number,
  
  // Device & Browser Info
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'unknown'
  },
  browser: String,
  os: String,
  screenWidth: Number,
  screenHeight: Number,
  language: String,
  timezone: String,
  userAgent: String,
  
  // UX Issues
  missingAltTags: Number,
  longParagraphs: Number,
  slowMedia: Number,
  outboundLinks: Number,
  ctaCount: Number,
  
  // Geo data (to be enriched by backend)
  country: String,
  city: String,
  region: String,
  
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
pageViewSchema.index({ siteId: 1, timestamp: -1 });
pageViewSchema.index({ siteId: 1, sessionId: 1 });
pageViewSchema.index({ siteId: 1, deviceType: 1 });
pageViewSchema.index({ siteId: 1, browser: 1 });
pageViewSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 }); // 90 days

module.exports = mongoose.model('PageView', pageViewSchema);
