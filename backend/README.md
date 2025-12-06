# Contact Form Backend API

Backend system for handling contact form submissions with email notifications and message management.

## Features

- ✅ Receive contact form submissions via API
- ✅ Send email notifications to site owner
- ✅ Store messages in JSON file
- ✅ Admin panel to view and manage messages
- ✅ Form validation
- ✅ CORS support for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=owner@example.com
STORAGE_TYPE=file
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:5000/admin
```

### 3. Gmail Setup (For Email Notifications)

To send emails from Gmail:

1. Enable **2-Step Verification** on your Google account
2. Go to: [Google Account > Security > 2-Step Verification > App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Copy the 16-character password
5. Use this password in `EMAIL_PASS` in your `.env` file
6. Use your Gmail address in `EMAIL_USER`

**Important:** Use the app password, NOT your regular Gmail password.

### 4. Start the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Web Development",
  "message": "I need a website...",
  "budget": "1000-5000"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully. We will get back to you within 24 hours.",
  "messageId": "abc123"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Error 1", "Error 2"]
}
```

### GET /api/messages

Get all stored messages (for admin panel).

**Response:**
```json
{
  "success": true,
  "messages": [...],
  "count": 10
}
```

### GET /api/messages/:id

Get a specific message by ID.

### PUT /api/messages/:id/read

Mark a message as read/unread.

**Request Body:**
```json
{
  "read": true
}
```

### DELETE /api/messages/:id

Delete a message.

## Admin Panel

Access the admin panel at: `http://localhost:5000/admin`

Features:
- View all messages
- Search by name or email
- Filter by service type
- Filter by read/unread status
- Mark messages as read/unread
- Delete messages
- Auto-refresh every 30 seconds

## File Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables (not in git)
├── routes/
│   ├── contact.js        # Contact form routes
│   └── messages.js       # Message management routes
├── controllers/
│   ├── emailController.js # Email sending logic
│   └── messageController.js # Message storage logic
├── utils/
│   ├── emailTemplate.js  # Email HTML template
│   └── validation.js     # Input validation
├── storage/
│   └── messages.json     # Stored messages (auto-created)
└── public/
    └── admin/            # Admin panel files
        ├── index.html
        ├── style.css
        └── script.js
```

## Connecting Frontend

Update your React app's `.env` file (or create one):

```env
REACT_APP_API_URL=http://localhost:5000
```

The Contact form component is already configured to use this URL.

## Troubleshooting

### Email Not Sending

1. Check that `.env` file has correct email credentials
2. Verify Gmail app password is correct (16 characters, no spaces)
3. Check that 2-Step Verification is enabled
4. Check server console for error messages

### CORS Errors

Make sure `FRONTEND_URL` in `.env` matches your React app URL (usually `http://localhost:3000`)

### Messages Not Saving

- Check that `storage/` directory exists and is writable
- Check server console for file system errors

## Production Deployment

### Environment Variables

Set these on your hosting platform:
- `PORT` - Server port (usually auto-set by hosting)
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail app password
- `OWNER_EMAIL` - Where to send notifications
- `FRONTEND_URL` - Your frontend domain (e.g., `https://yourdomain.com`)
- `ADMIN_URL` - Admin panel URL

### Recommended Hosting

- **Heroku**: Easy deployment, free tier available
- **Railway**: Simple setup, good free tier
- **DigitalOcean**: More control, pay-as-you-go
- **Render**: Free tier available

### Security Notes

- Never commit `.env` file to Git
- Use environment variables on hosting platform
- Consider adding authentication to admin panel for production
- Rate limiting recommended for production

## Email Limits

- Gmail free accounts: 500 emails per day
- For high volume: consider SendGrid, Mailgun, or AWS SES

## License

ISC

