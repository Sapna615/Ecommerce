const User = require("../../models/User");
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Wishlist = require("../../models/Wishlist");
const Address = require("../../models/Address");

// Get admin dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    
    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'userName email');
    
    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: "$cartItems" },
      { $group: { _id: "$cartItems.productId", totalSold: { $sum: "$cartItems.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" }
    ]);
    
    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$orderStatus", count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders,
        topProducts,
        ordersByStatus,
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

// Get all users (for admin)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    
    const query = search ? {
      $or: [
        { userName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};
    
    const users = await User.find(query)
      .select('-password -emailVerificationToken -passwordResetToken')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await User.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search = "" } = req.query;
    
    let query = {};
    
    if (status) {
      query.orderStatus = status;
    }
    
    if (search) {
      query.$or = [
        { 'addressInfo.address': { $regex: search, $options: 'i' } },
        { 'addressInfo.city': { $regex: search, $options: 'i' } },
        { 'cartItems.title': { $regex: search, $options: 'i' } }
      ];
    }
    
    const orders = await Order.find(query)
      .populate('userId', 'userName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Order.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// Get user details with their activities
const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId)
      .select('-password -emailVerificationToken -passwordResetToken');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    // Get user's orders
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get user's cart
    const cart = await Cart.findOne({ userId });
    
    // Get user's wishlist
    const wishlist = await Wishlist.find({ userId })
      .populate('productId', 'title price image');
    
    // Get user's addresses
    const addresses = await Address.find({ userId });
    
    res.status(200).json({
      success: true,
      data: {
        user,
        orders,
        cart,
        wishlist,
        addresses,
        totalOrders: orders.length,
        totalWishlistItems: wishlist.length,
        totalCartItems: cart?.items?.length || 0,
      }
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    
    order.orderStatus = orderStatus;
    order.orderUpdateDate = new Date();
    await order.save();
    
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

// Get product analytics
const getProductAnalytics = async (req, res) => {
  try {
    // Products by category
    const productsByCategory = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Low stock products
    const lowStockProducts = await Product.find({ totalStock: { $lt: 10 } })
      .sort({ totalStock: 1 })
      .limit(10);
    
    // Most viewed products (if you have view tracking)
    const mostViewedProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Revenue by month
    const revenueByMonth = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        productsByCategory,
        lowStockProducts,
        mostViewedProducts,
        revenueByMonth,
      }
    });
  } catch (error) {
    console.error('Product analytics error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product analytics",
    });
  }
};

// Delete user (for admin)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    // Delete user's related data
    await Cart.deleteMany({ userId });
    await Wishlist.deleteMany({ userId });
    await Address.deleteMany({ userId });
    await Order.deleteMany({ userId });
    
    // Delete user
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({
      success: true,
      message: "User and all related data deleted successfully",
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// Create admin user
const createAdminUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    
    const bcrypt = require("bcryptjs");
    const hashPassword = await bcrypt.hash(password, 12);
    
    const adminUser = new User({
      userName,
      email,
      password: hashPassword,
      role: 'admin',
      isEmailVerified: true, // Auto-verify admin users
    });
    
    await adminUser.save();
    
    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      data: {
        id: adminUser._id,
        userName: adminUser.userName,
        email: adminUser.email,
        role: adminUser.role,
      }
    });
  } catch (error) {
    console.error('Create admin user error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create admin user",
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getUserDetails,
  updateOrderStatus,
  getProductAnalytics,
  deleteUser,
  createAdminUser,
};
