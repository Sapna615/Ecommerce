const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    console.log('Review submission received:', req.body);
    
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    // Validate required fields
    if (!productId || !userId || !userName || !reviewMessage || !reviewValue) {
      console.log('Missing required fields:', { productId, userId, userName, reviewMessage, reviewValue });
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // For testing purposes, allow reviews without purchase
    // In production, uncomment the order validation below
    /*
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      // orderStatus: "confirmed" || "delivered",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }
    */

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    console.log('Saving new review:', newReview);
    await newReview.save();
    console.log('Review saved successfully');

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    console.log('Review added successfully');
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    console.log('Error in addProductReview:', e);
    res.status(500).json({
      success: false,
      message: "Error: " + e.message,
    });
  }
};

// Track review view
const trackReviewView = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await ProductReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Only count view if user hasn't viewed before
    if (!review.viewedBy.includes(userId)) {
      review.viewedBy.push(userId);
      review.viewCount += 1;
      await review.save();
    }

    res.status(200).json({
      success: true,
      data: {
        viewCount: review.viewCount,
        hasViewed: true
      }
    });
  } catch (e) {
    console.log('Error in trackReviewView:', e);
    res.status(500).json({
      success: false,
      message: "Error: " + e.message,
    });
  }
};

// Vote on review
const voteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { voteType } = req.body; // 'helpful' or 'notHelpful'
    const userId = req.user.id;

    const review = await ProductReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Remove previous vote if exists
    review.votedHelpful = review.votedHelpful.filter(id => id !== userId);
    review.votedNotHelpful = review.votedNotHelpful.filter(id => id !== userId);

    // Add new vote
    if (voteType === 'helpful') {
      review.votedHelpful.push(userId);
      review.helpfulVotes = review.votedHelpful.length;
    } else if (voteType === 'notHelpful') {
      review.votedNotHelpful.push(userId);
      review.notHelpfulVotes = review.votedNotHelpful.length;
    }

    await review.save();

    res.status(200).json({
      success: true,
      data: {
        helpfulVotes: review.helpfulVotes,
        notHelpfulVotes: review.notHelpfulVotes,
        userVote: voteType
      }
    });
  } catch (e) {
    console.log('Error in voteReview:', e);
    res.status(500).json({
      success: false,
      message: "Error: " + e.message,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getTopReviews = async (req, res) => {
  try {
    // Get up to 6 reviews with 4 or 5 stars, sorted by most recent
    const reviews = await ProductReview.find({ reviewValue: { $gte: 4 } })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("userName reviewMessage reviewValue createdAt");

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error fetching top reviews",
    });
  }
};

module.exports = { 
  addProductReview, 
  getProductReviews, 
  trackReviewView, 
  voteReview,
  getTopReviews
};
