import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ShoppingCart, Package, Percent } from "lucide-react";
import UserCartItemsContent from "./cart-items-content";
import ProductDetailsDialog from "./product-details";
import { useSelector, useDispatch } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const { productDetails } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  console.log('Cart Wrapper received cartItems:', cartItems);
  console.log('Cart Wrapper cartItems length:', cartItems?.length || 0);
  console.log('Cart Wrapper items array:', cartItems?.items || cartItems || []);

  // Handle both data structures: cartItems.items or direct cartItems array
  const itemsArray = cartItems?.items || cartItems || [];
  console.log('Final items array:', itemsArray);

  const totalCartAmount =
    itemsArray && itemsArray.length > 0
      ? itemsArray.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const totalOriginalAmount =
    itemsArray && itemsArray.length > 0
      ? itemsArray.reduce(
          (sum, currentItem) =>
            sum + (currentItem?.price || 0) * currentItem?.quantity,
          0
        )
      : 0;

  const totalSavings = totalOriginalAmount - totalCartAmount;
  const totalItems = itemsArray?.reduce((sum, item) => sum + item?.quantity, 0) || 0;

  console.log('Total cart amount:', totalCartAmount);

  return (
    <>
      <SheetContent className="sm:max-w-lg w-full max-h-[90vh] flex flex-col">
        <SheetHeader className="border-b pb-4 flex-shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
            {cartItems?.items && cartItems.items.length > 0 ? (
            <Badge variant="secondary" className="ml-auto">
              {cartItems.items.reduce((sum, item) => sum + item?.quantity, 0)} items
            </Badge>
          ) : itemsArray && itemsArray.length > 0 ? (
            <Badge variant="secondary" className="ml-auto">
              {itemsArray.reduce((sum, item) => sum + item?.quantity, 0)} items
            </Badge>
          ) : null}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {itemsArray && itemsArray.length > 0 ? (
            <div className="space-y-4 px-4">
              {itemsArray.map((item) => {
                console.log('Rendering cart item:', item);
                return <UserCartItemsContent key={item.productId} cartItem={item} />;
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Button
                onClick={() => {
                  navigate("/shop/home");
                  setOpenCartSheet(false);
                }}
                variant="outline"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {itemsArray && itemsArray.length > 0 && (
          <div className="flex-shrink-0 border-t bg-white p-4">
            {" "}
            {/* Cart Summary */}
            <div className="space-y-4">
              {/* Summary Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span>${totalOriginalAmount.toFixed(2)}</span>
                </div>
                
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <Percent className="w-4 h-4" />
                      <span>Discount</span>
                    </div>
                    <span className="text-green-600">-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${(totalCartAmount * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold">Total</span>
                  <p className="text-xs text-gray-500">Including tax</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    ${(totalCartAmount + totalCartAmount * 0.08).toFixed(2)}
                  </span>
                  {totalSavings > 0 && (
                    <p className="text-xs text-green-600">You saved ${totalSavings.toFixed(2)}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    navigate("/shop/checkout");
                    setOpenCartSheet(false);
                  }}
                  className="w-full"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  onClick={() => {
                    navigate("/shop/home");
                    setOpenCartSheet(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Package className="w-3 h-3" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        )}
      </SheetContent>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={productDetails !== null}
        setOpen={(open) => {
          if (!open) {
            dispatch(setProductDetails(null));
          }
        }}
        productDetails={productDetails}
      />
    </>
  );
}

export default UserCartWrapper;
