import express from "express";
import { requestSwap, updateSwapStatus, cancelSwap } from "../controllers/swap.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, requestSwap);
router.put("/:id/status", isAuthenticated, updateSwapStatus);
router.put("/:id/cancel", isAuthenticated, cancelSwap);

export default router;
