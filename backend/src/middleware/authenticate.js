import db from "../config/pgDB.js";
import bcrypt from 'bcryptjs';
const authenticateAdmin=async(req,res)=>{
   const {password}=req.body
  try{
    const hashedpassword=await db.query("SELECT password_hash FROM staff where staff_role='admin'");
    bcrypt.compare(password, hashedpassword, (err, result) => {
        if (err) {
            console.log("Error comparing password:", err);
            return res.status(500).send({ error: "Internal server error" });
        }
        if (result) {
            return res.status(200).send({
                message: 'Admin authenticated', 
            });
        } else {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
    });
} catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ error: "Internal server error" });
}
} 

const authenticateStaff=async(req,res)=>{
    const {staff_id,password}=req.body;
    try{
        const staff=await db.query("SELECT * FROM staff WHERE staff_id=$1",[staff_id])
        if (staff.rows.length > 0) {
            const hashedPassword = user.rows[0].password_hash;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    console.log("Error comparing password:", err);
                    return res.status(500).send({ error: "Internal server error" });
                }
                if (result) {
                    

                    return res.status(200).send({
                        message: 'staff authenticated', 
                    });
                } else {
                    return res.status(401).send({ message: 'Invalid credentials' });
                }
            });
        } else {
            return res.status(401).send({ message: 'Staff-ID does not exist. Please register' });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
    }
export {authenticateAdmin,authenticateStaff}