# ConvertPulse API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Auth Endpoints

### POST /auth/register
Create a new account.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "subscriptionTier": "free",
    "subscriptionStatus": "active",
    "sitesLimit": 1,
    "pageviewsLimit": 0
  }
}
```

### POST /auth/login
Authenticate and receive JWT token.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "subscriptionTier": "free"
  }
}
```

---

## Plans Endpoints

### GET /plans
Get all available pricing plans.

**Response (200):**
```json
{
  "success": true,
  "plans": [
    {
      "tier": "free",
      "name": "Free Forever",
      "price": 0,
      "priceDisplay": "$0.00",
      "stripePriceId": null,
      "features": {
        "sites": 1,
        "pageviews": null,
        "dataRetention": 7,
        "realTimeTracking": false,
        "advancedInsights": false,
        "prioritySupport": false
      }
    },
    {
      "tier": "starter",
      "name": "Starter",
      "price": 500,
      "priceDisplay": "$5.00",
      "stripePriceId": null,
      "features": {
        "sites": 1,
        "pageviews": 10000,
        "dataRetention": 30,
        "realTimeTracking": true,
        "advancedInsights": false,
        "prioritySupport": false
      }
    },
    {
      "tier": "growth",
      "name": "Growth",
      "price": 1500,
      "priceDisplay": "$15.00",
      "stripePriceId": null,
      "features": {
        "sites": 5,
        "pageviews": 100000,
        "dataRetention": 90,
        "realTimeTracking": true,
        "advancedInsights": true,
        "prioritySupport": true
      }
    },
    {
      "tier": "pro",
      "name": "Pro",
      "price": 2900,
      "priceDisplay": "$29.00",
      "stripePriceId": null,
      "features": {
        "sites": 20,
        "pageviews": null,
        "dataRetention": 365,
        "realTimeTracking": true,
        "advancedInsights": true,
        "prioritySupport": true
      }
    }
  ]
}
```

### GET /plans/:tier
Get a specific plan by tier.

**Parameters:**
- `tier` (string): Plan tier (free, starter, growth, pro)

**Response (200):**
```json
{
  "success": true,
  "tier": "pro",
  "name": "Pro",
  "price": 2900,
  "priceDisplay": "$29.00",
  "stripePriceId": null,
  "features": { ... }
}
```

**Error (404):**
```json
{
  "error": "Plan not found"
}
```

---

## Sites Endpoints

### GET /sites
Get all sites for authenticated user.

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "name": "My Landing Page",
    "domain": "landing.example.com",
    "apiKey": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    "isActive": true,
    "createdAt": "2025-01-10T12:00:00.000Z"
  }
]
```

### POST /sites
Create a new site.

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "name": "My Landing Page",
  "domain": "landing.example.com"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "name": "My Landing Page",
  "domain": "landing.example.com",
  "apiKey": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "isActive": true,
  "createdAt": "2025-01-10T12:00:00.000Z",
  "message": "Site created (1/1)"
}
```

**Error (403) - Limit Exceeded:**
```json
{
  "error": "Sites limit reached",
  "message": "Your free plan allows 1 site(s). Upgrade to add more.",
  "currentSites": 1,
  "limit": 1
}
```

### DELETE /sites/:id
Delete a site.

**Headers:**
```
Authorization: Bearer TOKEN
```

**Parameters:**
- `id` (string): Site ID

**Response (200):**
```json
{
  "success": true,
  "message": "Site deleted"
}
```

---

## Events Endpoints

### POST /events
Record an event/pageview for a site.

**Body:**
```json
{
  "siteId": "507f1f77bcf86cd799439011",
  "apiKey": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "eventType": "pageview",
  "referrer": "google.com",
  "userAgent": "Mozilla/5.0...",
  "timestamp": 1704897600000
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "siteId": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "eventType": "pageview",
  "referrer": "google.com",
  "timestamp": 1704897600000,
  "createdAt": "2025-01-10T12:00:00.000Z"
}
```

---

## Stats Endpoints

### GET /stats/:siteId
Get analytics for a specific site.

**Headers:**
```
Authorization: Bearer TOKEN
```

**Parameters:**
- `siteId` (string): Site ID

**Query Parameters:**
- `period` (string): "24h", "7d", "30d" (default: "30d")

**Response (200):**
```json
{
  "siteId": "507f1f77bcf86cd799439011",
  "period": "30d",
  "totalPageviews": 5000,
  "uniqueVisitors": 1250,
  "conversionRate": 2.5,
  "topReferrers": [
    { "referrer": "google.com", "count": 2000 },
    { "referrer": "direct", "count": 1500 }
  ],
  "pageviewsByDay": [
    { "date": "2025-01-10", "pageviews": 500 }
  ]
}
```

---

## Checkout Endpoints

### POST /checkout
Initiate a subscription upgrade.

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "tier": "pro"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Ready to upgrade to Pro",
  "tier": "pro",
  "priceDisplay": "$29.00/month",
  "currentTier": "free",
  "note": "Stripe integration coming soon. Contact support to upgrade."
}
```

### POST /checkout/success
Update subscription after successful payment.

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "tier": "pro",
  "stripeSessionId": "cs_live_xxxxx"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Successfully upgraded to pro plan",
  "user": {
    "email": "user@example.com",
    "subscriptionTier": "pro",
    "subscriptionStatus": "active",
    "renewalDate": "2025-02-10T12:00:00.000Z"
  }
}
```

### POST /checkout/cancel
Cancel subscription and downgrade to free.

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response (200):**
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

---

## Early Access Endpoints

### POST /early-access
Sign up for early access (no auth required).

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Thanks for signing up! Check your email for details.",
  "email": "john@example.com"
}
```

**Error (400):**
```json
{
  "error": "Invalid email format"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "message": "Detailed error message (optional)",
  "code": "ERROR_CODE (optional)"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized (missing token)
- `403` - Forbidden (permission denied or limit exceeded)
- `404` - Not found
- `500` - Server error

---

## Rate Limiting
Currently no rate limiting. Will be added in production before Stripe integration.

---

## Webhooks (Coming Soon)
Stripe webhook endpoint for payment events:
```
POST /webhooks/stripe
```

Will handle:
- `checkout.session.completed` - Subscription activated
- `invoice.payment_failed` - Payment failed
- `customer.subscription.updated` - Subscription modified
- `customer.subscription.deleted` - Subscription cancelled
