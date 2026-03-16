require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL).then(async () => {
  console.log('✅ Connected to database:', mongoose.connection.name);
  
  const Product = require('./models/Product');
  
  // Clear existing products
  await Product.deleteMany({});
  console.log('🗑️ Cleared existing products');
  
  // Comprehensive product data for all categories
  const products = [
    // MEN'S SECTION
    {
      title: 'Essential Crew Neck T-Shirt',
      description: 'Classic crew neck t-shirt made from 100% cotton for everyday comfort',
      category: 'mens',
      brand: 'Essential',
      price: 899,
      salePrice: 699,
      totalStock: 50,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop',
    },
    {
      title: 'Athletic Performance Tee',
      description: 'High-performance athletic tee for workouts and sports',
      category: 'mens',
      brand: 'SportPro',
      price: 1299,
      salePrice: 999,
      totalStock: 30,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&auto=format&fit=crop',
    },
    {
      title: 'Classic Polo Shirt',
      description: 'Timeless polo shirt perfect for casual and semi-formal occasions',
      category: 'mens',
      brand: 'Classic Wear',
      price: 1599,
      salePrice: 1299,
      totalStock: 40,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e5ccf384e?w=500&auto=format&fit=crop',
    },
    {
      title: 'Denim Jeans',
      description: 'Classic fit denim jeans with comfortable stretch fabric',
      category: 'mens',
      brand: 'Denim Co',
      price: 1999,
      salePrice: 1599,
      totalStock: 35,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop',
    },
    {
      title: 'Casual Button-Up Shirt',
      description: 'Versatile button-up shirt for office and casual wear',
      category: 'mens',
      brand: 'Casual Premium',
      price: 1799,
      salePrice: 1499,
      totalStock: 25,
      averageReview: 4.1,
      image: 'https://images.unsplash.com/photo-1596755094537-f6bc8b8fdb75?w=500&auto=format&fit=crop',
    },
    
    // WOMEN'S SECTION
    {
      title: 'Floral Summer Dress',
      description: 'Beautiful floral print dress perfect for summer occasions',
      category: 'womens',
      brand: 'Summer Style',
      price: 1299,
      salePrice: 999,
      totalStock: 30,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1495385798431-1a1b742632f2?w=500&auto=format&fit=crop',
    },
    {
      title: 'Elegant Evening Gown',
      description: 'Stunning evening gown for special occasions and events',
      category: 'womens',
      brand: 'Elegance',
      price: 3999,
      salePrice: 2999,
      totalStock: 15,
      averageReview: 4.7,
      image: 'https://images.unsplash.com/photo-1594633312681-425e7a89438c?w=500&auto=format&fit=crop',
    },
    {
      title: 'Casual Top',
      description: 'Comfortable casual top for everyday wear',
      category: 'womens',
      brand: 'Comfort Zone',
      price: 799,
      salePrice: 599,
      totalStock: 45,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop',
    },
    {
      title: 'Yoga Leggings',
      description: 'High-waisted yoga leggings with superior comfort and stretch',
      category: 'womens',
      brand: 'FitWear',
      price: 999,
      salePrice: 799,
      totalStock: 40,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1506629905687-d68ad8e9e3a6?w=500&auto=format&fit=crop',
    },
    {
      title: 'Stylish Handbag',
      description: 'Fashionable handbag with multiple compartments',
      category: 'womens',
      brand: 'Chic Style',
      price: 2499,
      salePrice: 1999,
      totalStock: 20,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1584947826277-48e65d5727a5?w=500&auto=format&fit=crop',
    },
    
    // KIDS SECTION
    {
      title: 'Kids Cartoon T-Shirt',
      description: 'Fun cartoon-printed t-shirt that kids will love',
      category: 'kids',
      brand: 'Fun Wear',
      price: 499,
      salePrice: 399,
      totalStock: 40,
      averageReview: 4.7,
      image: 'https://images.unsplash.com/photo-1516728778614-1c1a8a0434a5?w=500&auto=format&fit=crop',
    },
    {
      title: 'Colorful Kids Dress',
      description: 'Bright and colorful dress for young girls',
      category: 'kids',
      brand: 'Kids Joy',
      price: 699,
      salePrice: 549,
      totalStock: 35,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1515372039744-b8e02a7ae9c5?w=500&auto=format&fit=crop',
    },
    {
      title: 'Kids Sports Set',
      description: 'Comfortable sports set for active kids',
      category: 'kids',
      brand: 'Active Kids',
      price: 899,
      salePrice: 699,
      totalStock: 30,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop',
    },
    {
      title: 'School Backpack',
      description: 'Durable backpack with multiple compartments for school',
      category: 'kids',
      brand: 'School Gear',
      price: 799,
      salePrice: 649,
      totalStock: 25,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop',
    },
    
    // FOOTWEAR SECTION
    {
      title: 'Running Shoes',
      description: 'Professional running shoes with advanced cushioning',
      category: 'footwear',
      brand: 'SportPro',
      price: 2999,
      salePrice: 2499,
      totalStock: 25,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
    },
    {
      title: 'Casual Sneakers',
      description: 'Comfortable sneakers for everyday casual wear',
      category: 'footwear',
      brand: 'Comfort Step',
      price: 1999,
      salePrice: 1599,
      totalStock: 40,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1460353581641-37daddc1fd4a?w=500&auto=format&fit=crop',
    },
    {
      title: 'Formal Leather Shoes',
      description: 'Elegant leather shoes for formal occasions',
      category: 'footwear',
      brand: 'Formal Wear',
      price: 3499,
      salePrice: 2999,
      totalStock: 20,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
    },
    {
      title: 'Sports Sandals',
      description: 'Comfortable sandals perfect for summer and sports',
      category: 'footwear',
      brand: 'Summer Sport',
      price: 1299,
      salePrice: 999,
      totalStock: 35,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
    },
    {
      title: 'Hiking Boots',
      description: 'Durable hiking boots for outdoor adventures',
      category: 'footwear',
      brand: 'Trail Master',
      price: 3999,
      salePrice: 3499,
      totalStock: 15,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
    },
    
    // ACCESSORIES SECTION
    {
      title: 'Leather Wallet',
      description: 'Genuine leather wallet with multiple card slots',
      category: 'accessories',
      brand: 'Leather Co',
      price: 799,
      salePrice: 649,
      totalStock: 60,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1522768336880-4c7b7c2e5c9b?w=500&auto=format&fit=crop',
    },
    {
      title: 'Sunglasses',
      description: 'Stylish sunglasses with UV protection',
      category: 'accessories',
      brand: 'Shade Pro',
      price: 1299,
      salePrice: 999,
      totalStock: 45,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop',
    },
    {
      title: 'Watch',
      description: 'Elegant wristwatch with precise timekeeping',
      category: 'accessories',
      brand: 'Time Master',
      price: 4999,
      salePrice: 3999,
      totalStock: 20,
      averageReview: 4.7,
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed18ce3424?w=500&auto=format&fit=crop',
    },
    {
      title: 'Backpack',
      description: 'Spacious backpack perfect for work and travel',
      category: 'accessories',
      brand: 'Travel Pro',
      price: 1999,
      salePrice: 1699,
      totalStock: 30,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop',
    },
    {
      title: 'Belt',
      description: 'Classic leather belt with adjustable buckle',
      category: 'accessories',
      brand: 'Belt Master',
      price: 599,
      salePrice: 449,
      totalStock: 50,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
    }
  ];
  
  await Product.insertMany(products);
  console.log(`✅ Added ${products.length} products across all categories`);
  
  const allProducts = await Product.find({});
  console.log(`📊 Total products in database: ${allProducts.length}`);
  
  const categories = {};
  allProducts.forEach(product => {
    categories[product.category] = (categories[product.category] || 0) + 1;
  });
  
  console.log('\n📁 Products by category:');
  Object.entries(categories).forEach(([category, count]) => {
    console.log(`- ${category}: ${count} products`);
  });
  
  console.log('\n🎉 All products have been successfully added to the database!');
  console.log('🌐 You can now view them in the shopping sections.');
  
  process.exit(0);
}).catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
