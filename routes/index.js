const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const educationController = require('../controllers/educationController');
const { isAuth, isGuest } = require('../middleware/auth');

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

// Google Authentication Routes (Simulated)
router.get('/auth/google', (req, res) => res.redirect('/dashboard'));
router.get('/auth/google/callback', (req, res) => res.redirect('/dashboard'));

// Facebook Authentication Routes (Simulated)
router.get('/auth/facebook', (req, res) => res.redirect('/dashboard'));
router.get('/auth/facebook/callback', (req, res) => res.redirect('/dashboard'));

// Forgot Password
router.get('/forgot-password', isGuest, authController.getForgotPassword);
router.post('/forgot-password', isGuest, authController.postForgotPassword);

// Dashboard
router.get('/dashboard', isAuth, mainController.getDashboard);

// Articles
router.get('/articles', educationController.getArticles);
router.get('/articles/:slug', educationController.getArticleDetail);

// Videos
router.get('/videos', educationController.getVideos);

module.exports = router; 