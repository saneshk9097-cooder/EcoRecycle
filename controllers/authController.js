const { asyncHandler } = require('../utlis/asyncHandler');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.getLogin = (req, res) => {
    res.render('pages/login', {
        title: 'Login - E-Waste Management',
        path: '/login'
    });
};

exports.postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.render('pages/login', {
            title: 'Login - E-Waste Management',
            path: '/login',
            error: 'Invalid email or password'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render('pages/login', {
            title: 'Login - E-Waste Management',
            path: '/login',
            error: 'Invalid email or password'
        });
    }

    req.session.user = user;
    res.redirect('/dashboard');
});

exports.getRegister = (req, res) => {
    res.render('pages/register', {
        title: 'Register - E-Waste Management',
        path: '/register'
    });
};

exports.postRegister = asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, phone, password, confirmPassword, address, city, state, zip, newsletter } = req.body;

    if (password !== confirmPassword) {
        return res.render('pages/register', {
            title: 'Register - E-Waste Management',
            path: '/register',
            error: 'Passwords do not match'
        });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
        return res.render('pages/register', {
            title: 'Register - E-Waste Management',
            path: '/register',
            error: 'Email already registered'
        });
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
        return res.render('pages/register', {
            title: 'Register - E-Waste Management',
            path: '/register',
            error: 'Username already taken'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        address,
        city,
        state,
        zip,
        newsletter: newsletter === 'on'
    });

    await newUser.save();

    req.session.user = newUser;
    res.redirect('/dashboard');
});

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};

exports.getForgotPassword = (req, res) => {
    res.render('pages/forgot-password', {
        title: 'Forgot Password - E-Waste Management',
        path: '/forgot-password'
    });
};

exports.postForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.render('pages/forgot-password', {
            title: 'Forgot Password - E-Waste Management',
            path: '/forgot-password',
            error: 'Please provide an email address'
        });
    }

    const user = await User.findOne({ email });

    // User Enumeration Attack Protection: 
    // Always return a success message to the client, even if the email doesn't exist.
    if (user) {
        // Generate raw token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token and set to resetPasswordToken field
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Set expiry to 10 minutes from now
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Simulate sending email: Output the link clearly in the server logs
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        console.log('\n========================================');
        console.log('[SIMULATED EMAIL DISPATCH - EcoRecycle]');
        console.log(`To: ${email}`);
        console.log(`Reset URL: ${resetUrl}`);
        console.log('========================================\n');
    }

    res.render('pages/forgot-password', {
        title: 'Forgot Password - E-Waste Management',
        path: '/forgot-password',
        success: 'If your email address is registered with us, you will receive a password reset link shortly.'
    });
});

exports.getResetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;

    // Hash the token to match the database record
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    // Find user with matching token and unexpired timer
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).render('pages/error', {
            title: 'Error - Reset Link Invalid',
            path: '/login',
            error: {
                status: 400,
                message: 'Password reset token is invalid or has expired.'
            }
        });
    }

    res.render('pages/reset-password', {
        title: 'Reset Password - E-Waste Management',
        path: '/login',
        token: token,
        error: null // Initialize error state
    });
});

exports.postResetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return res.render('pages/reset-password', {
            title: 'Reset Password - E-Waste Management',
            path: '/login',
            token: token,
            error: 'Password fields cannot be empty.'
        });
    }

    if (password !== confirmPassword) {
        return res.render('pages/reset-password', {
            title: 'Reset Password - E-Waste Management',
            path: '/login',
            token: token,
            error: 'Passwords do not match.'
        });
    }

    // Hash the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    // Find user
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).render('pages/error', {
            title: 'Error - Reset Link Invalid',
            path: '/login',
            error: {
                status: 400,
                message: 'Password reset token is invalid or has expired.'
            }
        });
    }

    // Hash the new password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save and clear token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.render('pages/login', {
        title: 'Login - E-Waste Management',
        path: '/login',
        success: 'Password reset successful! You can now log in with your new password.'
    });
});
