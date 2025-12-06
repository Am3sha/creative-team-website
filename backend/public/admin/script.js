const API_BASE_URL = window.location.origin;

let allMessages = [];
let filteredMessages = [];

// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const noMessages = document.getElementById('noMessages');
const searchInput = document.getElementById('searchInput');
const serviceFilter = document.getElementById('serviceFilter');
const statusFilter = document.getElementById('statusFilter');
const refreshBtn = document.getElementById('refreshBtn');
const markAllReadBtn = document.getElementById('markAllReadBtn');
const totalCount = document.getElementById('totalCount');
const unreadCount = document.getElementById('unreadCount');

// Fetch messages from API
async function fetchMessages() {
    try {
        loading.style.display = 'block';
        errorDiv.style.display = 'none';
        messagesContainer.innerHTML = '';

        const response = await fetch(`${API_BASE_URL}/api/messages`);
        const data = await response.json();

        if (data.success) {
            allMessages = data.messages;
            updateStats();
            filterMessages();
        } else {
            throw new Error(data.message || 'Failed to fetch messages');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
}

// Update statistics
function updateStats() {
    const total = allMessages.length;
    const unread = allMessages.filter(msg => !msg.read).length;
    
    totalCount.textContent = total;
    unreadCount.textContent = unread;
}

// Filter messages
function filterMessages() {
    const searchTerm = searchInput.value.toLowerCase();
    const serviceValue = serviceFilter.value;
    const statusValue = statusFilter.value;

    filteredMessages = allMessages.filter(message => {
        // Search filter
        const matchesSearch = !searchTerm || 
            message.name.toLowerCase().includes(searchTerm) ||
            message.email.toLowerCase().includes(searchTerm);

        // Service filter
        const matchesService = serviceValue === 'all' || 
            message.service === serviceValue;

        // Status filter
        const matchesStatus = statusValue === 'all' ||
            (statusValue === 'unread' && !message.read) ||
            (statusValue === 'read' && message.read);

        return matchesSearch && matchesService && matchesStatus;
    });

    displayMessages();
}

// Display messages
function displayMessages() {
    if (filteredMessages.length === 0) {
        messagesContainer.innerHTML = '';
        noMessages.style.display = 'block';
        return;
    }

    noMessages.style.display = 'none';
    messagesContainer.innerHTML = filteredMessages.map(message => `
        <div class="message-card ${message.read ? '' : 'unread'}" data-id="${message.id}">
            <div class="message-header">
                <div class="message-info">
                    <div class="message-name">${escapeHtml(message.name)}</div>
                    <a href="mailto:${message.email}" class="message-email">${escapeHtml(message.email)}</a>
                    <div class="message-meta">
                        <span class="meta-item">📅 ${message.date}</span>
                        <span class="meta-item">🕐 ${message.time}</span>
                        <span class="service-badge">${escapeHtml(message.service)}</span>
                        ${message.budget ? `<span class="budget-badge">💰 ${escapeHtml(message.budget)}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="message-content">${escapeHtml(message.message)}</div>
            <div class="message-actions">
                ${message.read 
                    ? `<button class="btn-action btn-unread" onclick="markAsUnread('${message.id}')">Mark as Unread</button>`
                    : `<button class="btn-action btn-read" onclick="markAsRead('${message.id}')">Mark as Read</button>`
                }
                <button class="btn-action btn-delete" onclick="deleteMessage('${message.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Mark message as read
async function markAsRead(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/messages/${id}/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ read: true })
        });

        const data = await response.json();
        if (data.success) {
            await fetchMessages();
        } else {
            alert('Failed to update message');
        }
    } catch (error) {
        console.error('Error marking as read:', error);
        alert('Error updating message');
    }
}

// Mark message as unread
async function markAsUnread(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/messages/${id}/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ read: false })
        });

        const data = await response.json();
        if (data.success) {
            await fetchMessages();
        } else {
            alert('Failed to update message');
        }
    } catch (error) {
        console.error('Error marking as unread:', error);
        alert('Error updating message');
    }
}

// Delete message
async function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/messages/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        if (data.success) {
            await fetchMessages();
        } else {
            alert('Failed to delete message');
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message');
    }
}

// Mark all as read
async function markAllAsRead() {
    if (!confirm('Mark all messages as read?')) {
        return;
    }

    const unreadMessages = allMessages.filter(msg => !msg.read);
    
    try {
        await Promise.all(
            unreadMessages.map(msg => 
                fetch(`${API_BASE_URL}/api/messages/${msg.id}/read`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ read: true })
                })
            )
        );
        await fetchMessages();
    } catch (error) {
        console.error('Error marking all as read:', error);
        alert('Error updating messages');
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Listeners
searchInput.addEventListener('input', filterMessages);
serviceFilter.addEventListener('change', filterMessages);
statusFilter.addEventListener('change', filterMessages);
refreshBtn.addEventListener('click', fetchMessages);
markAllReadBtn.addEventListener('click', markAllAsRead);

// Initial load
fetchMessages();

// Auto-refresh every 30 seconds
setInterval(fetchMessages, 30000);

