import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/leadRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://lead-manager-puc0lb3uf-rohit-s-projects45.vercel.app/",
    credentials: true,
  }),
);

// Middleware to read JSON data
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
// Lead API routes
app.use("/api/leads", router);

//Database connection
connectDB();

app.get("/", (req, res) => {
  res.send("Lead Manager API is running successfully!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server run ${PORT}`);
});
