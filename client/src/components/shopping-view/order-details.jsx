import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { X, AlertCircle, Package, Truck, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "@/store/shop/order-slice";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      const response = await dispatch(updateOrderStatus({
        orderId: orderDetails._id,
        orderStatus: 'cancelled'
      }));
      
      if (response?.payload?.success) {
        toast({
          title: "Order Cancelled",
          description: "Your order has been successfully cancelled.",
        });
      } else {
        toast({
          title: "Cancellation Failed",
          description: "Failed to cancel order. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while cancelling your order.",
        variant: "destructive"
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const canCancelOrder = orderDetails?.orderStatus === 'pending' || orderDetails?.orderStatus === 'confirmed';
  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <X className="w-4 h-4 text-red-500" />;
      case 'delivered': return <Package className="w-4 h-4 text-blue-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-orange-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const trackingSteps = [
    { id: "pending", label: "Order placed", icon: <Package className="w-4 h-4" /> },
    { id: "confirmed", label: "Confirmed", icon: <CheckCircle className="w-4 h-4" /> },
    { id: "shipped", label: "Shipped", icon: <Truck className="w-4 h-4" /> },
    { id: "delivered", label: "Delivered", icon: <Package className="w-4 h-4" /> },
  ];

  const statusRank = {
    pending: 0,
    confirmed: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
    rejected: -1,
  };

  const currentRank = statusRank[orderDetails?.orderStatus] ?? 0;

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6">
        {/* Order Status Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Order Details</h2>
          <div className="flex items-center gap-2">
            {getStatusIcon(orderDetails?.orderStatus)}
            <Badge
              className={`py-2 px-4 ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "cancelled"
                  ? "bg-red-600"
                  : orderDetails?.orderStatus === "delivered"
                  ? "bg-blue-500"
                  : orderDetails?.orderStatus === "shipped"
                  ? "bg-orange-500"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus?.charAt(0).toUpperCase() + orderDetails?.orderStatus?.slice(1) || 'Unknown'}
            </Badge>
          </div>
        </div>

        {/* Order Information */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label className="font-mono">{orderDetails?._id}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label className="text-lg font-bold text-green-600">${orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Method</p>
              <Label>{orderDetails?.paymentMethod || 'Credit Card'}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Badge variant={orderDetails?.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                {orderDetails?.paymentStatus?.charAt(0).toUpperCase() + orderDetails?.paymentStatus?.slice(1) || 'Unknown'}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-lg">Order Items</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium">{item.title}</span>
                        <div className="text-sm text-gray-600">
                          {item.color && <span className="mr-2">Color: {item.color}</span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">Qty: {item.quantity}</span>
                        <div className="font-bold">${item.price}</div>
                      </div>
                    </li>
                  ))
                : <li className="text-gray-500">No items found</li>}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Shipping Information */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-lg">Shipping Information</div>
            <div className="grid gap-1 text-muted-foreground bg-gray-50 p-4 rounded-lg">
              <span className="font-medium">{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              {orderDetails?.addressInfo?.notes && (
                <span className="text-sm">Notes: {orderDetails?.addressInfo?.notes}</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Tracking */}
        {showTracking ? (
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <div className="font-medium text-lg">Tracking</div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowTracking(false)}
              >
                Close
              </Button>
            </div>

            {orderDetails?.orderStatus === "cancelled" ||
            orderDetails?.orderStatus === "rejected" ? (
              <div className="rounded border bg-red-50 p-4 text-sm text-red-700">
                This order is {orderDetails.orderStatus}. Tracking is not available.
              </div>
            ) : (
              <div className="grid gap-2">
                {trackingSteps.map((step) => {
                  const stepRank = statusRank[step.id];
                  const completed = currentRank >= stepRank;
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 rounded border p-3 ${
                        completed ? "bg-green-50 border-green-200" : "bg-white"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          completed ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.label}</div>
                        {completed ? (
                          <div className="text-xs text-green-700">Completed</div>
                        ) : (
                          <div className="text-xs text-gray-500">Pending</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          {canCancelOrder && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={isCancelling}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this order? This action cannot be undone.
                    Refunds will be processed according to our refund policy.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelOrder}>
                    Yes, Cancel Order
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              if (!orderDetails?._id) return;
              setShowTracking(true);
              toast({
                title: "Tracking opened",
                description: "Showing order status tracking.",
              });
            }}
          >
            <Package className="w-4 h-4" />
            Track Order
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Need Help?</span>
          </div>
          <p className="text-sm text-blue-800">
            If you have any questions about your order, please contact our customer support.
          </p>
          <Button 
            variant="link" 
            className="p-0 h-auto text-blue-600"
            onClick={() => window.location.href = 'mailto:support@ecommerce.com'}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
