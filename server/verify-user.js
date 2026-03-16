require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function verifyUserEmail(email) {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    
    const result = await User.updateOne(
      {email: email},
      {$set: {isEmailVerified: true}}
    );
    
    if (result.modifiedCount > 0) {
      console.log(`✅ ${email} is now VERIFIED!`);
    } else {
      console.log(`❌ User ${email} not found or already verified`);
    }
    
    // Check final status
    const user = await User.findOne({email: email});
    console.log(`📋 Final Status:`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Username: ${user.userName}`);
    console.log(`   Role: ${user.role || 'user'}`);
    console.log(`   Email Verified: ${user.isEmailVerified ? '✅' : '❌'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyUserEmail(process.argv[2]);
