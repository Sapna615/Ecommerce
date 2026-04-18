const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminDashboardRouter = require("./routes/admin/dashboard-routes");
const adminContactRouter = require("./routes/admin/contact-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopWishlistRouter = require("./routes/shop/wishlist-routes");
const paymentGatewayRouter = require("./routes/payment-gateway");
const shopContactRouter = require("./routes/shop/contact-routes");
const aiRouter = require("./routes/ai/ai-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

// Note: Uncomment and update MONGODB_URL in .env file for production
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected to:", MONGODB_URL);
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    console.log(
      "Please ensure MongoDB is reachable via MONGODB_URL (or localhost:27017)."
    );
    process.exit(1);
  });

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

const app = express();
const PORT = process.env.PORT || 5002;

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://192.168.1.45:5173",
  "http://192.168.1.45:5174",
  "http://192.168.1.45:5175",
  "http://192.168.1.45:5176",
  "https://ecommerce-gilt-eight.vercel.app",
  "https://ecommerce-git-main-sapna615s-projects.vercel.app"
];

// Add production client URL from environment variable
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

// Add Vercel preview URLs pattern
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin", adminDashboardRouter);
app.use("/api/admin/contact", adminContactRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/wishlist", shopWishlistRouter);
app.use("/api/shop/contact", shopContactRouter);
app.use("/api/payment", paymentGatewayRouter);
app.use("/api/ai", aiRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, '0.0.0.0', () => console.log(`Server is now running on port ${PORT}`));
