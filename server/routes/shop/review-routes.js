const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

const {
  addProductReview,
  getProductReviews,
  trackReviewView,
  voteReview,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

// Apply authentication middleware to all review routes
router.use(authMiddleware);

router.post("/add", addProductReview);
router.get("/:productId", getProductReviews);
router.post("/:reviewId/view", trackReviewView);
router.post("/:reviewId/vote", voteReview);

module.exports = router;
