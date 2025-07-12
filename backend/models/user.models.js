// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: { 
      public_id: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
