import db from "../config/pgDB.js";
const calculateTotalAmount=async(req,res)=>{
    const total_donations=await db.query('SELECT SUM(amount) AS total_donations FROM donations');
    res.status(200).json(total_donations.rows[0]);
    }
    export {calculateTotalAmount}