import db from "../config/pgDB.js";
const getAllAdopters=async (req,res)=>{
    try{
        const adopters=await db.query("SELECT a.adopter_id, a.adopter_name,a.email,ad.street,ad.city,ad.state,ad.pincode,array_agg(pn.phone_number) AS phone_numbers FROM  adopters a LEFT JOIN  address ad ON a.adopter_id = ad.adopter_id LEFT JOIN   phone_numbers pn ON a.adopter_id = pn.adopter_id GROUP BY  a.adopter_id, a.adopter_name, a.email, ad.street, ad.city, ad.state, ad.pincode");
        res.status(200).json(adopters.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const denyAdopterApplicationStatus=async (req,res)=>{
    const {adopter_id}=req.body;
    if(!adopter_id){
        return res.status(400).json({ error: 'Adopter-ID not found. Please enter an Adopter-ID ' });
    }
    try{
        const adopter=await db.query("SELECT * FROM adopters WHERE adopter_id=$1",[adopter_id,]);
        if(adopter.rows.length===0){
            return res.status(404).json({ message: 'adopter not found' });
        }
        await db.query("UPDATE adopters SET application_status='denied' WHERE adopter_id=$1", [adopter_id]);
        res.status(200).json({ message: 'Application status denied successfully' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const createAdopter=async (req,res)=>{
    const  {firstName, middleName, lastName, email,street,city,state,pincode,phone1,phone2}=req.body;
    if(!middleName){
        middleName=null;
    }
    if(!firstName||!lastName||!email||!street||!city||!state||!pincode||!phone1){
        return res.status(400).json({ error: 'fill all the necessary fields(first name, last name and email)' });
    }
    try{
        const mailExists=await db.query("SELECT * FROM adopters WHERE email=$1",[email]);
        if(mailExists.rows.length>0){
            return res.status(401).json({ message:"email already exists. Adopter is already registered." });
        }
       const adopterResult=  await db.query("INSERT INTO adopters (adopter_name, email, application_status) VALUES (ROW($1, $2, $3), $4, 'pending') RETURNING adopter_id",[firstName,middleName,lastName,email]);
       const adopter_id= adopterResult.rows[0].adopter_id
       await db.query("INSERT INTO address(street, city, state, pincode, adopter_id) VALUES ($1,$2,$3,$4,$5)",[street,city,state,pincode,adopter_id]);
       await db.query("INSERT INTO phone_numbers(phone_number,adopter_id) VALUES ($1,$2)",[phone1,adopter_id]);
       if(phone2!=null){
        await db.query("INSERT INTO phone_numbers(phone_number,adopter_id) VALUES ($1,$2)",[phone2,adopter_id]);
       }
        res.status(201).json({ message: 'adopter registered successfully!' });}
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
export {getAllAdopters,denyAdopterApplicationStatus,createAdopter};