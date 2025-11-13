# Guesswhere Analytics Platform

## 🎉 Successfully Reconfigured to Pure Node.js!

The platform has been completely migrated from Next.js to a pure Node.js architecture with Express.js and EJS templating.

## 🏗️ New Architecture

### **Single Service Design**
- **Backend**: Express.js with EJS server-side rendering
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: Session-based with express-session + JWT
- **Styling**: Tailwind CSS (CDN for development)
- **Charts**: Chart.js for analytics visualization
- **Deployment**: Single Node.js service on Render.com

## 📂 Project Structure

```
convertpulse/
├── backend/
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── views/            # EJS templates
│   │   ├── index.ejs     # Landing page
│   │   ├── login.ejs     # Login page
│   │   ├── register.ejs  # Registration page
│   │   ├── dashboard.ejs # Analytics dashboard
│   │   ├── sites.ejs     # Site management
│   │   ├── profile.ejs   # User profile
│   │   ├── privacy.ejs   # Privacy policy
│   │   └── terms.ejs     # Terms of service
│   ├── public/           # Static assets
│   │   ├── css/          # Compiled CSS
│   │   └── js/           # Client-side JavaScript
│   ├── middleware/       # Express middleware
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
├── tracker/              # Analytics tracking script
├── render.yaml           # Render deployment config
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (but <25.0.0)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd c:\xamppp\htdocs\convertpulse
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already configured with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://userlove_db_user:tJ8f05ZPOlJ66WLU@main.ukietpl.mongodb.net/guesswhere?retryWrites=true&w=majority&appName=main
   JWT_SECRET=super-secret-jwt-key-change-in-production-12345
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:5000 in your browser
   - Homepage will load with the landing page
   - Register a new account or login

## 🌐 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Protected Routes (require authentication)
- `/dashboard` - Analytics dashboard
- `/sites` - Site management
- `/profile` - User profile settings
- `/logout` - Logout

### API Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password
- `GET /api/sites` - Get user's sites
- `POST /api/sites` - Create new site
- `DELETE /api/sites/:id` - Delete site
- `GET /api/stats/:siteId` - Get site analytics
- `POST /api/track/pageview` - Track page view
- `POST /api/track/event` - Track custom event
- `GET /tracker.js` - Analytics tracking script
- `GET /health` - Health check endpoint

## 🔧 Technology Stack

### Core Technologies
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Template Engine**: EJS 3.1.10
- **Database**: MongoDB with Mongoose 8.0.3
- **Session Store**: connect-mongo 5.1.0
- **Authentication**: express-session + JWT
- **Password Hashing**: bcryptjs 2.4.3

### Frontend
- **Styling**: Tailwind CSS (CDN)
- **Charts**: Chart.js 4.4.0
- **HTTP Client**: Fetch API
- **Icons**: Heroicons (inline SVG)

### Development
- **Dev Server**: nodemon 3.0.2
- **Environment**: dotenv 16.3.1
- **CORS**: cors 2.8.5

## 📊 Features

### Analytics Tracking
- Real-time page view tracking
- Custom event tracking
- Scroll depth analysis
- Time on page metrics
- Click tracking
- Device and browser detection
- Geographic location tracking
- Core Web Vitals monitoring

### Dashboard
- Interactive charts with Chart.js
- Daily activity visualization
- Top pages analysis
- Real-time statistics
- Session management
- Scroll depth distribution

### User Management
- Session-based authentication
- Secure password hashing
- Email validation
- Profile management
- Password change functionality

### Site Management
- Multiple site tracking
- API key generation
- Site domain management
- Tracking code snippets
- Site deletion

### Subscription Plans
- **Free**: 1 site, 5,000 pageviews/month
- **Growth**: 5 sites, 50,000 pageviews/month

## 🚢 Deployment

### Render.com Deployment

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Migrated to Node.js architecture"
   git push origin main
   ```

2. **Configure Render Dashboard**
   - Go to https://render.com
   - Connect your repository
   - Render will automatically detect `render.yaml`

3. **Set Environment Variables**
   In Render dashboard, add these secrets:
   - `mongodb_uri` - Your MongoDB connection string
   - `jwt_secret` - A secure random string

4. **Deploy**
   - Render will automatically build and deploy
   - Access via: https://guesswhere.onrender.com

### Environment Variables for Production

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=10000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secure-jwt-secret>
```

## 🔐 Security Features

- Session-based authentication with secure cookies
- Password hashing with bcryptjs
- JWT token generation for API authentication
- CORS protection
- MongoDB injection prevention with Mongoose
- XSS protection with EJS auto-escaping
- Environment variable security
- HTTPS enforcement in production

## 📈 Performance Optimizations

- CDN-based Tailwind CSS
- Minified Chart.js library
- MongoDB connection pooling
- Session store with MongoDB
- Static asset serving with Express
- Health check endpoint for monitoring

## 🐛 Troubleshooting

### Server won't start
- Check if port 5000 is available: `netstat -ano | findstr :5000`
- Verify MongoDB connection string in `.env`
- Check Node.js version: `node --version` (should be 18+)

### MongoDB connection issues
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for testing)
- Check connection string format
- Ensure network connectivity

### Session issues
- Clear browser cookies
- Check MongoDB connection (sessions are stored there)
- Verify JWT_SECRET is set

### Chart not displaying
- Check browser console for errors
- Verify Chart.js CDN is loading
- Ensure data is being fetched from API

## 📝 Development Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Build Tailwind CSS (if using custom build)
npm run build:css

# Watch Tailwind CSS changes
npm run watch:css
```

## 🎯 Next Steps

1. **Customize Design**
   - Modify EJS templates in `backend/views/`
   - Update Tailwind classes as needed
   - Add custom CSS in `public/css/`

2. **Add Features**
   - Implement payment integration for Growth plan
   - Add email notifications
   - Create admin dashboard
   - Add data export functionality

3. **Optimize Performance**
   - Build and minify Tailwind CSS
   - Implement caching strategies
   - Optimize database queries
   - Add CDN for static assets

4. **Enhance Security**
   - Implement rate limiting
   - Add CAPTCHA for registration
   - Enable 2FA authentication
   - Regular security audits

## 📞 Support

For issues or questions:
- **Email**: support@guesswhere.com
- **Documentation**: View inline code comments
- **Health Check**: http://localhost:5000/health

## 📜 License

MIT License - feel free to use this project for your own purposes.

---

**Built with ❤️ using Node.js + Express + MongoDB**
