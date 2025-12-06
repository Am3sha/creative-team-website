const createEmailTemplate = (formData) => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const budgetText = formData.budget && formData.budget.trim()
        ? formData.budget.trim()
        : 'Not specified';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f8fafc;
      padding: 20px;
      border: 1px solid #e2e8f0;
    }
    .section {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
    }
    .section-title {
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 10px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-row {
      margin: 8px 0;
      padding: 5px 0;
    }
    .label {
      font-weight: 600;
      color: #1e293b;
      display: inline-block;
      min-width: 150px;
    }
    .value {
      color: #64748b;
    }
    .message-box {
      background: #f1f5f9;
      padding: 15px;
      border-radius: 6px;
      margin-top: 10px;
      white-space: pre-wrap;
      color: #1e293b;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #64748b;
      font-size: 12px;
      border-top: 1px solid #e2e8f0;
      margin-top: 20px;
    }
    .divider {
      height: 1px;
      background: #e2e8f0;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>📧 New Contact Form Submission</h2>
    <p style="margin: 5px 0; font-size: 14px;">${formData.service}</p>
  </div>
  
  <div class="content">
    <div class="section">
      <div class="section-title">👤 Client Information</div>
      <div class="info-row">
        <span class="label">Name:</span>
        <span class="value">${formData.name}</span>
      </div>
      <div class="info-row">
        <span class="label">Email:</span>
        <span class="value">${formData.email}</span>
      </div>
      <div class="info-row">
        <span class="label">Service Requested:</span>
        <span class="value">${formData.service}</span>
      </div>
      <div class="info-row">
        <span class="label">Budget Range:</span>
        <span class="value">${budgetText}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">💬 Message</div>
      <div class="message-box">${formData.message}</div>
    </div>

    <div class="section">
      <div class="section-title">📅 Submission Details</div>
      <div class="info-row">
        <span class="label">Date:</span>
        <span class="value">${formattedDate}</span>
      </div>
      <div class="info-row">
        <span class="label">Time:</span>
        <span class="value">${formattedTime}</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>This email was sent from your website contact form.</p>
    <p>To view all messages, visit your <a href="${process.env.ADMIN_URL || 'http://localhost:5000/admin'}" style="color: #2563eb;">admin panel</a>.</p>
  </div>
</body>
</html>
  `.trim();
};

const createEmailSubject = (service) => {
    return `New Contact Form Submission - ${service}`;
};

module.exports = {
    createEmailTemplate,
    createEmailSubject
};

