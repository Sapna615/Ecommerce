const express = require("express");
const {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getUserDetails,
  updateOrderStatus,
  getProductAnalytics,
  deleteUser,
  createAdminUser,
} = require("../../controllers/admin/dashboard-controller");
const { adminMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// Dashboard statistics
router.get("/dashboard/stats", getDashboardStats);

// Users management
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserDetails);
router.delete("/users/:userId", deleteUser);

// Orders management
router.get("/orders", getAllOrders);
router.put("/orders/:orderId/status", updateOrderStatus);

// Analytics
router.get("/analytics/products", getProductAnalytics);

// Create admin user (for first admin setup)
router.post("/create-admin", createAdminUser);

module.exports = router;
