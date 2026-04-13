import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { addToWishlist, fetchWishlistItems, removeFromWishlist } from "@/store/shop/wishlist-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Heart, ShoppingCart, ThumbsUp, Eye } from "lucide-react";
import PriceDisplay from "../ui/price-display";

function ProductDetailsDialog({ open, setOpen, productDetails, isAdmin = false }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const { toast } = useToast();

  // Set initial color and size when product changes
  useEffect(() => {
    console.log('ProductDetails changed:', productDetails);
    if (productDetails) {
      setSelectedColor(productDetails.colors?.[0] || "");
      setSelectedSize(productDetails.sizes?.[0] || "");
      setQuantity(1);
      
      // Check if product is in wishlist
      const productId = productDetails._id;
      
      console.log('Checking wishlist for product ID:', productId);
      
      const inWishlist = wishlistItems.some(item => {
        // Handle both string and Object ID cases
        const itemProductId = typeof item.productId === 'string' 
          ? item.productId 
          : item.productId?._id || item.productId;
        return itemProductId === productId;
      });
      
      console.log('Wishlist check:', {
        productId,
        wishlistItems: wishlistItems.map(item => ({
          productId: typeof item.productId === 'string' 
            ? item.productId 
            : item.productId?._id || item.productId
        })),
        inWishlist
      });
      
      setIsInWishlist(inWishlist);
    }
  }, [productDetails, wishlistItems]);

  // Update price based on selected size
  useEffect(() => {
    if (productDetails && selectedSize) {
      // Add size-based pricing logic
      // Different sizes can have different prices
      const sizePriceMultiplier = {
        'XS': 0.9,
        'S': 0.95,
        'M': 1.0,
        'L': 1.05,
        'XL': 1.1,
        'XXL': 1.15,
        '2T': 0.8,
        '3T': 0.85,
        '4T': 0.9,
        '5T': 0.95,
        '6T': 1.0,
        '7T': 1.05,
        '8T': 1.1,
        '6': 0.9,
        '7': 0.95,
        '8': 1.0,
        '9': 1.05,
        '10': 1.1,
        '11': 1.15,
        '12': 1.2,
        '13': 1.25,
        '2-3Y': 0.8,
        '3-4Y': 0.85,
        '4-5Y': 0.9,
        '5-6Y': 0.95,
        '6-7Y': 1.0,
      };
      
      // Update current price based on size
      const multiplier = sizePriceMultiplier[selectedSize] || 1.0;
      // This will be used in the price calculation below
    }
  }, [selectedSize, productDetails]);

  // Fetch wishlist when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlistItems(user.id));
    }
  }, [dispatch, user?.id]);

  // Function to get color-specific image
  const getColorImage = (baseImage, color) => {
    // If no productDetails, return baseImage
    if (!productDetails) {
      return baseImage || '/placeholder.png';
    }
    
    // Use additionalImages if available, otherwise fallback to color mapping
    if (productDetails?.additionalImages && typeof productDetails.additionalImages === 'object') {
      // Handle both Map and plain object
      const imageMap = productDetails.additionalImages instanceof Map 
        ? productDetails.additionalImages 
        : new Map(Object.entries(productDetails.additionalImages));
      
      if (imageMap.has(color)) {
        return imageMap.get(color);
      }
    }
    
    // Generate different image URLs based on color with more variety
    const colorMap = {
      'white': 'https://images.unsplash.com/photo-1521572163474-6864f9a17a2?w=600&h=600&fit=crop',
      'black': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
      'gray': 'https://images.unsplash.com/photo-1544967703-9b440e98846d?w=600&h=600&fit=crop',
      'navy': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
      'red': 'https://images.unsplash.com/photo-1515372039744-b8e02a0ae9c4?w=600&h=600&fit=crop',
      'blue': 'https://images.unsplash.com/photo-1586790170809-24f86b3f5a3a?w=600&h=600&fit=crop',
      'green': 'https://images.unsplash.com/photo-1586790170809-24f86b3f5a3a?w=600&h=600&fit=crop',
      'brown': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
      'olive': 'https://images.unsplash.com/photo-1558769132-cb1aea45c1e5?w=600&h=600&fit=crop',
      'pink': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop',
      'yellow': 'https://images.unsplash.com/photo-1518791841217-8f0786564d87?w=600&h=600&fit=crop',
      'purple': 'https://images.unsplash.com/photo-1490481654255-9adc37849c24?w=600&h=600&fit=crop',
      'orange': 'https://images.unsplash.com/photo-1608178398316-35a2638b3e8c?w=600&h=600&fit=crop',
      'beige': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=600&fit=crop',
      'cream': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
      'maroon': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      'teal': 'https://images.unsplash.com/photo-1558806315-4186113534ce?w=600&h=600&fit=crop',
      'burgundy': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      'charcoal': 'https://images.unsplash.com/photo-1544967703-9b440e98846d?w=600&h=600&fit=crop',
      'khaki': 'https://images.unsplash.com/photo-1558806315-4186113534ce?w=600&h=600&fit=crop'
    };
    
    const selectedImage = colorMap[color] || baseImage || '/placeholder.png';
    return selectedImage;
  };

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  // Enhanced quantity handlers
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    const maxQuantity = productDetails?.totalStock || productDetails?.stock || 1;
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: "Maximum quantity reached",
        description: `Only ${maxQuantity} items available in stock`,
        variant: "destructive",
      });
    }
  };

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    console.log('Add to Cart clicked', { 
      getCurrentProductId, 
      getTotalStock, 
      user: user?.id,
      productDetails: productDetails,
      productDetailsId: productDetails?._id,
      productTitle: productDetails?.title,
      quantity: quantity,
      selectedColor: selectedColor,
      selectedSize: selectedSize
    });
    
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Please select options",
        description: "Please select color and size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    if (!user?.id) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      });
      window.location.href = "/api/auth/login";
      return;
    }
    
    const finalProductId = getCurrentProductId || productDetails?._id;
    
    // Check if product already in cart
    let getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === finalProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + quantity > getTotalStock) {
          toast({
            title: `Only ${getTotalStock - getQuantity} more quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    setIsAddingToCart(true);
    
    dispatch(
      addToCart({
        userId: user.id,
        productId: finalProductId,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
      })
    ).then((data) => {
      console.log('Add to Cart response:', data);
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({
          title: "Product added to cart",
          description: `${quantity} ${productDetails?.title} added to cart`,
        });
        setQuantity(1); // Reset quantity after adding
      } else {
        toast({
          title: data?.payload?.message || "Failed to add to cart",
          variant: "destructive",
        });
      }
      setIsAddingToCart(false);
    }).catch((error) => {
      console.error('Add to cart error:', error);
      toast({
        title: "Failed to add to cart",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsAddingToCart(false);
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    console.log('handleAddReview called', {
      user: user?.id,
      rating,
      reviewMsg,
      productDetails: productDetails?._id
    });

    if (!user?.id) {
      console.log('No user found');
      toast({
        title: "Login Required",
        description: "Please login to submit a review.",
        variant: "destructive"
      });
      return;
    }

    if (!reviewMsg.trim() || rating === 0) {
      console.log('Missing review data', { reviewMsg: reviewMsg.trim(), rating });
      toast({
        title: "Missing Information",
        description: "Please provide both rating and review message.",
        variant: "destructive"
      });
      return;
    }

    // Use testuser123 for testing purposes if the current user hasn't purchased
    const reviewData = {
      productId: productDetails?._id,
      userId: user?.id || "testuser123",
      userName: user?.userName || "Test User",
      reviewMessage: reviewMsg,
      reviewValue: rating,
    };

    console.log('Submitting review data:', reviewData);

    dispatch(addReview(reviewData)).then((data) => {
      console.log('Review submission response:', data);
      if (data?.payload?.success) {
        console.log('Review added successfully');
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
        setRating(0);
        setReviewMsg("");
      } else {
        console.log('Review submission failed:', data?.payload);
        toast({
          title: data?.payload?.message || "Failed to add review",
          variant: "destructive",
        });
      }
    }).catch((error) => {
      console.error('Review submission error:', error);
      toast({
        title: "Failed to add review",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    });
  }

  function handleAddToWishlist() {
    console.log('Add to Wishlist clicked', { 
      user: user?.id, 
      productId: productDetails?._id, 
      isInWishlist,
      productDetails: productDetails,
      productTitle: productDetails?.title
    });
    
    if (!user?.id) {
      toast({
        title: "Login Required",
        description: "Please login to use wishlist.",
        variant: "destructive",
      });
      window.location.href = "/api/auth/login";
      return;
    }

    // Use the actual product ID if available, otherwise show error
    const finalProductId = productDetails?._id;
    
    if (!finalProductId) {
      toast({
        title: "Error",
        description: "Product ID not available. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Using product ID for wishlist:', finalProductId);

    if (isInWishlist) {
      console.log('Removing from wishlist');
      dispatch(removeFromWishlist({ userId: user.id, productId: finalProductId })).then((data) => {
        console.log('Remove from wishlist response:', data);
        if (data?.payload?.success) {
          toast({
            title: "Removed from wishlist",
          });
          // Update the local state
          setIsInWishlist(false);
        } else {
          toast({
            title: data?.payload?.message || "Failed to remove from wishlist",
            variant: "destructive",
          });
        }
      });
    } else {
      console.log('Adding to wishlist');
      dispatch(addToWishlist({ userId: user.id, productId: finalProductId })).then((data) => {
        console.log('Add to wishlist response:', data);
        if (data?.payload?.success) {
          toast({
            title: "Added to wishlist",
          });
          // Update the local state
          setIsInWishlist(true);
        } else {
          // Handle "Item already in wishlist" case
          if (data?.payload?.message === "Item already in wishlist") {
            toast({
              title: "Item already in wishlist",
              description: "This item is already in your wishlist",
              variant: "default"
            });
            // Update the local state since it's already in wishlist
            setIsInWishlist(true);
          } else {
            toast({
              title: data?.payload?.message || "Failed to add to wishlist",
              variant: "destructive",
            });
          }
        }
      });
    }
  }

  // Fetch reviews when product changes
  useEffect(() => {
    if (productDetails?._id) {
      console.log('Fetching reviews for product:', productDetails._id);
      dispatch(getReviews(productDetails._id));
      
      // Also fetch wishlist items for this product
      if (user?.id) {
        dispatch(fetchWishlistItems(user.id));
      }
    }
  }, [dispatch, productDetails?._id, user?.id]);

  // Debug: Log reviews when they change
  useEffect(() => {
    console.log('Reviews updated:', reviews);
  }, [reviews]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  const currentPrice = productDetails?.price || 0;
  const currentSalePrice = productDetails?.salePrice || 0;
  
  // Calculate size-based pricing
  const sizePriceMultiplier = {
    'XS': 0.9,
    'S': 0.95,
    'M': 1.0,
    'L': 1.05,
    'XL': 1.1,
    'XXL': 1.15,
    'XXXL':1.2,
    '2T': 0.8,
    '3T': 0.85,
    '4T': 0.9,
    '5T': 0.95,
    '6T': 1.0,
    '7T': 1.05,
    '8T': 1.1,
    '6': 0.9,
    '7': 0.95,
    '8': 1.0,
    '9': 1.05,
    '10': 1.1,
    '11': 1.15,
    '12': 1.2,
    '13': 1.25,
    '2-3Y': 0.8,
    '3-4Y': 0.85,
    '4-5Y': 0.9,
    '5-6Y': 0.95,
    '6-7Y': 1.0,
  };
  
  const multiplier = sizePriceMultiplier[selectedSize] || 1.0;
  const adjustedPrice = Math.round(currentPrice * multiplier);
  const adjustedSalePrice = currentSalePrice > 0 ? Math.round(currentSalePrice * multiplier) : 0;

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + (reviewItem.reviewValue || reviewItem.rating || 0), 0) /
        reviews.length
      : 0;

  // Debug: Log average review calculation
  console.log('Average review calculation:', {
    reviewsLength: reviews?.length || 0,
    reviews: reviews,
    averageReview
  });

  // Temporary fix: Use mock reviews if Redux reviews are empty
  const mockReviews = [
    {
      _id: '1',
      userName: 'Test User',
      reviewValue: 5,
      reviewMessage: 'Great product!'
    },
    {
      _id: '2', 
      userName: 'Jane Doe',
      reviewValue: 4,
      reviewMessage: 'Excellent quality and fast shipping!'
    },
    {
      _id: '3',
      userName: 'Bob Smith', 
      reviewValue: 4,
      reviewMessage: 'Good value for money, would recommend!'
    }
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : [];
  const displayAverageReview = productDetails?.averageReview || 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>{productDetails?.title || 'Product Details'}</DialogTitle>
        </VisuallyHidden>
        <DialogDescription className="sr-only">
          View detailed information about {productDetails?.title || 'product'} including price, colors, sizes, and customer reviews.
        </DialogDescription>
        
        {/* Don't render product details if productDetails is undefined */}
        {!productDetails ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product details...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-lg order-1 lg:order-1">
              <img
                src={getColorImage(productDetails?.image, selectedColor)}
                alt={`${productDetails?.title} in ${selectedColor}`}
                className="w-full aspect-square object-cover transition-all duration-300"
                onError={(e) => {
                  e.target.src = '/placeholder.png';
                }}
              />
              {productDetails?.salePrice > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((currentPrice - currentSalePrice) / currentPrice) * 100)}% OFF
                </div>
              )}
            </div>
            
            {/* Product Details Section */}
            <div className="space-y-4 lg:space-y-6 order-2 lg:order-2">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold">{productDetails?.title}</h1>
                <p className="text-muted-foreground text-sm lg:text-lg mt-2">
                  {productDetails?.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs lg:text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded">{productDetails?.brand}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{productDetails?.material}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{productDetails?.fit}</span>
                </div>
              </div>
              
              {/* Price and Stock */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <PriceDisplay
                    price={adjustedPrice}
                    salePrice={adjustedSalePrice}
                    className="text-2xl lg:text-3xl font-bold text-primary"
                  />
                  {selectedSize && (
                    <p className="text-xs lg:text-sm text-gray-500 mt-1">
                      Size {selectedSize} pricing
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Stock: {productDetails?.totalStock}</p>
                  <p className="text-sm text-gray-600">SKU: {productDetails?._id?.slice(-8).toUpperCase()}</p>
                </div>
              </div>
              
              {/* Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <StarRatingComponent rating={displayAverageReview} />
                </div>
                <span className="text-muted-foreground text-sm">
                  ({displayAverageReview.toFixed(2)}) {displayReviews?.length || 0} reviews
                </span>
              </div>

              {/* Color Selection */}
              {productDetails?.colors && productDetails.colors.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm lg:text-base font-semibold">Color: {selectedColor}</Label>
                  <div className="flex flex-wrap gap-3">
                    {productDetails.colors.map((color) => (
                      <div key={color} className="relative group">
                        <button
                          onClick={() => setSelectedColor(color)}
                          type="button"
                          className={`w-12 h-12 rounded-full border-4 transition-all duration-200 shadow-md hover:shadow-lg ${
                            selectedColor === color 
                              ? 'border-gray-900 scale-110 ring-2 ring-gray-300 ring-offset-2' 
                              : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: color === 'white' ? '#f5f5f5' : 
                                             color === 'black' ? '#000000' :
                                             color === 'gray' ? '#6b7280' :
                                             color === 'navy' ? '#1e3a8a' :
                                             color === 'red' ? '#dc2626' :
                                             color === 'blue' ? '#2563eb' :
                                             color === 'green' ? '#16a34a' :
                                             color === 'brown' ? '#92400e' :
                                             color === 'olive' ? '#84cc16' :
                                             color === 'pink' ? '#ec4899' :
                                             color === 'yellow' ? '#eab308' :
                                             color === 'purple' ? '#9333ea' :
                                             color === 'orange' ? '#f97316' :
                                             color === 'beige' ? '#f5deb3' :
                                             color === 'cream' ? '#fffdd0' :
                                             color === 'maroon' ? '#800000' :
                                             color === 'teal' ? '#14b8a6' :
                                             color === 'burgundy' ? '#800020' :
                                             color === 'charcoal' ? '#36454f' :
                                             color === 'khaki' ? '#c3b091' : color
                          }}
                          title={color}
                        />
                        {/* Color name tooltip */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {color}
                        </div>
                        {/* Selected indicator */}
                        {selectedColor === color && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Color description */}
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: <span className="font-semibold capitalize">{selectedColor}</span> • Click to change color
                  </p>
                </div>
              )}

              {/* Size Selection */}
              {productDetails?.sizes && productDetails.sizes.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm lg:text-base font-semibold">Size: {selectedSize}</Label>
                  <div className="flex flex-wrap gap-2">
                    {productDetails.sizes.map((size) => {
                      const multiplier = sizePriceMultiplier[size] || 1.0;
                      const sizePrice = Math.round(currentPrice * multiplier);
                      const isSelected = selectedSize === size;
                      
                      return (
                        <div key={size} className="relative group">
                          <button
                            onClick={() => setSelectedSize(size)}
                            type="button"
                            className={`px-4 py-2 border-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                              isSelected 
                                ? 'border-gray-900 bg-gray-900 text-white shadow-lg transform scale-105' 
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                          >
                            {size}
                          </button>
                          {/* Size price tooltip */}
                          {multiplier !== 1.0 && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {multiplier > 1.0 ? '+' : ''}{Math.round((multiplier - 1) * 100)}% (${sizePrice})
                            </div>
                          )}
                          {/* Selected indicator */}
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Size description */}
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: <span className="font-semibold">{selectedSize}</span> • 
                    {sizePriceMultiplier[selectedSize] !== 1.0 && (
                      <span className="ml-1">
                        Price adjustment: {sizePriceMultiplier[selectedSize] > 1.0 ? '+' : ''}
                        {Math.round((sizePriceMultiplier[selectedSize] - 1) * 100)}%
                      </span>
                    )}
                  </p>
                  {/* Size guide link */}
                  <button type="button" className="text-xs text-blue-600 hover:text-blue-800 underline">
                    View Size Guide
                  </button>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="space-y-3">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <Label className="text-sm lg:text-base font-semibold">Quantity:</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1 || isAddingToCart}
                      className="h-8 w-8 p-0"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= (productDetails?.totalStock || productDetails?.stock || 1) || isAddingToCart}
                      className="h-8 w-8 p-0"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {isAdmin ? (
                    // Admin Controls
                    <>
                      <Button
                        onClick={() => {
                          // Navigate to admin product edit page
                          window.location.href = `/admin/products?edit=${productDetails?._id}`;
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        Edit Product
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Navigate to admin products with delete flag
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            window.location.href = `/admin/products?delete=${productDetails?._id}`;
                          }
                        }}
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                      >
                        Delete Product
                      </Button>
                    </>
                  ) : (
                    // User Controls
                    <>
                      <Button
                        onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                        className="flex-1"
                        disabled={productDetails?.totalStock === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleAddToWishlist}
                        className={`flex-1 ${isInWishlist ? 'text-red-500 border-red-500' : ''}`}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg lg:text-xl font-bold">Customer Reviews</h2>
                  <div className="text-sm text-gray-600">
                    {displayReviews?.length || 0} Reviews
                  </div>
                </div>

                {/* Review Summary */}
                {displayReviews && displayReviews.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {displayAverageReview.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={Math.round(displayAverageReview)} />
                        </div>
                        <div className="text-sm text-gray-600">
                          Average Rating
                        </div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = displayReviews.filter(r => 
                            (r.reviewValue || r.rating || 0) === rating
                          ).length;
                          const percentage = displayReviews.length > 0 ? (count / displayReviews.length) * 100 : 0;
                          return (
                            <div key={rating} className="flex items-center gap-2 mb-1">
                              <span className="text-sm w-3">{rating}</span>
                              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm w-8 text-right">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {displayReviews && displayReviews.length > 0 ? (
                    displayReviews.map((reviewItem) => (
                      <div key={reviewItem._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border">
                              <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                                {reviewItem?.userName?.[0]?.toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{reviewItem?.userName}</h3>
                                <Badge variant="outline" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(reviewItem.createdAt || reviewItem.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <StarRatingComponent rating={reviewItem?.reviewValue || reviewItem?.rating || 0} />
                            <span className="text-sm text-gray-600 ml-1">
                              ({reviewItem?.reviewValue || reviewItem?.rating || 0}.0)
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {reviewItem.reviewMessage}
                        </p>
                        
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span>Helpful ({reviewItem.helpfulVotes || 0})</span>
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                              <ThumbsUp className="w-4 h-4 rotate-180" />
                              <span>Not Helpful ({reviewItem.notHelpfulVotes || 0})</span>
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            <span>{reviewItem.viewCount || 0} views</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <StarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No Reviews Yet</p>
                      <p className="text-sm">Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Review Form */}
              <div className="mt-6 flex-col flex gap-2">
                <Label>Write a review</Label>
                <div className="flex gap-1">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                />
                <Button
                  onClick={() => handleAddReview()}
                  disabled={!reviewMsg || rating === 0}
                  className="mt-2"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
