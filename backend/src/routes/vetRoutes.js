import express from "express";
import {createDiagnosisAndTreatment,createMedicalRecord,getMedicalRecordsByID,getDiagnosisAndTreatmentByPetID} from "../controllers/medicalRecordsController.js"
const vetRoutes=express.Router()
vetRoutes.post("/createmedicalrecord",createMedicalRecord)
vetRoutes.post("/createmedicalrecord/creatediagnosistreatment",createDiagnosisAndTreatment)
vetRoutes.get("/medicalrecords/:id",getMedicalRecordsByID)
vetRoutes.get("/medicalrecords/diagnosistreatment/:id",getDiagnosisAndTreatmentByPetID)
export {vetRoutes}