const Wishlist = require("../../models/Wishlist");
const Product = require("../../models/Product");

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if item already in wishlist
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Item already in wishlist",
      });
    }

    // Add to wishlist
    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();

    // Populate product details
    const populatedItem = await Wishlist.findById(wishlistItem._id)
      .populate('productId', 'title image price salePrice brand');

    res.status(201).json({
      success: true,
      data: populatedItem,
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding to wishlist",
    });
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await Wishlist.find({ userId })
      .populate('productId', 'title image price salePrice brand averageReview colors sizes')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: wishlistItems,
    });
  } catch (error) {
    console.error("Get wishlist items error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist items",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const result = await Wishlist.findOneAndDelete({ userId, productId });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Item not found in wishlist",
      });
    }

    res.status(200).json({
      success: true,
      productId,
    });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error removing from wishlist",
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
};
