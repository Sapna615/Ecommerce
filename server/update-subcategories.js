const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

async function updateProductSubcategories() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Update existing men's products with proper subcategories
    const updateResult = await Product.updateMany(
      { category: "men", subcategory: null },
      [
        {
          $set: {
            subcategory: {
              $switch: {
                branches: [
                  {
                    case: { $regex: /classic|white|crew/i },
                    then: "casual"
                  },
                  {
                    case: { $regex: /vintage|wash|retro/i },
                    then: "casual"
                  },
                  {
                    case: { $regex: /henley|button/i },
                    then: "casual"
                  },
                  {
                    case: { $regex: /striped|polo|collar/i },
                    then: "polo"
                  },
                  {
                    case: { $regex: /oversized|baggy|relaxed/i },
                    then: "oversized"
                  },
                  {
                    case: { $regex: /sports|athletic|training/i },
                    then: "sports"
                  },
                  {
                    case: { $regex: /printed|graphic|floral/i },
                    then: "printed"
                  }
                ],
                default: "casual"
              }
            }
          }
        }
      ]
    );

    console.log(`Updated ${updateResult.modifiedCount} men's products with subcategories`);

    // Also update women's products
    const womenUpdateResult = await Product.updateMany(
      { category: "women", subcategory: null },
      [
        {
          $set: {
            subcategory: {
              $switch: {
                branches: [
                  {
                    case: { $regex: /dress|floral/i },
                    then: "dresses"
                  },
                  {
                    case: { $regex: /blouse|top|shirt/i },
                    then: "tops"
                  },
                  {
                    case: { $regex: /jeans|denim/i },
                    then: "jeans"
                  },
                  {
                    case: { $regex: /leggings|yoga|workout/i },
                    then: "activewear"
                  },
                  {
                    case: { $regex: /coat|winter|wool/i },
                    then: "outerwear"
                  }
                ],
                default: "tops"
              }
            }
          }
        }
      ]
    );

    console.log(`Updated ${womenUpdateResult.modifiedCount} women's products with subcategories`);

    // Update kids' products
    const kidsUpdateResult = await Product.updateMany(
      { category: "kids", subcategory: null },
      [
        {
          $set: {
            subcategory: {
              $switch: {
                branches: [
                  {
                    case: { $regex: /t-shirt|top/i },
                    then: "tops"
                  },
                  {
                    case: { $regex: /sports|jersey/i },
                    then: "sports"
                  },
                  {
                    case: { $regex: /shorts|bottom/i },
                    then: "bottoms"
                  },
                  {
                    case: { $regex: /dress|party/i },
                    then: "dresses"
                  }
                ],
                default: "tops"
              }
            }
          }
        }
      ]
    );

    console.log(`Updated ${kidsUpdateResult.modifiedCount} kids' products with subcategories`);

    // Update footwear products
    const footwearUpdateResult = await Product.updateMany(
      { category: "footwear", subcategory: null },
      [
        {
          $set: {
            subcategory: {
              $switch: {
                branches: [
                  {
                    case: { $regex: /running|sports/i },
                    then: "sports"
                  },
                  {
                    case: { $regex: /sneakers|canvas/i },
                    then: "casual"
                  },
                  {
                    case: { $regex: /oxford|formal/i },
                    then: "formal"
                  },
                  {
                    case: { $regex: /hiking|outdoor/i },
                    then: "outdoor"
                  }
                ],
                default: "casual"
              }
            }
          }
        }
      ]
    );

    console.log(`Updated ${footwearUpdateResult.modifiedCount} footwear products with subcategories`);

    console.log("All product subcategories updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating product subcategories:", error);
    process.exit(1);
  }
}

updateProductSubcategories();
