// models/Redemption.js
import mongoose from "mongoose";

const redemptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    pointsUsed: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Redemption", redemptionSchema);
