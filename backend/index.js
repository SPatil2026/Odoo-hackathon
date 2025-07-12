import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import itemRoute from "./routes/item.routes.js";
import redemptionRoutes from "./routes/redemption.routes.js";
import swapRoutes from "./routes/swap.routes.js";
dotenv.config({ path: "./.env" });

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


//apis
app.use("/user",userRoute);
app.use("/items", itemRoute);
app.use("/api/redemptions", redemptionRoutes);
app.use("/api/swaps", swapRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
    });