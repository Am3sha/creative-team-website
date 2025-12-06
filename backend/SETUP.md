# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Create .env File

Create a file named `.env` in the `backend` directory with the following content:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=owner@example.com
STORAGE_TYPE=file
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:5000/admin
```

## Step 3: Get Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to: Security > 2-Step Verification > App Passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Paste it in `EMAIL_PASS` in your `.env` file

## Step 4: Update .env File

Replace the placeholder values:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: The 16-character app password from step 3
- `OWNER_EMAIL`: Where you want to receive notifications

## Step 5: Start Backend Server

```bash
npm start
```

Server will run on http://localhost:5000

## Step 6: Start Frontend (in another terminal)

```bash
cd ..  # Go back to project root
npm start
```

Frontend will run on http://localhost:3000

## Testing

1. Go to http://localhost:3000/contact
2. Fill out the contact form
3. Submit the form
4. Check your email (OWNER_EMAIL) for notification
5. Visit http://localhost:5000/admin to see the message

## Troubleshooting

**Email not sending?**
- Double-check your Gmail app password
- Make sure 2-Step Verification is enabled
- Check server console for error messages

**CORS errors?**
- Make sure FRONTEND_URL in .env matches your React app URL

