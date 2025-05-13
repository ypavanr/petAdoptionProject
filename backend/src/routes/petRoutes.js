import express from "express";
import {getAllPets,getPetById,getAvailablePets} from "../controllers/petsController.js";
import { GetDiagnosisTreatmentWithMedicalRecordByPetID } from "../controllers/medicalRecordsController.js";
const petRouter=express.Router()
petRouter.get("/allpets",getAllPets)
petRouter.get("/available",getAvailablePets)
petRouter.get("/:petid",getPetById)
petRouter.get("medicaldata/:petid",GetDiagnosisTreatmentWithMedicalRecordByPetID)
export {petRouter}