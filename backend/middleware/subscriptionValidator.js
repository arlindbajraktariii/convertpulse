/**
 * Subscription Validation Middleware
 * Enforces plan limits on API requests
 */

const { checkSitesLimit, checkPageviewsLimit } = require('../config/plans');
const User = require('../models/User');

/**
 * Validate sites limit before creating a new site
 */
async function validateSitesLimit(req, res, next) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get current number of sites
    const Site = require('../models/Site');
    const siteCount = await Site.countDocuments({ userId });

    // Check if user has reached limit
    if (checkSitesLimit(siteCount, user.subscriptionTier)) {
      return res.status(403).json({
        error: 'Sites limit reached',
        message: `Your ${user.subscriptionTier} plan allows ${user.sitesLimit} site(s). Upgrade to add more.`,
        currentSites: siteCount,
        limit: user.sitesLimit
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Validate pageviews limit before recording an event
 */
async function validatePageviewsLimit(req, res, next) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get pageviews limit (null = unlimited)
    const limit = user.pageviewsLimit;
    if (limit === null || limit === 0) {
      return next();  // unlimited pageviews
    }

    // Count pageviews this month
    const Event = require('../models/Event');
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const pageviewCount = await Event.countDocuments({
      userId,
      createdAt: { $gte: firstDayOfMonth }
    });

    if (pageviewCount >= limit) {
      return res.status(403).json({
        error: 'Pageviews limit reached',
        message: `Your ${user.subscriptionTier} plan allows ${limit} pageviews per month. Upgrade to add more.`,
        currentPageviews: pageviewCount,
        limit: limit
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  validateSitesLimit,
  validatePageviewsLimit
};
