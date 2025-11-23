import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
// import aiRoutes from "./routes/aiRoutes";
import aiRoutes from "./routes/aiRoutes.js"; 


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
