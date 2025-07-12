// middlewares/multer.js
import multer from "multer";

// Store files in memory as buffer (Cloudinary requires buffer)
const storage = multer.memoryStorage();

// For single avatar upload
export const singleUpload = multer({ storage }).single("avatar");

// For multiple item images upload (limit: 5 files)
export const multipleUpload = multer({ 
  storage,
  limits: { files: 5 }, // optional: limit max 5 images
}).array("images", 5);
