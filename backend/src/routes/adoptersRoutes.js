import express from "express"
import { createAdopter } from "../controllers/adoptersController.js";
const adoptersRoutes=express.Router()
adminRoutes.post("/application",createAdopter);
export {adoptersRoutes}
