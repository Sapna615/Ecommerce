const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

async function updateOldProductsWithDetails() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Update existing men's products with colors and sizes
    const menUpdateResult = await Product.updateMany(
      { category: "men", colors: null, sizes: null },
      {
        $set: {
          colors: ["white", "black", "gray", "navy", "red", "blue", "green", "brown", "olive", "pink", "yellow"],
          sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
          material: "Cotton Blend",
          fit: "Regular Fit"
        }
      }
    );

    console.log(`Updated ${menUpdateResult.modifiedCount} men's products with colors and sizes`);

    // Update women's products
    const womenUpdateResult = await Product.updateMany(
      { category: "women", colors: null, sizes: null },
      {
        $set: {
          colors: ["white", "black", "pink", "blue", "red", "yellow", "gray", "navy", "purple", "brown"],
          sizes: ["XS", "S", "M", "L", "XL"],
          material: "Cotton Blend",
          fit: "Regular Fit"
        }
      }
    );

    console.log(`Updated ${womenUpdateResult.modifiedCount} women's products with colors and sizes`);

    // Update kids' products
    const kidsUpdateResult = await Product.updateMany(
      { category: "kids", colors: null, sizes: null },
      {
        $set: {
          colors: ["red", "blue", "green", "yellow", "pink", "purple", "white", "black", "gray"],
          sizes: ["2T", "3T", "4T", "5T", "6T", "7T", "8T", "XS", "S", "M", "L", "XL"],
          material: "Cotton Blend",
          fit: "Regular Fit"
        }
      }
    );

    console.log(`Updated ${kidsUpdateResult.modifiedCount} kids' products with colors and sizes`);

    // Update footwear products
    const footwearUpdateResult = await Product.updateMany(
      { category: "footwear", colors: null, sizes: null },
      {
        $set: {
          colors: ["black", "white", "brown", "blue", "red", "gray", "green", "tan"],
          sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
          material: "Leather & Rubber",
          fit: "Regular Fit"
        }
      }
    );

    console.log(`Updated ${footwearUpdateResult.modifiedCount} footwear products with colors and sizes`);

    // Update accessories products
    const accessoriesUpdateResult = await Product.updateMany(
      { category: "accessories", colors: null, sizes: null },
      {
        $set: {
          colors: ["black", "brown", "white", "silver", "gold", "blue", "red", "tan", "tortoise"],
          sizes: ["One Size", "S", "M", "L", "XL"],
          material: "Mixed Materials",
          fit: "Standard"
        }
      }
    );

    console.log(`Updated ${accessoriesUpdateResult.modifiedCount} accessories products with colors and sizes`);

    console.log("All products updated with colors and sizes successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating products:", error);
    process.exit(1);
  }
}

updateOldProductsWithDetails();
