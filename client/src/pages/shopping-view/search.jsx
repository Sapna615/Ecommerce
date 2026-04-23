import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Filter, Grid, List, TrendingUp, Star, Heart, ShoppingCart } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Sample enhanced data for better search experience
const featuredCategories = [
  {
    id: "mens",
    name: "Men Collection",
    image: "https://images.unsplash.com/photo-1521312168218-9c463f5c17f5?w=300&h=200&fit=crop",
    productCount: 20,
    trending: true
  },
  {
    id: "womens",
    name: "Women Collection",
    image: "https://images.unsplash.com/photo-1495385794356-15371f317c33?w=300&h=200&fit=crop",
    productCount: 20,
    trending: true
  },
  {
    id: "kids",
    name: "Kid Collection",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6b9343cd?w=300&h=200&fit=crop",
    productCount: 20,
    trending: false
  },
];

const popularBrands = [
  { name: "StyleHub", productCount: 4, image: "https://images.pexels.com/photos/9558588/pexels-photo-9558588.jpeg" },
  { name: "UrbanWear", productCount: 3, image: "https://images.pexels.com/photos/9558588/pexels-photo-9558588.jpeg" },
  { name: "FashionLine", productCount: 2, image: "https://images.pexels.com/photos/8217291/pexels-photo-8217291.jpeg" },
  { name: "Cozy", productCount: 3, image: "https://images.pexels.com/photos/5483638/pexels-photo-5483638.jpeg" },
  { name: "TrendyGirl", productCount: 2, image: "https://images.pexels.com/photos/8217291/pexels-photo-8217291.jpeg" },
  { name: "Joy", productCount: 2, image: "https://images.pexels.com/photos/32071161/pexels-photo-32071161.jpeg" }
];

const searchFilters = [
  { name: "Price: Low to High", value: "price-lowtohigh" },
  { name: "Price: High to Low", value: "price-hightolow" },
  { name: "Newest First", value: "newest" },
  { name: "Best Rated", value: "rating" },
  { name: "On Sale", value: "sale" }
];

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  useEffect(() => {
    const urlKeyword = searchParams.get('keyword');
    if (urlKeyword) {
      setKeyword(urlKeyword);
      if (urlKeyword.trim() !== "") {
        dispatch(getSearchResults(urlKeyword));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (keyword && keyword.trim() !== "") {
      const timeoutId = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleCategoryClick = (categoryId) => {
    const categoryRoutes = {
      'mens': '/shop/mens',
      'womens': '/shop/womens',
      'kids': '/shop/kids'
    };
    navigate(categoryRoutes[categoryId] || '/shop/home');
  };

  const handleBrandClick = (brandName) => {
    setKeyword(brandName);
    dispatch(getSearchResults(brandName));
  };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <Helmet>
        <title>Search Results | StyleTee Hub | Premium Fashion</title>
        <meta name="description" content="Search for your favorite premium fashion and T-shirts at StyleTee Hub. Find exactly what you need from our extensive collection of men's, women's, and kids' wear." />
      </Helmet>
      {/* Search Header */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Products</h1>
          <p className="text-gray-600">Find exactly what you're looking for from our extensive collection</p>
        </div>
      </div>

      {/* Search Results */}
      {keyword && (
        <div>
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {searchResults.length > 0 ? `${searchResults.length} Results` : "No Results Found"}
              </h2>
              <p className="text-gray-600">for "{keyword}"</p>
            </div>
            
            {/* View and Filter Options */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {searchResults.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {searchResults.map((item) => (
                <ShoppingProductTile
                  key={item.id}
                  handleAddtoCart={handleAddtoCart}
                  product={item}
                  handleGetProductDetails={handleGetProductDetails}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching "{keyword}". Try searching with different keywords or browse our categories.
                </p>
                <Button onClick={() => setKeyword("")} variant="outline">
                  Browse Categories
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
