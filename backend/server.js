import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

//Database connection
connectDB();

app.get("/get", (req, res) => {
  res.send("Hello from Express Server!");
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server run ${PORT}`);
});
