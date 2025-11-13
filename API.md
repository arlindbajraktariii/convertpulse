# ConvertPulse API Documentation

Base URL: `http://localhost:5000/api` (development)

All endpoints return JSON responses.

---

## Authentication

### Register New User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "plan": "free"
  }
}
```

**Errors:**
- `400` - Validation error or user already exists
- `500` - Server error

---

### Login

**POST** `/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "plan": "free"
  }
}
```

**Errors:**
- `401` - Invalid credentials
- `500` - Server error

---

## Sites Management

All site endpoints require authentication. Include JWT token in header:
```
Authorization: Bearer <token>
```

### Get All Sites

**GET** `/sites`

Get all sites for authenticated user.

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "name": "My Landing Page",
    "domain": "example.com",
    "apiKey": "a1b2c3d4e5f6g7h8",
    "isActive": true,
    "createdAt": "2024-11-12T10:30:00.000Z"
  }
]
```

---

### Create New Site

**POST** `/sites`

Create a new site.

**Request Body:**
```json
{
  "name": "My Landing Page",
  "domain": "example.com"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "name": "My Landing Page",
  "domain": "example.com",
  "apiKey": "a1b2c3d4e5f6g7h8",
  "isActive": true,
  "createdAt": "2024-11-12T10:30:00.000Z"
}
```

**Errors:**
- `400` - Missing required fields
- `403` - Plan limit reached (Free: 1 site, Pro: 5 sites)
- `500` - Server error

---

### Delete Site

**DELETE** `/sites/:id`

Delete a site by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Site deleted"
}
```

**Errors:**
- `404` - Site not found
- `500` - Server error

---

## Event Tracking

### Track Single Event

**POST** `/events`

Track a single user event. No authentication required, but valid `siteId` (API key) is required.

**Request Body:**
```json
{
  "siteId": "a1b2c3d4e5f6g7h8",
  "eventType": "scroll",
  "section": "hero",
  "value": 75,
  "sessionId": "cp_abc123_1699789200000",
  "pageUrl": "https://example.com/landing"
}
```

**Event Types:**
- `scroll` - Scroll depth tracking (value: percentage 0-100)
- `click` - Click event (value: 1, section: element identifier)
- `time` - Time on page (value: seconds)
- `pageview` - Page view (value: 1)

**Response (201 Created):**
```json
{
  "success": true,
  "eventId": "507f1f77bcf86cd799439011"
}
```

**Errors:**
- `400` - Missing required fields
- `403` - Invalid site ID
- `500` - Server error

---

### Track Multiple Events (Batch)

**POST** `/events/batch`

Track multiple events in a single request (recommended for efficiency).

**Request Body:**
```json
{
  "siteId": "a1b2c3d4e5f6g7h8",
  "events": [
    {
      "eventType": "pageview",
      "value": 1,
      "sessionId": "cp_abc123_1699789200000",
      "pageUrl": "https://example.com/landing",
      "timestamp": "2024-11-12T10:30:00.000Z"
    },
    {
      "eventType": "scroll",
      "section": "hero",
      "value": 50,
      "sessionId": "cp_abc123_1699789200000",
      "pageUrl": "https://example.com/landing",
      "timestamp": "2024-11-12T10:30:05.000Z"
    },
    {
      "eventType": "click",
      "section": "signup-button",
      "value": 1,
      "sessionId": "cp_abc123_1699789200000",
      "pageUrl": "https://example.com/landing",
      "timestamp": "2024-11-12T10:30:10.000Z"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "count": 3
}
```

**Errors:**
- `400` - Invalid batch data
- `403` - Invalid site ID
- `500` - Server error

---

## Analytics

### Get Site Statistics

**GET** `/stats/:siteId?timeframe=7d`

Get aggregated analytics for a site. Requires authentication.

**Path Parameters:**
- `siteId` - Site API key

**Query Parameters:**
- `timeframe` - Time range: `24h`, `7d`, `30d` (default: `7d`)

**Response (200 OK):**
```json
{
  "siteId": "a1b2c3d4e5f6g7h8",
  "timeframe": "7d",
  "summary": {
    "pageviews": 1234,
    "uniqueSessions": 892,
    "avgScrollDepth": 68.5,
    "avgTimeOnPage": 127,
    "totalEvents": 5678
  },
  "scrollDistribution": {
    "0-25%": 45,
    "25-50%": 123,
    "50-75%": 234,
    "75-100%": 490
  },
  "topClicks": [
    {
      "element": "signup-button",
      "count": 234
    },
    {
      "element": "pricing-link",
      "count": 156
    }
  ],
  "dropoffSections": [
    {
      "section": "footer",
      "views": 23
    },
    {
      "section": "pricing",
      "views": 45
    }
  ],
  "dailyBreakdown": [
    {
      "date": "2024-11-05",
      "pageviews": 145,
      "clicks": 67,
      "avgScrollDepth": 65.3
    },
    {
      "date": "2024-11-06",
      "pageviews": 178,
      "clicks": 89,
      "avgScrollDepth": 70.1
    }
  ]
}
```

**Errors:**
- `403` - Access denied (user doesn't own site)
- `500` - Server error

---

## Health Check

### Check API Health

**GET** `/health`

Check if API is running.

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2024-11-12T10:30:00.000Z"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (access denied)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting is implemented (MVP).

**Recommended for production:**
- 100 requests per minute per IP
- 1000 events per minute per site

---

## CORS

CORS is enabled for all origins in development.

**For production**, update backend `server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## Authentication Flow

1. User registers or logs in
2. Server returns JWT token
3. Client stores token (localStorage)
4. Client includes token in subsequent requests:
   ```
   Authorization: Bearer <token>
   ```
5. Server validates token on protected routes

**Token expiration:** 7 days

---

## Example Usage

### JavaScript (Fetch API)

```javascript
// Register
const registerUser = async () => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

// Get sites
const getSites = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/sites', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const sites = await response.json();
  console.log(sites);
};

// Track event
const trackEvent = async () => {
  await fetch('http://localhost:5000/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      siteId: 'your-api-key',
      eventType: 'click',
      section: 'signup-button',
      value: 1,
      sessionId: 'session-id',
      pageUrl: window.location.href
    })
  });
};
```

### cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get sites (with auth)
curl http://localhost:5000/api/sites \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Track event
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{"siteId":"your-api-key","eventType":"click","section":"button","value":1}'

# Get stats (with auth)
curl "http://localhost:5000/api/stats/your-api-key?timeframe=7d" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Testing

Use tools like:
- **Postman** - GUI for API testing
- **Thunder Client** - VS Code extension
- **cURL** - Command line
- **Browser DevTools** - Network tab

---

## Best Practices

1. **Always use HTTPS in production**
2. **Store tokens securely** (httpOnly cookies or secure localStorage)
3. **Validate input** on both client and server
4. **Batch events** for better performance
5. **Handle errors gracefully**
6. **Use environment variables** for API URLs
7. **Implement rate limiting** in production
8. **Monitor API performance**

---

## Changelog

### v1.0.0 (MVP)
- Initial API release
- Authentication endpoints
- Site management
- Event tracking
- Analytics aggregation

---

For more information, see the main README.md
