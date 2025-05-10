import express from "express";
import { authenticate } from "../middleware/authenticate.js";
const authRouter=express.Router()
authRouter.post("/",authenticate)
export {authRouter}