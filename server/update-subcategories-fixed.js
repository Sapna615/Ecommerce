const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

async function updateProductSubcategories() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Get all products
    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);

    let updatedCount = 0;

    // Update each product based on its title
    for (const product of products) {
      let subcategory = "casual"; // default

      const title = product.title.toLowerCase();
      const description = (product.description || "").toLowerCase();
      const combinedText = title + " " + description;

      // Determine subcategory based on keywords
      if (combinedText.includes("polo") || combinedText.includes("collar") || combinedText.includes("striped")) {
        subcategory = "polo";
      } else if (combinedText.includes("oversized") || combinedText.includes("baggy") || combinedText.includes("relaxed")) {
        subcategory = "oversized";
      } else if (combinedText.includes("printed") || combinedText.includes("graphic") || combinedText.includes("floral")) {
        subcategory = "printed";
      } else if (combinedText.includes("sports") || combinedText.includes("athletic") || combinedText.includes("training")) {
        subcategory = "sports";
      } else if (combinedText.includes("premium") || combinedText.includes("luxury") || combinedText.includes("high-quality")) {
        subcategory = "premium";
      }

      // Update the product
      await Product.updateOne(
        { _id: product._id },
        { $set: { subcategory: subcategory } }
      );
      updatedCount++;
    }

    console.log(`Successfully updated ${updatedCount} products with subcategories`);

    // Show sample of updated products
    const sampleProducts = await Product.find({}).limit(10);
    console.log("\nSample of updated products:");
    sampleProducts.forEach(p => {
      console.log(`- ${p.title}: ${p.subcategory}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error updating product subcategories:", error);
    process.exit(1);
  }
}

updateProductSubcategories();
