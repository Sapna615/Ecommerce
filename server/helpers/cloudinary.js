const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const hasConfig =
    Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
    Boolean(process.env.CLOUDINARY_API_KEY) &&
    Boolean(process.env.CLOUDINARY_API_SECRET) &&
    process.env.CLOUDINARY_CLOUD_NAME !== "your_cloudinary_cloud_name" &&
    process.env.CLOUDINARY_API_KEY !== "your_cloudinary_api_key" &&
    process.env.CLOUDINARY_API_SECRET !== "your_cloudinary_api_secret";

  // Dev-friendly fallback: allow product creation even without Cloudinary configured.
  if (!hasConfig) {
    return {
      url: "https://via.placeholder.com/800x800.png?text=Product+Image",
      public_id: "placeholder",
      resource_type: "image",
    };
  }

  return await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
