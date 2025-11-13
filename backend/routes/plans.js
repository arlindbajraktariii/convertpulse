/**
 * Plans API Route
 * GET /api/plans - Returns all pricing plans
 * GET /api/plans/:tier - Returns specific plan details
 */

const express = require('express');
const router = express.Router();
const { PLANS, getPlan } = require('../config/plans');

/**
 * GET /api/plans
 * Returns all available pricing plans
 */
router.get('/', (req, res) => {
  try {
    // Format plans for frontend (convert cents to dollars)
    const formattedPlans = Object.keys(PLANS).map(tier => ({
      tier,
      ...PLANS[tier],
      priceDisplay: `$${(PLANS[tier].price / 100).toFixed(2)}`
    }));

    res.json({
      success: true,
      plans: formattedPlans
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/plans/:tier
 * Returns details for a specific pricing tier
 */
router.get('/:tier', (req, res) => {
  try {
    const { tier } = req.params;
    const plan = getPlan(tier);

    if (!PLANS[tier]) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.json({
      success: true,
      tier,
      ...plan,
      priceDisplay: `$${(plan.price / 100).toFixed(2)}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
