const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Site = require('../models/Site');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { validateSitesLimit } = require('../middleware/subscriptionValidator');
const { getSitesLimit } = require('../config/plans');

// GET /api/sites - Get all sites for user
router.get('/', auth, async (req, res) => {
  try {
    const sites = await Site.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ sites });
  } catch (error) {
    console.error('Get sites error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/sites - Create new site
router.post('/', auth, validateSitesLimit, async (req, res) => {
  try {
    const { name, domain } = req.body;

    if (!name || !domain) {
      return res.status(400).json({ error: 'Name and domain are required' });
    }

    // Get user info
    const user = await User.findById(req.userId);
    const existingSites = await Site.countDocuments({ userId: req.userId, isActive: true });
    const limit = getSitesLimit(user.subscriptionTier);

    // Generate API key
    const apiKey = crypto.randomBytes(16).toString('hex');

    const site = new Site({
      userId: req.userId,
      name,
      domain,
      apiKey,
      isActive: true
    });

    await site.save();

    res.status(201).json({
      ...site.toObject(),
      message: `Site created (${existingSites + 1}/${limit})`
    });
  } catch (error) {
    console.error('Create site error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/sites/:id - Delete site
router.delete('/:id', auth, async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    await Site.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: 'Site deleted' });
  } catch (error) {
    console.error('Delete site error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/sites/:id - Update site
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, url } = req.body;
    const site = await Site.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    if (name) site.name = name;
    if (url) site.domain = url; // Map 'url' to 'domain' field

    await site.save();

    res.json(site);
  } catch (error) {
    console.error('Update site error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
