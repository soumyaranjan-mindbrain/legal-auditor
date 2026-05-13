const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const baseName = file.originalname.split(".")[0];
    const isPDF = file.mimetype === "application/pdf";

    return {
      folder: "legal-auditor/documents",
      // 'auto' lets Cloudinary detect the type; PDFs need 'image' for inline viewing
      resource_type: isPDF ? "image" : "raw",
      // Preserve the original format for non-images
      format: isPDF ? "pdf" : undefined,
      public_id: `${baseName}-${uniqueSuffix}`,
    };
  },
});

module.exports = { cloudinary, storage };
