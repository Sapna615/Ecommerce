import { Button } from "@/components/ui/button";
// Use online placeholder images that are guaranteed to work
const bannerOne = "https://picsum.photos/1280/600?random=1";
const bannerTwo = "https://picsum.photos/1280/600?random=2";
const bannerThree = "https://picsum.photos/1280/600?random=3";
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
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
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
  console.log("Slide count:", featureImageList && featureImageList.length > 0 ? featureImageList.length : 3);

  // Force initial render with slide 0
  useEffect(() => {
    setCurrentSlide(0);
  }, [featureImageList]);

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
    if (getCurrentItem.id === "footwear") {
      navigate("/shop/footwear");
      return;
    }
    if (getCurrentItem.id === "accessories") {
      navigate("/shop/accessories");
      return;
    }
    
    // For brands - go to listing with brand filter
    if (section === "brand") {
      const currentFilter = {
        brand: [getCurrentItem.id],
      };
      console.log("Brand filter being set:", currentFilter);
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      navigate(`/shop/listing`);
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

  const slideCount = featureImageList && featureImageList.length > 0 ? featureImageList.length : 3;

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
    dispatch(getFeatureImages());
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
        {/* Debug info */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded text-sm z-20">
          Slide: {currentSlide + 1}/{slideCount}
        </div>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Truck className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free shipping on all orders over $50</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                <p className="text-gray-600">100% secure payment process</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <RefreshCw className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-gray-600">30 days return policy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Limited Time Offer!</h2>
          <p className="text-xl mb-6">Get 20% off on all electronics this week</p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => {
              console.log("Shop Now clicked, navigating to mens category");
              handleNavigateToListingPage({ id: "mens" }, "category");
            }}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Trending Products */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <TrendingUp className="w-8 h-8 mr-2 text-primary" />
            <h2 className="text-3xl font-bold">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.slice(0, 8).map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        </div>
      </section> */}

      

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Package className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-3xl font-bold mb-1">10,000+</h3>
              <p className="text-blue-100">Products</p>
            </div>
            <div>
              <Star className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-3xl font-bold mb-1">50,000+</h3>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div>
              <HomeIcon className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-3xl font-bold mb-1">100+</h3>
              <p className="text-blue-100">Brands</p>
            </div>
            <div>
              <Truck className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-3xl font-bold mb-1">24/7</h3>
              <p className="text-blue-100">Support</p>
            </div>
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
