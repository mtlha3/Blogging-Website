import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
dotenv.config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", blogRoutes);
app.use("/", commentRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:5000`);
});
