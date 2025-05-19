import express from "express"
import { createAdopter } from "../controllers/adoptersController.js";
import { newAdoption } from "../controllers/adoptionsController.js";
const adoptersRoutes=express.Router()
adoptersRoutes.post("/application",createAdopter);
adoptersRoutes.post("/newadoption",newAdoption);
export {adoptersRoutes}
