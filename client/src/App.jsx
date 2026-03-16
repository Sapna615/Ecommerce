import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthForgotPassword from "./pages/auth/forgot-password";
import AuthResetPassword from "./pages/auth/reset-password";
import AuthVerifyEmail from "./pages/auth/verify-email";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminShoppingView from "./pages/admin-view/admin-shopping";
import AdminContactMessages from "./pages/admin-view/contact-messages";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingWishlist from "./pages/shopping-view/wishlist";
import MensShopping from "./pages/shopping-view/mens";
import WomensShopping from "./pages/shopping-view/womens";
import KidsShopping from "./pages/shopping-view/kids";
import FootwearShopping from "./pages/shopping-view/footwear";
import AccessoriesShopping from "./pages/shopping-view/accessories";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import ContactUs from "./pages/shopping-view/contact-us";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Only check auth if not already authenticated and user is null
    // This prevents unnecessary auth checks that might log out the user
    if (!isAuthenticated && !user) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, user]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log("App - Auth State:", { isAuthenticated, user, isLoading });

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="forgot-password" element={<AuthForgotPassword />} />
          <Route path="reset-password" element={<AuthResetPassword />} />
          <Route path="verify-email" element={<AuthVerifyEmail />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
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
          <Route path="footwear" element={<FootwearShopping />} />
          <Route path="accessories" element={<AccessoriesShopping />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="wishlist" element={<ShoppingWishlist />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
