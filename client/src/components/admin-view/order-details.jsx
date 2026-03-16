import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { User, Phone, MapPin, Package, Calendar, DollarSign } from "lucide-react";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6">
        {/* Order Basic Info */}
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Order Information</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Order ID:</Label>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {orderDetails?._id?.slice(-8)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Label className="font-medium">Date:</Label>
              <span>{orderDetails?.orderDate?.split("T")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <Label className="font-medium">Total:</Label>
              <span className="font-semibold">${orderDetails?.totalAmount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="font-medium">Payment:</Label>
              <Badge variant="outline">{orderDetails?.paymentMethod}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Payment Status:</Label>
              <Badge variant={orderDetails?.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                {orderDetails?.paymentStatus}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Label className="font-medium">Order Status:</Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected" || orderDetails?.orderStatus === "cancelled"
                    ? "bg-red-600"
                    : orderDetails?.orderStatus === "shipped"
                    ? "bg-blue-600"
                    : orderDetails?.orderStatus === "delivered"
                    ? "bg-purple-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus || 'pending'}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Information */}
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Customer Information</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Name:</Label>
              <span>{orderDetails?.userId?.userName || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="font-medium">Email:</Label>
              <span className="text-sm text-gray-600">{orderDetails?.userId?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <Label className="font-medium">Phone:</Label>
              <span>{orderDetails?.userId?.phone || orderDetails?.addressInfo?.phone || 'N/A'}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Shipping Information */}
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Shipping Information</h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid gap-2 text-sm">
              <p className="font-medium">{orderDetails?.addressInfo?.address}</p>
              <p>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}</p>
              {orderDetails?.addressInfo?.notes && (
                <p className="text-gray-600 italic">Notes: {orderDetails?.addressInfo?.notes}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Order Items ({orderDetails?.cartItems?.length || 0})</h3>
          
          <div className="space-y-3">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {item?.productId?.image && (
                        <img 
                          src={item?.productId?.image} 
                          alt={item?.productId?.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item?.productId?.title || item?.title}</p>
                        <p className="text-sm text-gray-600">
                          ${item?.productId?.price || item?.price} × {item?.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item?.productId?.price || item?.price) * item?.quantity}
                      </p>
                      {item?.color && (
                        <p className="text-xs text-gray-500">Color: {item.color}</p>
                      )}
                      {item?.size && (
                        <p className="text-xs text-gray-500">Size: {item.size}</p>
                      )}
                    </div>
                  </div>
                ))
              : (
                <p className="text-gray-500 text-center py-4">No items found</p>
              )}
          </div>
        </div>

        <Separator />

        {/* Update Status */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Update Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "confirmed", label: "Confirmed" },
                  { id: "inProcess", label: "In Process" },
                  { id: "shipped", label: "Shipped" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                  { id: "cancelled", label: "Cancelled" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
