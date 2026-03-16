const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// Women's Products
const womensProducts = [
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
    title: "Floral Summer Dress",
    description: "Beautiful floral print dress for summer occasions",
    category: "women",
    brand: "zara",
    price: 59.99,
    salePrice: 44.99,
    totalStock: 30,
    averageReview: 4.6,
    subcategory: "dresses",
    colors: ["pink", "blue", "yellow", "white", "red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Cotton Blend",
    fit: "A-Line Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1572800075455-6e74e4290a66?w=500&h=500&fit=crop",
    title: "Classic Blouse",
    description: "Elegant blouse perfect for office and casual wear",
    category: "women",
    brand: "h&m",
    price: 39.99,
    salePrice: 29.99,
    totalStock: 45,
    averageReview: 4.3,
    subcategory: "tops",
    colors: ["white", "black", "blue", "pink", "gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Silk Blend",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=500&fit=crop",
    title: "High-Waisted Jeans",
    description: "Comfortable high-waisted jeans with stretch",
    category: "women",
    brand: "levis",
    price: 69.99,
    salePrice: 54.99,
    totalStock: 35,
    averageReview: 4.7,
    subcategory: "jeans",
    colors: ["blue", "black", "gray", "white"],
    sizes: ["24", "26", "28", "30", "32"],
    material: "Denim Stretch",
    fit: "Slim Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1515372039744-b8e02a0ae9c4?w=500&h=500&fit=crop",
    title: "Yoga Leggings",
    description: "High-performance leggings for yoga and workout",
    category: "women",
    brand: "nike",
    price: 45.99,
    salePrice: 35.99,
    totalStock: 50,
    averageReview: 4.8,
    subcategory: "activewear",
    colors: ["black", "gray", "blue", "pink", "purple"],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Performance Fabric",
    fit: "Compression Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1469335398225-474fc58b37d5?w=500&h=500&fit=crop",
    title: "Wool Winter Coat",
    description: "Warm wool coat for cold winter days",
    category: "women",
    brand: "zara",
    price: 129.99,
    salePrice: 89.99,
    totalStock: 20,
    averageReview: 4.5,
    subcategory: "outerwear",
    colors: ["black", "gray", "camel", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Wool Blend",
    fit: "Regular Fit"
  }
];

// Kids Products
const kidsProducts = [
  {
    image: "https://images.unsplash.com/photo-1516559840673-39a185c831b0?w=500&h=500&fit=crop",
    title: "Kids Cartoon T-Shirt",
    description: "Fun cartoon print t-shirt for kids",
    category: "kids",
    brand: "puma",
    price: 19.99,
    salePrice: 14.99,
    totalStock: 60,
    averageReview: 4.4,
    subcategory: "tops",
    colors: ["red", "blue", "green", "yellow", "pink"],
    sizes: ["2T", "3T", "4T", "5T", "6T", "7T", "8T"],
    material: "100% Cotton",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&h=500&fit=crop",
    title: "Kids Sports Jersey",
    description: "Active wear jersey for sports activities",
    category: "kids",
    brand: "adidas",
    price: 24.99,
    salePrice: 19.99,
    totalStock: 40,
    averageReview: 4.6,
    subcategory: "sports",
    colors: ["blue", "red", "green", "black", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Performance Polyester",
    fit: "Athletic Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    title: "Kids Denim Shorts",
    description: "Comfortable denim shorts for summer play",
    category: "kids",
    brand: "h&m",
    price: 22.99,
    salePrice: 16.99,
    totalStock: 55,
    averageReview: 4.2,
    subcategory: "bottoms",
    colors: ["blue", "black", "gray"],
    sizes: ["2T", "3T", "4T", "5T", "6T", "7T", "8T"],
    material: "Denim",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1504192475253-1a467e2e2e7a?w=500&h=500&fit=crop",
    title: "Kids Party Dress",
    description: "Elegant dress for special occasions",
    category: "kids",
    brand: "zara",
    price: 34.99,
    salePrice: 24.99,
    totalStock: 25,
    averageReview: 4.7,
    subcategory: "dresses",
    colors: ["pink", "white", "purple", "blue"],
    sizes: ["2T", "3T", "4T", "5T", "6T", "7T"],
    material: "Cotton Blend",
    fit: "A-Line Fit"
  }
];

// Footwear Products
const footwearProducts = [
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    title: "Running Shoes",
    description: "Professional running shoes with advanced cushioning",
    category: "footwear",
    brand: "nike",
    price: 89.99,
    salePrice: 69.99,
    totalStock: 40,
    averageReview: 4.8,
    subcategory: "sports",
    colors: ["black", "white", "blue", "red", "gray"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    material: "Mesh & Rubber",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
    title: "Classic Leather Sneakers",
    description: "Timeless leather sneakers for casual wear",
    category: "footwear",
    brand: "adidas",
    price: 79.99,
    salePrice: 59.99,
    totalStock: 35,
    averageReview: 4.5,
    subcategory: "casual",
    colors: ["white", "black", "brown", "navy"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    material: "Genuine Leather",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1608238203956-07e2e67e5b6c?w=500&h=500&fit=crop",
    title: "Formal Oxford Shoes",
    description: "Classic oxford shoes for formal occasions",
    category: "footwear",
    brand: "puma",
    price: 99.99,
    salePrice: 79.99,
    totalStock: 25,
    averageReview: 4.6,
    subcategory: "formal",
    colors: ["black", "brown", "tan"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    material: "Polished Leather",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    title: "Canvas Sneakers",
    description: "Lightweight canvas sneakers for everyday comfort",
    category: "footwear",
    brand: "h&m",
    price: 39.99,
    salePrice: 29.99,
    totalStock: 60,
    averageReview: 4.3,
    subcategory: "casual",
    colors: ["white", "black", "red", "blue", "green"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    material: "Canvas",
    fit: "Regular Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    title: "Hiking Boots",
    description: "Durable hiking boots for outdoor adventures",
    category: "footwear",
    brand: "nike",
    price: 119.99,
    salePrice: 89.99,
    totalStock: 20,
    averageReview: 4.7,
    subcategory: "outdoor",
    colors: ["brown", "black", "gray"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    material: "Waterproof Leather",
    fit: "Regular Fit"
  }
];

// Accessories Products
const accessoriesProducts = [
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    title: "Luxury Watch",
    description: "Elegant wristwatch with leather strap",
    category: "accessories",
    brand: "puma",
    price: 199.99,
    salePrice: 149.99,
    totalStock: 15,
    averageReview: 4.8,
    subcategory: "watches",
    colors: ["black", "brown", "silver", "gold"],
    sizes: ["One Size"],
    material: "Stainless Steel",
    fit: "Adjustable"
  },
  {
    image: "https://images.unsplash.com/photo-1584273149889-d7d979f1a6c2?w=500&h=500&fit=crop",
    title: "Designer Sunglasses",
    description: "Stylish sunglasses with UV protection",
    category: "accessories",
    brand: "nike",
    price: 89.99,
    salePrice: 69.99,
    totalStock: 30,
    averageReview: 4.5,
    subcategory: "eyewear",
    colors: ["black", "brown", "tortoise", "blue"],
    sizes: ["One Size"],
    material: "Polarized Lenses",
    fit: "Standard"
  },
  {
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    title: "Leather Backpack",
    description: "Spacious leather backpack for daily use",
    category: "accessories",
    brand: "adidas",
    price: 79.99,
    salePrice: 59.99,
    totalStock: 25,
    averageReview: 4.6,
    subcategory: "bags",
    colors: ["black", "brown", "tan", "gray"],
    sizes: ["One Size"],
    material: "Genuine Leather",
    fit: "Standard"
  },
  {
    image: "https://images.unsplash.com/photo-1599664459848-6e6c56639c3f?w=500&h=500&fit=crop",
    title: "Sports Cap",
    description: "Adjustable baseball cap for sports",
    category: "accessories",
    brand: "puma",
    price: 24.99,
    salePrice: 19.99,
    totalStock: 50,
    averageReview: 4.2,
    subcategory: "headwear",
    colors: ["black", "white", "red", "blue", "navy"],
    sizes: ["One Size"],
    material: "Cotton",
    fit: "Adjustable"
  },
  {
    image: "https://images.unsplash.com/photo-1596944924647-6464c9e4e7a1?w=500&h=500&fit=crop",
    title: "Leather Belt",
    description: "Classic leather belt with buckle",
    category: "accessories",
    brand: "h&m",
    price: 34.99,
    salePrice: 24.99,
    totalStock: 40,
    averageReview: 4.4,
    subcategory: "belts",
    colors: ["black", "brown", "tan"],
    sizes: ["S", "M", "L", "XL"],
    material: "Genuine Leather",
    fit: "Standard"
  }
];

async function seedAllCategories() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Clear existing products for other categories
    await Product.deleteMany({ category: { $in: ["women", "kids", "footwear", "accessories"] } });
    console.log("Cleared existing products for other categories");

    // Insert all category products
    const allProducts = [...womensProducts, ...kidsProducts, ...footwearProducts, ...accessoriesProducts];
    const insertedProducts = await Product.insertMany(allProducts);
    
    console.log(`Inserted ${insertedProducts.length} products across all categories:`);
    console.log(`- Women: ${womensProducts.length} products`);
    console.log(`- Kids: ${kidsProducts.length} products`);
    console.log(`- Footwear: ${footwearProducts.length} products`);
    console.log(`- Accessories: ${accessoriesProducts.length} products`);

    console.log("All categories seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding all categories:", error);
    process.exit(1);
  }
}

seedAllCategories();
