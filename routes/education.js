const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

// Education main page
router.get('/', educationController.getEducationIndex);

// E-waste facts page
router.get('/facts', educationController.getFacts);

// Tips for reducing e-waste
router.get('/tips', educationController.getTips);

// Resources page
router.get('/resources', educationController.getResources);

module.exports = router; 