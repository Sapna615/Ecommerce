const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

async function fixAllSubcategories() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Fix all subcategories to match frontend expectations
    const updateResult = await Product.updateMany(
      { category: { $in: ["men", "women", "kids", "footwear", "accessories"] } },
      [
        {
          $set: {
            subcategory: {
              $switch: {
                branches: [
                  {
                    case: { $regex: /casual/i },
                    then: "casual"
                  },
                  {
                    case: { $regex: /printed/i },
                    then: "printed"
                  },
                  {
                    case: { $regex: /oversized/i },
                    then: "oversized"
                  },
                  {
                    case: { $regex: /polo/i },
                    then: "polo"
                  },
                  {
                    case: { $regex: /sports/i },
                    then: "sports"
                  },
                  {
                    case: { $regex: /dresses/i },
                    then: "dresses"
                  },
                  {
                    case: { $regex: /tops|blouse/i },
                    then: "tops"
                  },
                  {
                    case: { $regex: /jeans|denim/i },
                    then: "jeans"
                  },
                  {
                    case: { $regex: /activewear|leggings|yoga/i },
                    then: "activewear"
                  },
                  {
                    case: { $regex: /outerwear|coat|winter/i },
                    then: "outerwear"
                  },
                  {
                    case: { $regex: /casual/i },
                    then: "casual"
                  },
                  {
                    case: { $regex: /sports|athletic/i },
                    then: "sports"
                  },
                  {
                    case: { $regex: /formal|oxford/i },
                    then: "formal"
                  },
                  {
                    case: { $regex: /outdoor|hiking/i },
                    then: "outdoor"
                  },
                  {
                    case: { $regex: /casual/i },
                    then: "casual"
                  },
                  {
                    case: { $regex: /watches|timepiece/i },
                    then: "watches"
                  },
                  {
                    case: { $regex: /eyewear|sunglasses/i },
                    then: "eyewear"
                  },
                  {
                    case: { $regex: /bags|backpack/i },
                    then: "bags"
                  },
                  {
                    case: { $regex: /headwear|cap/i },
                    then: "headwear"
                  },
                  {
                    case: { $regex: /belts/i },
                    then: "belts"
                  }
                ],
                default: "casual"
              }
            }
          }
        }
      ]
    );

    console.log(`Updated ${updateResult.modifiedCount} products with correct subcategories`);
    console.log("All subcategories fixed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing subcategories:", error);
    process.exit(1);
  }
}

fixAllSubcategories();
