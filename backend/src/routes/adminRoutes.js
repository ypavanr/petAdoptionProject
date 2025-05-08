import express from "express"
import { createNewPet, getAllPets } from "../controllers/petsController.js";
import { createStaff, deleteStaff } from "../controllers/staffController.js";
import { denyAdopterApplicationStatus, getAllAdopters } from "../controllers/adoptersController.js";
import { newAdoption } from "../controllers/adoptionsController.js";
const adminRoutes=express.Router()
adminRoutes.post("/createpet",createNewPet)
adminRoutes.post("/createstaff",createStaff)
adminRoutes.patch("/denyapplication/:adopterid",denyAdopterApplicationStatus)
adminRoutes.get("/adopters",getAllAdopters);
adminRoutes.post("/newadoption",newAdoption);
adminRoutes.get("/pets",getAllPets)
adminRoutes.delete("/deletestaff",deleteStaff)
export {adminRoutes}
