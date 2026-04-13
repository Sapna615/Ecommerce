import { Minus, Plus, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const { productDetails: currentProductDetails } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(cartItem?.color || '');
  const [selectedSize, setSelectedSize] = useState(cartItem?.size || '');

  // Fetch products when component mounts
  useEffect(() => {
    if (!productList || productList.length === 0) {
      dispatch(fetchAllFilteredProducts({}));
    }
  }, [dispatch, productList]);

  // Get product details from productList
  const productDetails = productList?.find(product => product._id === cartItem?.productId);

  // Handle product click to open details
  const handleProductClick = () => {
    console.log('Opening product details for:', cartItem?.productId);
    dispatch(fetchProductDetails(cartItem?.productId));
  };

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    const userId = user?.id;
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please login to update your cart.",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Updating cart item:', { userId, productId: getCartItem?.productId, typeOfAction, currentQuantity: getCartItem?.quantity });
    
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        
        // Check if product exists and has totalStock
        const getTotalStock = getCurrentProductIndex >= 0 && productList[getCurrentProductIndex] 
          ? productList[getCurrentProductIndex].totalStock || 100 
          : 100; // Default to 100 if product not found

        console.log('Product index:', getCurrentProductIndex, 'Total stock:', getTotalStock);

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getTotalStock} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    const newQuantity = typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1;
    
    // Validate quantity
    if (newQuantity < 1) {
      toast({
        title: "Quantity cannot be less than 1",
        variant: "destructive",
      });
      return;
    }
    
    console.log('New quantity:', newQuantity);

    dispatch(
      updateCartQuantity({
        userId: userId,
        productId: getCartItem?.productId,
        quantity: newQuantity,
      })
    ).then((data) => {
      console.log('Update response:', data);
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      } else {
        toast({
          title: "Failed to update cart",
          description: data?.payload?.message || "Please try again",
          variant: "destructive"
        });
      }
    }).catch((error) => {
      console.error('Update error:', error);
      toast({
        title: "Failed to update cart",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    });
  }

  function handleCartItemDelete(getCartItem) {
    const userId = user?.id;
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please login to update your cart.",
        variant: "destructive",
      });
      return;
    }
    
    dispatch(
      deleteCartItem({ userId: userId, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      } else {
        toast({
          title: "Failed to delete item",
          description: "Please try again",
          variant: "destructive"
        });
      }
    });
  }

  const itemPrice = cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;
  const totalPrice = itemPrice * cartItem?.quantity;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image - Clickable */}
          <div className="relative" onClick={handleProductClick}>
            <img
              src={cartItem?.image || productDetails?.image}
              alt={cartItem?.title || productDetails?.title}
              className="w-24 h-24 rounded-lg object-cover hover:opacity-90 transition-opacity"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/96/96/cccccc/666666?text=${(cartItem?.title || 'P')[0]}`;
              }}
            />
            {cartItem?.salePrice > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                {Math.round(((cartItem?.price - cartItem?.salePrice) / cartItem?.price) * 100)}% OFF
              </Badge>
            )}
            {/* Click indicator */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Product Details - Clickable */}
          <div className="flex-1 min-w-0" onClick={handleProductClick}>
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 truncate hover:text-blue-600 transition-colors">
                  {cartItem?.title || productDetails?.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productDetails?.brand || 'Brand'} • {productDetails?.category || 'Category'}
                </p>
                
                {/* Color and Size Selection */}
                <div className="flex items-center gap-3 mt-2">
                  {cartItem?.color && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Color:</span>
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: cartItem.color === 'white' ? '#f5f5f5' : 
                                           cartItem.color === 'black' ? '#000000' :
                                           cartItem.color === 'gray' ? '#6b7280' :
                                           cartItem.color === 'navy' ? '#1e3a8a' :
                                           cartItem.color === 'red' ? '#dc2626' :
                                           cartItem.color === 'blue' ? '#2563eb' :
                                           cartItem.color === 'green' ? '#16a34a' :
                                           cartItem.color === 'brown' ? '#92400e' :
                                           cartItem.color === 'olive' ? '#84cc16' :
                                           cartItem.color === 'pink' ? '#ec4899' :
                                           cartItem.color === 'yellow' ? '#eab308' : cartItem.color
                        }}
                      />
                      <span className="text-xs font-medium capitalize">{cartItem.color}</span>
                    </div>
                  )}
                  {cartItem?.size && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Size:</span>
                      <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">{cartItem.size}</span>
                    </div>
                  )}
                </div>

                {/* Rating */}
                {productDetails?.averageRating && (
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-3 h-3 ${
                            index < Math.floor(productDetails.averageRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({productDetails.averageRating.toFixed(1)})</span>
                  </div>
                )}

                {/* Click to view hint */}
                <p className="text-xs text-blue-600 mt-2 hover:underline">
                  Click to view details
                </p>
              </div>

              {/* Delete Button - Separate click handler */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening product details
                  handleCartItemDelete(cartItem);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Price and Quantity Controls - Separate click handler */}
            <div 
              className="flex justify-between items-center mt-4"
              onClick={(e) => e.stopPropagation()} // Prevent opening product details
            >
              {/* Price */}
              <div className="flex items-center gap-2">
                {cartItem?.salePrice > 0 ? (
                  <>
                    <span className="text-lg font-bold text-red-600">Rs. {cartItem.salePrice.toFixed(2)}</span>
                    <span className="text-sm text-gray-400 line-through">Rs. {cartItem.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">Rs. {cartItem.price.toFixed(2)}</span>
                )}
                <span className="text-xs text-gray-500">× {cartItem?.quantity}</span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 rounded-full"
                  size="icon"
                  disabled={cartItem?.quantity === 1}
                  onClick={() => handleUpdateQuantity(cartItem, "minus")}
                >
                  <Minus className="w-3 h-3" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-semibold w-8 text-center">{cartItem?.quantity}</span>
                <Button
                  variant="outline"
                  className="h-8 w-8 rounded-full"
                  size="icon"
                  onClick={() => handleUpdateQuantity(cartItem, "plus")}
                >
                  <Plus className="w-3 h-3" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t">
              <span className="text-sm text-gray-600">Item Total</span>
              <span className="font-bold text-lg">Rs. {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCartItemsContent;
