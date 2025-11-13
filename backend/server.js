const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guesswhere')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/sites', require('./routes/sites'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/early-access', require('./routes/earlyAccess'));
app.use('/api/track', require('./routes/track'));

// Serve tracking script directly
app.get('/tracker.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(__dirname + '/../tracker/tracker.js');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
