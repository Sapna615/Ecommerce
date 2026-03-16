const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Comprehensive product data for each section
const productData = {
  mens: [
    { title: "Classic White T-Shirt", brand: "Essential", price: 899, salePrice: 699, category: "mens", subcategory: "tops" },
    { title: "Navy Blue Polo Shirt", brand: "Premium", price: 1299, salePrice: 999, category: "mens", subcategory: "tops" },
    { title: "Black Denim Jeans", brand: "Urban", price: 1999, salePrice: 1599, category: "mens", subcategory: "bottoms" },
    { title: "Gray Casual Shirt", brand: "Comfort", price: 1499, salePrice: 1199, category: "mens", subcategory: "tops" },
    { title: "Blue Sports Jersey", brand: "Athletic", price: 999, salePrice: 799, category: "mens", subcategory: "sports" },
    { title: "Brown Leather Jacket", brand: "Classic", price: 3999, salePrice: 2999, category: "mens", subcategory: "outerwear" },
    { title: "White Formal Shirt", brand: "Executive", price: 1799, salePrice: 1499, category: "mens", subcategory: "formal" },
    { title: "Black Cargo Pants", brand: "Tactical", price: 2299, salePrice: 1899, category: "mens", subcategory: "bottoms" },
    { title: "Red Hoodie", brand: "Street", price: 1599, salePrice: 1299, category: "mens", subcategory: "casual" },
    { title: "Green Polo Shirt", brand: "Golf", price: 1199, salePrice: 899, category: "mens", subcategory: "tops" },
    { title: "Blue Denim Jacket", brand: "Retro", price: 2499, salePrice: 1999, category: "mens", subcategory: "outerwear" },
    { title: "White Sneakers", brand: "Sport", price: 2999, salePrice: 2499, category: "mens", subcategory: "footwear" },
    { title: "Black Formal Pants", brand: "Business", price: 1899, salePrice: 1599, category: "mens", subcategory: "formal" },
    { title: "Gray Sweatshirt", brand: "Comfort", price: 1399, salePrice: 1099, category: "mens", subcategory: "casual" },
    { title: "Navy Blue Blazer", brand: "Executive", price: 4999, salePrice: 3999, category: "mens", subcategory: "formal" },
    { title: "White Tank Top", brand: "Basic", price: 599, salePrice: 499, category: "mens", subcategory: "tops" },
    { title: "Black Shorts", brand: "Summer", price: 899, salePrice: 699, category: "mens", subcategory: "bottoms" },
    { title: "Red Plaid Shirt", brand: "Casual", price: 1299, salePrice: 999, category: "mens", subcategory: "tops" },
    { title: "Brown Boots", brand: "Outdoor", price: 3499, salePrice: 2999, category: "mens", subcategory: "footwear" },
    { title: "Gray Track Pants", brand: "Sports", price: 1199, salePrice: 899, category: "mens", subcategory: "sports" },
    { title: "White Linen Shirt", brand: "Summer", price: 1699, salePrice: 1399, category: "mens", subcategory: "casual" },
    { title: "Black Belt", brand: "Accessory", price: 799, salePrice: 599, category: "mens", subcategory: "accessories" },
    { title: "Blue Swim Trunks", brand: "Beach", price: 999, salePrice: 799, category: "mens", subcategory: "swim" },
    { title: "Gray Cardigan", brand: "Winter", price: 1999, salePrice: 1599, category: "mens", subcategory: "outerwear" },
    { title: "White Dress Shirt", brand: "Formal", price: 1899, salePrice: 1599, category: "mens", subcategory: "formal" },
    { title: "Black Turtleneck", brand: "Classic", price: 1399, salePrice: 1099, category: "mens", subcategory: "tops" },
    { title: "Navy Blue Chinos", brand: "Casual", price: 1799, salePrice: 1499, category: "mens", subcategory: "bottoms" },
    { title: "Red Windbreaker", brand: "Sports", price: 2299, salePrice: 1899, category: "mens", subcategory: "outerwear" },
    { title: "White Canvas Shoes", brand: "Casual", price: 1999, salePrice: 1599, category: "mens", subcategory: "footwear" },
    { title: "Black Sunglasses", brand: "Accessory", price: 1299, salePrice: 999, category: "mens", subcategory: "accessories" }
  ],
  womens: [
    { title: "Floral Summer Dress", brand: "Elegant", price: 1999, salePrice: 1599, category: "womens", subcategory: "dresses" },
    { title: "Blue Denim Skirt", brand: "Casual", price: 1299, salePrice: 999, category: "womens", subcategory: "bottoms" },
    { title: "White Blouse", brand: "Office", price: 1499, salePrice: 1199, category: "womens", subcategory: "tops" },
    { title: "Black Evening Gown", brand: "Luxury", price: 4999, salePrice: 3999, category: "womens", subcategory: "formal" },
    { title: "Red Tank Top", brand: "Summer", price: 799, salePrice: 599, category: "womens", subcategory: "tops" },
    { title: "Pink Cardigan", brand: "Cozy", price: 1799, salePrice: 1499, category: "womens", subcategory: "outerwear" },
    { title: "Navy Blue Pants", brand: "Business", price: 1899, salePrice: 1599, category: "womens", subcategory: "bottoms" },
    { title: "Yellow Sundress", brand: "Beach", price: 1599, salePrice: 1299, category: "womens", subcategory: "dresses" },
    { title: "Gray Blazer", brand: "Professional", price: 2999, salePrice: 2499, category: "womens", subcategory: "formal" },
    { title: "White T-Shirt", brand: "Basic", price: 699, salePrice: 499, category: "womens", subcategory: "tops" },
    { title: "Black Leggings", brand: "Yoga", price: 999, salePrice: 799, category: "womens", subcategory: "sports" },
    { title: "Green Summer Dress", brand: "Tropical", price: 1799, salePrice: 1499, category: "womens", subcategory: "dresses" },
    { title: "Blue Jeans", brand: "Denim", price: 1799, salePrice: 1499, category: "womens", subcategory: "bottoms" },
    { title: "Red Sweater", brand: "Winter", price: 1999, salePrice: 1599, category: "womens", subcategory: "outerwear" },
    { title: "White Crop Top", brand: "Trendy", price: 899, salePrice: 699, category: "womens", subcategory: "tops" },
    { title: "Black Heels", brand: "Formal", price: 2499, salePrice: 1999, category: "womens", subcategory: "footwear" },
    { title: "Pink Skirt", brand: "Cute", price: 1199, salePrice: 999, category: "womens", subcategory: "bottoms" },
    { title: "Navy Blue Coat", brand: "Winter", price: 3999, salePrice: 3299, category: "womens", subcategory: "outerwear" },
    { title: "Yellow Blouse", brand: "Spring", price: 1399, salePrice: 1099, category: "womens", subcategory: "tops" },
    { title: "White Sneakers", brand: "Casual", price: 1999, salePrice: 1699, category: "womens", subcategory: "footwear" },
    { title: "Red Handbag", brand: "Fashion", price: 2999, salePrice: 2499, category: "womens", subcategory: "accessories" },
    { title: "Blue Jumpsuit", brand: "Modern", price: 2299, salePrice: 1899, category: "womens", subcategory: "dresses" },
    { title: "Gray Tank Top", brand: "Athletic", price: 799, salePrice: 599, category: "womens", subcategory: "sports" },
    { title: "Black Dress", brand: "Classic", price: 2499, salePrice: 1999, category: "womens", subcategory: "dresses" },
    { title: "White Shorts", brand: "Summer", price: 999, salePrice: 799, category: "womens", subcategory: "bottoms" },
    { title: "Pink Hoodie", brand: "Comfort", price: 1599, salePrice: 1299, category: "womens", subcategory: "casual" },
    { title: "Navy Blue Swimsuit", brand: "Beach", price: 1299, salePrice: 999, category: "womens", subcategory: "swim" },
    { title: "Yellow Sandals", brand: "Summer", price: 1499, salePrice: 1199, category: "womens", subcategory: "footwear" },
    { title: "Red Scarf", brand: "Accessory", price: 899, salePrice: 699, category: "womens", subcategory: "accessories" },
    { title: "Green Jacket", brand: "Outdoor", price: 2799, salePrice: 2299, category: "womens", subcategory: "outerwear" }
  ],
  kids: [
    { title: "Kids Cartoon T-Shirt", brand: "Fun", price: 599, salePrice: 499, category: "kids", subcategory: "tops" },
    { title: "Colorful Kids Dress", brand: "Joy", price: 899, salePrice: 699, category: "kids", subcategory: "dresses" },
    { title: "Kids Sports Set", brand: "Active", price: 1299, salePrice: 999, category: "kids", subcategory: "sports" },
    { title: "School Backpack", brand: "Study", price: 999, salePrice: 799, category: "kids", subcategory: "accessories" },
    { title: "Kids Jeans", brand: "Denim", price: 999, salePrice: 799, category: "kids", subcategory: "bottoms" },
    { title: "Cartoon Hoodie", brand: "Fun", price: 999, salePrice: 799, category: "kids", subcategory: "tops" },
    { title: "Kids Sneakers", brand: "Play", price: 1299, salePrice: 999, category: "kids", subcategory: "footwear" },
    { title: "School Uniform", brand: "Study", price: 1499, salePrice: 1199, category: "kids", subcategory: "formal" },
    { title: "Kids Swimwear", brand: "Beach", price: 799, salePrice: 599, category: "kids", subcategory: "swim" },
    { title: "Colorful Shorts", brand: "Summer", price: 599, salePrice: 499, category: "kids", subcategory: "bottoms" },
    { title: "Kids Jacket", brand: "Winter", price: 1299, salePrice: 999, category: "kids", subcategory: "outerwear" },
    { title: "Cartoon Pajamas", brand: "Sleep", price: 699, salePrice: 599, category: "kids", subcategory: "sleepwear" },
    { title: "Kids Sandals", brand: "Summer", price: 799, salePrice: 599, category: "kids", subcategory: "footwear" },
    { title: "School Bag", brand: "Study", price: 899, salePrice: 699, category: "kids", subcategory: "accessories" },
    { title: "Kids Cap", brand: "Sun", price: 399, salePrice: 299, category: "kids", subcategory: "accessories" },
    { title: "Colorful T-Shirt", brand: "Rainbow", price: 499, salePrice: 399, category: "kids", subcategory: "tops" },
    { title: "Kids Skirt", brand: "Cute", price: 699, salePrice: 599, category: "kids", subcategory: "bottoms" },
    { title: "Sports Shoes", brand: "Run", price: 999, salePrice: 799, category: "kids", subcategory: "sports" },
    { title: "Kids Sweater", brand: "Cozy", price: 899, salePrice: 699, category: "kids", subcategory: "outerwear" },
    { title: "School Shoes", brand: "Formal", price: 1099, salePrice: 899, category: "kids", subcategory: "formal" },
    { title: "Kids Sunglasses", brand: "Sun", price: 299, salePrice: 199, category: "kids", subcategory: "accessories" },
    { title: "Colorful Dress", brand: "Party", price: 999, salePrice: 799, category: "kids", subcategory: "dresses" },
    { title: "Kids Watch", brand: "Time", price: 699, salePrice: 499, category: "kids", subcategory: "accessories" },
    { title: "Sports Jersey", brand: "Team", price: 799, salePrice: 599, category: "kids", subcategory: "sports" },
    { title: "Kids Boots", brand: "Winter", price: 1199, salePrice: 999, category: "kids", subcategory: "footwear" },
    { title: "School Lunch Box", brand: "Study", price: 499, salePrice: 399, category: "kids", subcategory: "accessories" },
    { title: "Kids Belt", brand: "Utility", price: 399, salePrice: 299, category: "kids", subcategory: "accessories" },
    { title: "Colorful Socks", brand: "Fun", price: 299, salePrice: 199, category: "kids", subcategory: "accessories" },
    { title: "Kids Umbrella", brand: "Rain", price: 599, salePrice: 399, category: "kids", subcategory: "accessories" },
    { title: "Party Dress", brand: "Special", price: 1299, salePrice: 999, category: "kids", subcategory: "dresses" }
  ],
  footwear: [
    { title: "Running Shoes", brand: "Athletic", price: 2999, salePrice: 2499, category: "footwear", subcategory: "sports" },
    { title: "Casual Sneakers", brand: "Comfort", price: 1999, salePrice: 1699, category: "footwear", subcategory: "casual" },
    { title: "Formal Leather Shoes", brand: "Elegant", price: 3499, salePrice: 2999, category: "footwear", subcategory: "formal" },
    { title: "Sports Sandals", brand: "Outdoor", price: 1599, salePrice: 1299, category: "footwear", subcategory: "sports" },
    { title: "Hiking Boots", brand: "Adventure", price: 3999, salePrice: 3299, category: "footwear", subcategory: "outdoor" },
    { title: "Formal Heels", brand: "Elegant", price: 2999, salePrice: 2499, category: "footwear", subcategory: "formal" },
    { title: "Canvas Shoes", brand: "Casual", price: 1499, salePrice: 1199, category: "footwear", subcategory: "casual" },
    { title: "Basketball Shoes", brand: "Sport", price: 3499, salePrice: 2999, category: "footwear", subcategory: "sports" },
    { title: "Loafers", brand: "Comfort", price: 2499, salePrice: 1999, category: "footwear", subcategory: "casual" },
    { title: "Hiking Sandals", brand: "Trail", price: 1999, salePrice: 1699, category: "footwear", subcategory: "outdoor" },
    { title: "Running Flats", brand: "Speed", price: 2499, salePrice: 1999, category: "footwear", subcategory: "sports" },
    { title: "Formal Boots", brand: "Classic", price: 3999, salePrice: 3299, category: "footwear", subcategory: "formal" },
    { title: "Slip-On Shoes", brand: "Easy", price: 1799, salePrice: 1499, category: "footwear", subcategory: "casual" },
    { title: "Trail Shoes", brand: "Mountain", price: 3499, salePrice: 2999, category: "footwear", subcategory: "outdoor" },
    { title: "Dance Shoes", brand: "Studio", price: 2299, salePrice: 1899, category: "footwear", subcategory: "sports" },
    { title: "Oxford Shoes", brand: "Formal", price: 3299, salePrice: 2799, category: "footwear", subcategory: "formal" },
    { title: "Skate Shoes", brand: "Street", price: 1999, salePrice: 1699, category: "footwear", subcategory: "casual" },
    { title: "Climbing Shoes", brand: "Rock", price: 3799, salePrice: 3199, category: "footwear", subcategory: "outdoor" },
    { title: "Training Shoes", brand: "Gym", price: 2799, salePrice: 2299, category: "footwear", subcategory: "sports" },
    { title: "Dress Boots", brand: "Elegant", price: 4299, salePrice: 3599, category: "footwear", subcategory: "formal" },
    { title: "Walking Shoes", brand: "Comfort", price: 2299, salePrice: 1899, category: "footwear", subcategory: "casual" },
    { title: "Camping Sandals", brand: "Outdoor", price: 1799, salePrice: 1499, category: "footwear", subcategory: "outdoor" },
    { title: "Soccer Cleats", brand: "Sport", price: 3299, salePrice: 2799, category: "footwear", subcategory: "sports" },
    { title: "Formal Flats", brand: "Office", price: 2499, salePrice: 1999, category: "footwear", subcategory: "formal" },
    { title: "Beach Sandals", brand: "Summer", price: 999, salePrice: 799, category: "footwear", subcategory: "casual" },
    { title: "Trekking Shoes", brand: "Adventure", price: 3799, salePrice: 3199, category: "footwear", subcategory: "outdoor" },
    { title: "Tennis Shoes", brand: "Court", price: 2999, salePrice: 2499, category: "footwear", subcategory: "sports" },
    { title: "Chelsea Boots", brand: "Classic", price: 3499, salePrice: 2999, category: "footwear", subcategory: "formal" },
    { title: "Boat Shoes", brand: "Nautical", price: 2799, salePrice: 2299, category: "footwear", subcategory: "casual" },
    { title: "Trail Runners", brand: "Mountain", price: 3299, salePrice: 2799, category: "footwear", subcategory: "outdoor" }
  ],
  accessories: [
    { title: "Leather Wallet", brand: "Classic", price: 1299, salePrice: 999, category: "accessories", subcategory: "wallets" },
    { title: "Sunglasses", brand: "Style", price: 1999, salePrice: 1599, category: "accessories", subcategory: "eyewear" },
    { title: "Watch", brand: "Time", price: 3999, salePrice: 3299, category: "accessories", subcategory: "watches" },
    { title: "Backpack", brand: "Travel", price: 2499, salePrice: 1999, category: "accessories", subcategory: "bags" },
    { title: "Belt", brand: "Utility", price: 899, salePrice: 699, category: "accessories", subcategory: "belts" },
    { title: "Phone Case", brand: "Protect", price: 699, salePrice: 499, category: "accessories", subcategory: "tech" },
    { title: "Scarf", brand: "Fashion", price: 999, salePrice: 799, category: "accessories", subcategory: "scarves" },
    { title: "Hat", brand: "Sun", price: 799, salePrice: 599, category: "accessories", subcategory: "headwear" },
    { title: "Gloves", brand: "Winter", price: 699, salePrice: 499, category: "accessories", subcategory: "gloves" },
    { title: "Umbrella", brand: "Rain", price: 899, salePrice: 699, category: "accessories", subcategory: "umbrellas" },
    { title: "Handbag", brand: "Fashion", price: 2999, salePrice: 2499, category: "accessories", subcategory: "bags" },
    { title: "Tie", brand: "Formal", price: 999, salePrice: 799, category: "accessories", subcategory: "ties" },
    { title: "Keychain", brand: "Utility", price: 399, salePrice: 299, category: "accessories", subcategory: "keychains" },
    { title: "Socks", brand: "Comfort", price: 499, salePrice: 399, category: "accessories", subcategory: "socks" },
    { title: "Headphones", brand: "Audio", price: 2999, salePrice: 2499, category: "accessories", subcategory: "tech" },
    { title: "Bracelet", brand: "Jewelry", price: 1999, salePrice: 1599, category: "accessories", subcategory: "jewelry" },
    { title: "Necklace", brand: "Fashion", price: 2499, salePrice: 1999, category: "accessories", subcategory: "jewelry" },
    { title: "Ring", brand: "Elegant", price: 3299, salePrice: 2799, category: "accessories", subcategory: "jewelry" },
    { title: "Earrings", brand: "Style", price: 1799, salePrice: 1499, category: "accessories", subcategory: "jewelry" },
    { title: "Laptop Bag", brand: "Work", price: 1999, salePrice: 1699, category: "accessories", subcategory: "bags" },
    { title: "Travel Pillow", brand: "Comfort", price: 799, salePrice: 599, category: "accessories", subcategory: "travel" },
    { title: "Water Bottle", brand: "Sport", price: 699, salePrice: 499, category: "accessories", subcategory: "sports" },
    { title: "Fitness Tracker", brand: "Health", price: 3499, salePrice: 2999, category: "accessories", subcategory: "tech" },
    { title: "Passport Holder", brand: "Travel", price: 899, salePrice: 699, category: "accessories", subcategory: "travel" },
    { title: "Wallet Chain", brand: "Edgy", price: 599, salePrice: 499, category: "accessories", subcategory: "chains" },
    { title: "Hair Clip", brand: "Beauty", price: 399, salePrice: 299, category: "accessories", subcategory: "hair" },
    { title: "Makeup Bag", brand: "Cosmetic", price: 999, salePrice: 799, category: "accessories", subcategory: "cosmetics" },
    { title: "Shoe Polish Kit", brand: "Care", price: 499, salePrice: 399, category: "accessories", subcategory: "care" },
    { title: "Luggage Tag", brand: "Travel", price: 299, salePrice: 199, category: "accessories", subcategory: "travel" },
    { title: "Power Bank", brand: "Tech", price: 1599, salePrice: 1299, category: "accessories", subcategory: "tech" }
  ]
};

