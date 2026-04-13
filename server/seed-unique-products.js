const mongoose = require('mongoose');
const Product = require('./models/Product');

// 100 unique men's products with proper names
const mensProducts = [
  {
    title: "Classic White Cotton T-Shirt",
    description: "Premium cotton t-shirt perfect for everyday wear",
    category: "mens",
    subcategory: "casual",
    brand: "Classic Wear",
    price: 999,
    salePrice: 699,
    currency: "INR",
    totalStock: 100,
    averageReview: 4.5,
    colors: ["white", "black", "gray", "navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9a17a2?w=500&auto=format&fit=crop"
  },
  {
    title: "Denim Jacket Classic Blue",
    description: "Stylish denim jacket for all seasons",
    category: "mens",
    subcategory: "jackets",
    brand: "Urban Style",
    price: 2999,
    salePrice: 2499,
    currency: "INR",
    totalStock: 80,
    averageReview: 4.7,
    colors: ["blue", "black", "gray"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop"
  },
  {
    title: "Sports Performance Athletic Tee",
    description: "High-performance athletic shirt for workouts",
    category: "mens",
    subcategory: "sports",
    brand: "SportPro",
    price: 1299,
    salePrice: 999,
    currency: "INR",
    totalStock: 120,
    averageReview: 4.8,
    colors: ["black", "red", "blue", "white"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&auto=format&fit=crop"
  },
  {
    title: "Navy Blue Polo Shirt",
    description: "Classic polo shirt for casual and semi-formal occasions",
    category: "mens",
    subcategory: "casual",
    brand: "Polo Classic",
    price: 1499,
    salePrice: 1199,
    currency: "INR",
    totalStock: 90,
    averageReview: 4.4,
    colors: ["navy", "white", "black", "gray"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1596755094515-f87e193d11f0?w=500&auto=format&fit=crop"
  },
  {
    title: "Black Leather Biker Jacket",
    description: "Edgy leather jacket for bold style statement",
    category: "mens",
    subcategory: "jackets",
    brand: "Biker Style",
    price: 4999,
    salePrice: 3999,
    currency: "INR",
    totalStock: 60,
    averageReview: 4.9,
    colors: ["black", "brown"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop"
  },
  {
    title: "White Henley Shirt",
    description: "Comfortable henley shirt with button placket",
    category: "mens",
    subcategory: "casual",
    brand: "Casual Comfort",
    price: 1199,
    salePrice: 899,
    currency: "INR",
    totalStock: 110,
    averageReview: 4.3,
    colors: ["white", "gray", "navy", "olive"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1596755094515-f87e193d11f0?w=500&auto=format&fit=crop"
  },
  {
    title: "Striped Long Sleeve Shirt",
    description: "Classic striped pattern for timeless style",
    category: "mens",
    subcategory: "casual",
    brand: "Pattern Pro",
    price: 1399,
    salePrice: 1099,
    currency: "INR",
    totalStock: 85,
    averageReview: 4.2,
    colors: ["blue-white", "red-white", "black-white"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1596755094515-f87e193d11f0?w=500&auto=format&fit=crop"
  },
  {
    title: "Cargo Khaki Pants",
    description: "Functional cargo pants with multiple pockets",
    category: "mens",
    subcategory: "bottoms",
    brand: "Utility Wear",
    price: 2299,
    salePrice: 1899,
    currency: "INR",
    totalStock: 75,
    averageReview: 4.5,
    colors: ["khaki", "black", "olive", "navy"],
    sizes: ["30", "32", "34", "36", "38"],
    image: "https://images.unsplash.com/photo-1594633312681-425e7a89438c?w=500&auto=format&fit=crop"
  },
  {
    title: "Slim Fit Chinos",
    description: "Modern slim fit chinos for versatile styling",
    category: "mens",
    subcategory: "bottoms",
    brand: "Modern Fit",
    price: 1899,
    salePrice: 1599,
    currency: "INR",
    totalStock: 95,
    averageReview: 4.6,
    colors: ["beige", "navy", "black", "gray"],
    sizes: ["30", "32", "34", "36", "38"],
    image: "https://images.unsplash.com/photo-1594633312681-425e7a89438c?w=500&auto=format&fit=crop"
  },
  {
    title: "Gym Tank Top",
    description: "Breathable tank top for intense workouts",
    category: "mens",
    subcategory: "sports",
    brand: "Gym Pro",
    price: 799,
    salePrice: 599,
    currency: "INR",
    totalStock: 130,
    averageReview: 4.4,
    colors: ["black", "white", "gray", "navy"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&auto=format&fit=crop"
  },
  {
    title: "Hooded Sweatshirt",
    description: "Comfortable hooded sweatshirt for casual wear",
    category: "mens",
    subcategory: "casual",
    brand: "Cozy Wear",
    price: 1799,
    salePrice: 1499,
    currency: "INR",
    totalStock: 88,
    averageReview: 4.7,
    colors: ["gray", "black", "navy", "burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop"
  },
  {
    title: "Running Shorts",
    description: "Lightweight shorts for running and training",
    category: "mens",
    subcategory: "sports",
    brand: "Run Fast",
    price: 999,
    salePrice: 799,
    currency: "INR",
    totalStock: 105,
    averageReview: 4.5,
    colors: ["black", "blue", "gray", "red"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&auto=format&fit=crop"
  },
  {
    title: "Formal Dress Shirt",
    description: "Professional dress shirt for business occasions",
    category: "mens",
    subcategory: "formal",
    brand: "Business Pro",
    price: 1999,
    salePrice: 1699,
    currency: "INR",
    totalStock: 70,
    averageReview: 4.6,
    colors: ["white", "light-blue", "pink", "gray"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1596755094515-f87e193d11f0?w=500&auto=format&fit=crop"
  },
  {
    title: "Plaid Flannel Shirt",
    description: "Warm flannel shirt for cooler weather",
    category: "mens",
    subcategory: "casual",
    brand: "Outdoor Wear",
    price: 1599,
    salePrice: 1299,
    currency: "INR",
    totalStock: 65,
    averageReview: 4.3,
    colors: ["red-black", "blue-black", "green-black"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop"
  },
  {
    title: "V-Neck Sweater",
    description: "Classic v-neck sweater for layered looks",
    category: "mens",
    subcategory: "casual",
    brand: "Knit Wear",
    price: 2099,
    salePrice: 1799,
    currency: "INR",
    totalStock: 78,
    averageReview: 4.5,
    colors: ["gray", "navy", "burgundy", "forest-green"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop"
  },
  {
    title: "Basketball Jersey",
    description: "Performance basketball jersey for sports",
    category: "mens",
    subcategory: "sports",
    brand: "Sport Pro",
    price: 1499,
    salePrice: 1199,
    currency: "INR",
    totalStock: 92,
    averageReview: 4.7,
    colors: ["red", "blue", "black", "white"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&auto=format&fit=crop"
  },
  {
    title: "Canvas Messenger Bag",
    description: "Durable canvas bag for daily commute",
    category: "mens",
    subcategory: "accessories",
    brand: "Urban Carry",
    price: 1799,
    salePrice: 1499,
    currency: "INR",
    totalStock: 55,
    averageReview: 4.4,
    colors: ["brown", "black", "olive", "navy"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop"
  },
  {
    title: "Leather Belt",
    description: "Genuine leather belt with classic buckle",
    category: "mens",
    subcategory: "accessories",
    brand: "Leather Goods",
    price: 999,
    salePrice: 799,
    currency: "INR",
    totalStock: 120,
    averageReview: 4.6,
    colors: ["black", "brown", "tan"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop"
  },
  {
    title: "Baseball Cap",
    description: "Classic baseball cap for casual style",
    category: "mens",
    subcategory: "accessories",
    brand: "Cap Pro",
    price: 699,
    salePrice: 499,
    currency: "INR",
    totalStock: 140,
    averageReview: 4.2,
    colors: ["black", "navy", "red", "gray", "white"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop"
  },
  {
    title: "Wool Winter Coat",
    description: "Warm wool coat for cold weather protection",
    category: "mens",
    subcategory: "outerwear",
    brand: "Winter Pro",
    price: 5999,
    salePrice: 4999,
    currency: "INR",
    totalStock: 45,
    averageReview: 4.8,
    colors: ["black", "gray", "navy", "camel"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop"
  }
];

// Add more products to reach 100 - you can continue adding unique products here
// For now, let's create the remaining 80 products with unique names
const additionalMensProducts = [];
for (let i = 21; i <= 100; i++) {
  const productTypes = [
    "Graphic Print T-Shirt", "Solid Color Polo", "Athletic Performance Tee", 
    "Casual Button-Up Shirt", "Slim Fit Jeans", "Relaxed Fit Chinos",
    "Gym Workout Tank", "Running Performance Shorts", "Basketball Athletic Shorts",
    "Hooded Pullover Sweatshirt", "Zip-Up Hoodie", "Crew Neck Sweatshirt",
    "V-Neck Pullover Sweater", "Crew Neck Sweater", "Cardigan Sweater",
    "Denim Trucker Jacket", "Leather Biker Jacket", "Bomber Jacket",
    "Windbreaker Jacket", "Rainproof Jacket", "Winter Parka Coat",
    "Canvas Messenger Bag", "Leather Briefcase", "Backpack for Work",
    "Wool Dress Belt", "Canvas Casual Belt", "Reversible Belt",
    "Baseball Cap", "Beanie Hat", "Visor Cap",
    "Wool Dress Socks", "Athletic Performance Socks", "Casual Cotton Socks",
    "Leather Gloves", "Touchscreen Gloves", "Winter Wool Gloves",
    "Sunglasses Classic", "Sport Sunglasses", "Reading Glasses",
    "Leather Wallet", "Canvas Wallet", "Minimalist Card Holder"
  ];
  
  const brands = ["Classic Wear", "Urban Style", "SportPro", "Business Pro", "Outdoor Wear", "Modern Fit"];
  const colors = ["black", "white", "gray", "navy", "red", "blue", "green", "brown", "khaki", "olive"];
  const sizes = ["S", "M", "L", "XL"];
  
  const productType = productTypes[(i - 21) % productTypes.length];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const primaryColor = colors[Math.floor(Math.random() * colors.length)];
  const secondaryColor = colors[Math.floor(Math.random() * colors.length)];
  
  additionalMensProducts.push({
    title: `${brand} ${primaryColor.charAt(0).toUpperCase() + primaryColor.slice(1)} ${productType}`,
    description: `High-quality ${productType.toLowerCase()} from ${brand} in ${primaryColor} color`,
    category: "mens",
    subcategory: ["casual", "sports", "formal", "accessories", "outerwear", "bottoms"][Math.floor(Math.random() * 6)],
    brand: brand,
    price: Math.floor(Math.random() * 4000) + 599,
    salePrice: Math.floor(Math.random() * 3000) + 399,
    currency: "INR",
    totalStock: Math.floor(Math.random() * 100) + 20,
    averageReview: Math.round((Math.random() * 2 + 3.5) * 10) / 10,
    colors: [primaryColor, secondaryColor],
    sizes: sizes,
    image: `https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop&random=${i}`
  });
}

const allMensProducts = [...mensProducts, ...additionalMensProducts];

async function seedUniqueProducts() {
  try {
    console.log('Starting to seed unique products with proper names...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert all unique mens products
    await Product.insertMany(allMensProducts);
    
    console.log(`Successfully added ${allMensProducts.length} unique mens products!`);
    console.log('All products have proper names, no "Variant" naming');
    
    // Show sample products
    console.log('\nSample products with proper names:');
    allMensProducts.slice(0, 10).forEach((product, i) => {
      console.log(`${i+1}. ${product.title} - Rs. ${product.salePrice || product.price}`);
    });
    
  } catch (error) {
    console.error('Error seeding unique products:', error);
  }
}

// Connect to database and seed
mongoose.connect('mongodb+srv://sapnarai23_db_user:gC3QZMdhEHCzhe2a@ecommerce.w76kwuu.mongodb.net/?appName=ecommerce')
  .then(() => {
    console.log('Connected to database');
    seedUniqueProducts();
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  })
  .finally(() => {
    setTimeout(() => {
      mongoose.connection.close();
    }, 5000);
  });
