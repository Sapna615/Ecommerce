const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

async function updateProductSubcategories() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Update men's products with proper subcategories based on title/description
    const menProducts = await Product.find({ category: "men" });
    
    for (const product of menProducts) {
      let subcategory = "casual";
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();
      
      if (title.includes("sports") || title.includes("athletic") || title.includes("training") || description.includes("moisture")) {
        subcategory = "sports";
      } else if (title.includes("oversized") || title.includes("baggy") || title.includes("relaxed")) {
        subcategory = "oversized";
      } else if (title.includes("polo") || title.includes("striped") || title.includes("collar")) {
        subcategory = "polo";
      } else if (title.includes("vintage") || title.includes("wash") || title.includes("retro")) {
        subcategory = "casual";
      } else if (title.includes("printed") || title.includes("graphic") || title.includes("floral")) {
        subcategory = "printed";
      }
      
      await Product.findByIdAndUpdate(product._id, { subcategory });
    }

    // Update women's products
    const womenProducts = await Product.find({ category: "women" });
    
    for (const product of womenProducts) {
      let subcategory = "tops";
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();
      
      if (title.includes("dress") || title.includes("floral")) {
        subcategory = "dresses";
      } else if (title.includes("jeans") || title.includes("denim")) {
        subcategory = "jeans";
      } else if (title.includes("leggings") || title.includes("yoga") || title.includes("workout")) {
        subcategory = "activewear";
      } else if (title.includes("blouse") || title.includes("top")) {
        subcategory = "tops";
      } else if (title.includes("coat") || title.includes("winter")) {
        subcategory = "outerwear";
      }
      
      await Product.findByIdAndUpdate(product._id, { subcategory });
    }

    // Update kids' products
    const kidsProducts = await Product.find({ category: "kids" });
    
    for (const product of kidsProducts) {
      let subcategory = "tops";
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();
      
      if (title.includes("dress") || title.includes("party")) {
        subcategory = "dresses";
      } else if (title.includes("shorts") || title.includes("bottom")) {
        subcategory = "bottoms";
      } else if (title.includes("sports") || title.includes("jersey")) {
        subcategory = "sports";
      }
      
      await Product.findByIdAndUpdate(product._id, { subcategory });
    }

    // Update footwear products
    const footwearProducts = await Product.find({ category: "footwear" });
    
    for (const product of footwearProducts) {
      let subcategory = "casual";
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();
      
      if (title.includes("running") || title.includes("sports")) {
        subcategory = "sports";
      } else if (title.includes("oxford") || title.includes("formal")) {
        subcategory = "formal";
      } else if (title.includes("hiking") || title.includes("outdoor")) {
        subcategory = "outdoor";
      }
      
      await Product.findByIdAndUpdate(product._id, { subcategory });
    }

    console.log("All product subcategories updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating product subcategories:", error);
    process.exit(1);
  }
}

updateProductSubcategories();
