exports.validateContact = (req, res, next) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    const errors = [];

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
        errors.push('First name is required.');
    }
    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
        errors.push('Last name is required.');
    }
    
    if (!email || typeof email !== 'string' || !email.trim()) {
        errors.push('Email is required.');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            errors.push('A valid email address is required.');
        }
    }
    
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
        errors.push('Subject is required.');
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
        errors.push('Message content is required.');
    }

    if (errors.length > 0) {
        return res.status(400).render('pages/contact', {
            title: 'Contact Us',
            path: '/contact',
            error: errors.join(' '),
            formData: {
                firstName: firstName || '',
                lastName: lastName || '',
                email: email || '',
                phone: phone || '',
                subject: subject || '',
                message: message || ''
            }
        });
    }

    next();
};
