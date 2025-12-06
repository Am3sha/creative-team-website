const express = require('express');
const router = express.Router();
const { validateContactForm } = require('../utils/validation');
const { sendEmailNotification, sendAutoReply } = require('../controllers/emailController');
const { saveMessage } = require('../controllers/messageController');

// POST /api/contact - Receive contact form submission
router.post('/', async (req, res) => {
    try {
        const formData = req.body;

        // Validate form data
        const validation = validateContactForm(formData);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.errors[0],
                errors: validation.errors
            });
        }

        // Save message to storage
        const savedMessage = await saveMessage(formData);

        // Send email notification to owner
        try {
            await sendEmailNotification(formData);
        } catch (emailError) {
            console.error('Email sending failed, but message was saved:', emailError);
            // Don't fail the request if email fails, message is still saved
        }

        // Send auto-reply to client (optional - uncomment if needed)
        // await sendAutoReply(formData.email, formData.name);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully. We will get back to you within 24 hours.',
            messageId: savedMessage.id
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
});

module.exports = router;

