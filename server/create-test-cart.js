const mongoose = require("mongoose");
const Cart = require("./models/Cart");
const Product = require("./models/Product");

mongoose.connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const createTestCart = async () => {
  try {
    // Clear existing cart items
    await Cart.deleteMany({});
    console.log("Cleared existing cart items");

    // Get some products to add to cart
    const products = await Product.find().limit(5);
    console.log(`Found ${products.length} products to add to cart`);

    if (products.length === 0) {
      console.log("No products found. Please run product generation script first.");
      return;
    }

    // Create test cart with items array
    const cartItems = products.map((product, index) => ({
      productId: product._id,
      quantity: index + 1, // Different quantities for testing
    }));

    // Create cart document with items array
    const cart = new Cart({
      userId: "testuser123",
      items: cartItems,
    });

    const result = await cart.save();
    console.log(`Successfully created cart with ${result.items.length} items`);

    // Show cart items with product details
    console.log("Cart items created:");
    for (let i = 0; i < result.items.length; i++) {
      const item = result.items[i];
      const product = products[i];
      console.log(`${i + 1}. ${product.title} - Qty: ${item.quantity} - $${product.price}`);
    }

  } catch (error) {
    console.error("Error creating test cart:", error);
  }
  
  mongoose.connection.close();
};

createTestCart();
