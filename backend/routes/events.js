const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Site = require('../models/Site');

// POST /api/events - Save visitor event
router.post('/', async (req, res) => {
  try {
    const { siteId, eventType, section, value, sessionId, pageUrl } = req.body;

    // Validate required fields
    if (!siteId || !eventType || value === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify site exists
    const site = await Site.findOne({ apiKey: siteId });
    if (!site || !site.isActive) {
      return res.status(403).json({ error: 'Invalid site ID' });
    }

    // Create event
    const event = new Event({
      siteId,
      eventType,
      section,
      value,
      sessionId,
      pageUrl,
      userAgent: req.headers['user-agent'],
      timestamp: new Date()
    });

    await event.save();

    res.status(201).json({ success: true, eventId: event._id });
  } catch (error) {
    console.error('Event creation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/events/batch - Save multiple events at once
router.post('/batch', async (req, res) => {
  try {
    const { siteId, events } = req.body;

    if (!siteId || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'Invalid batch data' });
    }

    // Verify site exists
    const site = await Site.findOne({ apiKey: siteId });
    if (!site || !site.isActive) {
      return res.status(403).json({ error: 'Invalid site ID' });
    }

    // Prepare events for insertion
    const eventDocs = events.map(e => ({
      siteId,
      eventType: e.eventType,
      section: e.section,
      value: e.value,
      sessionId: e.sessionId,
      pageUrl: e.pageUrl,
      userAgent: req.headers['user-agent'],
      timestamp: e.timestamp ? new Date(e.timestamp) : new Date()
    }));

    await Event.insertMany(eventDocs);

    res.status(201).json({ success: true, count: eventDocs.length });
  } catch (error) {
    console.error('Batch event creation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
