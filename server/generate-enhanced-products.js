const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const generateEnhancedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Product data templates
    const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour", "New Balance", "ASICS", "Skechers", "Vans", "Converse"];
    const categories = ["men", "women", "kids", "footwear", "accessories"];
    const colors = ["Red", "Blue", "Black", "White", "Gray", "Green", "Yellow", "Pink", "Purple", "Orange", "Brown", "Navy"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42", "44"];
    
    const subcategories = {
      men: ["tops", "bottoms", "sports", "outerwear", "formal", "casual"],
      women: ["tops", "bottoms", "sports", "outerwear", "formal", "casual", "swimwear"],
      kids: ["tops", "bottoms", "sports", "outerwear", "casual", "swimwear"],
      footwear: ["sports", "casual", "formal", "outdoor", "athletic"],
      accessories: ["basic", "summer", "outdoor", "accessory", "beach", "winter"]
    };
    
    const productTemplates = {
      men: [
        "Classic T-Shirt", "Polo Shirt", "Henley Shirt", "Casual Shirt", "Dress Shirt",
        "Jeans", "Chinos", "Shorts", "Cargo Pants", "Track Pants",
        "Hoodie", "Sweatshirt", "Jacket", "Blazer", "Suit",
        "Tank Top", "V-Neck Shirt", "Long Sleeve Shirt", "Flannel Shirt", "Denim Shirt"
      ],
      women: [
        "Blouse", "Tank Top", "Camisole", "Tube Top", "Crop Top",
        "Dress", "Maxi Dress", "Mini Dress", "Midi Dress", "Evening Dress",
        "Skirt", "Pencil Skirt", "A-Line Skirt", "Midi Skirt", "Mini Skirt",
        "Jeans", "Leggings", "Yoga Pants", "Palazzo Pants", "Culottes",
        "Top", "Tunic", "Peplum Top", "Off-Shoulder Top", "Cold Shoulder"
      ],
      kids: [
        "Kids T-Shirt", "Kids Polo", "Kids Hoodie", "Kids Jeans", "Kids Shorts",
        "Kids Dress", "Kids Skirt", "Kids Jacket", "Kids Sneakers", "Kids Sandals",
        "School Uniform", "Play Clothes", "Party Wear", "Sports Wear", "Casual Wear",
        "Kids Swimsuit", "Kids Pajamas", "Kids Sweater", "Kids Coat", "Kids Accessories"
      ],
      footwear: [
        "Running Shoes", "Basketball Shoes", "Training Shoes", "Walking Shoes", "Hiking Boots",
        "Sneakers", "Loafers", "Oxford Shoes", "Boat Shoes", "Chelsea Boots",
        "Sandals", "Flip Flops", "Sliders", "Espadrilles", "Wedges",
        "Heels", "Pumps", "Flats", "Mules", "Platform Shoes",
        "Athletic Shoes", "Casual Shoes", "Formal Shoes", "Work Boots", "Safety Shoes"
      ],
      accessories: [
        "Watch", "Sunglasses", "Backpack", "Wallet", "Belt",
        "Hat", "Cap", "Beanie", "Scarf", "Gloves",
        "Phone Case", "Laptop Bag", "Travel Bag", "Gym Bag", "Tote Bag",
        "Jewelry", "Necklace", "Bracelet", "Earrings", "Ring",
        "Socks", "Tie", "Bow Tie", "Pocket Square", "Cufflinks"
      ]
    };

    const allProducts = [];

    // Generate 50 products for each category
    for (const category of categories) {
      const templates = productTemplates[category];
      const categorySubcategories = subcategories[category] || ["casual"];
      
      for (let i = 0; i < 50; i++) {
        const template = templates[i % templates.length];
        const subcategory = categorySubcategories[i % categorySubcategories.length];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const price = Math.floor(Math.random() * 150) + 20; // $20 - $170
        const salePrice = Math.random() > 0.3 ? Math.floor(price * 0.7) : null; // 30% chance of sale
        const stock = Math.floor(Math.random() * 100) + 10;
        
        const product = {
          title: `${brand} ${template} - ${color}`,
          description: `High-quality ${brand} ${template} in ${color}. Perfect for ${subcategory} wear. Made with premium materials for comfort and durability.`,
          category: category,
          subcategory: subcategory, // ✅ Added subcategory
          brand: brand,
          price: price,
          salePrice: salePrice,
          image: `https://picsum.photos/seed/${category}-${subcategory}-${brand}-${i}/400/400.jpg`,
          stock: stock,
          totalStock: stock, // ✅ Added totalStock
          averageReview: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
          reviews: Math.floor(Math.random() * 1000) + 50,
          colors: [color, colors[Math.floor(Math.random() * colors.length)], colors[Math.floor(Math.random() * colors.length)]],
          sizes: [size, sizes[Math.floor(Math.random() * sizes.length)], sizes[Math.floor(Math.random() * sizes.length)]],
        };

        allProducts.push(product);
      }
    }

    // Insert all products
    const result = await Product.insertMany(allProducts);
    console.log(`Successfully created ${result.length} enhanced products`);
    
    // Show breakdown by category
    const breakdown = {};
    result.forEach(product => {
      if (!breakdown[product.category]) {
        breakdown[product.category] = 0;
      }
      breakdown[product.category]++;
    });

    console.log("Products by category:");
    Object.entries(breakdown).forEach(([category, count]) => {
      console.log(`${category}: ${count} products`);
    });

    // Show breakdown by subcategory
    const subcategoryBreakdown = {};
    result.forEach(product => {
      if (!subcategoryBreakdown[product.subcategory]) {
        subcategoryBreakdown[product.subcategory] = 0;
      }
      subcategoryBreakdown[product.subcategory]++;
    });

    console.log("Products by subcategory:");
    Object.entries(subcategoryBreakdown).forEach(([subcategory, count]) => {
      console.log(`${subcategory}: ${count} products`);
    });

    // Show sample products
    console.log("\nSample products:");
    result.slice(0, 5).forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price} - ${product.category} - ${product.subcategory}`);
    });

  } catch (error) {
    console.error("Error generating products:", error);
  }
  
  mongoose.connection.close();
};

generateEnhancedProducts();
