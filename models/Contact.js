const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: [true, 'Subject line is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message body is required'],
        trim: true
    }
}, {
    timestamps: true
});

// Pre-save hook to compile full name
contactSchema.pre('save', function(next) {
    if (this.firstName && this.lastName) {
        this.name = `${this.firstName} ${this.lastName}`.trim();
    }
    next();
});

module.exports = mongoose.model('Contact', contactSchema);
