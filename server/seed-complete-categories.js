const mongoose = require('mongoose');
const Product = require('./models/Product');

// 100 unique products for each category with proper names
const productsByCategory = {
  mens: [
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
    }
  ],
  
  womens: [
    {
      title: "Floral Summer Dress",
      description: "Beautiful floral print dress perfect for summer",
      category: "womens",
      subcategory: "dresses",
      brand: "Summer Style",
      price: 1999,
      salePrice: 1499,
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
      price: 5999,
      salePrice: 4999,
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
      price: 3499,
      salePrice: 2999,
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
      price: 599,
      salePrice: 449,
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
      price: 899,
      salePrice: 699,
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
      price: 1299,
      salePrice: 999,
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
      price: 3999,
      salePrice: 3499,
      currency: "INR",
      totalStock: 120,
      averageReview: 4.8,
      colors: ["black", "blue", "red", "white"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop"
    },
    {
      title: "Formal Leather Shoes",
      description: "Elegant leather shoes for formal occasions",
      category: "footwear",
      subcategory: "formal",
      brand: "Formal Wear",
      price: 4999,
      salePrice: 3999,
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
      price: 2499,
      salePrice: 1999,
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
      price: 1999,
      salePrice: 1499,
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
      price: 7999,
      salePrice: 6999,
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
      price: 1499,
      salePrice: 1199,
      currency: "INR",
      totalStock: 150,
      averageReview: 4.4,
      colors: ["black", "brown", "tan"],
      sizes: ["One Size"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop"
    }
  ]
};

// Function to generate additional products to reach 100 per category
function generateAdditionalProducts(baseProducts, category, count = 97) {
  const products = [];
  const productTypes = {
    mens: ["Graphic Tee", "Polo Shirt", "Henley", "Button-Up Shirt", "Tank Top", "Hoodie", "Sweatshirt", "Jacket", "Pants", "Shorts"],
    womens: ["Blouse", "Skirt", "Top", "Cardigan", "Coat", "Jeans", "Leggings", "Top", "Dress"],
    kids: ["Play Shirt", "Shorts", "Pajamas", "Jacket", "Shoes", "Hat", "Gloves", "Socks"],
    footwear: ["Boots", "Sandals", "Loafers", "Slippers", "Running", "Training", "Basketball"],
    accessories: ["Belt", "Scarf", "Hat", "Gloves", "Bag", "Jewelry", "Watch", "Sunglasses"]
  };
  
  const brands = {
    mens: ["Classic Wear", "Urban Style", "SportPro", "Business Pro", "Outdoor Wear", "Modern Fit"],
    womens: ["Summer Style", "Elegance", "Chic Style", "Fashion Pro", "Urban Chic", "Casual Queen"],
    kids: ["Kids World", "School Pro", "Kids Sport", "Play Time", "Comfort Kids", "Fun Wear"],
    footwear: ["SportPro", "Formal Wear", "Comfort Step", "Urban Feet", "Athletic Pro", "Style Plus"],
    accessories: ["Shade Pro", "Time Master", "Leather Goods", "Fashion Plus", "Luxury Brand", "Style Pro"]
  };
  
  const colors = ["black", "white", "gray", "navy", "red", "blue", "green", "brown", "khaki", "olive", "pink", "yellow", "purple", "orange"];
  const sizes = ["S", "M", "L", "XL"];
  
  for (let i = 0; i < count; i++) {
    const productType = productTypes[category][i % productTypes[category].length];
    const brand = brands[category][Math.floor(Math.random() * brands[category].length)];
    const primaryColor = colors[Math.floor(Math.random() * colors.length)];
    const secondaryColor = colors[Math.floor(Math.random() * colors.length)];
    
    products.push({
      title: `${brand} ${primaryColor.charAt(0).toUpperCase() + primaryColor.slice(1)} ${productType}`,
      description: `High-quality ${productType.toLowerCase()} from ${brand} in ${primaryColor} color`,
      category: category,
      subcategory: ["casual", "sports", "formal", "accessories", "outerwear", "bottoms", "dresses"][Math.floor(Math.random() * 7)],
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
  
  return products;
}

async function seedCompleteCategories() {
  try {
    console.log('Complete Category Seeding Started...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Generate and insert products for each category
    const allProducts = [];
    
    Object.keys(productsByCategory).forEach(category => {
      const baseProducts = productsByCategory[category];
      const additionalProducts = generateAdditionalProducts(productsByCategory, category, 97);
      const categoryProducts = [...baseProducts, ...additionalProducts];
      
      allProducts.push(...categoryProducts);
      console.log(`Generated ${categoryProducts.length} ${category} products`);
    });
    
    // Insert all products
    await Product.insertMany(allProducts);
    
    const totalProducts = allProducts.length;
    const categoryCount = Object.keys(productsByCategory).length;
    
    console.log(`Successfully added ${totalProducts} products across ${categoryCount} categories!`);
    console.log(`Average: ${Math.floor(totalProducts / categoryCount)} products per category`);
    
    // Display sample products from each category
    console.log('\nSample products by category:');
    Object.keys(productsByCategory).forEach(category => {
      const categoryProducts = allProducts.filter(p => p.category === category);
      console.log(`\n${category.toUpperCase()}:`);
      categoryProducts.slice(0, 3).forEach((product, i) => {
        console.log(`  ${i+1}. ${product.title} - Rs. ${product.salePrice || product.price}`);
      });
    });
    
  } catch (error) {
    console.error('Error seeding complete categories:', error);
  }
}

// Connect to database and seed
mongoose.connect('mongodb+srv://sapnarai23_db_user:gC3QZMdhEHCzhe2a@ecommerce.w76kwuu.mongodb.net/?appName=ecommerce')
  .then(() => {
    console.log('Connected to database');
    seedCompleteCategories();
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  })
  .finally(() => {
    setTimeout(() => {
      mongoose.connection.close();
    }, 5000);
  });
