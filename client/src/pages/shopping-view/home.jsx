import { Button } from "@/components/ui/button";
// Static t-shirt related banner images
const bannerOne = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1280&h=600&fit=crop&crop=center&q=80";
const bannerTwo = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1280&h=600&fit=crop&crop=center&q=80";
const bannerThree = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1280&h=600&fit=crop&crop=center&q=80";
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
  HomeIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingFooter from "@/components/shopping-view/footer";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
];

const stylesWithIcon = [
  { id: "casual", label: "Casual", icon: ShirtIcon },
  { id: "printed", label: "Printed", icon: ShirtIcon },
  { id: "oversized", label: "Oversized", icon: ShirtIcon },
  { id: "polo", label: "Polo", icon: ShirtIcon },
  { id: "premium", label: "Premium", icon: ShirtIcon },
];

const brandsWithIcon = [
  // Brands section removed to fix blank homepage issue
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Debug logging
  console.log("Current slide:", currentSlide);
  console.log("FeatureImageList:", featureImageList);
  // Simplify slide count to always use 3 banners
  const slideCount = 3;

  // Force initial render with slide 0
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");

    // Special handling for category navigation - go to specific sections
    if (getCurrentItem.id === "men") {
      navigate("/shop/mens");
      return;
    }
    if (getCurrentItem.id === "women") {
      navigate("/shop/womens");
      return;
    }
    if (getCurrentItem.id === "kids") {
      navigate("/shop/kids");
      return;
    }

    // For brands - go to brand-specific page
    if (section === "brand") {
      console.log("Navigating to brand page:", getCurrentItem.id);
      navigate(`/shop/brand?brand=${getCurrentItem.id}`);
      return;
    }

    // Default fallback - go to listing with category filter
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    console.log("Category filter being set:", currentFilter);
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % slideCount;
        console.log("Auto-rotating from", prevSlide, "to", nextSlide);
        return nextSlide;
      });
    }, 15000);

    return () => clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    console.log("Feature images from Redux:", featureImageList);
    console.log("Banner imports:", { bannerOne, bannerTwo, bannerThree });
    // Temporarily comment out to isolate issue
    // dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden bg-gray-200">
        {[
          bannerOne,
          bannerTwo,
          bannerThree
        ].map((slide, index) => (
          <div
            key={`banner-${index}`}
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 10 : 1,
              transition: 'opacity 1s ease-in-out'
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <img
              src={slide}
              alt={`Banner Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log("Banner image failed to load:", slide);
              }}
              onLoad={(e) => {
                console.log("Banner image loaded successfully:", slide, "index:", index, "currentSlide:", currentSlide);
              }}
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                {index === 0 && (
                  <>
                    <h2 className="text-4xl font-bold mb-4">Men's T-Shirts</h2>
                    <p className="text-xl mb-6">Comfort meets style in our latest collection</p>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => handleNavigateToListingPage({ id: "men" }, "category")}
                    >
                      Shop Now
                    </Button>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h2 className="text-4xl font-bold mb-4">Summer Collection</h2>
                    <p className="text-xl mb-6">Stay cool with our breathable cotton tees</p>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => handleNavigateToListingPage({ id: "women" }, "category")}
                    >
                      Explore Women
                    </Button>
                  </>
                )}
                {index === 2 && (
                  <>
                    <h2 className="text-4xl font-bold mb-4">Kids' Favorites</h2>
                    <p className="text-xl mb-6">Fun designs for the little ones</p>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => handleNavigateToListingPage({ id: "kids" }, "category")}
                    >
                      Shop Kids
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const prevSlide = (currentSlide - 1 + slideCount) % slideCount;
            console.log("Previous button clicked, from", currentSlide, "to", prevSlide);
            setCurrentSlide(prevSlide);
          }}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-20"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const nextSlide = (currentSlide + 1) % slideCount;
            console.log("Next button clicked, from", currentSlide, "to", nextSlide);
            setCurrentSlide(nextSlide);
          }}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-20"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Shop by Style Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stylesWithIcon.map((styleItem) => (
              <Card
                // onClick={() => handleNavigateToListingPage(styleItem, "subcategory")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <styleItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{styleItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites from our latest collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.slice(0, 8).map((productItem) => (
              <div key={productItem._id} className="group">
                <ShoppingProductTile
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending / Best Sellers Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Now</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most popular products this week
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.slice(4, 12).map((productItem) => (
              <div key={productItem._id} className="group">
                <ShoppingProductTile
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <Truck className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">On all orders above ₹499</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                <p className="text-gray-600">100% secure transactions</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <RefreshCw className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-gray-600">6-day return policy</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <HeadphonesIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Always here to help</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Offer Banner Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Flat 25% OFF on T-Shirts</h2>
            <p className="text-xl mb-8">Limited time offer - Don't miss out!</p>
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              // onClick={() => handleNavigateToListingPage({ id: "mens" }, "category")}
            >
              Grab Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from happy customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">Rahul Kumar</h3>
                <p className="text-gray-600">"Great quality T-shirts! The fabric is amazing and the fit is perfect. Will definitely order again."</p>
                <p className="text-sm text-gray-500 mt-2">Verified Buyer</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">Priya Sharma</h3>
                <p className="text-gray-600">"Amazing collection of t-shirts! Love the designs and the quality is top-notch. Fast delivery too!"</p>
                <p className="text-sm text-gray-500 mt-2">Verified Buyer</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">Amit Patel</h3>
                <p className="text-gray-600">"Perfect fit and great prices! Found exactly what I was looking for. Highly recommend!"</p>
                <p className="text-sm text-gray-500 mt-2">Verified Buyer</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Get Latest Updates</h2>
            <p className="text-gray-600 mb-8">Get exclusive offers and be the first to know about new arrivals</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 max-w-md"
              />
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      <ShoppingFooter />
    </div>
  );
}

export default ShoppingHome;
