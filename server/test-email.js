require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmailService() {
  try {
    console.log('🔧 Testing Email Service Configuration...\n');
    
    // Check required environment variables
    const requiredVars = ['EMAIL_FROM', 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.log('❌ Missing environment variables:');
      missingVars.forEach(varName => console.log(`   - ${varName}`));
      console.log('\n📝 Add these to your server/.env file:');
      console.log('EMAIL_FROM=your-gmail@gmail.com');
      console.log('EMAIL_HOST=smtp.gmail.com');
      console.log('EMAIL_PORT=587');
      console.log('EMAIL_USER=your-gmail@gmail.com');
      console.log('EMAIL_PASS=your-app-password');
      console.log('EMAIL_SERVICE=gmail');
      return;
    }
    
    console.log('✅ All environment variables found\n');
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    console.log('📧 Testing email connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Email service connected successfully!\n');
    
    // Send test email
    const testEmail = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: '🧪 Email Service Test - Ecommerce Website',
      html: `
        <h2>✅ Email Service Working!</h2>
        <p>Your ecommerce website email service is configured correctly.</p>
        <p><strong>From:</strong> ${process.env.EMAIL_FROM}</p>
        <p><strong>To:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>This is a test email to verify your email service is working for user registration verification.</p>
      `
    };
    
    console.log('📤 Sending test email...');
    const result = await transporter.sendMail(testEmail);
    
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${result.messageId}`);
    console.log(`   To: ${result.envelope.to}`);
    console.log(`   From: ${result.envelope.from}`);
    console.log('\n🎉 Your email service is ready for user verification emails!');
    
  } catch (error) {
    console.error('❌ Email service test failed:', error.message);
    console.log('\n🔧 Common fixes:');
    
    if (error.code === 'EAUTH') {
      console.log('   1. Use Gmail App Password (not regular password)');
      console.log('   2. Enable 2-factor authentication on Gmail');
      console.log('   3. Generate App Password at: https://myaccount.google.com/apppasswords');
    }
    
    if (error.code === 'ECONNECTION') {
      console.log('   1. Check internet connection');
      console.log('   2. Verify EMAIL_HOST and EMAIL_PORT');
      console.log('   3. Check firewall settings');
    }
    
    if (error.message.includes('Invalid login')) {
      console.log('   1. Verify EMAIL_USER is correct');
      console.log('   2. Use Gmail App Password (16 characters)');
      console.log('   3. Enable "Less secure app access" if needed');
    }
  }
}

testEmailService();
