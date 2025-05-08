import express from "express";
import {createStaff,getAllStaff,deleteStaff} from "../controllers/staffController.js";
const staffRoutes=express.Router();
staffRoutes.get("/staff",getAllStaff);
export {staffRoutes}