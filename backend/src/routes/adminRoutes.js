import express from "express"
import { createNewPet, getAllPets } from "../controllers/petsController.js";
import { createStaff,getAllStaff,deleteStaff } from "../controllers/staffController.js";
import { denyAdopterApplicationStatus, getAllAdopters ,approveAdopterApplicationStatus} from "../controllers/adoptersController.js";
import { getAllDonors} from "../controllers/donorsController.js"
import { calculateTotalAmount} from "../controllers/donationsController.js"
//appove.deny-reclhk fromadopters controller....update with ::

const adminRoutes=express.Router()
adminRoutes.post("/createpet",createNewPet)
adminRoutes.post("/createstaff",createStaff)
adminRoutes.patch("/denyapplication/:adopter_id",denyAdopterApplicationStatus)
adminRoutes.patch("/approveapplication/:adopter_id",approveAdopterApplicationStatus)
adminRoutes.get("/alladopters",getAllAdopters);
adminRoutes.get("/allpets",getAllPets)
adminRoutes.get("/allstaff",getAllStaff)
adminRoutes.get("/alldonors",getAllDonors)
adminRoutes.get("/totaldonation",calculateTotalAmount)
adminRoutes.delete("/deletestaff",deleteStaff)
export {adminRoutes}
