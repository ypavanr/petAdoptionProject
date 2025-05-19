import express from "express"
import { createNewPet, getAllPets } from "../controllers/petsController.js";
import { createStaff, deleteStaff } from "../controllers/staffController.js";
import { denyAdopterApplicationStatus, getAllAdopters ,approveAdopterApplicationStatus} from "../controllers/adoptersController.js";
import { newAdoption } from "../controllers/adoptionsController.js";
const adminRoutes=express.Router()
adminRoutes.post("/createpet",createNewPet)
adminRoutes.post("/createstaff",createStaff)
adminRoutes.patch("/denyapplication/:adopter_id",denyAdopterApplicationStatus)
adminRoutes.patch("approveapplication/:adopter_id",approveAdopterApplicationStatus)
adminRoutes.get("/showadopters",getAllAdopters);
adminRoutes.get("/allpets",getAllPets)
adminRoutes.delete("/deletestaff",deleteStaff)
export {adminRoutes}
