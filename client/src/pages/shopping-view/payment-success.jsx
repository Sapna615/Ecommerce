import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    console.log("Payment Success Page - Component mounted");
    
    // Get order ID from URL parameters
    const orderIdParam = searchParams.get('orderId');
    if (orderIdParam) {
      setOrderId(orderIdParam);
    }
    
    console.log("Payment Success Page - Order ID:", orderIdParam);
    console.log("Payment Success Page - Auth State:", { isAuthenticated, user });
    console.log("Payment Success Page - SessionStorage:", sessionStorage.getItem('paymentSuccess'));

    // Don't check auth if we have payment success flag
    // This prevents infinite loops when backend is down
  }, [searchParams]);

  const handleViewOrders = () => {
    console.log("View Orders clicked - Auth state:", { isAuthenticated, user });
    
    // Navigate to account page directly without auth check
    console.log("Navigating to account page");
    navigate("/shop/account");
  };

  const handleContinueShopping = () => {
    console.log("Continue shopping clicked");
    
    // Navigate to home page without clearing the flag
    // This allows continued access to all shop pages
    navigate("/shop/home");
    
    // Clear the payment success flag after a longer delay (5 minutes)
    setTimeout(() => {
      sessionStorage.removeItem('paymentSuccess');
      sessionStorage.removeItem('orderId');
      console.log("Payment success flag cleared after 5 minutes");
    }, 300000); // 5 minutes = 300000 milliseconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-10 max-w-md w-full">
        <CardHeader className="p-0 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl mb-2">Payment Successful!</CardTitle>
          <p className="text-gray-600 text-lg">
            {orderId ? `Order #${orderId} placed successfully!` : "Your order has been placed successfully!"}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Thank you for your purchase. Your order will be delivered to your address.
          </p>
        </CardHeader>
        
        <div className="space-y-3 mt-6">
          <Button 
            className="w-full flex items-center justify-center gap-2" 
            onClick={handleViewOrders}
            size="lg"
          >
            <ShoppingBag className="w-4 h-4" />
            View Orders
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2" 
            onClick={handleContinueShopping}
            size="lg"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
