const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// Sample products data
const sampleProducts = [
  {
    image: "https://images.unsplash.com/photo-1523381210436-68b5c4a3b8b0?w=500&h=500&fit=crop",
    title: "Classic White T-Shirt",
    description: "Premium quality cotton t-shirt, perfect for casual wear",
    category: "men",
    brand: "nike",
    price: 29.99,
    salePrice: 19.99,
    totalStock: 50,
    averageReview: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    title: "Running Shoes",
    description: "Professional running shoes with advanced cushioning",
    category: "footwear",
    brand: "nike",
    price: 89.99,
    salePrice: 69.99,
    totalStock: 30,
    averageReview: 4.8
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop",
    title: "Denim Jacket",
    description: "Classic denim jacket with modern fit",
    category: "men",
    brand: "levi",
    price: 79.99,
    salePrice: 59.99,
    totalStock: 25,
    averageReview: 4.6
  },
  {
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop",
    title: "Summer Dress",
    description: "Elegant summer dress for special occasions",
    category: "women",
    brand: "zara",
    price: 59.99,
    salePrice: 39.99,
    totalStock: 20,
    averageReview: 4.3
  },
  {
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&h=500&fit=crop",
    title: "Smart Watch",
    description: "Latest smartwatch with fitness tracking",
    category: "accessories",
    brand: "puma",
    price: 199.99,
    salePrice: 149.99,
    totalStock: 15,
    averageReview: 4.7
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b79c38?w=500&h=500&fit=crop",
    title: "Backpack",
    description: "Durable backpack for daily use and travel",
    category: "accessories",
    brand: "adidas",
    price: 49.99,
    salePrice: 34.99,
    totalStock: 40,
    averageReview: 4.4
  },
  {
    image: "https://images.unsplash.com/photo-1504192475253-1a467e2e2e7a?w=500&h=500&fit=crop",
    title: "Kids Sneakers",
    description: "Comfortable sneakers for active kids",
    category: "kids",
    brand: "nike",
    price: 39.99,
    salePrice: 29.99,
    totalStock: 35,
    averageReview: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1544967703-9b440e98846d?w=500&h=500&fit=crop",
    title: "Yoga Pants",
    description: "High-quality yoga pants for workout sessions",
    category: "women",
    brand: "nike",
    price: 69.99,
    salePrice: 49.99,
    totalStock: 30,
    averageReview: 4.6
  },
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
    title: "Baseball Cap",
    description: "Stylish baseball cap for casual wear",
    category: "accessories",
    brand: "puma",
    price: 24.99,
    salePrice: 14.99,
    totalStock: 50,
    averageReview: 4.2
  },
  {
    image: "https://images.unsplash.com/photo-1608238203956-07e2e67e5b6c?w=500&h=500&fit=crop",
    title: "Hoodie",
    description: "Comfortable hoodie for cold weather",
    category: "men",
    brand: "adidas",
    price: 59.99,
    salePrice: 44.99,
    totalStock: 25,
    averageReview: 4.7
  },
  {
    image: "https://images.unsplash.com/photo-1618939604376-92a8a05f7a1c?w=500&h=500&fit=crop",
    title: "Handbag",
    description: "Elegant handbag for formal occasions",
    category: "accessories",
    brand: "zara",
    price: 89.99,
    salePrice: 69.99,
    totalStock: 15,
    averageReview: 4.8
  },
  {
    image: "https://images.unsplash.com/photo-1574177226643-35b6f3114b6b?w=500&h=500&fit=crop",
    title: "Sports Shorts",
    description: "Athletic shorts for sports and workout",
    category: "men",
    brand: "puma",
    price: 34.99,
    salePrice: 24.99,
    totalStock: 45,
    averageReview: 4.3
  }
];

async function seedProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${insertedProducts.length} sample products`);

    console.log("Products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();
