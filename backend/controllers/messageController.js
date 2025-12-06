const fs = require('fs').promises;
const path = require('path');

const MESSAGES_FILE = path.join(__dirname, '../storage/messages.json');

// Ensure storage directory exists
const ensureStorageExists = async () => {
    const storageDir = path.dirname(MESSAGES_FILE);
    try {
        await fs.access(storageDir);
    } catch {
        await fs.mkdir(storageDir, { recursive: true });
    }
};

// Read messages from file
const readMessages = async () => {
    try {
        await ensureStorageExists();
        const data = await fs.readFile(MESSAGES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array
            return [];
        }
        throw error;
    }
};

// Write messages to file
const writeMessages = async (messages) => {
    await ensureStorageExists();
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
};

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Save new message
const saveMessage = async (formData) => {
    try {
        const messages = await readMessages();

        const newMessage = {
            id: generateId(),
            name: formData.name.trim(),
            email: formData.email.trim(),
            service: formData.service.trim(),
            message: formData.message.trim(),
            budget: formData.budget ? formData.budget.trim() : '',
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            timestamp: new Date().toISOString(),
            read: false
        };

        messages.unshift(newMessage); // Add to beginning (newest first)
        await writeMessages(messages);

        return newMessage;
    } catch (error) {
        console.error('Error saving message:', error);
        throw new Error('Failed to save message');
    }
};

// Get all messages
const getAllMessages = async () => {
    try {
        return await readMessages();
    } catch (error) {
        console.error('Error reading messages:', error);
        throw new Error('Failed to read messages');
    }
};

// Get message by ID
const getMessageById = async (id) => {
    try {
        const messages = await readMessages();
        return messages.find(msg => msg.id === id);
    } catch (error) {
        console.error('Error getting message:', error);
        throw new Error('Failed to get message');
    }
};

// Mark message as read/unread
const updateMessageReadStatus = async (id, readStatus) => {
    try {
        const messages = await readMessages();
        const messageIndex = messages.findIndex(msg => msg.id === id);

        if (messageIndex === -1) {
            throw new Error('Message not found');
        }

        messages[messageIndex].read = readStatus;
        await writeMessages(messages);

        return messages[messageIndex];
    } catch (error) {
        console.error('Error updating message:', error);
        throw new Error('Failed to update message');
    }
};

// Delete message
const deleteMessage = async (id) => {
    try {
        const messages = await readMessages();
        const filteredMessages = messages.filter(msg => msg.id !== id);

        if (filteredMessages.length === messages.length) {
            throw new Error('Message not found');
        }

        await writeMessages(filteredMessages);
        return { success: true };
    } catch (error) {
        console.error('Error deleting message:', error);
        throw new Error('Failed to delete message');
    }
};

module.exports = {
    saveMessage,
    getAllMessages,
    getMessageById,
    updateMessageReadStatus,
    deleteMessage
};

