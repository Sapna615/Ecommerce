const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create reusable transporter with environment variables
const createTransporter = async () => {
  // Check if email configuration is available
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Production email service
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Development mock service
    return {
      sendMail: async (mailOptions) => {
        console.log('📧 Mock Email Service:');
        console.log('📧 To:', mailOptions.to);
        console.log('📧 Subject:', mailOptions.subject);
        console.log('📧 Message sent successfully (mock)');
        return { messageId: 'MOCK_' + Date.now() };
      }
    };
  }
};

// Send verification email
const sendVerificationEmail = async (userEmail, verificationToken) => {
  try {
    const transporter = await createTransporter();
    
    // Prefer backend verification link so it works even if frontend URL/port changes.
    const apiBaseUrl =
      process.env.API_BASE_URL ||
      `http://localhost:${process.env.PORT || 5002}/api`;

    const verificationUrl = `${apiBaseUrl}/auth/verify-email?token=${verificationToken}&redirect=true`;
    
    console.log('📧 Verification URL:', verificationUrl);
    
    // Check if using real email service
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Real email service
      const mailOptions = {
        from: process.env.EMAIL_FROM || '"Ecommerce Store" <noreply@yourstore.com>',
        to: userEmail,
        subject: 'Verify Your Email Address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Our Ecommerce Store!</h2>
            <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't create an account with us, please ignore this email.<br>
              This link will expire in 24 hours.
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Alternatively, you can copy and paste this link in your browser:<br>
              <span style="word-break: break-all;">${verificationUrl}</span>
            </p>
            <hr style="margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              <strong>Troubleshooting:</strong><br>
              • If the button doesn't work, copy and paste the link above<br>
              • Make sure you're using a modern browser<br>
              • Check that your frontend server is running on port 5174
            </p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Verification email sent successfully:', info.messageId);
      console.log('📧 To:', userEmail);
      console.log('🔗 Verification URL:', verificationUrl);
      return { success: true, messageId: info.messageId };
    } else {
      // Development mock service
      console.log('📧 Email Verification URL:', verificationUrl);
      console.log('📧 Verification Token:', verificationToken);
      return { success: true, messageId: 'MOCK_' + Date.now() };
    }
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, resetToken) => {
  try {
    const transporter = await createTransporter();
    
    // Use multiple possible URLs for better compatibility
    const possibleUrls = [
      // Prefer env FRONTEND_URL first, then 5174, then fallbacks
      process.env.FRONTEND_URL,
      'http://localhost:5174',
      'http://127.0.0.1:5174',
      'http://localhost:5173',
      'http://192.168.1.45:5174'
    ].filter(Boolean);
    
    const resetUrl = `${possibleUrls[0]}/auth/reset-password?token=${resetToken}`;
    
    console.log('📧 Password Reset URL:', resetUrl);
    
    // Check if using real email service
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Real email service
      const mailOptions = {
        from: process.env.EMAIL_FROM || '"Ecommerce Store" <noreply@yourstore.com>',
        to: userEmail,
        subject: 'Reset Your Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>You requested to reset your password. Click the button below to reset it.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't request a password reset, please ignore this email.<br>
              This link will expire in 1 hour.
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Alternatively, you can copy and paste this link in your browser:<br>
              <span style="word-break: break-all;">${resetUrl}</span>
            </p>
            <hr style="margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              <strong>Troubleshooting:</strong><br>
              • If the button doesn't work, copy and paste the link above<br>
              • Make sure you're using a modern browser<br>
              • Check that your frontend server is running on port 5174
            </p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Password reset email sent successfully:', info.messageId);
      console.log('📧 To:', userEmail);
      console.log('🔗 Reset URL:', resetUrl);
      return { success: true, messageId: info.messageId };
    } else {
      // Development mock service
      console.log('📧 Password Reset URL:', resetUrl);
      console.log('📧 Reset Token:', resetToken);
      return { success: true, messageId: 'MOCK_' + Date.now() };
    }
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email after verification
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    console.log('📧 Welcome email would be sent to:', userEmail, 'for user:', userName);
    
    // Mock successful email sending for development
    return { success: true, messageId: 'MOCK_' + Date.now() };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send contact message email to admin/support inbox
const sendContactMessageEmail = async (payload) => {
  try {
    const transporter = await createTransporter();

    const toEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.EMAIL_USER ||
      payload?.email;

    if (!toEmail) {
      return { success: false, error: "No receiver email configured" };
    }

    // If using real email service
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from:
          process.env.EMAIL_FROM ||
          '"Ecommerce Store" <noreply@yourstore.com>',
        to: toEmail,
        subject: `New Contact Message: ${payload.subject} (${payload.priority})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
            <h2 style="margin: 0 0 12px;">New Contact Us message</h2>
            <p style="margin: 0 0 6px;"><strong>Name:</strong> ${payload.name}</p>
            <p style="margin: 0 0 6px;"><strong>Email:</strong> ${payload.email}</p>
            <p style="margin: 0 0 6px;"><strong>Phone:</strong> ${payload.phone || "-"}</p>
            <p style="margin: 0 0 6px;"><strong>Priority:</strong> ${payload.priority}</p>
            <p style="margin: 16px 0 6px;"><strong>Subject:</strong> ${payload.subject}</p>
            <div style="margin-top: 8px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
              ${String(payload.message || "").replace(/\n/g, "<br/>")}
            </div>
            <p style="margin-top: 16px; color: #6b7280; font-size: 12px;">
              You can also view messages in the Admin Panel.
            </p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    }

    // Dev mock
    console.log("📧 Contact message email (mock)");
    console.log("📧 To:", toEmail);
    console.log("📧 Subject:", payload.subject);
    console.log("📧 From:", payload.email);
    console.log("📧 Message:", payload.message);
    return { success: true, messageId: "MOCK_" + Date.now() };
  } catch (error) {
    console.error("❌ Error sending contact message email:", error);
    return { success: false, error: error.message };
  }
};

// Send admin reply to the user who contacted
const sendContactReplyEmail = async ({ toEmail, subject, replyMessage }) => {
  try {
    const transporter = await createTransporter();

    if (!toEmail) return { success: false, error: "Missing recipient email" };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from:
          process.env.EMAIL_FROM ||
          '"Ecommerce Store" <noreply@yourstore.com>',
        to: toEmail,
        subject: `Re: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
            <h2 style="margin: 0 0 12px;">Reply from support</h2>
            <p style="color:#6b7280; margin: 0 0 12px;">Subject: ${subject}</p>
            <div style="margin-top: 8px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
              ${String(replyMessage || "").replace(/\n/g, "<br/>")}
            </div>
            <p style="margin-top: 16px; color: #6b7280; font-size: 12px;">
              If you need more help, reply to this email or use the Contact Us page.
            </p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    }

    console.log("📧 Contact reply email (mock)");
    console.log("📧 To:", toEmail);
    console.log("📧 Subject:", subject);
    console.log("📧 Reply:", replyMessage);
    return { success: true, messageId: "MOCK_" + Date.now() };
  } catch (error) {
    console.error("❌ Error sending contact reply email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendContactMessageEmail,
  sendContactReplyEmail,
};
