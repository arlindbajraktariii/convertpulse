# ConvertPulse Setup Checklist

## ✅ Pre-Development Setup

### Required Software
- [ ] Node.js 18+ installed
- [ ] MongoDB installed (or Atlas account)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

### Optional Tools
- [ ] MongoDB Compass (database GUI)
- [ ] Postman (API testing)
- [ ] React DevTools browser extension

## ✅ Backend Setup

- [ ] Navigate to `backend/` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Set `MONGODB_URI` in `.env`
- [ ] Set `JWT_SECRET` in `.env` (use a strong random string)
- [ ] Ensure MongoDB is running
- [ ] Run `npm run dev`
- [ ] Verify server starts on port 5000
- [ ] Test health check: `http://localhost:5000/health`

## ✅ Frontend Setup

- [ ] Navigate to `frontend/` folder
- [ ] Run `npm install`
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- [ ] Run `npm run dev`
- [ ] Verify app opens at `http://localhost:3000`
- [ ] Check no console errors

## ✅ Initial Testing

- [ ] Open `http://localhost:3000`
- [ ] Click "Get Started" or "Sign Up"
- [ ] Create a test account
- [ ] Verify redirect to dashboard
- [ ] Click "Add Site"
- [ ] Create a test site (name: "Test Site", domain: "test.com")
- [ ] Copy the API key from dashboard
- [ ] Verify site appears in site list

## ✅ Tracker Setup

- [ ] Navigate to `tracker/` folder
- [ ] Open `convertpulse.js` in editor
- [ ] Verify `API_ENDPOINT` points to your backend
- [ ] Open `demo.html` in editor
- [ ] Replace `YOUR_API_KEY_HERE` with your actual API key
- [ ] Open `demo.html` in a web browser
- [ ] Scroll down the page
- [ ] Click various buttons
- [ ] Wait 5-10 seconds for events to batch
- [ ] Return to dashboard
- [ ] Refresh page
- [ ] Verify events appear in analytics

## ✅ Feature Verification

### Authentication
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can logout
- [ ] Token persists in localStorage
- [ ] Dashboard redirects to login when not authenticated

### Site Management
- [ ] Can create new site
- [ ] Can view all sites
- [ ] Can switch between sites
- [ ] API key is displayed
- [ ] Can copy tracking code
- [ ] Free plan limited to 1 site

### Analytics Dashboard
- [ ] Pageviews counter works
- [ ] Unique sessions counted
- [ ] Scroll depth displayed
- [ ] Average time on page shown
- [ ] Daily activity chart renders
- [ ] Scroll distribution pie chart renders
- [ ] Top clicks bar chart renders
- [ ] Can change timeframe (24h, 7d, 30d)

### Tracker
- [ ] Tracks scroll depth
- [ ] Tracks button clicks
- [ ] Tracks time on page
- [ ] Tracks pageviews
- [ ] Batches events properly
- [ ] Uses sendBeacon on page exit
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari

## ✅ Production Preparation

### Backend
- [ ] Change `JWT_SECRET` to a secure random string
- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB (Atlas)
- [ ] Set up CORS for production domain
- [ ] Review and secure all endpoints
- [ ] Add rate limiting (optional)

### Frontend
- [ ] Update `NEXT_PUBLIC_API_URL` to production backend
- [ ] Test production build: `npm run build`
- [ ] Verify no build errors
- [ ] Test production mode: `npm start`
- [ ] Check all pages work

### Tracker
- [ ] Minify `convertpulse.js` for production
- [ ] Update `API_ENDPOINT` to production URL
- [ ] Test with production site
- [ ] Host on CDN (optional)

## ✅ Deployment

### Frontend (Vercel)
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Set environment variable: `NEXT_PUBLIC_API_URL`
- [ ] Deploy
- [ ] Verify deployment works
- [ ] Test all pages

### Backend (Render/Railway/Heroku)
- [ ] Create account on hosting platform
- [ ] Create new web service
- [ ] Connect repository or upload code
- [ ] Set environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
- [ ] Deploy
- [ ] Verify health endpoint works
- [ ] Test API endpoints

### MongoDB Atlas
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IPs (or allow all: 0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection from backend

## ✅ Post-Deployment

- [ ] Test full user flow on production
- [ ] Register new account
- [ ] Add site
- [ ] Install tracker on test page
- [ ] Verify events are tracked
- [ ] Check dashboard shows data
- [ ] Test on mobile device
- [ ] Share with beta users
- [ ] Monitor error logs
- [ ] Set up uptime monitoring (optional)

## ✅ Optional Enhancements

- [ ] Set up Stripe for payments
- [ ] Add email notifications
- [ ] Implement export to CSV
- [ ] Add custom event tracking
- [ ] Create heatmap visualization
- [ ] Add team collaboration
- [ ] Implement A/B testing
- [ ] Add conversion funnels
- [ ] Create mobile app
- [ ] Add API documentation

## 🎯 Success Criteria

Your ConvertPulse MVP is complete when:
- ✅ Users can register and login
- ✅ Users can add sites (1 for free, 5 for pro)
- ✅ Tracker snippet works on any webpage
- ✅ Dashboard shows real-time analytics
- ✅ Charts visualize scroll, clicks, and time data
- ✅ Both frontend and backend are deployed
- ✅ System is stable and secure

## 📊 Metrics to Track

- User signups per day
- Active sites
- Total events tracked
- API response times
- Error rates
- Conversion rate (landing page visits → signups)

## 🚀 Launch Checklist

- [ ] All features working
- [ ] No critical bugs
- [ ] Documentation complete
- [ ] Test accounts created
- [ ] Marketing site live
- [ ] Support email set up
- [ ] Analytics tracking added
- [ ] Social media ready
- [ ] Launch announcement prepared

---

**Estimated Setup Time**: 30-60 minutes
**Estimated Development Time**: 2-3 weeks
**Deployment Time**: 1-2 hours

Good luck with your ConvertPulse launch! 🎉
