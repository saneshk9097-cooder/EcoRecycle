const { asyncHandler } = require('../utils/asyncHandler');
const Pickup = require('../models/Pickup');
const constants = require('../config/constants');

exports.getRecyclingIndex = (req, res) => {
    res.render('pages/recycling/index', {
        title: 'E-Waste Recycling - E-Waste Management',
        path: '/recycling'
    });
};

exports.getCenters = (req, res) => {
    res.render('pages/recycling/centers', {
        title: 'Recycling Centers - E-Waste Management',
        path: '/recycling/centers',
        centers: constants.centers
    });
};

exports.getCenterDetail = (req, res) => {
    const center = constants.centers.find(c => c.id === parseInt(req.params.id));

    if (!center) {
        return res.redirect('/recycling/centers');
    }

    res.render('pages/recycling/center-detail', {
        title: `${center.name} - E-Waste Management`,
        path: '/recycling/centers',
        center: center
    });
};

exports.getPickup = (req, res) => {
    res.render('pages/recycling/pickup', {
        title: 'Schedule Pickup - E-Waste Management',
        path: '/recycling/pickup'
    });
};

exports.postPickup = asyncHandler(async (req, res) => {
    const {
        firstName, lastName, email, phone,
        address, city, state, zip, addressNotes,
        items, itemDetails,
        pickupDate, pickupTime, pickupNotes
    } = req.body;

    const itemsArray = Array.isArray(items) ? items : [items];

    const pickupData = {
        user: req.session.user ? req.session.user._id : null,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        addressNotes,
        items: itemsArray,
        itemDetails,
        pickupDate: new Date(pickupDate),
        pickupTime,
        pickupNotes,
        status: 'Pending'
    };

    const newPickup = new Pickup(pickupData);
    await newPickup.save();

    res.render('pages/recycling/pickup', {
        title: 'Schedule Pickup - E-Waste Management',
        path: '/recycling/pickup',
        success: 'Your pickup has been scheduled successfully! We will contact you shortly to confirm.'
    });
});
