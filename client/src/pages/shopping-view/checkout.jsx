import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreditCard, Smartphone, Truck, IndianRupee } from "lucide-react";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: ""
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolder: ""
  });
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const apiBaseUrl =
    import.meta.env.VITE_API_URL?.trim() || "http://localhost:5002/api";

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    const userId = user?.id;
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please login to place an order.",
        variant: "destructive",
      });
      return;
    }
    
    if (!cartItems?.items || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    setIsPaymemntStart(true);

    // Validate payment details before creating order
    if (paymentMethod === "bank") {
      if (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolder) {
        toast({
          title: "Please fill all bank details",
          variant: "destructive"
        });
        setIsPaymemntStart(false);
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !upiId.includes('@')) {
        toast({
          title: "Please enter a valid UPI ID",
          description: "UPI ID should be in format: 1234567890@ybl",
          variant: "destructive"
        });
        setIsPaymemntStart(false);
        return;
      }
    } else if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || cardDetails.cardNumber.length < 16 || 
          !cardDetails.expiryDate || !cardDetails.cvv || cardDetails.cvv.length < 3 ||
          !cardDetails.cardHolder) {
        toast({
          title: "Please fill all card details",
          description: "Card number, expiry date, CVV, and holder name are required",
          variant: "destructive"
        });
        setIsPaymemntStart(false);
        return;
      }
    }

    const orderData = {
      userId: userId,
      cartItems: cartItems.items.map(item => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity
      })),
      addressInfo: {
        ...currentSelectedAddress,
      },
      orderStatus: "pending",
      paymentMethod: paymentMethod,
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentDetails: paymentMethod === "bank" ? bankDetails : 
                      paymentMethod === "upi" ? { upiId } : 
                      paymentMethod === "card" ? cardDetails : null
    };

    console.log('Creating order with payment method:', paymentMethod);

    // First create the order
    dispatch(createNewOrder(orderData)).then((orderResponse) => {
      console.log('Order creation response:', orderResponse);
      
      if (orderResponse?.payload?.success) {
        const orderId = orderResponse.payload.orderId;
        
        // Handle different payment methods
        if (paymentMethod === "cod") {
          // For COD, redirect directly to payment success
          console.log("COD payment successful, redirecting to payment success page");
          toast({
            title: "Order placed successfully!",
            description: "Your order will be delivered to your address.",
          });
          
          // Store payment success flag and redirect
          sessionStorage.setItem('paymentSuccess', 'true');
          sessionStorage.setItem('orderId', orderId);
          
          window.location.href = `/shop/payment-success?orderId=${orderId}`;
          return;
        }
        
        // For online payments, try to process payment
        if (paymentMethod === "paypal" || paymentMethod === "bank") {
          // Try to make payment request with fallback
          try {
            fetch(`${apiBaseUrl}/payment/create-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: totalCartAmount,
                paymentMethod: paymentMethod,
                orderId: orderId,
                bankDetails: paymentMethod === "bank" ? bankDetails : null
              }),
              signal: AbortSignal.timeout(5000) // 5 second timeout
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(paymentResponse => {
              console.log('Payment response:', paymentResponse);
              
              if (paymentResponse.success) {
                // Handle successful payment
                if (paymentMethod === "paypal" && paymentResponse.approvalUrl) {
                  // Redirect to PayPal for approval
                  window.location.href = paymentResponse.approvalUrl;
                } else {
                  // Payment successful, redirect to success page
                  sessionStorage.setItem('paymentSuccess', 'true');
                  sessionStorage.setItem('orderId', orderId);
                  window.location.href = `/shop/payment-success?orderId=${orderId}`;
                }
              } else {
                throw new Error(paymentResponse.message || 'Payment failed');
              }
            })
            .catch(error => {
              console.error('Payment processing error:', error);
              
              // Fallback: Show error and allow retry
              toast({
                title: "Payment Processing Failed",
                description: "Unable to process payment. Please try again or use Cash on Delivery.",
                variant: "destructive",
              });
              
              setIsPaymemntStart(false);
            });
          } catch (error) {
            console.error('Payment service unavailable:', error);
            
            // Fallback: Show error and suggest COD
            toast({
              title: "Payment Service Unavailable",
              description: "Payment processing is currently unavailable. Please use Cash on Delivery option.",
              variant: "destructive",
            });
            
            setIsPaymemntStart(false);
          }
        }
      } else {
        toast({
          title: "Failed to place order",
          description: orderResponse?.payload?.message || "Please try again",
          variant: "destructive"
        });
        setIsPaymemntStart(false);
      }
    }).catch(error => {
      console.error('Order creation error:', error);
      toast({
        title: "Failed to place order",
        description: "Network error. Please try again",
        variant: "destructive"
      });
      setIsPaymemntStart(false);
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                    <IndianRupee className="w-4 h-4" />
                    Cash on Delivery (COD)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="bank"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                    <Truck className="w-4 h-4" />
                    Bank Transfer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="upi"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="w-4 h-4" />
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="card"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    Credit/Debit Card
                  </Label>
                </div>
              </div>

              {/* Bank Details Form */}
              {paymentMethod === "bank" && (
                <div className="mt-4 space-y-4">
                  <h4 className="font-semibold">Bank Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <input
                      id="accountHolder"
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter account holder name"
                      value={bankDetails.accountHolder}
                      onChange={(e) => setBankDetails({...bankDetails, accountHolder: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <input
                      id="accountNumber"
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter account number"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <input
                      id="ifscCode"
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter IFSC code"
                      value={bankDetails.ifscCode}
                      onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* UPI Details Form */}
              {paymentMethod === "upi" && (
                <div className="mt-4 space-y-4">
                  <h4 className="font-semibold">UPI Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <input
                      id="upiId"
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your UPI ID (e.g., 1234567890@ybl)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    After placing order, you will receive a payment request on your UPI app
                  </p>
                </div>
              )}

              {/* Card Details Form */}
              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4">
                  <h4 className="font-semibold">Card Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <input
                      id="cardNumber"
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <input
                        id="expiryDate"
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <input
                        id="cvv"
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardHolder">Card Holder Name</Label>
                    <input
                      id="cardHolder"
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter card holder name"
                      value={cardDetails.cardHolder}
                      onChange={(e) => setCardDetails({...cardDetails, cardHolder: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs. {totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Payment..."
                : `Place Order (${paymentMethod.toUpperCase()})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
