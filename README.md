# ConvertPulse - Landing Page Analytics SaaS

A complete full-stack SaaS application for tracking user behavior on landing pages and visualizing analytics in a clean dashboard.

![ConvertPulse](https://img.shields.io/badge/Status-MVP-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

### Core Analytics
- **📊 Scroll Depth Tracking** - Monitor how far visitors scroll on your pages
- **🖱️ Click Analytics** - Track button clicks and CTA interactions
- **⏱️ Time on Page** - Measure visitor engagement duration
- **📈 Visual Dashboard** - Beautiful charts with Recharts

### Platform Features
- **🔐 JWT Authentication** - Secure user authentication
- **💼 Multi-Site Management** - Track multiple sites from one dashboard
- **📊 Real-time Stats** - Live analytics data
- **🎯 Event Batching** - Efficient data collection
- **⚡ Lightweight Tracker** - Only 2KB minified

### Pricing Tiers
- **Free Plan**: 1 site, 10K pageviews/month
- **Pro Plan**: 5 sites, unlimited pageviews ($9/mo)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **API Client**: Axios
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Deployment**: Render / Railway / Heroku

### Tracking Snippet
- **Pure JavaScript** (Vanilla JS)
- **Size**: ~2KB minified
- **Features**: Scroll, Click, Time tracking
- **Delivery**: sendBeacon API with fetch fallback

## 📁 Project Structure

```
convertpulse/
├── backend/              # Express.js API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   └── server.js        # Entry point
│
├── frontend/            # Next.js dashboard
│   ├── pages/          # App pages
│   ├── components/     # React components
│   ├── lib/            # API client
│   ├── types/          # TypeScript types
│   └── styles/         # Global styles
│
└── tracker/             # JavaScript tracking snippet
    ├── convertpulse.js # Main tracker
    ├── demo.html       # Demo page
    └── README.md       # Installation guide
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running (local or Atlas)
- npm or yarn package manager

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your API URL
npm run dev
```

Frontend runs on `http://localhost:3000`

### Testing the Tracker

1. Create an account at `http://localhost:3000/register`
2. Add a site in the dashboard
3. Copy your API key
4. Open `tracker/demo.html`
5. Replace `YOUR_API_KEY_HERE` with your actual API key
6. Open the demo in a browser and interact with the page
7. Check your dashboard for analytics

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - User login

### Sites Management
- `GET /api/sites` - Get user's sites
- `POST /api/sites` - Create new site
- `DELETE /api/sites/:id` - Delete site

### Event Tracking
- `POST /api/events` - Track single event
- `POST /api/events/batch` - Track multiple events

### Analytics
- `GET /api/stats/:siteId?timeframe=7d` - Get analytics stats

## 🎯 Tracker Usage

Add to your landing page:

```html
<script src="https://your-cdn.com/convertpulse.js" 
        data-site-id="YOUR_API_KEY">
</script>
```

### Custom Tracking

```html
<!-- Track specific elements -->
<button data-track="signup-cta">Sign Up</button>
<a href="/pricing" data-track="pricing-link">Pricing</a>

<!-- Manual tracking -->
<script>
  ConvertPulse.track('custom-event', 'element-id', value);
  ConvertPulse.flush(); // Force send events
</script>
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel deploy
```

Or connect your GitHub repo to Vercel for automatic deployments.

**Environment Variables:**
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (Render/Railway)

1. Create a new Web Service
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (optional)

### MongoDB (Atlas)

1. Create free cluster at mongodb.com
2. Whitelist all IPs (0.0.0.0/0) or your server IP
3. Create database user
4. Get connection string
5. Add to backend `.env`

## 📊 Data Schema

### Event Schema
```javascript
{
  siteId: String,      // API key
  eventType: String,   // 'scroll', 'click', 'time', 'pageview'
  section: String,     // Element identifier
  value: Mixed,        // Event value
  sessionId: String,   // Unique session
  pageUrl: String,     // Page URL
  timestamp: Date
}
```

### Site Schema
```javascript
{
  userId: ObjectId,
  name: String,
  domain: String,
  apiKey: String,      // Unique tracking key
  isActive: Boolean,
  createdAt: Date
}
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcryptjs
- API key validation
- CORS enabled
- Input validation with express-validator

## 🎨 Design Philosophy

- **Minimal & Clean** - No unnecessary complexity
- **Fast & Lightweight** - Optimized for performance
- **Privacy-First** - No personal data collection
- **Production-Ready** - Deployable immediately

## 📈 Roadmap

- [ ] Heatmap visualization
- [ ] Email reports
- [ ] Conversion funnel tracking
- [ ] A/B testing integration
- [ ] Team collaboration
- [ ] Stripe payment integration
- [ ] Custom event tracking
- [ ] Export to CSV

## 🤝 Contributing

This is an MVP project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 💡 Tips

1. **Development**: Use localhost for quick testing
2. **Production**: Set secure JWT secrets
3. **MongoDB**: Use indexes for better performance
4. **Tracker**: Minify before deploying
5. **CORS**: Configure properly for your domain

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure port 5000 is not in use
- Verify all environment variables

### Frontend can't connect
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running
- Check CORS settings

### Tracker not sending data
- Verify API key is correct
- Check browser console for errors
- Ensure backend `/api/events` is accessible

## 📞 Support

For issues or questions, check the README files in each subdirectory:
- `backend/README.md`
- `frontend/README.md`
- `tracker/README.md`

---

**Built with ❤️ for modern SaaS teams**

Start tracking, start optimizing, start converting! 🚀
