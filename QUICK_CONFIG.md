# 📧 Quick Configuration Guide

## 🎯 Where to Add Your Email & Password

### Option 1: Use Setup Script (Recommended)
```bash
cd server
./setup.sh
```

### Option 2: Manual Configuration

#### Step 1: Create .env file
```bash
cd server
cp .env.example .env
```

#### Step 2: Edit .env file
```bash
nano .env
```

#### Step 3: Add your credentials
```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com          # 👈 YOUR EMAIL HERE
EMAIL_PASS=your-app-password              # 👈 YOUR PASSWORD HERE
EMAIL_FROM=noreply@yourstore.com

# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017/ecommerce  # 👈 YOUR MONGODB URL HERE

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here        # 👈 YOUR JWT SECRET HERE

# Frontend URL
FRONTEND_URL=http://192.168.1.45:5174
```

---

## 🔐 Gmail Setup (Required)

### Step 1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" for the app
3. Generate password
4. Copy the 16-character password

### Step 3: Use App Password
- Use the app password in `EMAIL_PASS` field
- NOT your regular Gmail password

---

## 🗄️ MongoDB Configuration

### Local MongoDB
```env
MONGODB_URL=mongodb://localhost:27017/ecommerce
```

### MongoDB Atlas (Cloud)
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

### Remote MongoDB
```env
MONGODB_URL=mongodb://username:password@host:port/ecommerce
```

---

## 🔑 JWT Secret Generation

### Auto-Generate
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Manual
Use any long random string (64+ characters recommended)

---

## 📱 SMS Configuration (Optional)

### Twilio Setup
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 🚀 Test Configuration

### Test Email
```bash
node -e "
const { sendVerificationEmail } = require('./services/emailService');
sendVerificationEmail('test@example.com', 'test-token').then(console.log);
"
```

### Test Database
```bash
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL).then(() => console.log('DB Connected'));
"
```

---

## 🔧 File Locations

### Configuration Files
```
server/
├── .env                    # 👈 YOUR CREDENTIALS HERE
├── .env.example           # Template file
├── setup.sh               # Setup script
└── services/
    └── emailService.js    # Email service
```

### Key Files to Edit
1. **`.env`** - Main configuration file
2. **`server.js`** - Server configuration
3. **`services/emailService.js`** - Email service

---

## 🌐 Production URLs

### Update Frontend URL
```env
FRONTEND_URL=https://yourdomain.com
```

### Update Email Links
Emails will use this URL for verification links

---

## 🔒 Security Notes

### ⚠️ Important Security Tips
1. Never commit `.env` to Git
2. Use strong, unique passwords
3. Use app passwords for Gmail
4. Generate secure JWT secrets
5. Keep credentials private

### 🛡️ Protection
```bash
# Set proper permissions
chmod 600 .env

# Add to .gitignore
echo ".env" >> .gitignore
```

---

## 🎯 Quick Start

### 1. Run Setup Script
```bash
cd server
./setup.sh
```

### 2. Test Configuration
```bash
npm run dev
```

### 3. Test Registration
- Go to: `http://192.168.1.45:5174/auth/register`
- Register with your email
- Check your email for verification

---

## 📞 Support Links

- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- MongoDB Atlas: https://docs.mongodb.com/atlas/getting-started
- Twilio Setup: https://www.twilio.com/docs/usage/security

---

## 🎉 Ready to Use

Once configured:
- ✅ Real email verification
- ✅ Password reset via email
- ✅ Secure authentication
- ✅ Production ready

**🚀 Your ecommerce store will be ready with real email services!** 🛍️✨
