import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/store/shop/cart-slice";
import ShoppingHeader from "./header";
import AIAssistant from "@/components/common/ai-assistant";

function ShoppingLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Fetch cart items when component mounts and user is available
  useEffect(() => {
    if (user?.id) {
      console.log('ShoppingLayout: Fetching cart items for user:', user.id);
      dispatch(fetchCartItems(user.id));
    } else {
      // For testing purposes, fetch with test user ID
      console.log('ShoppingLayout: Fetching cart items for test user');
      dispatch(fetchCartItems("testuser123"));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <AIAssistant />
    </div>
  );
}

export default ShoppingLayout;
