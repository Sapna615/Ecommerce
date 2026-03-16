const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// Enhanced product data with multiple images and detailed information
const enhancedProducts = [
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9a17a2?w=600&h=600&fit=crop",
    title: "Essential Crew Neck",
    description: "Premium quality cotton t-shirt, perfect for casual wear. Features a classic crew neck design with reinforced collar stitching for durability.",
    category: "men",
    subcategory: "casual",
    brand: "nike",
    price: 19.99,
    salePrice: 14.99,
    totalStock: 150,
    averageReview: 4.5,
    colors: ["white", "black", "gray", "navy", "red", "blue", "green", "brown", "olive", "pink", "yellow"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    material: "100% Premium Cotton",
    fit: "Regular Fit",
    additionalImages: {
      white: "https://images.unsplash.com/photo-1521572163474-6864f9a17a2?w=600&h=600&fit=crop",
      black: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
      gray: "https://images.unsplash.com/photo-1544967703-9b440e98846d?w=600&h=600&fit=crop",
      navy: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
      red: "https://images.unsplash.com/photo-1515372039744-b8e02a0ae9c4?w=600&h=600&fit=crop"
    },
    features: [
      "Premium cotton fabric",
      "Reinforced collar",
      "Pre-shrunk material",
      "Tag-free label",
      "Double-stitched seams"
    ],
    careInstructions: "Machine wash cold, tumble dry low, do not bleach"
  },
  {
    image: "https://images.unsplash.com/photo-1586790170809-24f86b3f5a3a?w=600&h=600&fit=crop",
    title: "Athletic Performance Tee",
    description: "High-performance athletic t-shirt with moisture-wicking technology. Designed for intense workouts and sports activities.",
    category: "men",
    subcategory: "sports",
    brand: "adidas",
    price: 34.99,
    salePrice: 28.99,
    totalStock: 120,
    averageReview: 4.7,
    colors: ["black", "blue", "red", "green", "white"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    material: "Performance Polyester",
    fit: "Athletic Fit",
    additionalImages: {
      black: "https://images.unsplash.com/photo-1586790170809-24f86b3f5a3a?w=600&h=600&fit=crop",
      blue: "https://images.unsplash.com/photo-1574176844599-72e3b244ab5f?w=600&h=600&fit=crop",
      red: "https://images.unsplash.com/photo-1515372039744-b8e02a0ae9c4?w=600&h=600&fit=crop",
      green: "https://images.unsplash.com/photo-1586790170809-24f86b3f5a3a?w=600&h=600&fit=crop",
      white: "https://images.unsplash.com/photo-1521572163474-6864f9a17a2?w=600&h=600&fit=crop"
    },
    features: [
      "Moisture-wicking fabric",
      "Quick-dry technology",
      "Anti-odor treatment",
      "UPF 50+ protection",
      "Four-way stretch"
    ],
    careInstructions: "Machine wash cold, hang dry, do not use fabric softener"
  },
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
    title: "Classic Polo Shirt",
    description: "Timeless polo shirt with modern styling. Perfect for business casual or weekend outings.",
    category: "men",
    subcategory: "polo",
    brand: "puma",
    price: 42.99,
    salePrice: 35.99,
    totalStock: 80,
    averageReview: 4.6,
    colors: ["white", "black", "navy", "gray", "red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Blend",
    fit: "Regular Fit",
    additionalImages: {
      white: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
      black: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
      navy: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
      gray: "https://images.unsplash.com/photo-1544967703-9b440e98846d?w=600&h=600&fit=crop",
      red: "https://images.unsplash.com/photo-1515372039744-b8e02a0ae9c4?w=600&h=600&fit=crop"
    },
    features: [
      "Three-button placket",
      "Ribbed collar and cuffs",
      "Side vents for comfort",
      "Fade-resistant color",
      "Wrinkle-resistant fabric"
    ],
    careInstructions: "Machine wash warm, tumble dry medium, iron if needed"
  }
];

async function addEnhancedProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Update existing products with enhanced data
    for (const enhancedProduct of enhancedProducts) {
      const result = await Product.updateOne(
        { title: enhancedProduct.title, brand: enhancedProduct.brand },
        { 
          $set: {
            description: enhancedProduct.description,
            additionalImages: enhancedProduct.additionalImages,
            features: enhancedProduct.features,
            careInstructions: enhancedProduct.careInstructions
          }
        },
        { upsert: true }
      );
      
      console.log(`Updated product: ${enhancedProduct.title}`);
    }

    console.log("Enhanced products added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding enhanced products:", error);
    process.exit(1);
  }
}

addEnhancedProducts();
