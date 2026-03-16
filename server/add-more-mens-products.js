const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// Additional Men's T-shirt products with more variety
const additionalMensProducts = [
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9a17a2?w=500&h=500&fit=crop",
    title: "Cotton Crew Neck T-Shirt",
    description: "Classic crew neck t-shirt made from 100% premium cotton",
    category: "men",
    brand: "nike",
    price: 29.99,
    salePrice: 24.99,
    totalStock: 40,
    averageReview: 4.5,
    subcategory: "casual",
    colors: ["white", "black", "gray", "navy", "red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Cotton",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1586790170809-24f86b3f5a3a?w=500&h=500&fit=crop",
    title: "Athletic Performance Tee",
    description: "High-performance athletic t-shirt with moisture-wicking technology",
    category: "men",
    brand: "adidas",
    price: 34.99,
    salePrice: 28.99,
    totalStock: 35,
    averageReview: 4.7,
    subcategory: "sports",
    colors: ["black", "blue", "red", "green", "white"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    material: "Performance Polyester",
    fit: "Athletic Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1596755093216-cf22c2b91e7e?w=500&h=500&fit=crop",
    title: "Graphic Print T-Shirt",
    description: "Eye-catching graphic print t-shirt for casual wear",
    category: "men",
    brand: "puma",
    price: 31.99,
    salePrice: 25.99,
    totalStock: 45,
    averageReview: 4.3,
    subcategory: "printed",
    colors: ["black", "white", "gray", "blue", "yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Blend",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1515372039744-b8e02a0ae9c4?w=500&h=500&fit=crop",
    title: "Relaxed Fit V-Neck",
    description: "Comfortable V-neck t-shirt with relaxed fit for everyday wear",
    category: "men",
    brand: "h&m",
    price: 26.99,
    salePrice: 19.99,
    totalStock: 50,
    averageReview: 4.4,
    subcategory: "casual",
    colors: ["white", "black", "navy", "gray", "olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Jersey",
    fit: "Relaxed Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1578632264428-1b5a3f0b3d0e?w=500&h=500&fit=crop",
    title: "Striped Rugby Shirt",
    description: "Classic rugby shirt with horizontal stripes",
    category: "men",
    brand: "levis",
    price: 42.99,
    salePrice: 34.99,
    totalStock: 30,
    averageReview: 4.6,
    subcategory: "polo",
    colors: ["navy", "white", "red", "blue", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Blend",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    title: "Slim Fit Pocket Tee",
    description: "Modern slim fit t-shirt with chest pocket",
    category: "men",
    brand: "zara",
    price: 33.99,
    salePrice: 26.99,
    totalStock: 38,
    averageReview: 4.2,
    subcategory: "casual",
    colors: ["black", "white", "gray", "blue", "pink"],
    sizes: ["S", "M", "L", "XL"],
    material: "Cotton Elastane",
    fit: "Slim Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1574176844599-72e3b244ab5f?w=500&h=500&fit=crop",
    title: "Muscle Fit Training Tee",
    description: "Compression fit training t-shirt for workouts",
    category: "men",
    brand: "nike",
    price: 36.99,
    salePrice: 29.99,
    totalStock: 32,
    averageReview: 4.8,
    subcategory: "sports",
    colors: ["black", "red", "blue", "green", "white"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Performance Fabric",
    fit: "Muscle Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1586790170809-24f86b3f5a3a?w=500&h=500&fit=crop",
    title: "Vintage Distressed Tee",
    description: "Retro-style distressed t-shirt with vintage wash",
    category: "men",
    brand: "adidas",
    price: 38.99,
    salePrice: 31.99,
    totalStock: 25,
    averageReview: 4.5,
    subcategory: "printed",
    colors: ["gray", "black", "brown", "navy", "olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Blend",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1515372039744-b8e02a0ae9c4?w=500&h=500&fit=crop",
    title: "Longline T-Shirt",
    description: "Modern longline t-shirt with extended length",
    category: "men",
    brand: "puma",
    price: 35.99,
    salePrice: 28.99,
    totalStock: 28,
    averageReview: 4.3,
    subcategory: "oversized",
    colors: ["black", "white", "gray", "blue", "red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "French Terry",
    fit: "Oversized Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
    title: "Floral Print Casual Tee",
    description: "Stylish floral print t-shirt for casual occasions",
    category: "men",
    brand: "h&m",
    price: 27.99,
    salePrice: 22.99,
    totalStock: 42,
    averageReview: 4.1,
    subcategory: "printed",
    colors: ["white", "blue", "pink", "yellow", "green"],
    sizes: ["S", "M", "L", "XL"],
    material: "Cotton",
    fit: "Regular Fit"
  }
];

async function addMoreMensProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Insert additional men's products
    const insertedProducts = await Product.insertMany(additionalMensProducts);
    
    console.log(`Inserted ${insertedProducts.length} additional men's products`);
    console.log("Additional men's products added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding additional men's products:", error);
    process.exit(1);
  }
}

addMoreMensProducts();
