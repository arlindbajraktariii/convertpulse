# Pricing Model Implementation

## Overview

ConvertPulse now has a 3-tier subscription model with plan-based feature limits and usage tracking.

## Pricing Tiers

### Free (Forever)
- **Price:** $0
- **Sites:** 1
- **Pageviews:** Unlimited
- **Data Retention:** 7 days
- **Features:**
  - Basic conversion tracking
  - Instant conversion reports
  - UX flow analysis
  - Speed & SEO checks

### Starter
- **Price:** $5/month
- **Sites:** 1
- **Pageviews:** 10,000 per month
- **Data Retention:** 30 days
- **Features:**
  - Everything in Free +
  - Real-time tracking
  - Multiple site support coming

### Growth
- **Price:** $15/month
- **Sites:** 5
- **Pageviews:** 100,000 per month
- **Data Retention:** 90 days
- **Features:**
  - Everything in Starter +
  - Advanced insights & analytics
  - Priority support
  - Custom reports

### Pro
- **Price:** $29/month
- **Sites:** 20
- **Pageviews:** Unlimited
- **Data Retention:** 365 days (1 year)
- **Features:**
  - Everything in Growth +
  - Unlimited everything
  - Dedicated support
  - Priority feature requests

## Database Schema Updates

### User Model
Added subscription tracking fields:

```javascript
subscriptionTier: 'free' | 'starter' | 'growth' | 'pro'
subscriptionStatus: 'active' | 'cancelled' | 'past_due'
stripeCustomerId: String (optional)
stripeSubscriptionId: String (optional)
renewalDate: Date (when subscription renews)
sitesLimit: Number (based on tier)
pageviewsLimit: Number (based on tier, null = unlimited)
```

## API Endpoints

### GET /api/plans
Returns all available pricing plans.

**Response:**
```json
{
  "success": true,
  "plans": [
    {
      "tier": "free",
      "name": "Free Forever",
      "price": 0,
      "priceDisplay": "$0.00",
      "features": {
        "sites": 1,
        "pageviews": null,
        "dataRetention": 7,
        ...
      }
    },
    ...
  ]
}
```

### GET /api/plans/:tier
Returns details for a specific plan.

**Parameters:**
- `tier` (string): Plan tier (free, starter, growth, pro)

**Response:**
```json
{
  "success": true,
  "tier": "pro",
  "name": "Pro",
  "price": 2900,
  "priceDisplay": "$29.00",
  "features": { ... }
}
```

### POST /api/sites (with validation)
Create a new site (requires authentication).

**Validation:**
- User must not have reached their sites limit for their tier
- Middleware `validateSitesLimit` automatically enforces this

**Error Response:**
```json
{
  "error": "Sites limit reached",
  "message": "Your pro plan allows 20 site(s). Upgrade to add more.",
  "currentSites": 20,
  "limit": 20
}
```

### POST /api/checkout
Initiate a subscription upgrade.

**Body:**
```json
{
  "tier": "pro"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ready to upgrade to Pro",
  "tier": "pro",
  "priceDisplay": "$29.00/month",
  "currentTier": "free",
  "note": "Stripe integration coming soon"
}
```

### POST /api/checkout/success
Called after successful Stripe payment to update subscription.

**Body:**
```json
{
  "tier": "pro",
  "stripeSessionId": "cs_live_xxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully upgraded to pro plan",
  "user": {
    "email": "user@example.com",
    "subscriptionTier": "pro",
    "subscriptionStatus": "active",
    "renewalDate": "2025-02-10T..."
  }
}
```

### POST /api/checkout/cancel
Cancel current subscription (downgrade to free tier).

**Response:**
```json
{
  "success": true,
  "message": "Subscription cancelled. You now have the Free plan.",
  "user": {
    "email": "user@example.com",
    "subscriptionTier": "free",
    "subscriptionStatus": "cancelled"
  }
}
```

## Configuration

### Plans Configuration File
Location: `backend/config/plans.js`

Defines:
- Plan names and pricing
- Feature limits (sites, pageviews, retention)
- Helper functions for limit checking

