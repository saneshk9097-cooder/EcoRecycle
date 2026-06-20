const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const dns=require("dns")
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

// Initialize Express app
const app = express();

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
  saveUninitialized: false
}));

// Session user local middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Sample data for templates
app.use((req, res, next) => {
  // Sample recycling centers data
  res.locals.centers = [
    {
      id: 1,
      name: 'EcoTech Recycling Center',
      address: '123 Green Street, Eco City',
      phone: '(123) 456-7890',
      hours: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm',
      acceptedItems: ['Computers', 'Phones', 'Tablets', 'TVs', 'Batteries']
    },
    {
      id: 2,
      name: 'GreenCycle E-Waste Facility',
      address: '456 Earth Avenue, Sustainable Town',
      phone: '(987) 654-3210',
      hours: 'Mon-Sat: 8am-6pm',
      acceptedItems: ['Computers', 'Printers', 'Monitors', 'Keyboards', 'Cables']
    },
    {
      id: 3,
      name: 'TechReclaim Center',
      address: '789 Recycle Road, Green Valley',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 10am-7pm, Sat-Sun: 11am-4pm',
      acceptedItems: ['All electronic devices', 'Batteries', 'Light bulbs']
    }
  ];

  // Sample e-waste facts data
  res.locals.facts = [
    {
      id: 1,
      title: 'Growing Problem',
      content: 'The world generates 50 million tons of e-waste annually, with only 20% being formally recycled.',
      source: 'Global E-waste Monitor 2020'
    },
    {
      id: 2,
      title: 'Valuable Resources',
      content: 'E-waste contains precious metals like gold, silver, copper, and palladium that can be recovered and reused.',
      source: 'United Nations University'
    },
    {
      id: 3,
      title: 'Environmental Impact',
      content: 'Improper disposal of e-waste releases toxic substances like lead, mercury, and cadmium into the environment.',
      source: 'Environmental Protection Agency'
    },
    {
      id: 4,
      title: 'Economic Value',
      content: 'The raw materials in e-waste are worth approximately $57 billion annually, yet most are discarded rather than recovered.',
      source: 'World Economic Forum'
    },
    {
      id: 5,
      title: 'Health Risks',
      content: 'Informal e-waste recycling exposes workers to hazardous chemicals that can cause respiratory problems, DNA damage, and cancer.',
      source: 'World Health Organization'
    },
    {
      id: 6,
      title: 'Fastest Growing Waste Stream',
      content: 'E-waste is the world\'s fastest-growing domestic waste stream, increasing by 21% in the five years since 2014.',
      source: 'United Nations'
    }
  ];

  // Sample e-waste reduction tips
  res.locals.tips = [
    {
      id: 1,
      title: 'Repair Before Replacing',
      content: 'Many electronic devices can be repaired rather than replaced. Look for local repair shops or learn DIY repair skills.'
    },
    {
      id: 2,
      title: 'Buy Durable Products',
      content: 'Research and invest in high-quality electronics that are built to last longer and are more repairable.'
    },
    {
      id: 3,
      title: 'Donate or Sell Used Electronics',
      content: 'If your device still works but you no longer need it, consider donating it to schools, charities, or selling it to someone who can use it.'
    },
    {
      id: 4,
      title: 'Proper Recycling',
      content: 'When a device reaches the end of its life, take it to a certified e-waste recycling center rather than throwing it in the trash.'
    },
    {
      id: 5,
      title: 'Consider Refurbished Products',
      content: 'Buying refurbished electronics extends the life of existing products and reduces the demand for new manufacturing.'
    },
    {
      id: 6,
      title: 'Upgrade Components, Not Devices',
      content: 'For computers and some other devices, upgrading individual components (like RAM or storage) can extend the life of the entire device.'
    }
  ];

  // Sample resources data
  res.locals.resources = [
    {
      id: 1,
      title: 'E-Waste Coalition',
      url: 'https://example.org/ewaste-coalition',
      description: 'A global network of organizations working to solve the e-waste crisis through policy advocacy and education.'
    },
    {
      id: 2,
      title: 'Circular Electronics Partnership',
      url: 'https://example.org/circular-electronics',
      description: 'An industry initiative promoting circular economy principles in electronics manufacturing and recycling.'
    },
    {
      id: 3,
      title: 'E-Waste Research Institute',
      url: 'https://example.org/ewaste-research',
      description: 'Academic research center focused on developing innovative solutions for e-waste management.'
    },
    {
      id: 4,
      title: 'Global E-waste Statistics Partnership',
      url: 'https://example.org/ewaste-statistics',
      description: 'Provides comprehensive data and analysis on global e-waste generation and management.'
    }
  ];

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