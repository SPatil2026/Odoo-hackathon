import express from "express";
import {
  addItem,
  getItems,
  getItem,
  deleteItem,
} from "../controllers/item.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import { singleUpload, multipleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Public
router.get("/", getItems);
router.get("/:id", getItem);

// Authenticated
router.post("/add", isAuthenticated, multipleUpload, addItem);
router.delete("/:id", isAuthenticated, deleteItem);

export default router;
