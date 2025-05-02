import db from "../index.js";
const createNewDonor= async (req,res)=>{
    const {first_name,middle_name,last_name,email,amount,note,phone1,phone2}=req.body;
    if(!first_name||!middle_name||!last_name||!email||!amount||!note||!phone1){
        return res.status(400).send({ error: 'fill all the necessary fields' });
    }
    try{
        const donorResult=await db.query("SELECT donor_id FROM donors WHERE email=$1",[email]);
       
        if(donorResult.rows.length===0){
             donorResult=await db.query("INSERT INTO donors(donor_name,email) VALUES (ROW($1, $2, $3), $4)",[first_name,middle_name,last_name,email]);
        }
        const donor_id= donorResult.rows[0].donor_id
        await db.query("INSERT INTO phone_numbers(phone_number,donor_id) VALUES ($1,$2)",[phone1,donor_id]);
       if(phone2!=null){
        await db.query("INSERT INTO phone_numbers(phone_number,donor_id) VALUES ($1,$2)",[phone2,donor_id]);
       }
       await db.query("INSERT INTO donations(donor_id,amount,donation_date,note) VALUES ($1,$2,CURRENT_DATE,$3)",[donor_id,amount,note]);
    } 
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const getAllDonors=async (req,res)=>{
    try{
        const donors=await db.query("SELECT * FROM donors");
        res.status(200).json(donors.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export {createNewDonor}