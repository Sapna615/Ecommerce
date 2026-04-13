import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { removeFromWishlist, fetchWishlistItems } from "@/store/shop/wishlist-slice";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

function ShoppingWishlist() {
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlistItems(user.id));
    }
  }, [dispatch, user?.id]);

  function handleAddToCart(wishlistItem) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: wishlistItem.productId._id,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart",
        });
        
        // Optionally remove from wishlist after adding to cart
        dispatch(removeFromWishlist({ 
          userId: user?.id, 
          productId: wishlistItem.productId._id 
        }));
      }
    });
  }

  function handleRemoveFromWishlist(wishlistItem) {
    dispatch(removeFromWishlist({ 
      userId: user?.id, 
      productId: wishlistItem.productId._id 
    })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Product removed from wishlist",
        });
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="w-8 h-8" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {wishlistItems?.filter(item => {
            const price = item.productId?.salePrice > 0 
              ? item.productId.salePrice 
              : item.productId?.price || 0;
            return price > 0;
          })?.length || 0} items
        </span>
      </div>

      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems
            .filter((wishlistItem) => {
              const price = wishlistItem.productId?.salePrice > 0 
                ? wishlistItem.productId.salePrice 
                : wishlistItem.productId?.price || 0;
              return price > 0;
            })
            .map((wishlistItem) => (
            <div key={wishlistItem._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={wishlistItem.productId?.image || '/placeholder.png'}
                  alt={wishlistItem.productId?.title || 'Product'}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.png';
                  }}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => handleRemoveFromWishlist(wishlistItem)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {wishlistItem.productId?.title || 'Product'}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{wishlistItem.productId?.brand || 'Brand'}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  {wishlistItem.productId?.salePrice > 0 ? (
                    <>
                      <span className="text-lg font-bold text-red-600">
                        Rs. {wishlistItem.productId.salePrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        Rs. {wishlistItem.productId.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">
                      Rs. {(wishlistItem.productId?.price || 0).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(wishlistItem)}
                    className="flex-1"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Add items to your wishlist to keep track of products you love
          </p>
          <Button onClick={() => window.history.back()}>
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShoppingWishlist;
