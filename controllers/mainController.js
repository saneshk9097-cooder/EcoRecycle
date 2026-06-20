const { asyncHandler } = require('../utils/asyncHandler');
const Pickup = require('../models/Pickup');
const Review = require('../models/Review');

exports.getIndex = asyncHandler(async (req, res) => {
    let recentReviews = [];
    try {
        recentReviews = await Review.find()
            .populate('user', 'firstName lastName')
            .sort({ createdAt: -1 })
            .limit(3);
    } catch (err) {
        console.error('Error fetching recent reviews:', err.message);
    }

    res.render('pages/index', {
        title: 'E-Waste Management - Home',
        path: '/',
        reviews: recentReviews
    });
});

exports.getAbout = (req, res) => {
    res.render('pages/about', {
        title: 'About E-Waste Management',
        path: '/about'
    });
};

exports.getContact = (req, res) => {
    res.render('pages/contact', {
        title: 'Contact Us',
        path: '/contact'
    });
};

exports.getDashboard = asyncHandler(async (req, res) => {
    const pickups = await Pickup.find({ user: req.session.user._id }).sort({ createdAt: -1 });

    const pickupsCount = pickups.length;
    const itemsRecycled = pickups.reduce((total, p) => total + p.items.length, 0);
    const co2Saved = itemsRecycled * 5;
    const rewardPoints = (pickupsCount * 10) + (itemsRecycled * 5);

    res.render('pages/dashboard', {
        title: 'Dashboard - E-Waste Management',
        path: '/dashboard',
        user: req.session.user,
        pickups: pickups,
        stats: {
            pickupsCount,
            itemsRecycled,
            co2Saved,
            rewardPoints
        }
    });
});
