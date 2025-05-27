import express from "express";
import {createDiagnosisAndTreatment,createMedicalRecord,getMedicalRecordsByPetID,getDiagnosisAndTreatmentByMedicalRecordID,GetAllMedicalRecord} from "../controllers/medicalRecordsController.js"
const vetRoutes=express.Router()
vetRoutes.post("/createmedicalrecord",createMedicalRecord)
vetRoutes.post("/createmedicalrecord/creatediagnosistreatment",createDiagnosisAndTreatment)
vetRoutes.get("/medicalrecords/:petid",getMedicalRecordsByPetID)
vetRoutes.get("diagnosistreatment/:medicalid",getDiagnosisAndTreatmentByMedicalRecordID)
vetRoutes.get("/allMedicalRecords",GetAllMedicalRecord)
export {vetRoutes}