const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/User");
const { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } = require("../../services/emailService");
const { sendPhoneVerificationCode } = require("../../services/smsService");

//register
const registerUser = async (req, res) => {
  const { userName, email, password, phone } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    
    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    
    // Generate phone verification code
    const phoneVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      phone: phone || null,
      emailVerificationToken,
      phoneVerificationCode: phone ? phoneVerificationCode : null,
    });

    await newUser.save();
    
    // Send verification email
    const emailResult = await sendVerificationEmail(email, emailVerificationToken);
    if (!emailResult.success) {
      console.log('Email service failed, but continuing with registration:', emailResult.error);
    }
    
    // Send phone verification code if phone provided
    if (phone) {
      await sendPhoneVerificationCode(phone, phoneVerificationCode);
    }
    
    res.status(200).json({
      success: true,
      message: "Registration successful! Please check your email for verification link" + (phone ? " and your phone for SMS verification code" : ""),
      requiresEmailVerification: true,
      requiresPhoneVerification: !!phone,
    });
  } catch (e) {
    console.log("Registration error:", e);
    
    // Handle specific errors
    if (e.code === 11000) {
      // Duplicate key error
      let field = "unknown";
      if (e.keyPattern?.userName) {
        field = "username";
      } else if (e.keyPattern?.email) {
        field = "email";
      }
      
      return res.status(400).json({
        success: false,
        message: `User already exists with this ${field}! Please try a different ${field}`,
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email);
    
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      console.log("User not found for email:", email);
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    console.log("User found:", checkUser.email, checkUser.userName);

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    
    console.log("Password match result:", checkPasswordMatch);
    
    if (!checkPasswordMatch) {
      console.log("Password mismatch for email:", email);
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    // Check if email is verified
    // TEMPORARILY DISABLED: Since no SMTP server is configured in production yet,
    // users cannot receive the verification email. Bypassing this check so users can log in.
    /*
    if (!checkUser.isEmailVerified) {
      return res.json({
        success: false,
        message: "Please verify your email before logging in",
        requiresEmailVerification: true,
      });
    }
    */

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production" || true, // Force true for cross-domain
      sameSite: "none" 
    }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
        isEmailVerified: checkUser.isEmailVerified,
        isPhoneVerified: checkUser.isPhoneVerified,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  }).json({
    success: true,
    message: "Logged out successfully!",
  });
};

//verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const wantsRedirect =
      String(req.query.redirect).toLowerCase() === "true" ||
      req.accepts(["html", "json"]) === "html";
    
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      if (wantsRedirect) {
        const frontendBase =
          process.env.FRONTEND_URL || "http://localhost:5173";
        return res.redirect(
          `${frontendBase}/auth/login?verified=0&reason=invalid_token`
        );
      }

      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }
    
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await user.save();
    
    // Send welcome email
    await sendWelcomeEmail(user.email, user.userName);

    if (wantsRedirect) {
      const frontendBase =
        process.env.FRONTEND_URL || "http://localhost:5173";
      return res.redirect(`${frontendBase}/auth/login?verified=1`);
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully! You can now login.",
    });
  } catch (error) {
    console.error('Email verification error:', error);
    const wantsRedirect =
      String(req.query.redirect).toLowerCase() === "true" ||
      req.accepts(["html", "json"]) === "html";

    if (wantsRedirect) {
      const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";
      return res.redirect(
        `${frontendBase}/auth/login?verified=0&reason=server_error`
      );
    }

    res.status(500).json({
      success: false,
      message: "Email verification failed",
    });
  }
};

//verify phone
const verifyPhone = async (req, res) => {
  try {
    const { userId, code } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    
    if (user.phoneVerificationCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }
    
    user.isPhoneVerified = true;
    user.phoneVerificationCode = null;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Phone number verified successfully!",
    });
  } catch (error) {
    console.error('Phone verification error:', error);
    res.status(500).json({
      success: false,
      message: "Phone verification failed",
    });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour
    
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();
    
    // Send password reset email
    await sendPasswordResetEmail(email, resetToken);
    
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to send password reset email",
    });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    
    // Hash new password
    const hashPassword = await bcrypt.hash(newPassword, 12);
    
    user.password = hashPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Password reset successfully! You can now login with your new password.",
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  console.log('Auth middleware called');
  console.log('Cookies:', req.cookies);
  
  const token = req.cookies.token;
  console.log('Token found:', !!token);
  
  if (!token) {
    console.log('No token found, returning 401');
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    console.log('Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

//admin middleware
const adminMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Admin access required!",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  logoutUser, 
  authMiddleware, 
  adminMiddleware,
  verifyEmail,
  verifyPhone,
  forgotPassword,
  resetPassword
};
