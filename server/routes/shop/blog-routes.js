const express = require("express");

const {
  createBlog,
  fetchAllBlogs,
  getBlogDetails,
} = require("../../controllers/shop/blog-controller");

const { upload, imageUploadUtil } = require("../../helpers/cloudinary");
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

const router = express.Router();

router.post("/create", createBlog);
router.get("/get", fetchAllBlogs);
router.get("/get/:id", getBlogDetails);

router.post("/upload-image", upload.single("my_file"), async (req, res) => {
  try {
    console.log("Blog image upload request received");
    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("File received:", req.file.originalname, req.file.mimetype, req.file.size);

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
        console.log("Attempting Cloudinary upload...");
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        result = await imageUploadUtil(url);
        console.log("Cloudinary upload success");
      } catch (cloudErr) {
        console.error("Cloudinary upload failed, falling back to local:", cloudErr.message);
        result = await saveLocalUpload(req.file, req);
      }
    } else {
      console.log("No Cloudinary config, using local upload");
      result = await saveLocalUpload(req.file, req);
    }

    console.log("Upload result:", result);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Blog upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred: " + error.message,
    });
  }
});

module.exports = router;
