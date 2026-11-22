import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/leadRoutes.js";

dotenv.config();
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Lead API routes
app.use("/api/leads", router);

//Database connection
connectDB();

app.get("/get", (req, res) => {
  res.send("Hello from Express Server!");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server run ${PORT}`);
});
