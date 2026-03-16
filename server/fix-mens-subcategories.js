const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

async function fixRemainingSubcategories() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Fix sports subcategory for men's products
    await Product.updateMany(
      { category: "men", subcategory: "sports" },
      { $set: { subcategory: "sports" } }
    );

    // Fix polo subcategory for men's products  
    await Product.updateMany(
      { category: "men", subcategory: "polo" },
      { $set: { subcategory: "polo" } }
    );

    // Fix printed subcategory for men's products
    await Product.updateMany(
      { category: "men", subcategory: "printed" },
      { $set: { subcategory: "printed" } }
    );

    // Fix oversized subcategory for men's products
    await Product.updateMany(
      { category: "men", subcategory: "oversized" },
      { $set: { subcategory: "oversized" } }
    );

    console.log("Fixed men's subcategories successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing subcategories:", error);
    process.exit(1);
  }
}

fixRemainingSubcategories();
