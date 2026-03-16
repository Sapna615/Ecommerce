require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL).then(async () => {
  console.log('✅ Connected to database:', mongoose.connection.name);
  
  const Product = require('./models/Product');
  
  // Clear existing products
  await Product.deleteMany({});
  console.log('🗑️ Cleared existing products');
  
  // Comprehensive product data with all details
  const products = [
    // MEN'S SECTION
    {
      title: 'Essential Crew Neck T-Shirt',
      description: 'Classic crew neck t-shirt made from 100% cotton for everyday comfort',
      category: 'mens',
      subcategory: 'casual',
      brand: 'Essential',
      price: 899,
      salePrice: 699,
      totalStock: 50,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['white', 'black', 'gray', 'navy', 'red', 'blue', 'green', 'olive', 'burgundy'],
      reviews: [
        { rating: 4, comment: 'Great fit and comfortable', user: 'John D' },
        { rating: 5, comment: 'Perfect for daily wear', user: 'Mike R' }
      ]
    },
    {
      title: 'Athletic Performance Tee',
      description: 'High-performance athletic tee for workouts and sports',
      category: 'mens',
      subcategory: 'sports',
      brand: 'SportPro',
      price: 1299,
      salePrice: 999,
      totalStock: 30,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&auto=format&fit=crop',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'blue', 'red', 'white', 'yellow', 'orange', 'purple', 'teal'],
      reviews: [
        { rating: 5, comment: 'Excellent for workouts', user: 'Athlete123' },
        { rating: 4, comment: 'Good quality fabric', user: 'GymGuy' }
      ]
    },
    {
      title: 'Classic Polo Shirt',
      description: 'Timeless polo shirt perfect for casual and semi-formal occasions',
      category: 'mens',
      subcategory: 'polo',
      brand: 'Classic Wear',
      price: 1599,
      salePrice: 1299,
      totalStock: 40,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e5ccf384e?w=500&auto=format&fit=crop',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['white', 'navy', 'black', 'gray', 'burgundy', 'forest green', 'royal blue', 'khaki'],
      reviews: [
        { rating: 4, comment: 'Classic style', user: 'BusinessMan' },
        { rating: 5, comment: 'Great quality', user: 'OfficeWorker' }
      ]
    },
    {
      title: 'Denim Jeans',
      description: 'Classic fit denim jeans with comfortable stretch fabric',
      category: 'mens',
      subcategory: 'casual',
      brand: 'Denim Co',
      price: 1999,
      salePrice: 1599,
      totalStock: 35,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['blue', 'black', 'gray'],
      reviews: [
        { rating: 5, comment: 'Perfect fit', user: 'JeansLover' },
        { rating: 4, comment: 'Good quality denim', user: 'CasualGuy' }
      ]
    },
    {
      title: 'Casual Button-Up Shirt',
      description: 'Versatile button-up shirt for office and casual wear',
      category: 'mens',
      subcategory: 'casual',
      brand: 'Casual Premium',
      price: 1799,
      salePrice: 1499,
      totalStock: 25,
      averageReview: 4.1,
      image: 'https://images.unsplash.com/photo-1596755094537-f6bc8b8fdb75?w=500&auto=format&fit=crop',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['white', 'blue', 'gray', 'pink'],
      reviews: [
        { rating: 4, comment: 'Good for office', user: 'Professional' },
        { rating: 4, comment: 'Comfortable fit', user: 'OfficeGuy' }
      ]
    },
    
    // WOMEN'S SECTION
    {
      title: 'Floral Summer Dress',
      description: 'Beautiful floral print dress perfect for summer occasions',
      category: 'womens',
      subcategory: 'dresses',
      brand: 'Summer Style',
      price: 1299,
      salePrice: 999,
      totalStock: 30,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1495385798431-1a1b742632f2?w=500&auto=format&fit=crop',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['floral', 'pink', 'blue', 'yellow'],
      reviews: [
        { rating: 5, comment: 'Beautiful dress!', user: 'Fashionista' },
        { rating: 4, comment: 'Perfect for summer', user: 'SummerGirl' }
      ]
    },
    {
      title: 'Elegant Evening Gown',
      description: 'Stunning evening gown for special occasions and events',
      category: 'womens',
      subcategory: 'dresses',
      brand: 'Elegance',
      price: 3999,
      salePrice: 2999,
      totalStock: 15,
      averageReview: 4.7,
      image: 'https://images.unsplash.com/photo-1594633312681-425e7a89438c?w=500&auto=format&fit=crop',
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'red', 'navy', 'gold'],
      reviews: [
        { rating: 5, comment: 'Absolutely stunning!', user: 'PartyGirl' },
        { rating: 5, comment: 'Perfect for events', user: 'ElegantLady' }
      ]
    },
    {
      title: 'Casual Top',
      description: 'Comfortable casual top for everyday wear',
      category: 'womens',
      subcategory: 'tops',
      brand: 'Comfort Zone',
      price: 799,
      salePrice: 599,
      totalStock: 45,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['white', 'black', 'pink', 'blue', 'gray'],
      reviews: [
        { rating: 4, comment: 'Very comfortable', user: 'CasualWearer' },
        { rating: 4, comment: 'Good quality', user: 'DailyUser' }
      ]
    },
    {
      title: 'Yoga Leggings',
      description: 'High-waisted yoga leggings with superior comfort and stretch',
      category: 'womens',
      subcategory: 'sports',
      brand: 'FitWear',
      price: 999,
      salePrice: 799,
      totalStock: 40,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1506629905687-d68ad8e9e3a6?w=500&auto=format&fit=crop',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['black', 'gray', 'blue', 'pink'],
      reviews: [
        { rating: 5, comment: 'Perfect for yoga', user: 'YogaLover' },
        { rating: 5, comment: 'Great quality', user: 'FitnessGirl' }
      ]
    },
    {
      title: 'Stylish Handbag',
      description: 'Fashionable handbag with multiple compartments',
      category: 'womens',
      subcategory: 'accessories',
      brand: 'Chic Style',
      price: 2499,
      salePrice: 1999,
      totalStock: 20,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1584947826277-48e65d5727a5?w=500&auto=format&fit=crop',
      sizes: ['One Size'],
      colors: ['black', 'brown', 'tan', 'red'],
      reviews: [
        { rating: 4, comment: 'Beautiful bag', user: 'BagLover' },
        { rating: 5, comment: 'Great quality', user: 'Fashionista' }
      ]
    },
    
    // KIDS SECTION
    {
      title: 'Kids Cartoon T-Shirt',
      description: 'Fun cartoon-printed t-shirt that kids will love',
      category: 'kids',
      subcategory: 'tops',
      brand: 'Fun Wear',
      price: 499,
      salePrice: 399,
      totalStock: 40,
      averageReview: 4.7,
      image: 'https://images.unsplash.com/photo-1516728778614-1c1a8a0434a5?w=500&auto=format&fit=crop',
      sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y'],
      colors: ['white', 'blue', 'red', 'yellow', 'green'],
      reviews: [
        { rating: 5, comment: 'My kid loves it!', user: 'HappyParent' },
        { rating: 5, comment: 'Great quality', user: 'Mom123' }
      ]
    },
    {
      title: 'Colorful Kids Dress',
      description: 'Bright and colorful dress for young girls',
      category: 'kids',
      subcategory: 'dresses',
      brand: 'Kids Joy',
      price: 699,
      salePrice: 549,
      totalStock: 35,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1515372039744-b8e02a7ae9c5?w=500&auto=format&fit=crop',
      sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
      colors: ['pink', 'yellow', 'blue', 'purple'],
      reviews: [
        { rating: 5, comment: 'Beautiful dress', user: 'ProudMom' },
        { rating: 4, comment: 'Good quality', user: 'Parent123' }
      ]
    },
    {
      title: 'Kids Sports Set',
      description: 'Comfortable sports set for active kids',
      category: 'kids',
      subcategory: 'sports',
      brand: 'Active Kids',
      price: 899,
      salePrice: 699,
      totalStock: 30,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop',
      sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y'],
      colors: ['blue', 'red', 'green', 'black'],
      reviews: [
        { rating: 4, comment: 'Great for sports', user: 'SportsDad' },
        { rating: 4, comment: 'Comfortable', user: 'ActiveMom' }
      ]
    },
    {
      title: 'School Backpack',
      description: 'Durable backpack with multiple compartments for school',
      category: 'kids',
      subcategory: 'accessories',
      brand: 'School Gear',
      price: 799,
      salePrice: 649,
      totalStock: 25,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop',
      sizes: ['One Size'],
      colors: ['blue', 'red', 'black', 'pink'],
      reviews: [
        { rating: 5, comment: 'Perfect for school', user: 'SchoolParent' },
        { rating: 4, comment: 'Good quality', user: 'HappyKid' }
      ]
    },
    
    // FOOTWEAR SECTION
    {
      title: 'Running Shoes',
      description: 'Professional running shoes with advanced cushioning',
      category: 'footwear',
      subcategory: 'sports',
      brand: 'SportPro',
      price: 2999,
      salePrice: 2499,
      totalStock: 25,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['black', 'blue', 'red', 'white'],
      reviews: [
        { rating: 4, comment: 'Great for running', user: 'Runner123' },
        { rating: 4, comment: 'Comfortable', user: 'Athlete' }
      ]
    },
    {
      title: 'Casual Sneakers',
      description: 'Comfortable sneakers for everyday casual wear',
      category: 'footwear',
      subcategory: 'casual',
      brand: 'Comfort Step',
      price: 1999,
      salePrice: 1599,
      totalStock: 40,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1460353581641-37daddc1fd4a?w=500&auto=format&fit=crop',
      sizes: ['6', '7', '8', '9', '10', '11'],
      colors: ['white', 'black', 'gray', 'blue'],
      reviews: [
        { rating: 4, comment: 'Very comfortable', user: 'CasualWalker' },
        { rating: 5, comment: 'Great style', user: 'SneakerHead' }
      ]
    },
    {
      title: 'Formal Leather Shoes',
      description: 'Elegant leather shoes for formal occasions',
      category: 'footwear',
      subcategory: 'formal',
      brand: 'Formal Wear',
      price: 3499,
      salePrice: 2999,
      totalStock: 20,
      averageReview: 4.5,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
      sizes: ['7', '8', '9', '10', '11'],
      colors: ['black', 'brown', 'tan'],
      reviews: [
        { rating: 5, comment: 'Perfect for office', user: 'BusinessMan' },
        { rating: 4, comment: 'Good quality', user: 'Professional' }
      ]
    },
    {
      title: 'Sports Sandals',
      description: 'Comfortable sandals perfect for summer and sports',
      category: 'footwear',
      subcategory: 'casual',
      brand: 'Summer Sport',
      price: 1299,
      salePrice: 999,
      totalStock: 35,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
      sizes: ['6', '7', '8', '9', '10'],
      colors: ['blue', 'black', 'brown', 'gray'],
      reviews: [
        { rating: 4, comment: 'Great for summer', user: 'SummerLover' },
        { rating: 4, comment: 'Comfortable', user: 'BeachGoer' }
      ]
    },
    {
      title: 'Hiking Boots',
      description: 'Durable hiking boots for outdoor adventures',
      category: 'footwear',
      subcategory: 'sports',
      brand: 'Trail Master',
      price: 3999,
      salePrice: 3499,
      totalStock: 15,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['brown', 'black', 'gray'],
      reviews: [
        { rating: 5, comment: 'Perfect for hiking', user: 'Hiker123' },
        { rating: 5, comment: 'Very durable', user: 'OutdoorEnthusiast' }
      ]
    },
    
    // ACCESSORIES SECTION
    {
      title: 'Leather Wallet',
      description: 'Genuine leather wallet with multiple card slots',
      category: 'accessories',
      subcategory: 'wallets',
      brand: 'Leather Co',
      price: 799,
      salePrice: 649,
      totalStock: 60,
      averageReview: 4.6,
      image: 'https://images.unsplash.com/photo-1522768336880-4c7b7c2e5c9b?w=500&auto=format&fit=crop',
      sizes: ['One Size'],
      colors: ['black', 'brown', 'tan'],
      reviews: [
        { rating: 5, comment: 'Excellent quality', user: 'WalletLover' },
        { rating: 4, comment: 'Good value', user: 'PracticalBuyer' }
      ]
    },
    {
      title: 'Sunglasses',
      description: 'Stylish sunglasses with UV protection',
      category: 'accessories',
      subcategory: 'sunglasses',
      brand: 'Shade Pro',
      price: 1299,
      salePrice: 999,
      totalStock: 45,
      averageReview: 4.3,
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop',
      sizes: ['One Size'],
      colors: ['black', 'brown', 'gold', 'silver'],
      reviews: [
        { rating: 4, comment: 'Great style', user: 'FashionGuy' },
        { rating: 4, comment: 'Good UV protection', user: 'SunLover' }
      ]
    },
    {
      title: 'Watch',
      description: 'Elegant wristwatch with precise timekeeping',
      category: 'accessories',
      subcategory: 'watches',
      brand: 'Time Master',
      price: 4999,
      salePrice: 3999,
      totalStock: 20,
      averageReview: 4.7,
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed18ce3424?w=500&auto=format&fit=crop',
      sizes: ['One Size'],
      colors: ['black', 'silver', 'gold', 'rose gold'],
      reviews: [
        { rating: 5, comment: 'Beautiful watch', user: 'WatchCollector' },
        { rating: 5, comment: 'Great quality', user: 'TimeKeeper' }
      ]
    },
    {
      title: 'Backpack',
      description: 'Spacious backpack perfect for work and travel',
      category: 'accessories',
      subcategory: 'bags',
      brand: 'Travel Pro',
      price: 1999,
      salePrice: 1699,
      totalStock: 30,
      averageReview: 4.4,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c613e?w=500&auto=format&fit=crop',
      sizes: ['One Size'],
      colors: ['black', 'gray', 'blue', 'red'],
      reviews: [
        { rating: 4, comment: 'Great backpack', user: 'Traveler' },
        { rating: 4, comment: 'Good quality', user: 'Student' }
      ]
    },
    {
      title: 'Belt',
      description: 'Classic leather belt with adjustable buckle',
      category: 'accessories',
      subcategory: 'belts',
      brand: 'Belt Master',
      price: 599,
      salePrice: 449,
      totalStock: 50,
      averageReview: 4.2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'brown', 'tan'],
      reviews: [
        { rating: 4, comment: 'Good belt', user: 'FormalGuy' },
        { rating: 4, comment: 'Great value', user: 'PracticalBuyer' }
      ]
    }
  ];
  
  await Product.insertMany(products);
  console.log(`✅ Added ${products.length} products with full details`);
  
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
  
  console.log('\n🎉 All products with full details have been successfully added!');
  console.log('🌐 Each product now includes: sizes, colors, reviews, subcategories, and more!');
  
  process.exit(0);
}).catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
