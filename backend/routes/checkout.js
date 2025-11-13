/**
 * Checkout API Route
 * Handles Stripe payment integration
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { getPlan } = require('../config/plans');

/**
 * POST /api/checkout
 * Creates a checkout session for upgrading subscription
 */
router.post('/', auth, async (req, res) => {
  try {
    const { tier } = req.body;

    if (!tier) {
      return res.status(400).json({ error: 'Tier is required' });
    }

    const plan = getPlan(tier);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    const user = await User.findById(req.userId);

    // In a production app, you would:
    // 1. Create a Stripe checkout session
    // 2. Return the session ID to redirect to Stripe
    // 
    // For now, we'll return a mock response with upgrade instructions

    res.json({
      success: true,
      message: `Ready to upgrade to ${plan.name}`,
      tier,
      priceDisplay: `$${(plan.price / 100).toFixed(2)}/month`,
      currentTier: user.subscriptionTier,
      note: 'Stripe integration coming soon. Contact support to upgrade.'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/checkout/success
 * Called after successful Stripe payment
 * In production, this would be handled by a webhook
 */
router.post('/success', auth, async (req, res) => {
  try {
    const { tier, stripeSessionId } = req.body;

    if (!tier || !stripeSessionId) {
      return res.status(400).json({ error: 'Tier and stripeSessionId are required' });
    }

    // Update user subscription
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        subscriptionTier: tier,
        subscriptionStatus: 'active',
        stripeSubscriptionId: stripeSessionId,
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)  // 30 days
      },
      { new: true }
    );

    res.json({
      success: true,
      message: `Successfully upgraded to ${tier} plan`,
      user: {
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        subscriptionStatus: user.subscriptionStatus,
        renewalDate: user.renewalDate
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/checkout/cancel
 * Cancel current subscription
 */
router.post('/cancel', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        subscriptionTier: 'free',
        subscriptionStatus: 'cancelled',
        stripeSubscriptionId: null,
        renewalDate: null
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Subscription cancelled. You now have the Free plan.',
      user: {
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        subscriptionStatus: user.subscriptionStatus
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
