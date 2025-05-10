import express from "express";
import {getAllPets,getPetById,getAvailablePets} from "../controllers/petsController.js";
const petRouter=express.Router()
petRouter.get("/allpets",getAllPets)
petRouter.get("/available",getAvailablePets)
petRouter.get("/:petid",getPetById)


export {petRouter}