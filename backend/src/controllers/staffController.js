import db from "../index.js";
import bcrypt from 'bcryptjs';
const createStaff = async (req, res) => {
    const { first_name, middle_name, last_name, staff_role, street, city, state, pincode, email, salary, password, phone1, phone2 } = req.body;

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

        res.status(201).send({ message: 'Staff registered successfully!' });

    } catch (error) {
        console.error("Error during staff creation:", error);
        res.status(500).send({ message: 'Error registering staff.' });
    }
};
const getAllStaff=async (req,res)=>{
    try{
        const staff=await db.query("SELECT * FROM staff");
        res.status(200).json(staff.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const deleteStaff=async(req,res)=>{
    
}