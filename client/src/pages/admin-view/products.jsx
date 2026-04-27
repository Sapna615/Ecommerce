import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  title: "",
  description: "",
  category: "",
  subcategory: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  colors: "",
  sizes: "",
  material: "",
  fit: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    

    if (imageLoadingState) {
      toast({
        title: "Image is still uploading",
        description: "Please wait for the upload to finish.",
        variant: "destructive",
      });
      return;
    }

    if (!uploadedImageUrl) {
      toast({
        title: "Product image required",
        description: "Please upload an image before saving the product.",
        variant: "destructive",
      });
      return;
    }

    const processedFormData = {
      ...formData,
      colors: formData.colors ? formData.colors.split(',').map(color => color.trim()) : [],
      sizes: formData.sizes ? formData.sizes.split(',').map(size => size.trim()) : [],
      image: uploadedImageUrl,
    };


    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: processedFormData,
          })
        ).then((data) => {

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "Product updated successfully",
            });
          } else {
            toast({
              title: "Failed to update product",
              variant: "destructive",
            });
          }
        })
      : dispatch(
          addNewProduct(processedFormData)
        ).then((data) => {

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setUploadedImageUrl("");
            setFormData(initialFormData);
            toast({
              title: "Product added successfully",
            });
          } else {
            toast({
              title: "Failed to add product",
              variant: "destructive",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    const requiredKeys = [
      "title",
      "description",
      "category",
      "brand",
      "price",
      "totalStock",
    ];

    const isFieldsValid = requiredKeys.every((key) => {
      const value = formData[key];
      return value !== null && value !== undefined && String(value).trim() !== "";
    });

    return isFieldsValid && Boolean(uploadedImageUrl) && !imageLoadingState;
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                setImageFile={setImageFile}
                setUploadedImageUrl={setUploadedImageUrl}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