To add Stripe integration:
```javascript
// In .env
STRIPE_STARTER_PRICE_ID=price_xxxxx
STRIPE_GROWTH_PRICE_ID=price_xxxxx
STRIPE_PRO_PRICE_ID=price_xxxxx
```

## Middleware

### validateSitesLimit
Location: `backend/middleware/subscriptionValidator.js`

Applied to: `POST /api/sites`

Checks:
- User hasn't reached their sites limit for their tier
- Returns 403 with limit info if exceeded

### validatePageviewsLimit
Location: `backend/middleware/subscriptionValidator.js`

Applied to: `POST /api/events` (optional, not yet added)

Checks:
- User hasn't exceeded monthly pageview limit
- Counts pageviews from 1st of month to today
- Returns 403 with usage info if exceeded

## Usage Examples

### Check User Tier
```javascript
const User = require('./models/User');
const user = await User.findById(userId);
console.log(user.subscriptionTier);  // 'free', 'starter', 'growth', or 'pro'
```

### Get Plan Limits
```javascript
const { getSitesLimit, getPageviewsLimit } = require('./config/plans');

const sitesLimit = getSitesLimit('pro');  // 20
const pageviewsLimit = getPageviewsLimit('pro');  // null (unlimited)
```

### Validate Limits Before Action
```javascript
const { checkSitesLimit, checkPageviewsLimit } = require('./config/plans');

if (checkSitesLimit(currentSites, 'growth')) {
  // User has reached 5 sites limit for Growth tier
  return res.status(403).json({ error: 'Limit reached' });
}
```

## Next Steps

### 1. Stripe Integration
- Install Stripe SDK: `npm install stripe`
- Create Stripe products and prices
- Update checkout endpoint to create Stripe sessions
- Add webhook handler for payment success/failure
- Store Stripe IDs in User model

### 2. Add Pageview Limit Validation
```javascript
// In backend/routes/events.js
router.post('/', auth, validatePageviewsLimit, async (req, res) => {
  // Create event...
});
```

### 3. Frontend Pricing Page
- Fetch `/api/plans` on component mount
- Display dynamic pricing with current user tier
- Add "Upgrade" buttons that trigger checkout
- Show "Current Plan" badge on active tier

### 4. Dashboard Upgrades
- Show current plan tier in sidebar
- Display usage stats (X/20 sites, Y/100k pageviews)
- Add upgrade prompts when limits approaching
- Link to `/checkout` with pre-selected tier

### 5. Email Notifications
- Send confirmation email on upgrade
- Send warning email when approaching limits
- Send renewal reminders 7 days before expiry
- Handle failed payment emails

## Testing

### Test Plans API
```bash
curl http://localhost:5000/api/plans
curl http://localhost:5000/api/plans/pro
```

### Test Sites Limit
```bash
# Try to create 2nd site on Free tier (should fail)
curl -X POST http://localhost:5000/api/sites \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Site 2","domain":"site2.com"}'
```

### Test Subscription Update
```bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tier":"pro"}'
```

## Security Considerations

1. **Always validate tier on backend** - Never trust client-provided tier
2. **Webhook verification** - Stripe webhooks must be verified
3. **Rate limiting** - Add rate limiting to checkout endpoint
4. **Audit logging** - Log all tier changes for compliance
5. **Expired subscriptions** - Implement cron job to check renewal dates

## Files Created/Modified

### Created
- `backend/config/plans.js` - Pricing tiers & limits
- `backend/middleware/subscriptionValidator.js` - Limit validation
- `backend/routes/plans.js` - Plans API endpoint
- `backend/routes/checkout.js` - Checkout/subscription endpoints

### Modified
- `backend/models/User.js` - Added subscription fields
- `backend/routes/sites.js` - Integrated sites limit validation
- `backend/server.js` - Added routes for plans and checkout
- `frontend/pages/index.tsx` - Updated pricing section display

## Environment Variables

```bash
# Optional Stripe configuration
STRIPE_STARTER_PRICE_ID=price_xxxxx
STRIPE_GROWTH_PRICE_ID=price_xxxxx
STRIPE_PRO_PRICE_ID=price_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```
