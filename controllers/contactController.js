const { asyncHandler } = require('../utils/asyncHandler');
const { apiResponse } = require('../utils/ApiResponse');
const Contact = require('../models/Contact');

// Handle visitor contact form submission
exports.submitContact = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    const contact = new Contact({
        firstName,
        lastName,
        email,
        phone,
        subject,
        message
    });

    await contact.save();

    res.render('pages/contact', {
        title: 'Contact Us',
        path: '/contact',
        success: 'Your message has been sent successfully!'
    });
});

// Retrieve all contact messages for admin inspection (protected route)
exports.getContactMessages = asyncHandler(async (req, res) => {
    const messages = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new apiResponse(200, messages, 'Contact messages retrieved successfully')
    );
});
