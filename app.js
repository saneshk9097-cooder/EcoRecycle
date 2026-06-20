const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
// Force custom DNS only in local non-production environment if needed
if (process.env.NODE_ENV !== 'production') {
  const dns = require('dns');
  try {
    dns.setServers([
        '1.1.1.1',
        '8.8.8.8'
    ]);
  } catch (err) {
    console.warn('Warning: Failed to set custom DNS servers locally:', err.message);
  }
}

// Initialize Express app
const app = express();

// Enable trust proxy (essential for secure cookies behind reverse proxies like Render)
app.set('trust proxy', 1);

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'eco_recycle_secret_key_123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Session user local middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Load application data constants
const constants = require('./config/constants');

// Inject constants into views
app.use((req, res, next) => {
  res.locals.centers = constants.centers;
  res.locals.facts = constants.facts;
  res.locals.tips = constants.tips;
  res.locals.resources = constants.resources;
  next();
});

// Import routes
const indexRoutes = require('./routes/index');
const recyclingRoutes = require('./routes/recycling');
const educationRoutes = require('./routes/education');

// Use routes
app.use('/', indexRoutes);
app.use('/recycling', recyclingRoutes);
app.use('/education', educationRoutes);

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB().catch(err => console.log('Database connection error:', err));

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found',
    path: req.url
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  
  res.status(status).render('pages/error', {
    title: `Error ${status} - E-Waste Management`,
    path: req.url,
    error: {
      status,
      message
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app; 