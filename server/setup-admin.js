const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const updateAdminRole = async () => {
  try {
    console.log("Starting admin role update process...");

    // First, make sapnarai2005@gmail.com an admin
    const adminEmail = "sapnarai2005@gmail.com";
    const adminUser = await User.findOne({ email: adminEmail });

    if (adminUser) {
      await User.updateOne(
        { email: adminEmail },
        { role: "admin" }
      );
      console.log(`✅ Updated ${adminEmail} to admin role`);
      console.log(`   User: ${adminUser.userName}`);
      console.log(`   Role: admin`);
    } else {
      console.log(`❌ User with email ${adminEmail} not found`);
      console.log("   Creating admin user...");
      
      // Create admin user if not exists (you'll need to set password separately)
      const newAdmin = new User({
        userName: "sapnarai",
        email: adminEmail,
        password: "sapnarai", // You should change this
        role: "admin",
        isEmailVerified: true
      });
      
      await newAdmin.save();
      console.log(`✅ Created admin user: ${adminEmail}`);
    }

    // Then, ensure all other users are regular users
    const updateResult = await User.updateMany(
      { email: { $ne: adminEmail } }, // All users except the admin email
      { role: "user" }               // Set their role to "user"
    );

    console.log(`✅ Updated ${updateResult.modifiedCount} other users to regular user role`);

    // Verify the changes
    console.log("\n📊 Current user roles:");
    
    const adminCheck = await User.findOne({ email: adminEmail });
    console.log(`👑 Admin: ${adminCheck.email} - Role: ${adminCheck.role}`);

    const regularUsers = await User.find({ email: { $ne: adminEmail } });
    console.log(`👥 Regular users: ${regularUsers.length}`);
    
    // Show first few regular users for verification
    regularUsers.slice(0, 5).forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.email} - Role: ${user.role}`);
    });

    if (regularUsers.length > 5) {
      console.log(`   ... and ${regularUsers.length - 5} more users`);
    }

    console.log("\n🎉 Admin role setup completed successfully!");

  } catch (error) {
    console.error("❌ Error updating admin role:", error);
  } finally {
    mongoose.connection.close();
  }
};

updateAdminRole();
