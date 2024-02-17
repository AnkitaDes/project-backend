// require("dotenv").config();
import dotenv from "dotenv";
import connectDB from "./db/database.js";
dotenv.config({ path: "./env" });

connectDB();

// async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", () => {
//       console.log("Error connecting to the database:", error);
//     });
//   } catch (error) {
//     console.error("ERROR:", error);
//     throw error;
//   }
// };
