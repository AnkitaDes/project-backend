import dotenv from "dotenv";
import connectDB from "./db/database.js";
dotenv.config({ path: "./env" });
import express from "express";
const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Mongo db connection failed!!!", error);
  });
