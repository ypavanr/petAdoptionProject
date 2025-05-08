import express from "express";
import {getAllPets,getPetById,getAvailablePets} from "../controllers/petsController.js";
const petRouter=express.Router()
petRouter.get("/",getAllPets)
petRouter.get("/:petid",getPetById)
petRouter.get("/availablepets",getAvailablePets)

export {petRouter}