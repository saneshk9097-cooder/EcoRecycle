const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    zip: {
        type: String,
        trim: true
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
