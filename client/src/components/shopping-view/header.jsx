import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Heart, Settings } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { fetchWishlistItems } from "@/store/shop/wishlist-slice";
import { Label } from "../ui/label";
import SearchComponent from "./search-component";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col w-full mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-base font-semibold cursor-pointer text-foreground hover:text-primary transition-colors block w-full lg:w-auto"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Debug: Log when cart sheet opens/closes
  useEffect(() => {
    console.log('Cart sheet state changed:', openCartSheet);
  }, [openCartSheet]);

  function handleLogout() {
    // Clear session storage
    sessionStorage.removeItem('paymentSuccess');
    sessionStorage.removeItem('orderId');
    
    // Dispatch logout action and redirect
    dispatch(logoutUser()).then(() => {
      navigate("/auth/login");
    });
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
    dispatch(fetchWishlistItems(user?.id));
  }, [dispatch, user?.id]);

  // Calculate total quantity of all items in cart
  const getTotalCartQuantity = () => {
    if (!cartItems?.items || cartItems.items.length === 0) {
      return 0;
    }
    return cartItems.items.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const totalQuantity = getTotalCartQuantity();

  console.log(cartItems, "sangam");
  console.log('Cart items length:', cartItems?.items?.length || 0);
  console.log('Cart items data:', cartItems?.items || []);
  console.log('Total cart quantity:', totalQuantity);

  return (
    <div className="flex items-center flex-row gap-2 lg:gap-4">
      {/* Wishlist Button */}
      <Button
        onClick={() => navigate("/shop/wishlist")}
        variant="outline"
        size="icon"
        className="relative h-10 w-10"
      >
        <Heart className="w-5 h-5" />
        {wishlistItems?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
            {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
          </span>
        )}
        <span className="sr-only">Wishlist</span>
      </Button>

      {/* Cart Button */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => {
            console.log('Cart button clicked, opening cart sheet');
            setOpenCartSheet(true);
          }}
          variant="outline"
          size="icon"
          className="relative h-10 w-10"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
              {totalQuantity > 99 ? '99+' : totalQuantity}
            </span>
          )}
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
        
        {/* Debug: Show what's being passed to cart wrapper */}
        {console.log('Header passing to cart wrapper:', {
          cartItems: cartItems,
          items: cartItems?.items || [],
          itemsLength: cartItems?.items?.length || 0
        })}
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user?.role === 'admin' && (
            <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
              <Settings className="mr-2 h-4 w-4" />
              Admin Dashboard
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs overflow-y-auto">
              <div className="mb-6 mt-4">
                <SearchComponent />
              </div>
              <div className="mt-6 flex flex-col w-full text-left">
                <MenuItems />
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/shop/home" className="flex items-center gap-2">
            <HousePlug className="h-6 w-6" />
            <span className="font-bold hidden md:inline-block">Ecommerce</span>
          </Link>
        </div>
        
        {/* Search Component - Desktop Only */}
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <SearchComponent />
        </div>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div>
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
