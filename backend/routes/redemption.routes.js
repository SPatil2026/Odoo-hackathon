import express from "express";
import { redeemItem, cancelRedemption } from "../controllers/redemption.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, redeemItem);
router.put("/:id/cancel", isAuthenticated, cancelRedemption);

export default router;
