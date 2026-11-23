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
    origin: "http://localhost:5173",
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

// app.get("/get", (req, res) => {
//   res.send("Hello from Express Server!");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server run ${PORT}`);
});
