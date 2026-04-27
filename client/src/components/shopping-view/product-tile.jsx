import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, fetchWishlistItems, removeFromWishlist } from "@/store/shop/wishlist-slice";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeUnsplashUrl } from "@/utils/image-utils";
import PriceDisplay from "../ui/price-display";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlistItems(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    setIsInWishlist(wishlistItems.some(item => item.productId === product?._id));
  }, [wishlistItems, product?._id]);

  function handleAddToWishlist() {
    if (!user?.id) {
      toast({
        title: "Login Required",
        description: "Please login to add items to wishlist",
        variant: "destructive"
      });
      navigate("/auth/login");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist({ userId: user.id, productId: product._id })).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Removed from wishlist",
          });
        }
      });
    } else {
      dispatch(addToWishlist({ userId: user.id, productId: product._id })).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Added to wishlist",
          });
        }
      });
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={optimizeUnsplashUrl(product?.image, { width: 400, height: 300 })}
            alt={`StyleTee Hub ${categoryOptionsMap[product?.category]} - ${product?.title}`}
            title={`${product?.title} | StyleTee Hub`}
            className="w-full h-[300px] object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
          
          {/* Wishlist Heart Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist();
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <PriceDisplay 
              price={product?.price} 
              salePrice={product?.salePrice}
              className="text-lg font-semibold text-primary"
            />
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product?.averageReview?.toFixed(1) || 0}
            </span>
            <span className="text-sm text-gray-400">
              ({product?.reviews?.length || 0})
            </span>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
