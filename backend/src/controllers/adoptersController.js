import db from "../index.js"
const getAllAdopters=async (req,res)=>{
    try{
        const adopters=await db.query("SELECT * FROM adopters");
        res.status(200).json(adopters.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const updateAdopterApplicationStatus=async (req,res)=>{
    const {adopter_id,status}=req.body;
    if(!adopter_id||!status){
        return res.status(400).send({ error: 'All fields are required!' });
    }
    try{
        const adopter=await db.query("SELECT * FROM adopters WHERE adopter_id=$1",[adopter_id,]);
        if(adopter.rows.length===0){
            return res.status(404).json({ message: 'adopter not found' });
        }
        await db.query("UPDATE adopters SET application_status=$1 WHERE adopter_id=$2", [status, adopter_id]);
        res.status(200).json({ message: 'Application status updated successfully' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const createAdopter=async (req,res)=>{
    const values = {firstName, middleName, lastName, email}=req.body;
    if(!middleName){
        middleName=null;
    }
    if(!firstName||!lastName||!email){
        return res.status(400).send({ error: 'fill all the necessary fields(first name, last name and email)' });
    }
    try{
        const mailExists=await db.query("SELECT * FROM adopters WHERE email=$1",[email]);
        if(mailExists.rows.length>0){
            res.status(401).send({ message:"email already exists. Adopter is already registered." });
        }
        await db.query("INSERT INTO adopters (adopter_name, email, application_status) VALUES (ROW($1, $2, $3), $4, 'pending')",[firstName,middleName,lastName,email]);
        res.status(200).send({ message: 'adopter registered successfully!' });}
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
export {getAllAdopters,updateAdopterApplicationStatus,createAdopter};