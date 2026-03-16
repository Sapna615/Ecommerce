// Development helper to bypass email verification
// This should only be used for development/testing purposes

const mongoose = require('mongoose');
const User = require('./models/User');

async function verifyUserEmail(email) {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    
    const result = await User.updateOne(
      { email: email },
      { 
        isEmailVerified: true,
        emailVerificationToken: null
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log(`✅ Email verified for user: ${email}`);
      console.log('📧 You can now login with this account.');
    } else {
      console.log(`❌ User not found or already verified: ${email}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.log('Usage: node verify-email.js <user-email>');
  console.log('Example: node verify-email.js test999@example.com');
  process.exit(1);
}

verifyUserEmail(email);
