import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
// import queryRoutes from "./routes/queryRoutes.js";
// import knowledgeRoutes from "./routes/knowledgeRoutes.js";
// import weatherRoutes from "./routes/weatherRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());



app.use("/auth", authRoutes);
// app.use("/query", queryRoutes);
// app.use("/knowledge", knowledgeRoutes);
// app.use("/weather", weatherRoutes);



export default app;