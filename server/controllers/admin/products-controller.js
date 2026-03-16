const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

async function saveLocalUpload(reqFile, req) {
  const extFromName = path.extname(reqFile.originalname || "") || "";
  const ext =
    extFromName ||
    (reqFile.mimetype === "image/png"
      ? ".png"
      : reqFile.mimetype === "image/webp"
        ? ".webp"
        : ".jpg");

  const filename = `${Date.now()}_${crypto.randomBytes(6).toString("hex")}${ext}`;
  const uploadPath = path.join(__dirname, "..", "..", "uploads", filename);

  await fs.writeFile(uploadPath, reqFile.buffer);

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return { url: `${baseUrl}/uploads/${filename}` };
}

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const hasCloudinaryConfig =
      Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_API_SECRET) &&
      process.env.CLOUDINARY_CLOUD_NAME !== "your_cloudinary_cloud_name" &&
      process.env.CLOUDINARY_API_KEY !== "your_cloudinary_api_key" &&
      process.env.CLOUDINARY_API_SECRET !== "your_cloudinary_api_secret";

    let result;

    if (hasCloudinaryConfig) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        result = await imageUploadUtil(url);
      } catch (cloudErr) {
        // If Cloudinary is configured but fails (401/disabled/etc),
        // fallback to local upload so admin can continue working.
        console.error("Cloudinary upload failed, falling back to local:", cloudErr);
        result = await saveLocalUpload(req.file, req);
      }
    } else {
      // Local upload fallback (no cloud passwords needed)
      result = await saveLocalUpload(req.file, req);
    }

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured while uploading image",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      subcategory,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
      colors,
      sizes,
      material,
      fit,
    } = req.body;

    console.log("Add product request:", req.body);

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      subcategory,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview: averageReview || 0,
      colors: Array.isArray(colors) ? colors : [],
      sizes: Array.isArray(sizes) ? sizes : [],
      material,
      fit,
    });

    await newlyCreatedProduct.save();
    console.log("Product saved successfully:", newlyCreatedProduct._id);
    
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: "Product added successfully",
    });
  } catch (e) {
    console.log("Error adding product:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding product: " + e.message,
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      subcategory,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
      colors,
      sizes,
      material,
      fit,
    } = req.body;

    console.log("Edit product request:", req.body);

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.subcategory = subcategory || findProduct.subcategory;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;
    findProduct.colors = Array.isArray(colors) ? colors : findProduct.colors;
    findProduct.sizes = Array.isArray(sizes) ? sizes : findProduct.sizes;
    findProduct.material = material || findProduct.material;
    findProduct.fit = fit || findProduct.fit;

    await findProduct.save();
    console.log("Product updated successfully:", findProduct._id);
    
    res.status(200).json({
      success: true,
      data: findProduct,
      message: "Product updated successfully",
    });
  } catch (e) {
    console.log("Error editing product:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while editing product: " + e.message,
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
