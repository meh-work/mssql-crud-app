import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { poolPromise } from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js"; // Import routes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes); // Mounting routes

const PORT = process.env.PORT || 5000;

// Start server only after DB connection is established
poolPromise
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Error starting server: ", error);
  });
