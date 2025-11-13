# Guesswhere Tracker

Lightweight JavaScript tracking snippet for Guesswhere Analytics.

## Installation

### Option 1: Direct Script Tag

Add this to your HTML `<head>` or before closing `</body>`:

```html
<script src="https://your-cdn.com/guesswhere.js" data-site-id="YOUR_API_KEY"></script>
```

### Option 2: Self-Hosted

1. Download `guesswhere.js`
2. Host it on your server
3. Add to your HTML:

```html
<script src="/path/to/guesswhere.js" data-site-id="YOUR_API_KEY"></script>
```

## What It Tracks

- **Scroll Depth**: Maximum scroll percentage on the page
- **Button Clicks**: All buttons, links, and elements with `.cta` or `.btn` classes
- **Time on Page**: Total time spent before leaving
- **Pageviews**: Initial page load

## Custom Tracking

Add `data-track` attribute to any element for custom tracking:

```html
<button data-track="signup-button">Sign Up</button>
<a href="/pricing" data-track="pricing-link">View Pricing</a>
```

## Manual Tracking (Optional)

```javascript
// Track custom event
Guesswhere.track('custom-event', 'button-name', 1);

// Force flush event queue
Guesswhere.flush();
```

## Configuration

Update `API_ENDPOINT` in `guesswhere.js` to point to your backend:

```javascript
const API_ENDPOINT = 'https://your-api.com/api/events';
```

## Demo

Open `demo.html` in your browser to see the tracker in action.

## File Size

- Unminified: ~6KB
- Minified: ~2KB (recommended for production)

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
