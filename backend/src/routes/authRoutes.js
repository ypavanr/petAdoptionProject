import express from "express";
import { authenticateAdmin,authenticateStaff } from "../middleware/authenticate.js";
const authRouter=express.Router()
authRouter.post("/",authenticate)
export {authRouter}