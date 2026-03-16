const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// Enhanced Men's T-Shirts with all sizes and colors
const enhancedMensProducts = [
  {
    image: "https://images.unsplash.com/photo-1521572163464-75f519983b2b?w=500&h=500&fit=crop",
    title: "Classic White T-Shirt",
    description: "Premium quality cotton t-shirt, perfect for casual wear",
    category: "men",
    brand: "nike",
    price: 29.99,
    salePrice: 24.99,
    totalStock: 50,
    averageReview: 4.5,
    subcategory: "casual",
    colors: ["white", "black", "gray", "navy", "red", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Cotton",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1586790170083-2f9f1b433a34?w=500&h=500&fit=crop",
    title: "Graphic Print T-Shirt",
    description: "Eye-catching graphic print t-shirt with modern design",
    category: "men",
    brand: "adidas",
    price: 34.99,
    salePrice: 27.99,
    totalStock: 35,
    averageReview: 4.3,
    subcategory: "printed",
    colors: ["black", "white", "red", "blue", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Blend",
    fit: "Slim Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop",
    title: "Oversized Street T-Shirt",
    description: "Trendy oversized fit for street style fashion",
    category: "men",
    brand: "puma",
    price: 39.99,
    salePrice: 32.99,
    totalStock: 25,
    averageReview: 4.6,
    subcategory: "oversized",
    colors: ["black", "gray", "olive", "white", "navy"],
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    material: "Heavyweight Cotton",
    fit: "Oversized Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    title: "Classic Polo Shirt",
    description: "Traditional polo shirt with collar and button placket",
    category: "men",
    brand: "nike",
    price: 49.99,
    salePrice: 39.99,
    totalStock: 40,
    averageReview: 4.7,
    subcategory: "polo",
    colors: ["navy", "white", "black", "red", "blue", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Pique Cotton",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1516828358218-9a563037e6b1?w=500&h=500&fit=crop",
    title: "Sports Performance T-Shirt",
    description: "Moisture-wicking fabric for active sports performance",
    category: "men",
    brand: "adidas",
    price: 44.99,
    salePrice: 34.99,
    totalStock: 30,
    averageReview: 4.8,
    subcategory: "sports",
    colors: ["blue", "black", "white", "gray", "red", "yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Performance Polyester",
    fit: "Athletic Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop",
    title: "Vintage Wash T-Shirt",
    description: "Retro-style vintage wash for authentic look",
    category: "men",
    brand: "levis",
    price: 36.99,
    salePrice: 29.99,
    totalStock: 28,
    averageReview: 4.4,
    subcategory: "casual",
    colors: ["brown", "gray", "black", "navy", "olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Vintage Wash Cotton",
    fit: "Relaxed Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&h=500&fit=crop",
    title: "Minimalist Print T-Shirt",
    description: "Clean minimalist design with subtle branding",
    category: "men",
    brand: "h&m",
    price: 24.99,
    salePrice: 19.99,
    totalStock: 45,
    averageReview: 4.2,
    subcategory: "printed",
    colors: ["white", "black", "gray", "navy", "pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Organic Cotton",
    fit: "Slim Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
    title: "Athletic Fit T-Shirt",
    description: "Slim athletic fit for active lifestyle",
    category: "men",
    brand: "puma",
    price: 32.99,
    salePrice: 26.99,
    totalStock: 38,
    averageReview: 4.5,
    subcategory: "sports",
    colors: ["red", "blue", "black", "white", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Quick-Dry Fabric",
    fit: "Athletic Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1544967703-9b440e98846d?w=500&h=500&fit=crop",
    title: "Striped Polo Shirt",
    description: "Classic horizontal stripes with polo collar",
    category: "men",
    brand: "nike",
    price: 42.99,
    salePrice: 35.99,
    totalStock: 22,
    averageReview: 4.3,
    subcategory: "polo",
    colors: ["navy/white", "black/white", "red/white", "blue/white"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton-Poly Blend",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1574177226643-35b6f3114b6b?w=500&h=500&fit=crop",
    title: "Baggy Fit T-Shirt",
    description: "Relaxed baggy fit for ultimate comfort",
    category: "men",
    brand: "adidas",
    price: 38.99,
    salePrice: 31.99,
    totalStock: 20,
    averageReview: 4.1,
    subcategory: "oversized",
    colors: ["gray", "black", "white", "navy", "olive"],
    sizes: ["L", "XL", "XXL", "3XL"],
    material: "Heavyweight Cotton",
    fit: "Baggy Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1618939604376-92a8a05f7a1c?w=500&h=500&fit=crop",
    title: "Logo Print T-Shirt",
    description: "Bold brand logo print on premium cotton",
    category: "men",
    brand: "puma",
    price: 28.99,
    salePrice: 22.99,
    totalStock: 50,
    averageReview: 4.6,
    subcategory: "printed",
    colors: ["black", "white", "red", "blue", "green", "yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Premium Cotton",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop",
    title: "Essential Crew Neck",
    description: "Basic crew neck t-shirt in solid colors",
    category: "men",
    brand: "h&m",
    price: 19.99,
    salePrice: 14.99,
    totalStock: 60,
    averageReview: 4.0,
    subcategory: "casual",
    colors: ["white", "black", "gray", "navy", "green", "red", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Cotton",
    fit: "Classic Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
    title: "Henley T-Shirt",
    description: "Classic henley style with button placket",
    category: "men",
    brand: "nike",
    price: 35.99,
    salePrice: 28.99,
    totalStock: 30,
    averageReview: 4.4,
    subcategory: "casual",
    colors: ["navy", "gray", "white", "black", "olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Blend",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    title: "V-Neck T-Shirt",
    description: "Comfortable v-neck style for modern look",
    category: "men",
    brand: "adidas",
    price: 27.99,
    salePrice: 21.99,
    totalStock: 40,
    averageReview: 4.2,
    subcategory: "casual",
    colors: ["black", "white", "gray", "navy", "red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Soft Cotton",
    fit: "Slim Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1551698618-1d74e5f51e56?w=500&h=500&fit=crop",
    title: "Long Sleeve T-Shirt",
    description: "Versatile long sleeve for all seasons",
    category: "men",
    brand: "puma",
    price: 32.99,
    salePrice: 25.99,
    totalStock: 25,
    averageReview: 4.5,
    subcategory: "casual",
    colors: ["black", "white", "gray", "navy", "olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Cotton Blend",
    fit: "Regular Fit"
  }
];

async function seedEnhancedMensProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Remove existing men's products
    await Product.deleteMany({ category: "men" });
    console.log("Cleared existing men's products");

    // Insert enhanced men's products
    const insertedProducts = await Product.insertMany(enhancedMensProducts);
    console.log(`Inserted ${insertedProducts.length} enhanced men's products`);

    console.log("Enhanced men's products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding enhanced men's products:", error);
    process.exit(1);
  }
}

seedEnhancedMensProducts();
