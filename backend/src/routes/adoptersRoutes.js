import express from "express"
import { createAdopter } from "../controllers/adoptersController.js";
import { adoptionStatus,newAdoption } from "../controllers/adoptionsController.js";
const adoptersRoutes=express.Router();
adoptersRoutes.post("/application",createAdopter);
adoptersRoutes.post("/application/status",adoptionStatus);
adoptersRoutes.post("/application/status/:adopterId",newAdoption);
export {adoptersRoutes};
