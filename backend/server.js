const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CORS Configuration - Allow requests from any domain for tracker
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Site-ID'],
  credentials: false
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'super-secret-session-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/guesswhere',
    touchAfter: 24 * 3600 // lazy session update
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

// MongoDB Connection
console.log('🔄 Connecting to MongoDB...');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set (hidden)' : 'Not set, using localhost');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guesswhere', {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Full error:', err);
    // Don't exit the process, just log the error
    // process.exit(1);
  });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit, just log
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit, just log
});

// Routes - wrap in try-catch to prevent crashes
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/events', require('./routes/events'));
  app.use('/api/stats', require('./routes/stats'));
  app.use('/api/sites', require('./routes/sites'));
  app.use('/api/plans', require('./routes/plans'));
  app.use('/api/checkout', require('./routes/checkout'));
  app.use('/api/early-access', require('./routes/earlyAccess'));
  app.use('/api/track', require('./routes/track'));
} catch (error) {
  console.error('Error loading routes:', error);
  // Don't exit, continue with partial functionality
}

// Serve tracking script directly with proper CORS headers
app.get('/tracker.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.set('Cache-Control', 'public, max-age=3600');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-Site-ID');
  res.sendFile(__dirname + '/../tracker/tracker.js');
});

// Authentication middleware for protected routes
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// View Routes
app.get('/', (req, res) => {
  res.render('index', { isLoggedIn: !!req.session.userId });
});

app.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.render('login', { error: null });
});

app.get('/register', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.render('register', { error: null });
});

app.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const User = require('./models/User');
    const user = await User.findById(req.session.userId);
    res.render('dashboard', { user: user.toObject() });
  } catch (error) {
    res.redirect('/login');
  }
});

app.get('/sites', requireAuth, async (req, res) => {
  try {
    const User = require('./models/User');
    const user = await User.findById(req.session.userId);
    res.render('sites', { user: user.toObject() });
  } catch (error) {
    res.redirect('/login');
  }
});

app.get('/profile', requireAuth, async (req, res) => {
  try {
    const User = require('./models/User');
    const user = await User.findById(req.session.userId);
    res.render('profile', { user: user.toObject() });
  } catch (error) {
    res.redirect('/login');
  }
});

app.get('/privacy', (req, res) => {
  res.render('privacy', { isLoggedIn: !!req.session.userId });
});

app.get('/terms', (req, res) => {
  res.render('terms', { isLoggedIn: !!req.session.userId });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Health check
app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusMessages = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: mongoStatus === 1 ? 'ok' : 'error',
    timestamp: new Date(),
    mongodb: {
      status: statusMessages[mongoStatus] || 'unknown',
      readyState: mongoStatus,
      database: mongoose.connection.db ? mongoose.connection.db.databaseName : null
    },
    environment: {
      node_env: process.env.NODE_ENV,
      mongodb_uri: process.env.MONGODB_URI ? 'configured' : 'not configured'
    }
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

console.log(`Starting server on ${HOST}:${PORT}...`);
console.log(`Environment PORT: ${process.env.PORT}`);
console.log(`Environment HOST: ${process.env.HOST}`);

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on ${HOST}:${PORT}`);
  console.log(`Health check available at http://${HOST}:${PORT}/health`);
  console.log(`View your site at http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  console.error('PORT:', PORT, 'HOST:', HOST);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

module.exports = app;
