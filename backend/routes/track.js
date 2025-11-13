const express = require('express');
const router = express.Router();
const PageView = require('../models/PageView');
const Event = require('../models/Event');
const Site = require('../models/Site');

// Middleware to verify site ID
const verifySite = async (req, res, next) => {
  try {
    const siteId = req.body.siteId || req.query.siteId;
    
    if (!siteId) {
      return res.status(400).json({ error: 'Site ID is required' });
    }

    const site = await Site.findOne({ 
      $or: [{ apiKey: siteId }, { scriptId: siteId }] 
    });

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    req.site = site;
    next();
  } catch (error) {
    console.error('Site verification error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Track pageview
router.post('/pageview', verifySite, async (req, res) => {
  try {
    const {
      sessionId,
      url,
      pathname,
      referrer,
      performance,
      engagement,
      conversion,
      device,
      uxIssues,
      timestamp
    } = req.body;

    // Create or update pageview
    const pageView = await PageView.findOneAndUpdate(
      {
        siteId: req.site._id,
        sessionId,
        url
      },
      {
        $set: {
          pathname,
          referrer,
          timestamp: new Date(timestamp),
          
          // Performance metrics
          ttfb: performance?.ttfb || 0,
          domReady: performance?.domReady || 0,
          totalLoad: performance?.totalLoad || 0,
          pageSize: performance?.pageSize || 0,
          requestCount: performance?.requestCount || 0,
          lazyImages: performance?.lazyImages || 0,
          lcp: performance?.lcp || 0,
          cls: performance?.cls || 0,
          fid: performance?.fid || 0,
          
          // Engagement metrics
          timeOnPage: engagement?.timeOnPage || 0,
          scrollDepth: engagement?.maxScrollDepth || 0,
          ctaClicks: engagement?.ctaClicks || 0,
          totalClicks: engagement?.totalClicks || 0,
          bounced: engagement?.bounced !== false,
          
          // Conversion metrics
          formSubmissions: conversion?.formSubmissions || 0,
          navigationClicks: conversion?.navigationClicks || 0,
          
          // Device info
          deviceType: device?.deviceType || 'unknown',
          browser: device?.browser || 'unknown',
          os: device?.os || 'unknown',
          screenWidth: device?.screenWidth || 0,
          screenHeight: device?.screenHeight || 0,
          language: device?.language || 'en',
          timezone: device?.timezone || 'UTC',
          userAgent: device?.userAgent || '',
          
          // UX issues
          missingAltTags: uxIssues?.missingAltTags || 0,
          longParagraphs: uxIssues?.longParagraphs || 0,
          slowMedia: uxIssues?.slowMedia || 0,
          outboundLinks: uxIssues?.outboundLinks || 0,
          ctaCount: uxIssues?.ctaCount || 0,
          
          updatedAt: new Date()
        }
      },
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true
      }
    );

    // Update site's last activity
    await Site.findByIdAndUpdate(req.site._id, {
      lastActivity: new Date()
    });

    res.status(200).json({ success: true, id: pageView._id });
  } catch (error) {
    console.error('Pageview tracking error:', error);
    res.status(500).json({ error: 'Failed to track pageview' });
  }
});

// Track custom event
router.post('/event', verifySite, async (req, res) => {
  try {
    const {
      sessionId,
      url,
      eventType,
      eventData,
      timestamp
    } = req.body;

    const event = new Event({
      siteId: req.site._id,
      sessionId,
      url,
      eventType,
      eventData,
      timestamp: new Date(timestamp)
    });

    await event.save();

    res.status(200).json({ success: true, id: event._id });
  } catch (error) {
    console.error('Event tracking error:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

// Serve tracking script
router.get('/script.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(__dirname + '/../../tracker/tracker.js');
});

module.exports = router;
