const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    subcategory: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    colors: [String],
    sizes: [String],
    material: String,
    fit: String,
    additionalImages: {
      type: Map,
      of: String
    },
    features: [String],
    careInstructions: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
