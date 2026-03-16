const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const checkUser = async () => {
  try {
    const user = await User.findOne({ email: "sapnarai2005@gmail.com" });
    if (!user) {
      console.log("User not found");
      return;
    }

    console.log("User found:");
    console.log("Email:", user.email);
    console.log("Username:", user.userName);
    console.log("Is Email Verified:", user.isEmailVerified);
    console.log("Password hash exists:", !!user.password);
    console.log("Password hash (first 20 chars):", user.password.substring(0, 20) + "...");
    
  } catch (error) {
    console.error("Error checking user:", error);
  }
  
  mongoose.connection.close();
};

checkUser();
