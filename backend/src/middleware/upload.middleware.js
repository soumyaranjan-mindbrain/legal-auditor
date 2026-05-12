const multer = require("multer");
const { storage } = require("../config/cloudinary");

// Strictly allowed MIME types
const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Security violation: File type not supported. Allowed: PDF, DOC, DOCX, TXT"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB Maximum
    files: 1 // Only 1 file at a time
  },
});

module.exports = upload;