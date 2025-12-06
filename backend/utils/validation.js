const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateContactForm = (data) => {
    const errors = [];

    // Validate name
    if (!data.name || data.name.trim().length === 0) {
        errors.push('Name is required');
    } else if (data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    } else if (data.name.trim().length > 100) {
        errors.push('Name is too long (maximum 100 characters)');
    }

    // Validate email
    if (!data.email || data.email.trim().length === 0) {
        errors.push('Email is required');
    } else if (!validateEmail(data.email)) {
        errors.push('Please provide a valid email address');
    }

    // Validate service
    if (!data.service || data.service.trim().length === 0) {
        errors.push('Service selection is required');
    }

    // Validate message
    if (!data.message || data.message.trim().length === 0) {
        errors.push('Message is required');
    } else if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    } else if (data.message.trim().length > 1000) {
        errors.push('Message is too long (maximum 1000 characters)');
    }

    // Budget is optional, but if provided, validate length
    if (data.budget && data.budget.trim().length > 50) {
        errors.push('Budget field is too long');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateEmail,
    validateContactForm
};

