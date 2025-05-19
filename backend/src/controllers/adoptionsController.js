import db from "../config/pgDB.js";
const newAdoption=async (req,res)=>{
   const {adopter_id,pet_id}=req.body;
   if(!adopter_id||!pet_id){
    return res.status(400).json({ error: 'fill all the necessary fields(adopter id, pet id)' });
   }
   try{
    const pet=await db.query("SELECT * FROM pets WHERE pet_id=$1",[pet_id])
   if(pet.rows.length===0){
    return res.status(401).json({ message: 'Entered pet id does not exist. Please enter valid pet id' });
   }
   if(pet.rows[0].application_status==="not available"){
    return res.status(404).json({ message: 'Entered pet id is not available. Please enter valid pet id' });
   }
   const adopter=await db.query("SELECT * FROM adopters WHERE adopter_id=$1",[adopter_id])
   if(adopter.rows.length===0){
    return res.status(401).json({ message: 'Entered adopter id does not exist. Please enter valid adopter id' });
   }
   await db.query("INSERT INTO adoptions(adopter_id,pet_id,adoption_date) VALUES ($1,$2,CURRENT_DATE)",[adopter_id,pet_id,])
   db.query("UPDATE pets SET status='not available' WHERE pet_id=$1",[pet_id,]);
   res.status(201).json({ message: 'New adoption record successfully created!' });
   }
   catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
}
}
export {newAdoption}