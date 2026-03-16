const mongoose = require("mongoose");
const Order = require("./models/Order");
const Product = require("./models/Product");
require("dotenv").config();

async function createTestOrder() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Get a test product
    const product = await Product.findOne({ category: "men" });
    if (!product) {
      console.log("No product found");
      process.exit(1);
    }

    // Create a test order
    const testOrder = {
      userId: "testuser123",
      cartItems: [
        {
          productId: product._id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: 1,
        }
      ],
      addressInfo: {
        address: "Test Address",
        city: "Test City",
        pincode: "12345",
        phone: "1234567890",
        notes: "Test order"
      },
      orderStatus: "delivered",
      paymentMethod: "cod",
      paymentStatus: "paid",
      totalAmount: product.price,
      orderDate: new Date(),
      orderUpdateDate: new Date()
    };

    // Check if order already exists
    const existingOrder = await Order.findOne({ 
      userId: testOrder.userId, 
      "cartItems.productId": product._id 
    });

    if (existingOrder) {
      console.log("Test order already exists");
    } else {
      const newOrder = new Order(testOrder);
      await newOrder.save();
      console.log("Test order created successfully!");
    }

    console.log(`Product ID for testing: ${product._id}`);
    console.log(`User ID for testing: ${testOrder.userId}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating test order:", error);
    process.exit(1);
  }
}

createTestOrder();
