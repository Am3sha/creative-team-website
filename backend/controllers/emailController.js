const nodemailer = require('nodemailer');
const { createEmailTemplate, createEmailSubject } = require('../utils/emailTemplate');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send email notification
const sendEmailNotification = async (formData) => {
    try {
        // Validate email configuration
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.OWNER_EMAIL) {
            throw new Error('Email configuration is missing. Please check your .env file.');
        }

        const transporter = createTransporter();

        // Verify transporter configuration
        await transporter.verify();

        const mailOptions = {
            from: `"Creative Solutions Team" <${process.env.EMAIL_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: createEmailSubject(formData.service),
            html: createEmailTemplate(formData),
            replyTo: formData.email // Allow owner to reply directly to client
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.messageId);
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

// Send auto-reply to client (optional)
const sendAutoReply = async (clientEmail, clientName) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return { success: false, message: 'Email not configured' };
        }

        const transporter = createTransporter();

        const mailOptions = {
            from: `"Creative Solutions Team" <${process.env.EMAIL_USER}>`,
            to: clientEmail,
            subject: 'Thank you for contacting us!',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Thank you for reaching out!</h2>
          <p>Hi ${clientName},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>Best regards,<br>Creative Solutions Team</p>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending auto-reply:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendEmailNotification,
    sendAutoReply
};

