import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());  // replaces body-parser
app.use(cors());

// Routes
app.use("/api", route);

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

// Connect DB and start server
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
