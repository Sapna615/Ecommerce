import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("CheckAuth - Location:", location.pathname, "Authenticated:", isAuthenticated, "User:", user);

  // Allow access to payment success page without strict auth check
  if (location.pathname.includes("/payment-success")) {
    console.log("Allowing access to payment success page");
    return <>{children}</>;
  }

  // If user is not authenticated, redirect to login (except for auth pages)
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/forgot-password") ||
      location.pathname.includes("/reset-password") ||
      location.pathname.includes("/verify-email")
    )
  ) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/auth/login" />;
  }

  // Handle root path - now handled in App.jsx to prevent redirect loops
  // if (location.pathname === "/") {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" />;
  //   } else {
  //     if (user?.role === "admin") {
  //       return <Navigate to="/admin/dashboard" />;
  //     } else {
  //       return <Navigate to="/shop/home" />;
  //     }
  //   }
  // }

  // If authenticated user is on login page, redirect to appropriate dashboard
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    // Don't redirect from register page after successful registration
    if (location.pathname.includes("/register")) {
      return <>{children}</>;
    }
    
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Prevent non-admin users from accessing admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Allow authenticated users to access shop pages
  if (
    isAuthenticated &&
    location.pathname.includes("/shop")
  ) {
    return <>{children}</>;
  }

  // Allow authenticated users to access admin pages
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("admin")
  ) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

export default CheckAuth;
