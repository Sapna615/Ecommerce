# 🔐 Production Configuration Guide

## 📧 Email Configuration

### Step 1: Create Environment File
Create a `.env` file in the server directory:

```bash
cd server
touch .env
```

### Step 2: Add Your Email Configuration
Add your email settings to `.env`:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourstore.com

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=60m

# Server Configuration
PORT=5002
NODE_ENV=production
```

### Step 3: Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail
2. Go to Google Account settings → Security → App passwords
3. Generate a new app password
4. Use the app password in `EMAIL_PASS`

### Step 4: Update Email Service
Replace the mock email service with real SMTP:

```javascript
// services/emailService.js
const nodemailer = require('nodemailer');

const createTransporter = async () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
```

---

## 🗄️ MongoDB Configuration

### Option 1: Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Option 2: MongoDB Atlas (Cloud)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

### Option 3: Remote MongoDB
```env
MONGODB_URI=mongodb://username:password@host:port/ecommerce
```

---

## 🔐 Security Configuration

### JWT Secret Key
Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Add to `.env`:
```env
JWT_SECRET=your-generated-64-byte-hex-string
```

---

## 📱 SMS Configuration (Optional)

### Twilio Setup
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 🚀 Production Setup

### Step 1: Install Environment Variables
```bash
npm install dotenv
```

### Step 2: Update Server to Use Environment Variables
```javascript
// server.js
require('dotenv').config();

const emailHost = process.env.EMAIL_HOST;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
```

### Step 3: Test Configuration
```bash
# Test email configuration
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});
console.log('Email configuration loaded');
"
```

---

## 📁 Configuration Files Structure

```
server/
├── .env                    # Environment variables (DO NOT COMMIT)
├── .env.example           # Example configuration
├── config/
│   ├── database.js        # Database configuration
│   ├── email.js          # Email configuration
│   └── auth.js           # Authentication configuration
└── services/
    ├── emailService.js    # Email service
    └── smsService.js     # SMS service
```

---

## 🔧 Environment Variables Template

Create `.env.example`:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourstore.com

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=60m

# Server Configuration
PORT=5002
NODE_ENV=production

# SMS Configuration (Optional)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend URL
FRONTEND_URL=http://yourdomain.com
```

---

## 🌐 Production Email Templates

### Real Email Service
```javascript
// services/emailService.js
const sendVerificationEmail = async (userEmail, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: 'Verify Your Email Address',
    html: verificationEmailTemplate(verificationUrl),
  });
};
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` file to Git
- Use `.env.example` for documentation
- Set proper file permissions: `chmod 600 .env`

### 2. Email Security
- Use app passwords, not main password
- Enable SSL/TLS for email
- Validate email addresses

### 3. Database Security
- Use strong passwords
- Enable authentication
- Use SSL connections in production

### 4. JWT Security
- Use strong secret keys
- Set reasonable expiration times
- Use HTTPS in production

---

## 🚀 Deployment Checklist

### Before Deployment:
- [ ] Set up environment variables
- [ ] Configure email service
- [ ] Set up MongoDB connection
- [ ] Generate JWT secrets
- [ ] Test all services
- [ ] Enable HTTPS
- [ ] Set up monitoring

### Environment Variables to Set:
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

---

## 📞 Support

If you need help with:
- Gmail app passwords: https://support.google.com/accounts/answer/185833
- MongoDB Atlas: https://docs.mongodb.com/atlas/getting-started
- Twilio setup: https://www.twilio.com/docs/usage/security

---

## 🎯 Quick Setup

1. **Create `.env` file** with your credentials
2. **Install dependencies**: `npm install`
3. **Test email**: `npm run test-email`
4. **Test database**: `npm run test-db`
5. **Start server**: `npm start`

**🎉 Your production configuration will be ready!** 🚀
