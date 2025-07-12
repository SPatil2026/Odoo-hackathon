// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Shirt", "Pants"
    size: { type: String, required: true },
    condition: { type: String, required: true },
    tags: [{ type: String }],
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { 
      type: String,
      enum: ["available", "pending", "swapped", "redeemed"],
      default: "available"
    },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
