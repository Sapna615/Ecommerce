const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  adminMiddleware,
  verifyEmail,
  verifyPhone,
  forgotPassword,
  resetPassword,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      // Return success:false for unauthenticated users
      // This allows frontend to show login page properly
      return res.status(200).json({
        success: false,
        message: "No authentication token found",
        user: null,
        requiresAuth: true
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    
    // Get user from database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
        user: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      }
    });
  } catch (error) {
    console.error("Check-auth error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid authentication token",
      user: null
    });
  }
});

// Email verification
router.get("/verify-email", verifyEmail);

// Phone verification
router.post("/verify-phone", verifyPhone);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password", resetPassword);

// Admin check
router.get("/check-admin", adminMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated admin!",
    user,
  });
});

module.exports = router;
