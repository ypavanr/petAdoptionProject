import express from "express";
import bodyParser from "body-parser";
import db from "./config/pgDB.js";
import cors from "cors";
import env from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { vetRoutes } from "./routes/vetRoutes.js";
import { petRouter } from "./routes/petRoutes.js";
import { donationRoutes } from "./routes/donationsRoutes.js";
import { staffRoutes } from "./routes/staffRoutes.js";
const app=express()
env.config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin:process.env.CORS_ORIGIN_URL
}));
db.connect().then(()=>{
  console.log("connected to database")
})
db.query("SET search_path TO petAdoption")
app.use("/pets",petRouter)
app.use("/donation",donationRoutes)
app.use("/staff",staffRoutes)
app.use("/auth",authRouter)
app.use("/auth/admin",adminRoutes);
app.use("/auth/vet",vetRoutes)

app.listen(3000,()=>{
    console.log("server listening on port 3000")
})
