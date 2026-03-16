import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();
    const userId = user?.id || "testuser123";
    
    console.log('Submitting address:', { userId, formData, currentEditedId });

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    const addressData = {
      ...formData,
      userId: userId,
    };

    console.log('Address data to submit:', addressData);

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: userId,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log('Edit response:', data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(userId));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          } else {
            toast({
              title: "Failed to update address",
              description: data?.payload?.message || "Please try again",
              variant: "destructive"
            });
          }
        }).catch((error) => {
          console.error('Edit address error:', error);
          toast({
            title: "Failed to update address",
            description: "Network error. Please try again.",
            variant: "destructive"
          });
        })
      : dispatch(
          addNewAddress(addressData)
        ).then((data) => {
          console.log('Add response:', data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(userId));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          } else {
            toast({
              title: "Failed to add address",
              description: data?.payload?.message || "Please try again",
              variant: "destructive"
            });
          }
        }).catch((error) => {
          console.error('Add address error:', error);
          toast({
            title: "Failed to add address",
            description: "Network error. Please try again.",
            variant: "destructive"
          });
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    const userId = user?.id || "testuser123";
    
    dispatch(
      deleteAddress({ userId: userId, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(userId));
        toast({
          title: "Address deleted successfully",
        });
      } else {
        toast({
          title: "Failed to delete address",
          description: "Please try again",
          variant: "destructive"
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    const userId = user?.id || "testuser123";
    dispatch(fetchAllAddresses(userId));
  }, [dispatch, user?.id]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
