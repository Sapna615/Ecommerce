const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce";

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB:", MONGODB_URL))
  .catch((err) => console.error("MongoDB connection error:", err));

const email = process.argv[2] || "sapnarai2005@gmail.com";
const newPassword = process.argv[3] || "NewPassword123!";

const resetPassword = async () => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return;
    }

    const hashPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashPassword;
    user.isEmailVerified = true;
    await user.save();

    console.log("Password reset successfully!");
    console.log("Email:", email);
    console.log("New password:", newPassword);
  } catch (error) {
    console.error("Error resetting password:", error);
  } finally {
    await mongoose.connection.close();
  }
};

resetPassword();
