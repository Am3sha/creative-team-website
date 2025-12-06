const express = require('express');
const router = express.Router();
const {
    getAllMessages,
    getMessageById,
    updateMessageReadStatus,
    deleteMessage
} = require('../controllers/messageController');

// GET /api/messages - Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await getAllMessages();
        res.json({
            success: true,
            messages: messages,
            count: messages.length
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages'
        });
    }
});

// GET /api/messages/:id - Get single message
router.get('/:id', async (req, res) => {
    try {
        const message = await getMessageById(req.params.id);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        res.json({
            success: true,
            message: message
        });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch message'
        });
    }
});

// PUT /api/messages/:id/read - Mark message as read/unread
router.put('/:id/read', async (req, res) => {
    try {
        const { read } = req.body;
        if (typeof read !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'Read status must be a boolean'
            });
        }

        const updatedMessage = await updateMessageReadStatus(req.params.id, read);
        res.json({
            success: true,
            message: updatedMessage
        });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update message'
        });
    }
});

// DELETE /api/messages/:id - Delete message
router.delete('/:id', async (req, res) => {
    try {
        await deleteMessage(req.params.id);
        res.json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete message'
        });
    }
});

module.exports = router;

