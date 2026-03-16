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

// Sample enhanced data for better search experience
const featuredCategories = [
  {
    id: "mens",
    name: "Men's Collection",
    image: "https://images.unsplash.com/photo-1521312168218-9c463f5c17f5?w=300&h=200&fit=crop",
    productCount: 245,
    trending: true
  },
  {
    id: "womens",
    name: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1495385794356-15371f317c33?w=300&h=200&fit=crop",
    productCount: 189,
    trending: true
  },
  {
    id: "kids",
    name: "Kids Wear",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6b9343cd?w=300&h=200&fit=crop",
    productCount: 156,
    trending: false
  },
  {
    id: "footwear",
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop",
    productCount: 98,
    trending: false
  }
];

const popularBrands = [
  { name: "Nike", productCount: 89, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop" },
  { name: "Adidas", productCount: 76, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop" },
  { name: "Zara", productCount: 124, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop" },
  { name: "H&M", productCount: 156, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop" }
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
      if (urlKeyword.trim() !== "" && urlKeyword.trim().length > 3) {
        dispatch(getSearchResults(urlKeyword));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
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
    navigate(`/shop/listing?category=${categoryId}`);
  };

  const handleBrandClick = (brandName) => {
    setKeyword(brandName);
    dispatch(getSearchResults(brandName));
  };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      {/* Enhanced Search Header */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Products</h1>
          <p className="text-gray-600">Find exactly what you're looking for from our extensive collection</p>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={keyword}
              name="keyword"
              onChange={(event) => setKeyword(event.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search for products, brands, categories..."
            />
            <Button 
              onClick={() => dispatch(getSearchResults(keyword))}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6"
              disabled={!keyword || keyword.trim().length < 3}
            >
              Search
            </Button>
          </div>
          
          {/* Quick Search Tags */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setKeyword("T-Shirt")}>
              T-Shirt
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setKeyword("Jeans")}>
              Jeans
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setKeyword("Dress")}>
              Dress
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setKeyword("Shoes")}>
              Shoes
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setKeyword("Watch")}>
              Watch
            </Badge>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      {!keyword && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-orange-500" />
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCategoryClick(category.id)}>
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300/200/cccccc/666666?text=${category.name}`;
                    }}
                  />
                  {category.trending && (
                    <Badge className="absolute top-2 right-2 bg-orange-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.productCount} Products</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Popular Brands */}
      {!keyword && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularBrands.map((brand) => (
              <Card key={brand.name} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleBrandClick(brand.name)}>
                <CardContent className="p-4 flex items-center space-x-3">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/100/100/cccccc/666666?text=${brand.name[0]}`;
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{brand.name}</h3>
                    <p className="text-gray-600 text-sm">{brand.productCount} Products</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

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
              
              {/* Sort Dropdown */}
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Sort By</option>
                {searchFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>{filter.name}</option>
                ))}
              </select>
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
