import express from "express";
import {
  addItem,
  getItems,
  getItem,
  approveItem,
  rejectItem,
  deleteItem,
} from "../controllers/item.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, multipleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Public
router.get("/", getItems);
router.get("/:id", getItem);

// Authenticated
router.post("/add", isAuthenticated, multipleUpload, addItem);

router.delete("/:id", isAuthenticated, deleteItem);

// Admin
router.put("/:id/approve", isAuthenticated, approveItem); // You can add extra admin middleware
router.delete("/:id/reject", isAuthenticated, rejectItem);

export default router;
