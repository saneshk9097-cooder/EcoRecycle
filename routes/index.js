const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const educationController = require('../controllers/educationController');
const { isAuth, isGuest } = require('../middleware/auth');

const reviewController = require('../controllers/reviewController');

// Home page
router.get('/', mainController.getIndex);

// About page
router.get('/about', mainController.getAbout);

// Contact page
router.get('/contact', mainController.getContact);
router.post('/contact', mainController.postContact);

// Authentication
router.get('/login', isGuest, authController.getLogin);
router.post('/login', isGuest, authController.postLogin);
router.get('/register', isGuest, authController.getRegister);
router.post('/register', isGuest, authController.postRegister);
router.get('/logout', isAuth, authController.logout);

// Google Authentication Routes
router.get('/auth/google', authController.initiateGoogleAuth);
router.get('/google/callback', authController.handleGoogleCallback);

// Facebook Authentication Routes (Simulated)
router.get('/auth/facebook', authController.initiateFacebookAuth);
router.get('/auth/facebook/callback', authController.handleFacebookCallback);

// Forgot Password
router.get('/forgot-password', isGuest, authController.getForgotPassword);
router.post('/forgot-password', isGuest, authController.postForgotPassword);
router.get('/reset-password/:token', isGuest, authController.getResetPassword);
router.post('/reset-password/:token', isGuest, authController.postResetPassword);

// Dashboard & Profile
router.get('/dashboard', isAuth, mainController.getDashboard);
router.get('/profile', isAuth, authController.getProfile);

// Articles
router.get('/articles', educationController.getArticles);
router.get('/articles/:slug', educationController.getArticleDetail);

// Videos
router.get('/videos', educationController.getVideos);

// Reviews
router.get('/reviews', reviewController.getReviews);
router.post('/reviews', isAuth, reviewController.postReview);
router.get('/reviews/:id/edit', isAuth, reviewController.getEditReview);
router.post('/reviews/:id/edit', isAuth, reviewController.postEditReview);
router.post('/reviews/:id/delete', isAuth, reviewController.deleteReview);

module.exports = router; 