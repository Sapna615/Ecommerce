const mongoose = require('mongoose');
const Product = require('./models/Product');

// Indian product data with proper INR pricing
const productsByCategory = {
  mens: [
    {
      title: "Classic White T-Shirt",
      description: "Premium cotton t-shirt perfect for everyday wear",
      category: "mens",
      subcategory: "casual",
      brand: "Classic Wear",
      price: 999, // INR
      salePrice: 699, // INR
      currency: "INR",
      totalStock: 100,
      averageReview: 4.5,
      colors: ["white", "black", "gray", "navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "https://images.unsplash.com/photo-1521572163474-6864f9a17a2?w=500&auto=format&fit=crop"
    },
    {
      title: "Denim Jacket",
      description: "Stylish denim jacket for all seasons",
      category: "mens",
      subcategory: "jackets",
      brand: "Urban Style",
      price: 2999, // INR
      salePrice: 2499, // INR
      currency: "INR",
      totalStock: 80,
      averageReview: 4.7,
      colors: ["blue", "black", "gray"],
      sizes: ["S", "M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1551488830-9f97029220c73?w=500&auto=format&fit=crop"
    },
    {
      title: "Sports Performance Tee",
      description: "High-performance athletic shirt for workouts",
      category: "mens",
      subcategory: "sports",
      brand: "SportPro",
      price: 1299, // INR
      salePrice: 999, // INR
      currency: "INR",
      totalStock: 120,
      averageReview: 4.8,
      colors: ["black", "red", "blue", "white"],
      sizes: ["S", "M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&auto=format&fit=crop"
    }
  ],
  womens: [
    {
      title: "Floral Summer Dress",
      description: "Beautiful floral print dress perfect for summer",
      category: "womens",
      subcategory: "dresses",
      brand: "Summer Style",
      price: 1999, // INR
      salePrice: 1499, // INR
      currency: "INR",
      totalStock: 90,
      averageReview: 4.6,
      colors: ["floral", "pink", "blue", "yellow"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1495385798431-1a1b742632f2?w=500&auto=format&fit=crop"
    },
    {
      title: "Elegant Evening Gown",
      description: "Stunning evening gown for special occasions",
      category: "womens",
      subcategory: "dresses",
      brand: "Elegance",
      price: 5999, // INR
      salePrice: 4999, // INR
      currency: "INR",
      totalStock: 50,
      averageReview: 4.9,
      colors: ["black", "red", "navy", "gold"],
      sizes: ["S", "M", "L"],
      image: "https://images.unsplash.com/photo-1594633312681-425e7a89438c?w=500&auto=format&fit=crop"
    },
    {
      title: "Designer Handbag",
      description: "Fashionable handbag with multiple compartments",
      category: "womens",
      subcategory: "accessories",
      brand: "Chic Style",
      price: 3499, // INR
      salePrice: 2999, // INR
      currency: "INR",
      totalStock: 70,
      averageReview: 4.7,
      colors: ["black", "brown", "tan", "red"],
      sizes: ["One Size"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop"
    }
  ],
  kids: [
    {
      title: "Cartoon T-Shirt for Kids",
      description: "Fun cartoon print t-shirt for children",
      category: "kids",
      subcategory: "casual",
      brand: "Kids World",
      price: 599, // INR
      salePrice: 449, // INR
      currency: "INR",
      totalStock: 150,
      averageReview: 4.4,
      colors: ["blue", "red", "yellow", "green"],
      sizes: ["2T", "3T", "4T", "5T", "6T", "7T", "8T"],
      image: "https://images.unsplash.com/photo-1515372031090-07c40da9a1fe?w=500&auto=format&fit=crop"
    },
    {
      title: "Colorful Backpack",
      description: "Spacious backpack perfect for school",
      category: "kids",
      subcategory: "accessories",
      brand: "School Pro",
      price: 899, // INR
      salePrice: 699, // INR
      currency: "INR",
      totalStock: 100,
      averageReview: 4.5,
      colors: ["blue", "red", "green", "pink"],
      sizes: ["One Size"],
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop"
    },
    {
      title: "Sports Shoes for Kids",
      description: "Comfortable sports shoes for active kids",
      category: "kids",
      subcategory: "footwear",
      brand: "Kids Sport",
      price: 1299, // INR
      salePrice: 999, // INR
      currency: "INR",
      totalStock: 80,
      averageReview: 4.6,
      colors: ["blue", "black", "red", "white"],
      sizes: ["10", "11", "12", "13", "1", "2", "3"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop"
    }
  ],
  footwear: [
    {
      title: "Running Shoes Pro",
      description: "Professional running shoes with advanced cushioning",
      category: "footwear",
      subcategory: "sports",
      brand: "SportPro",
      price: 3999, // INR
      salePrice: 3499, // INR
      currency: "INR",
      totalStock: 120,
      averageReview: 4.8,
      colors: ["black", "blue", "red", "white"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image: "https://images.unsplash.com/photo-1542291026-f3ffb2d8e527?w=500&auto=format&fit=crop"
    },
    {
      title: "Formal Leather Shoes",
      description: "Elegant leather shoes for formal occasions",
      category: "footwear",
      subcategory: "formal",
      brand: "Formal Wear",
      price: 4999, // INR
      salePrice: 3999, // INR
      currency: "INR",
      totalStock: 80,
      averageReview: 4.7,
      colors: ["black", "brown", "tan"],
      sizes: ["7", "8", "9", "10", "11"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop"
    },
    {
      title: "Casual Sneakers",
      description: "Comfortable sneakers for everyday wear",
      category: "footwear",
      subcategory: "casual",
      brand: "Comfort Step",
      price: 2499, // INR
      salePrice: 1999, // INR
      currency: "INR",
      totalStock: 150,
      averageReview: 4.5,
      colors: ["white", "black", "gray", "blue"],
      sizes: ["6", "7", "8", "9", "10", "11"],
      image: "https://images.unsplash.com/photo-1460353581641-37daddc1fd4a?w=500&auto=format&fit=crop"
    }
  ],
  accessories: [
    {
      title: "Designer Sunglasses",
      description: "Stylish sunglasses with UV protection",
      category: "accessories",
      subcategory: "sunglasses",
      brand: "Shade Pro",
      price: 1999, // INR
      salePrice: 1499, // INR
      currency: "INR",
      totalStock: 200,
      averageReview: 4.6,
      colors: ["black", "brown", "gold", "silver"],
      sizes: ["One Size"],
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop"
    },
    {
      title: "Premium Watch",
      description: "Elegant wristwatch with precise timekeeping",
      category: "accessories",
      subcategory: "watches",
      brand: "Time Master",
      price: 7999, // INR
      salePrice: 6999, // INR
      currency: "INR",
      totalStock: 100,
      averageReview: 4.7,
      colors: ["black", "silver", "gold", "rose gold"],
      sizes: ["One Size"],
      image: "https://images.unsplash.com/photo-1523170335258-f5ed18ce3424?w=500&auto=format&fit=crop"
    },
    {
      title: "Leather Wallet",
      description: "Genuine leather wallet with multiple card slots",
      category: "accessories",
      subcategory: "wallets",
      brand: "Leather Goods",
      price: 1499, // INR
      salePrice: 1199, // INR
      currency: "INR",
      totalStock: 150,
      averageReview: 4.4,
      colors: ["black", "brown", "tan"],
      sizes: ["One Size"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop"
    }
  ]
};

// Function to generate random products for each category with INR pricing
function generateProductsForCategory(category, baseProducts, count = 100) {
  const products = [];
  
  for (let i = 0; i < count; i++) {
    const baseProduct = baseProducts[i % baseProducts.length];
    const product = {
      ...baseProduct,
      _id: new mongoose.Types.ObjectId(),
      title: `${baseProduct.title} - Variant ${i + 1}`,
      price: Math.round(baseProduct.price + (Math.random() * 500 - 200)), // Clean INR pricing
      salePrice: Math.round(baseProduct.salePrice + (Math.random() * 200 - 100)), // Clean INR pricing
      currency: "INR",
      totalStock: Math.floor(Math.random() * 100) + 20,
      averageReview: Math.round(((Math.random() * 2) + 3.5) * 10) / 10, // One decimal place
    };
    products.push(product);
  }
  
  return products;
}

async function seedIndianProducts() {
  try {
    console.log('Indian Currency Product Seeding Started...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Generate and insert products for each category
    const allProducts = [];
    
    Object.keys(productsByCategory).forEach(category => {
      const categoryProducts = generateProductsForCategory(category, productsByCategory[category], 100);
      allProducts.push(...categoryProducts);
      console.log(`Generated ${categoryProducts.length} ${category} products with INR pricing`);
    });
    
    // Insert all products
    await Product.insertMany(allProducts);
    
    const totalProducts = allProducts.length;
    const categoryCount = Object.keys(productsByCategory).length;
    
    console.log(`Successfully added ${totalProducts} products with INR pricing!`);
    console.log(`Average: ${Math.floor(totalProducts / categoryCount)} products per category`);
    
    // Display sample products
    console.log('\nSample INR Product Prices:');
    const sampleProducts = await Product.find({}).limit(5);
    sampleProducts.forEach((product, i) => {
      console.log(`${i+1}. ${product.title}: Rs. ${product.salePrice || product.price}`);
    });
    
  } catch (error) {
    console.error('Error seeding Indian products:', error);
  }
}

// Connect to database and seed
mongoose.connect('mongodb+srv://sapnarai23_db_user:gC3QZMdhEHCzhe2a@ecommerce.w76kwuu.mongodb.net/?appName=ecommerce')
  .then(() => {
    console.log('Connected to database');
    seedIndianProducts();
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  })
  .finally(() => {
    setTimeout(() => {
      mongoose.connection.close();
    }, 5000);
  });
