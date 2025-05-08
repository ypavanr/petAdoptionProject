import express from "express";
import {calculateTotalAmount} from "../controllers/donationsController.js"
import {createNewDonor,getAllDonors} from "../controllers/donorsController.js"
const donationRoutes=express.Router()
donationRoutes.get("/totalamount",calculateTotalAmount);
donationRoutes.post("/newDonation",createNewDonor);
export {donationRoutes};