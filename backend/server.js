const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

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

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guesswhere')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

console.log(`Starting server on ${HOST}:${PORT}...`);
console.log(`Environment PORT: ${process.env.PORT}`);
console.log(`Environment HOST: ${process.env.HOST}`);

// Add a small delay to ensure port is available
setTimeout(() => {
  const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on ${HOST}:${PORT}`);
    console.log(`Health check available at http://${HOST}:${PORT}/health`);
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
    });
  });
}, 2000);

module.exports = app;
