// middlewares/multer.js
import multer from "multer";

// Store file in memory as buffer
const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("avatar");
