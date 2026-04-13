// Development helper to get password reset tokens
// This should only be used for development/testing purposes

const mongoose = require('mongoose');
const User = require('./models/User');

async function getPasswordResetToken(email) {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      process.exit(1);
    }
    
    if (!user.passwordResetToken) {
      console.log(`❌ No password reset token found for: ${email}`);
      console.log('Please request a password reset first.');
      process.exit(1);
    }
    
    const resetUrl = `http://192.168.1.45:5174/api/auth/reset-password?token=${user.passwordResetToken}`;
    
    console.log(`🔗 Password Reset URL for ${email}:`);
    console.log(resetUrl);
    console.log(`🔑 Reset Token: ${user.passwordResetToken}`);
    console.log(`⏰ Token expires: ${user.passwordResetExpires}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.log('Usage: node get-reset-token.js <user-email>');
  console.log('Example: node get-reset-token.js test999@example.com');
  process.exit(1);
}

getPasswordResetToken(email);
