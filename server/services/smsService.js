const crypto = require('crypto');

// Mock SMS service for development
// In production, replace with real SMS service like Twilio
const sendSMS = async (phoneNumber, message) => {
  try {
    console.log(`MOCK SMS: Sending to ${phoneNumber}: ${message}`);
    
    // For development, we'll just log the SMS
    // In production, you would use a real SMS service like:
    // const twilio = require('twilio');
    // const client = twilio(accountSid, authToken);
    // await client.messages.create({
    //   body: message,
    //   from: '+1234567890', // Your Twilio phone number
    //   to: phoneNumber
    // });
    
    return { success: true, messageId: 'MOCK_' + Date.now() };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error.message };
  }
};

// Send phone verification code
const sendPhoneVerificationCode = async (phoneNumber, verificationCode) => {
  const message = `Your verification code for Ecommerce Store is: ${verificationCode}. This code will expire in 10 minutes.`;
  
  return await sendSMS(phoneNumber, message);
};

// Send order confirmation SMS
const sendOrderConfirmationSMS = async (phoneNumber, orderNumber) => {
  const message = `Your order #${orderNumber} has been placed successfully! You will receive updates on your order status. Thank you for shopping with us!`;
  
  return await sendSMS(phoneNumber, message);
};

// Send password reset SMS
const sendPasswordResetSMS = async (phoneNumber, resetCode) => {
  const message = `Your password reset code is: ${resetCode}. This code will expire in 10 minutes. Do not share this code with anyone.`;
  
  return await sendSMS(phoneNumber, message);
};

module.exports = {
  sendSMS,
  sendPhoneVerificationCode,
  sendOrderConfirmationSMS,
  sendPasswordResetSMS,
};