// Helper function to generate random additional data
const generateProductData = (baseProduct) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'navy', 'brown', 'pink', 'purple', 'orange'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const materials = ['cotton', 'polyester', 'wool', 'denim', 'leather', 'silk', 'linen', 'nylon', 'spandex', 'rayon'];
  const fits = ['slim', 'regular', 'relaxed', 'oversized'];
  
  return {
    ...baseProduct,
    description: `High-quality ${baseProduct.title} from ${baseProduct.brand}. Perfect for ${baseProduct.subcategory} use.`,
    image: `https://picsum.photos/seed/${baseProduct.title.replace(/\s+/g, '')}/500/500.jpg`,
    additionalImages: {
      image1: `https://picsum.photos/seed/${baseProduct.title.replace(/\s+/g, '')}1/500/500.jpg`,
      image2: `https://picsum.photos/seed/${baseProduct.title.replace(/\s+/g, '')}2/500/500.jpg`,
      image3: `https://picsum.photos/seed/${baseProduct.title.replace(/\s+/g, '')}3/500/500.jpg`
    },
    totalStock: Math.floor(Math.random() * 50) + 10,
    averageReview: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    colors: colors.slice(0, Math.floor(Math.random() * 5) + 3),
    sizes: sizes.slice(0, Math.floor(Math.random() * 4) + 2),
    material: materials[Math.floor(Math.random() * materials.length)],
    fit: fits[Math.floor(Math.random() * fits.length)],
    features: [
      `Premium ${materials[Math.floor(Math.random() * materials.length)]} material`,
      `Comfortable ${fits[Math.floor(Math.random() * fits.length)]} fit`,
      `Available in multiple colors`,
      `Durable and long-lasting`
    ],
    careInstructions: 'Machine wash cold, Tumble dry low, Do not bleach, Iron on medium heat'
  };
};

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URL);
    
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('Adding new products...');
    const allProducts = [];
    
    // Process each section
    for (const [section, products] of Object.entries(productData)) {
      console.log(`Processing ${section} section...`);
      
      // Take first 30 products from each section
      const sectionProducts = products.slice(0, 30);
      
      for (const product of sectionProducts) {
        const fullProduct = generateProductData(product);
        allProducts.push(fullProduct);
      }
    }
    
    // Insert all products
    const insertedProducts = await Product.insertMany(allProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products`);
    
    // Count products by category
    const counts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    console.log('\nProduct count by category:');
    counts.forEach(count => {
      console.log(`${count._id}: ${count.count} products`);
    });
    
    console.log('\nProduct seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
