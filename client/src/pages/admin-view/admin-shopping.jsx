import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Settings, HomeIcon, Filter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ShoppingHeader from "@/components/shopping-view/header";
import AdminFooter from "@/components/admin-view/footer";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  Truck,
  Shield,
  RefreshCw,
  Star,
  TrendingUp,
  Package,
  HeadphonesIcon,
  SmartphoneIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getFeatureImages } from "@/store/common-slice";

function AdminShoppingView() {
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 5000]
  });
  const [sortBy, setSortBy] = useState("price-lowtohigh");
  const [showFilters, setShowFilters] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("home");

  const { user } = useSelector((state) => state.auth);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandsWithIcon = [
    { id: "stylehub", label: "StyleHub", icon: Shirt },
    { id: "urbanwear", label: "UrbanWear", icon: WashingMachine },
    { id: "fashionline", label: "FashionLine", icon: ShoppingBasket },
    { id: "cozy", label: "Cozy", icon: Airplay },
    { id: "trendygirl", label: "TrendyGirl", icon: Images },
    { id: "joy", label: "Joy", icon: Heater },
  ];

  // Get current category from URL
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    setCurrentCategory(lastPart === 'shopping' ? 'home' : lastPart);
  }, [location.pathname]);

  useEffect(() => {
    if (currentCategory === 'home') {
      dispatch(fetchAllFilteredProducts({
        filterParams: {
          brands: filters.brands,
          categories: filters.categories,
          sizes: filters.sizes,
          colors: filters.colors,
          priceRange: filters.priceRange,
        },
        sortParams: sortBy,
      }));
    } else {
      dispatch(fetchAllFilteredProducts({
        filterParams: {
          brands: filters.brands,
          categories: [currentCategory],
          sizes: filters.sizes,
          colors: filters.colors,
          priceRange: filters.priceRange,
        },
        sortParams: sortBy,
      }));
    }
  }, [dispatch, filters, sortBy, currentCategory]);

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

  function handleAddProduct() {
    navigate('/admin/products');
  }

  function handleEditProduct(productId) {
    navigate('/admin/products', { state: { editProductId: productId } });
  }

  function handleDeleteProduct(productId) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      toast({
        title: "Delete functionality",
        description: "Product ID: " + productId,
      });
    }
  }

  function handleCategoryClick(categoryId) {
    navigate(`/admin/shopping/${categoryId}`);
  }

  function handleBrandClick(brandId) {
    setFilters(prev => ({
      ...prev,
      brands: [brandId]
    }));
  }

  function handleAddProductForCategory(categoryId) {
    navigate('/admin/products', { state: { preselectedCategory: categoryId } });
  }

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Render category-specific content
  const renderCategoryContent = () => {
    switch (currentCategory) {
      case 'mens':
      case 'womens':
      case 'kids':
      case 'footwear':
      case 'accessories':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <div className="w-64 flex-shrink-0">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {showFilters ? "Hide" : "Show"}
                    </Button>
                  </div>
                  
                  {showFilters && (
                    <div className="space-y-6">
                      {/* Categories */}
                      <div>
                        <h3 className="font-medium mb-3">Category</h3>
                        <div className="space-y-2">
                          {categoriesWithIcon.map((category) => (
                            <label key={category.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={filters.categories.includes(category.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFilters(prev => ({
                                      ...prev,
                                      categories: [...prev.categories, category.id]
                                    }));
                                  } else {
                                    setFilters(prev => ({
                                      ...prev,
                                      categories: prev.categories.filter(c => c !== category.id)
                                    }));
                                  }
                                }}
                              />
                              <span className="text-sm capitalize">{category.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div>
                        <h3 className="font-medium mb-3">Price Range</h3>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0"
                            max="5000"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                            }))}
                            className="w-full"
                          />
                          <div className="text-sm text-gray-600">
                            Up to ₹{filters.priceRange[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">
                    {categoriesWithIcon.find(cat => cat.id === currentCategory)?.label} Collection
                  </h1>
                  <Button
                    onClick={() => handleAddProductForCategory(currentCategory)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {categoriesWithIcon.find(cat => cat.id === currentCategory)?.label} Product
                  </Button>
                </div>
                
                {productList && productList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productList.map((productItem) => (
                      <div key={productItem._id} className="relative group">
                        {/* Product Tile - Normal Shopping */}
                        <ShoppingProductTile
                          product={productItem}
                          handleGetProductDetails={handleGetProductDetails}
                          handleAddtoCart={handleAddtoCart}
                        />
                        
                        {/* Admin Overlay - Only Visible to Admin */}
                        {isAdmin && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleEditProduct(productItem._id)}
                                className="bg-white/90 hover:bg-white shadow-lg"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteProduct(productItem._id)}
                                className="bg-red-500/90 hover:bg-red-500 shadow-lg"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found in {categoriesWithIcon.find(cat => cat.id === currentCategory)?.label}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Admin Toggle Bar */}
      <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-yellow-400 text-yellow-900">
            🔐 Admin Mode
          </Badge>
          <span className="text-sm">Logged in as: {user?.userName}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/admin/shopping')}
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            <Settings className="w-4 h-4 mr-2" />
            {showAdminPanel ? 'Hide Admin' : 'Show Admin'}
          </Button>
          
          <Button
            size="sm"
            onClick={handleAddProduct}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Normal Shopping Header */}
      <ShoppingHeader />

      {/* Admin Panel */}
      {showAdminPanel && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <span className="text-red-800 font-medium">🔧 Admin Controls Active</span>
                <span className="text-sm text-red-600">Edit/Delete products on hover</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/admin/products')}
                  className="border-red-300 text-red-600 hover:bg-red-100"
                >
                  Full Admin Panel
                </Button>
              </div>
              
              <div className="text-sm text-red-600">
                Admin Panel: {showAdminPanel ? 'Visible' : 'Hidden'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Shopping Content */}
      <main className="flex-1">
        {currentCategory === 'home' ? (
          /* Home Page Content */
          <div className="flex flex-col min-h-screen">
            {/* Hero Banner Section */}
            <section className="relative w-full h-96 overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out">
                <div
                  className="min-w-full h-full object-cover"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                />
              </div>
              
              {/* Banner Navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))}
                  className="p-3 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors duration-200"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))}
                  className="p-3 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors duration-200"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                </button>
              </div>
            </section>

            {/* Categories Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover our curated collections for every style and occasion
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {categoriesWithIcon.map((category) => (
                    <Card 
                      key={category.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <category.icon className="w-12 h-12 mb-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{category.label}</h3>
                        <p className="text-sm text-gray-600">
                          Explore our {category.label.toLowerCase()} collection
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Handpicked favorites from our latest collection
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {productList && productList.slice(0, 8).map((productItem) => (
                    <div key={productItem._id} className="relative group">
                      {/* Product Tile - Normal Shopping */}
                      <ShoppingProductTile
                        product={productItem}
                        handleGetProductDetails={handleGetProductDetails}
                        handleAddtoCart={handleAddtoCart}
                      />
                      
                      {/* Admin Overlay - Only Visible to Admin */}
                      {isAdmin && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleEditProduct(productItem._id)}
                              className="bg-white/90 hover:bg-white shadow-lg"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProduct(productItem._id)}
                              className="bg-red-500/90 hover:bg-red-500 shadow-lg"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button 
                    onClick={() => navigate('/admin/shopping/listing')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    View All Products
                  </Button>
                </div>
              </div>
            </section>

            {/* Brands Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Brand</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Choose from your favorite trusted brands
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {brandsWithIcon.map((brand) => (
                    <Card 
                      key={brand.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
                      onClick={() => handleBrandClick(brand.id)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <brand.icon className="w-12 h-12 mb-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{brand.label}</h3>
                        <p className="text-sm text-gray-600">
                          Shop {brand.label} products
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* Category-Specific Content */
          renderCategoryContent()
        )}
      </main>

      {/* Admin Footer - No footer for admin section */}
      <AdminFooter />

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default AdminShoppingView;
