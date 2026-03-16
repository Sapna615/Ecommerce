const mongoose = require("mongoose");
const Product = require("./models/Product");

require("dotenv").config();

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce";

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB:", MONGODB_URL))
  .catch((err) => console.error("MongoDB connection error:", err));

const generateProducts = async () => {
  try {
    // NOTE: We do NOT delete existing products automatically.
    // If you want a reset, manually run: node -e "..." or edit this script.

    // Product data templates
    const brands = [
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Under Armour",
      "New Balance",
      "ASICS",
      "Skechers",
      "Vans",
      "Converse",
    ];

    // IMPORTANT: Must match frontend sections/routes.
    const categories = ["mens", "womens", "kids", "footwear", "accessories"];

    // Keep lowercase to match UI color rendering.
    const colors = [
      "black",
      "white",
      "gray",
      "navy",
      "red",
      "blue",
      "green",
      "brown",
      "olive",
      "pink",
      "yellow",
      "purple",
      "orange",
      "beige",
      "cream",
      "maroon",
      "teal",
      "burgundy",
      "charcoal",
      "khaki",
    ];

    const apparelSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const kidsSizes = ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y"];
    const shoeSizes = ["6", "7", "8", "9", "10", "11", "12"];
    
    const productTemplates = {
      mens: [
        "Classic T-Shirt", "Polo Shirt", "Henley Shirt", "Casual Shirt", "Dress Shirt",
        "Jeans", "Chinos", "Shorts", "Cargo Pants", "Track Pants",
        "Hoodie", "Sweatshirt", "Jacket", "Blazer", "Suit",
        "Tank Top", "V-Neck Shirt", "Long Sleeve Shirt", "Flannel Shirt", "Denim Shirt"
      ],
      womens: [
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

    // Generate 10 products per category (50 total)
    for (const category of categories) {
      const templates = productTemplates[category];
      
      for (let i = 0; i < 10; i++) {
        const template = templates[i % templates.length];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const baseColor = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        const color3 = colors[Math.floor(Math.random() * colors.length)];

        const sizes =
          category === "footwear"
            ? shoeSizes
            : category === "kids"
              ? kidsSizes
              : apparelSizes;

        const pickedSizes = [
          sizes[Math.floor(Math.random() * sizes.length)],
          sizes[Math.floor(Math.random() * sizes.length)],
          sizes[Math.floor(Math.random() * sizes.length)],
        ];

        const price = Math.floor(Math.random() * 150) + 20; // $20 - $170
        const salePrice =
          Math.random() > 0.7 ? Math.floor(price * 0.7) : 0; // 30% chance of sale

        const subcategory =
          category === "footwear"
            ? "footwear"
            : category === "accessories"
              ? "accessories"
              : category === "kids"
                ? "casual"
                : "casual";

        const material =
          category === "footwear"
            ? "leather"
            : category === "accessories"
              ? "polyester"
              : "cotton";

        const fit =
          category === "mens" || category === "womens" ? "regular" : "relaxed";
        
        const product = {
          title: `${brand} ${template} - ${baseColor}`,
          description: `High-quality ${brand} ${template} in ${baseColor}. Comfortable, durable, and perfect for everyday wear.`,
          category: category,
          subcategory,
          brand: brand,
          price: price,
          salePrice,
          image: `https://picsum.photos/seed/${category}-${brand}-${template}-${i}/800/800`,
          totalStock: Math.floor(Math.random() * 80) + 20,
          averageReview: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
          colors: [baseColor, color2, color3],
          sizes: pickedSizes,
          material,
          fit,
          features: ["Premium quality", "Comfort fit", "Easy care"],
          careInstructions: "Machine wash cold. Do not bleach. Tumble dry low.",
        };

        allProducts.push(product);
      }
    }

    // Insert all products
    const result = await Product.insertMany(allProducts);
    console.log(`Successfully created ${result.length} products`);
    
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

    // Show sample products
    console.log("\nSample products:");
    result.slice(0, 5).forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price} - ${product.category}`);
    });

  } catch (error) {
    console.error("Error generating products:", error);
  }
  
  mongoose.connection.close();
};

generateProducts();
