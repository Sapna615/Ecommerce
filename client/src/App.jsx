import { 
  Navigate, 
  Route, 
  Routes 
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; 
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import CheckAuth from "./components/common/check-auth";
import { LazyMotion, domAnimation } from "framer-motion";

// Lazy imports for Auth
const AuthLayout = lazy(() => import("./components/auth/layout"));
const AuthLogin = lazy(() => import("./pages/auth/login"));
const AuthRegister = lazy(() => import("./pages/auth/register"));
const AuthForgotPassword = lazy(() => import("./pages/auth/forgot-password"));
const AuthResetPassword = lazy(() => import("./pages/auth/reset-password"));
const AuthVerifyEmail = lazy(() => import("./pages/auth/verify-email"));

// Lazy imports for Admin
const AdminLayout = lazy(() => import("./components/admin-view/layout"));
const AdminDashboard = lazy(() => import("./pages/admin-view/dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/products"));
const AdminOrders = lazy(() => import("./pages/admin-view/orders"));
const AdminFeatures = lazy(() => import("./pages/admin-view/features"));
const AdminShoppingView = lazy(() => import("./pages/admin-view/admin-shopping"));
const AdminContactMessages = lazy(() => import("./pages/admin-view/contact-messages"));

// Lazy imports for Shopping
const ShoppingLayout = lazy(() => import("./components/shopping-view/layout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/home"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/listing"));
const ShoppingCheckout = lazy(() => import("./pages/shopping-view/checkout"));
const ShoppingAccount = lazy(() => import("./pages/shopping-view/account"));
const ShoppingWishlist = lazy(() => import("./pages/shopping-view/wishlist"));
const MensShopping = lazy(() => import("./pages/shopping-view/mens"));
const WomensShopping = lazy(() => import("./pages/shopping-view/womens"));
const KidsShopping = lazy(() => import("./pages/shopping-view/kids"));
const PaypalReturnPage = lazy(() => import("./pages/shopping-view/paypal-return"));
const PaymentSuccessPage = lazy(() => import("./pages/shopping-view/payment-success"));
const SearchProducts = lazy(() => import("./pages/shopping-view/search"));
const ContactUs = lazy(() => import("./pages/shopping-view/contact-us"));
const AboutUs = lazy(() => import("./pages/shopping-view/about"));
const ShoppingBlog = lazy(() => import("./pages/shopping-view/blog"));
const BlogDetail = lazy(() => import("./pages/shopping-view/blog-detail"));
const WriteBlog = lazy(() => import("./pages/shopping-view/write-blog"));
const FAQ = lazy(() => import("./pages/shopping-view/faq"));
const ReturnPolicy = lazy(() => import("./pages/shopping-view/returns"));
const ShippingInfo = lazy(() => import("./pages/shopping-view/shipping"));

const NotFound = lazy(() => import("./pages/not-found"));
const UnauthPage = lazy(() => import("./pages/unauth-page"));

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, user]);

  // Google Analytics Page View Tracking
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-GMN1R6YBWE", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <LazyMotion features={domAnimation}>
        <Suspense fallback={<Skeleton className="w-full h-[600px] bg-slate-100" />}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/shop/home" replace />}
            />
            <Route
              path="/auth"
              element={<AuthLayout />}
            >
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
              <Route path="forgot-password" element={<AuthForgotPassword />} />
              <Route path="reset-password" element={<AuthResetPassword />} />
              <Route path="verify-email" element={<AuthVerifyEmail />} />
            </Route>
            <Route
              path="/admin"
              element={<AdminLayout />}
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="contact" element={<AdminContactMessages />} />
              <Route path="features" element={<AdminFeatures />} />
              <Route path="shopping" element={<AdminShoppingView />} />
            </Route>
            <Route
              path="/shop"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingLayout />
                </CheckAuth>
              }
            >
              <Route path="home" element={<ShoppingHome />} />
              <Route path="listing" element={<ShoppingListing />} />
              <Route path="mens" element={<MensShopping />} />
              <Route path="womens" element={<WomensShopping />} />
              <Route path="kids" element={<KidsShopping />} />
              <Route path="checkout" element={<ShoppingCheckout />} />
              <Route path="account" element={<ShoppingAccount />} />
              <Route path="wishlist" element={<ShoppingWishlist />} />
              <Route path="paypal-return" element={<PaypalReturnPage />} />
              <Route path="payment-success" element={<PaymentSuccessPage />} />
              <Route path="search" element={<SearchProducts />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="blog" element={<ShoppingBlog />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="write-blog" element={<WriteBlog />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="returns" element={<ReturnPolicy />} />
              <Route path="shipping" element={<ShippingInfo />} />
            </Route>
            <Route path="/unauth-page" element={<UnauthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LazyMotion>
    </div>
  );
}

export default App;
