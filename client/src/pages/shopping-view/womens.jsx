import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import PriceDisplay from "@/components/ui/price-display";
import { Helmet } from "react-helmet-async";

const womensCategories = [
  { id: "Basic", label: "Basic" },
  { id: "Printed", label: "Printed" },
  { id: "Oversized", label: "Oversized" },
  { id: "Casual", label: "Casual" },
  { id: "Polo", label: "Polo" },
  { id: "Premium", label: "Premium" }
];

const brands = [
  { id: "UrbanChic", label: "UrbanChic" },
  { id: "StyleHub Women", label: "StyleHub Women" },
  { id: "TrendyGirl", label: "TrendyGirl" },
  { id: "FashionLine", label: "FashionLine" },
  { id: "ClassicFit Women", label: "ClassicFit Women" },
  { id: "FitZone Women", label: "FitZone Women" },
  { id: "ElegantWear", label: "ElegantWear" },
  { id: "ModernMuse", label: "ModernMuse" },
  { id: "SoftStyle", label: "SoftStyle" },
  { id: "DailyWear Co", label: "DailyWear Co" },
  { id: "ChicTrend", label: "ChicTrend" },
  { id: "ActiveFit Women", label: "ActiveFit Women" },
  { id: "PremiumAura", label: "PremiumAura" },
  { id: "StreetStyle Women", label: "StreetStyle Women" },
  { id: "ComfortWear", label: "ComfortWear" }
];

// const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
// const colors = ["black", "white", "pink", "blue", "red", "yellow", "gray", "navy", "purple", "brown"];

function WomensShopping() {
  const [filters, setFilters] = useState({
    brands: [],
    sizes: [],
    colors: [],
    categories: [],
    priceRange: [0, 2000]  // Increased to cover all product prices
  });
  const [sortBy, setSortBy] = useState("price-lowtohigh");
  const [showFilters, setShowFilters] = useState(false);
  
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {
          category: ["womens"],
          ...(filters.brands.length > 0 && { brand: filters.brands }),
          ...(filters.categories.length > 0 && { subcategory: filters.categories }),
          ...(filters.sizes && filters.sizes.length > 0 && { sizes: filters.sizes }),
          ...(filters.colors && filters.colors.length > 0 && { colors: filters.colors }),
          ...(filters.priceRange && { minPrice: filters.priceRange[0], maxPrice: filters.priceRange[1] })
        },
        sortParams: sortBy,
      })
    );
  }, [dispatch, filters, sortBy]);

  useEffect(() => {
    if (productList && productList.length > 0) {
      let filtered = [...productList];
      
      if (filters.brands.length > 0) {
        filtered = filtered.filter(product => filters.brands.includes(product.brand));
      }
      
      if (filters.categories.length > 0) {
        filtered = filtered.filter(product => filters.categories.includes(product.subcategory));
      }
      
      if (filters.priceRange) {
        filtered = filtered.filter(product => 
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );
      }
      
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [productList, filters]);

  // Also set filtered products when productList changes but filters are empty
  useEffect(() => {
    if (productList && productList.length > 0 && filters.brands.length === 0 && filters.categories.length === 0 && (!filters.sizes || filters.sizes.length === 0) && (!filters.colors || filters.colors.length === 0)) {
      setFilteredProducts(productList);
    }
  }, [productList]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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

  function handleFilterChange(filterType, value) {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  }

  function clearFilters() {
    setFilters({
      brands: [],
      sizes: [],
      colors: [],
      categories: [],
      priceRange: [0, 2000]  // Updated to match initial state
    });
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      <Helmet>
        <title>Women's Fashion | Trendy Tops & Apparel | StyleTee Hub</title>
        <meta name="description" content="Explore the latest in women's fashion at StyleTee Hub. Shop printed tees, oversized tops, basic essentials, and more. Premium quality, trendy styles!" />
      </Helmet>
      {/* Filters Sidebar */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-500 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-medium">Categories</h4>
              {womensCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => handleFilterChange('categories', category.id)}
                  />
                  <Label htmlFor={category.id} className="text-sm">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Brands */}
            <div className="space-y-3 mt-6">
              <h4 className="font-medium">Brand</h4>
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.id}
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={() => handleFilterChange('brands', brand.id)}
                  />
                  <Label htmlFor={brand.id} className="text-sm">
                    {brand.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div className="space-y-3 mt-6">
              <h4 className="font-medium">Price Range</h4>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]] 
                  }))}
                  className="w-20"
                  min="0"
                />
                <span className="text-sm">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [prev.priceRange[0], parseInt(e.target.value) || 5000] 
                  }))}
                  className="w-20"
                  min="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Women's Fashion</h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="sort" className="text-sm">Sort by:</Label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="price-lowtohigh">Price: Low to High</option>
              <option value="price-hightolow">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product._id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={`StyleTee Hub Women's ${product.subcategory} - ${product.title}`}
                      title={`${product.title} | StyleTee Hub`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                        <p className="text-xs text-gray-500 capitalize">{product.brand}</p>
                        <p className="text-xs text-gray-400">{product.material} • {product.fit}</p>
                      </div>
                      {product.salePrice && (
                        <Badge variant="destructive" className="text-xs">
                          Sale
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {renderStars(product.averageReview)}
                      <span className="text-xs text-gray-500">({product.averageReview})</span>
                    </div>
                    
                    {/* Colors */}
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">Colors:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.colors?.slice(0, 4).map((color) => (
                          <span
                            key={color}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color === 'white' ? '#f3f4f6' : color }}
                            title={color}
                          />
                        ))}
                        {product.colors?.length > 4 && (
                          <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Sizes */}
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">Sizes:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes?.slice(0, 5).map((size) => (
                          <span
                            key={size}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {size}
                          </span>
                        ))}
                        {product.sizes?.length > 5 && (
                          <span className="text-xs text-gray-500">+{product.sizes.length - 5}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PriceDisplay 
                          price={product.price} 
                          salePrice={product.salePrice}
                          className="font-bold text-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleGetProductDetails(product._id)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddtoCart(product._id)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your filters.</p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default WomensShopping;
