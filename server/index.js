import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import express from "express";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({ path: "./.env" });

connectDB();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from server",
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
