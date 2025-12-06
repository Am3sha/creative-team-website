const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/messages', messageRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});

