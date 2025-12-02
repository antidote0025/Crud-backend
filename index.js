import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", route);

// Environment variables
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGOURL;

// Connect to MongoDB & start server
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" Database Connection Failed:", error);
  });
