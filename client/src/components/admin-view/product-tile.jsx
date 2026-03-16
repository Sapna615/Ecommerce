import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  setImageFile,
  setUploadedImageUrl,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
          <div className="text-sm text-gray-600">
            <p>Category: {product?.category}</p>
            <p>Brand: {product?.brand}</p>
            <p>Stock: {product?.totalStock}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              console.log("Edit button clicked for product:", product);
              // Format the product data for the form
              const formattedData = {
                title: product?.title || "",
                description: product?.description || "",
                category: product?.category || "",
                subcategory: product?.subcategory || "",
                brand: product?.brand || "",
                price: product?.price?.toString() || "",
                salePrice: product?.salePrice?.toString() || "",
                totalStock: product?.totalStock?.toString() || "",
                colors: Array.isArray(product?.colors) ? product?.colors.join(", ") : "",
                sizes: Array.isArray(product?.sizes) ? product?.sizes.join(", ") : "",
                material: product?.material || "",
                fit: product?.fit || "",
                averageReview: product?.averageReview || 0,
              };
              
              console.log("Setting form data:", formattedData);
              setFormData(formattedData);
              setCurrentEditedId(product?._id);
              setImageFile(null);
              setUploadedImageUrl(product?.image || "");
              setOpenCreateProductsDialog(true);
            }}
          >
            Edit
          </Button>
          <Button 
            variant="destructive"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
