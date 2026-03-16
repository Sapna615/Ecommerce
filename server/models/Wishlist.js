const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    productId: {
      type: String,
      required: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);

// Ensure user can only have one of each product in wishlist
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
