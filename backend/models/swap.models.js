// models/SwapRequest.js
import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestedItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    offeredItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // if direct swap
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending"
    },
  },
  { timestamps: true }
);

export default mongoose.model("SwapRequest", swapRequestSchema);
