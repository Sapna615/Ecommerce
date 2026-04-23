import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Static t-shirt related banner images
const bannerOne = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1280&h=600&fit=crop&crop=center&q=80";
const bannerTwo = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1280&h=600&fit=crop&crop=center&q=80";
const bannerThree = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1280&h=600&fit=crop&crop=center&q=80";
import { Helmet } from "react-helmet-async";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const cardHoverVariants = {
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

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
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
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
    <div className="flex flex-col min-h-screen bg-slate-50/30">

      <Helmet>
        <title>StyleTee Hub | #1 Online Store for Premium Fashion & T-Shirts</title>
        <meta name="description" content="Welcome to StyleTee Hub - Your ultimate destination for premium quality T-shirts and trendy fashion. Shop men's, women's, and kids' collections today!" />
      </Helmet>
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
              alt={`StyleTee Hub Fashion Banner - ${index === 0 ? "Men's Collection" : index === 1 ? "Summer Trends" : "Kids Favorites"}`}
              title={`StyleTee Hub - Premium Fashion Apparel`}
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
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center text-white px-4"
              >
                {index === 0 && (
                  <>
                    <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Men's T-Shirts</h2>
                    <p className="text-xl mb-8 opacity-90">Comfort meets style in our latest collection</p>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl"
                      onClick={() => handleNavigateToListingPage({ id: "men" }, "category")}
                    >
                      Shop Now
                    </Button>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Summer Collection</h2>
                    <p className="text-xl mb-8 opacity-90">Stay cool with our breathable cotton tees</p>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl"
                      onClick={() => handleNavigateToListingPage({ id: "women" }, "category")}
                    >
                      Explore Women
                    </Button>
                  </>
                )}
                {index === 2 && (
                  <>
                    <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Kids' Favorites</h2>
                    <p className="text-xl mb-8 opacity-90">Fun designs for the little ones</p>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl"
                      onClick={() => handleNavigateToListingPage({ id: "kids" }, "category")}
                    >
                      Shop Kids
                    </Button>
                  </>
                )}
              </motion.div>
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
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center mb-12 tracking-tight text-gray-900"
          >
            Shop by <span className="text-blue-600">Category</span>
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categoriesWithIcon.map((categoryItem) => (
              <motion.div
                key={categoryItem.id}
                variants={itemVariants}
                whileHover="hover"
              >
                <Card
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  className="cursor-pointer border-none shadow-md overflow-hidden relative group h-48 flex items-center justify-center bg-white"
                >
                  <motion.div 
                    variants={cardHoverVariants}
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <CardContent className="flex flex-col items-center justify-center p-6 relative z-10">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="p-4 rounded-2xl bg-blue-50 mb-4 group-hover:bg-blue-100 transition-colors"
                    >
                      <categoryItem.icon className="w-12 h-12 text-blue-600" />
                    </motion.div>
                    <span className="text-xl font-bold text-gray-800">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shop by Style Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center mb-12 tracking-tight text-gray-900"
          >
            Shop by <span className="text-blue-600">Style</span>
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {stylesWithIcon.map((styleItem) => (
              <motion.div
                key={styleItem.id}
                variants={itemVariants}
                whileHover="hover"
              >
                <Card
                  // onClick={() => handleNavigateToListingPage(styleItem, "subcategory")}
                  className="cursor-pointer border-none shadow-sm hover:shadow-md transition-all h-40 flex items-center justify-center bg-gray-50/50"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      className="mb-3 text-blue-600"
                    >
                      <styleItem.icon className="w-10 h-10" />
                    </motion.div>
                    <span className="font-bold text-gray-700">{styleItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Featured <span className="text-blue-600">Products</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Handpicked favorites from our latest collection
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {productList && productList.slice(0, 8).map((productItem) => (
              <motion.div 
                key={productItem._id} 
                variants={itemVariants}
                className="group"
              >
                <ShoppingProductTile
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Trending / Best Sellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Trending <span className="text-blue-600">Now</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Most popular products this week
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {productList && productList.slice(4, 12).map((productItem) => (
              <motion.div 
                key={productItem._id} 
                variants={itemVariants}
                className="group"
              >
                <ShoppingProductTile
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Why Shop With Us Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Why Shop With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We offer the best shopping experience for our customers
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹499", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions", color: "text-green-600", bg: "bg-green-50" },
              { icon: RefreshCw, title: "Easy Returns", desc: "6-day return policy", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: HeadphonesIcon, title: "24/7 Support", desc: "Always here to help", color: "text-orange-600", bg: "bg-orange-50" },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5 }}>
                <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                  <CardContent className="pt-6">
                    <div className={`w-16 h-16 ${feature.bg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Offer Banner Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Flat 25% OFF on T-Shirts</h2>
            <p className="text-2xl mb-10 opacity-90">Limited time offer - Don't miss out on our premium collection!</p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 px-10 py-7 text-xl font-bold rounded-full shadow-2xl transition-all"
                // onClick={() => handleNavigateToListingPage({ id: "mens" }, "category")}
              >
                Grab Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl"
          />
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">What Our <span className="text-blue-600">Customers</span> Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Real reviews from happy customers who love StyleTee Hub
            </p>
          </motion.div>


          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { name: "Rahul Kumar", text: "Great quality T-shirts! The fabric is amazing and the fit is perfect. Will definitely order again.", stars: 5 },
              { name: "Priya Sharma", text: "Amazing collection of t-shirts! Love the designs and the quality is top-notch. Fast delivery too!", stars: 5 },
              { name: "Amit Patel", text: "Perfect fit and great prices! Found exactly what I was looking for. Highly recommend!", stars: 4 },
            ].map((testimonial, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-8 border-none shadow-lg h-full flex flex-col justify-between bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="text-center p-0">
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < testimonial.stars ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-blue-600 font-medium mt-1 uppercase tracking-wider">Verified Buyer</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
