const express = require('express');
const router = express.Router();
const recyclingController = require('../controllers/recyclingController');
const { isAuth } = require('../middleware/auth');

// Recycling main page
router.get('/', recyclingController.getRecyclingIndex);

// Recycling centers list
router.get('/centers', recyclingController.getCenters);

// Recycling center detail
router.get('/centers/:id', recyclingController.getCenterDetail);

// Pickup request routes (Protected)
router.get('/pickup', isAuth, recyclingController.getPickup);
router.post('/pickup', isAuth, recyclingController.postPickup);

module.exports = router; 