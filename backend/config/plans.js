/**
 * Pricing Plans Configuration
 * Defines features and limits for each subscription tier
 */

const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    stripePriceId: null,  // No Stripe for free tier
    features: {
      sites: 1,
      pageviews: 5000,  // 5,000 per month
      dataRetention: 30,  // days
      realTimeTracking: false,
      advancedInsights: false,
      prioritySupport: false
    }
  },

  growth: {
    name: 'Growth',
    price: 1200,  // in cents ($12.00)
    stripePriceId: process.env.STRIPE_GROWTH_PRICE_ID || null,
    features: {
      sites: 5,
      pageviews: 50000,  // 50,000 per month
      dataRetention: 90,
      realTimeTracking: true,
      advancedInsights: true,
      prioritySupport: true
    }
  }
};

/**
 * Get plan by tier name
 */
function getPlan(tier) {
  return PLANS[tier] || PLANS.free;
}

/**
 * Get sites limit for a tier
 */
function getSitesLimit(tier) {
  return getPlan(tier).features.sites;
}

/**
 * Get pageviews limit for a tier (null = unlimited)
 */
function getPageviewsLimit(tier) {
  return getPlan(tier).features.pageviews;
}

/**
 * Check if user has reached sites limit
 */
function checkSitesLimit(currentSites, tier) {
  const limit = getSitesLimit(tier);
  return currentSites >= limit;
}

/**
 * Check if user has reached pageviews limit
 */
function checkPageviewsLimit(currentPageviews, tier) {
  const limit = getPageviewsLimit(tier);
  if (limit === null) return false;  // unlimited
  return currentPageviews >= limit;
}

/**
 * Calculate next renewal date based on subscription tier
 */
function getNextRenewalDate(tier = 'free') {
  const plan = getPlan(tier);
  const days = plan.features.dataRetention;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

module.exports = {
  PLANS,
  getPlan,
  getSitesLimit,
  getPageviewsLimit,
  checkSitesLimit,
  checkPageviewsLimit,
  getNextRenewalDate
};
