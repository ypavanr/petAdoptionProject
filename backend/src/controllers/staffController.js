import db from "../config/pgDB.js";
import bcrypt from 'bcryptjs';
const createStaff = async (req, res) => {
    const { first_name, middle_name, last_name, staff_role, street, city, state, pincode, email, salary, password, phone1, phone2 } = req.body;
    if(!first_name|| !last_name ||!staff_role ||!street ||!city|| !state||!pincode|| !email|| !salary|| !password|| !phone1){
        return res.status(400).json({ error: 'please enter all the necessary fields ' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const staffResult = await db.query(
            "INSERT INTO staff (staff_name,email,password_hash,salary,joining_date,staff_role) VALUES (ROW($1, $2, $3), $4,$5,$6,CURRENT_DATE,$7) RETURNING staff_id",
            [first_name, middle_name, last_name, email, hashedPassword, salary, staff_role]
        );
        const staff_id = staffResult.rows[0].staff_id;

        await db.query("INSERT INTO address(street, city, state, pincode, staff_id) VALUES ($1,$2,$3,$4,$5)", [street, city, state, pincode, staff_id]);
        await db.query("INSERT INTO phone_numbers(phone_number,staff_id) VALUES ($1,$2)", [phone1, staff_id]);

        if (phone2 != null) {
            await db.query("INSERT INTO phone_numbers(phone_number,staff_id) VALUES ($1,$2)", [phone2, staff_id]);
        }

        res.status(201).json({ message: 'Staff registered successfully!' });

    } catch (error) {
        console.error("Error during staff creation:", error);
        res.status(500).json({ message: 'Error registering staff.' });
    }
};
const getAllStaff=async (req,res)=>{
    try{
        const staff=await db.query("SELECT s.staff_id,s.staff_name,s.email,s.staff_role,ad.street,ad.city,ad.state,ad.pincode,array_agg(pn.phone_number) AS phone_numbers FROM staff s LEFT JOIN address ad ON s.staff_id = ad.staff_id LEFT JOIN  phone_numbers pn ON s.staff_id = pn.staff_id GROUP BY s.staff_id, s.staff_name, s.email, s.staff_role, ad.street, ad.city, ad.state, ad.pincode");
        res.status(200).json(staff.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const deleteStaff=async(req,res)=>{
    const {staff_id}=req.body;
    if(!staff_id){
        return res.status(400).json({ error: 'Staff-ID not found. Please enter a Staff-ID ' });
    }
    try{
        const staffExists=await db.query("SELECT * FROM staff WHERE staff_id=$1",[staff_id])
        if(staffExists.rows.length==0){
            return res.status(404).json({ message: 'Staff with the entered Staff-ID does not exist. Please enter a valid Staff-ID.' });
        }
        await db.query("DELETE FROM staff WHERE staff_id=$1",[staff_id]);
        res.status(201).json({ message: 'Staff record deleted successfully!' });
    }
    catch (error) {
        console.error("Error during staff creation:", error);
        res.status(500).json({ message: 'Error registering staff.' });
    }
}
export {createStaff,getAllStaff,deleteStaff}