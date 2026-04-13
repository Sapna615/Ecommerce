const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
    // Tracking fields
    viewCount: { type: Number, default: 0 },
    helpfulVotes: { type: Number, default: 0 },
    notHelpfulVotes: { type: Number, default: 0 },
    // Track who has viewed this review
    viewedBy: [{ type: String }],
    // Track who has voted
    votedHelpful: [{ type: String }],
    votedNotHelpful: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductReview", ProductReviewSchema);
