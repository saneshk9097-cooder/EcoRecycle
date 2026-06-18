const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('pages/login', {
        title: 'Login - E-Waste Management',
        path: '/login'
    });
};

exports.postLogin = async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.render('pages/login', {
            title: 'Login - E-Waste Management',
            path: '/login',
            error: 'An error occurred during login'
        });
    }
};

exports.getRegister = (req, res) => {
    res.render('pages/register', {
        title: 'Register - E-Waste Management',
        path: '/register'
    });
};

exports.postRegister = async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.render('pages/register', {
            title: 'Register - E-Waste Management',
            path: '/register',
            error: 'An error occurred during registration: ' + err.message
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
};

exports.getForgotPassword = (req, res) => {
    res.render('pages/forgot-password', {
        title: 'Forgot Password - E-Waste Management',
        path: '/forgot-password'
    });
};

exports.postForgotPassword = (req, res) => {
    res.render('pages/forgot-password', {
        title: 'Forgot Password - E-Waste Management',
        path: '/forgot-password',
        success: 'If your email address is registered with us, you will receive a password reset link shortly.'
    });
};
