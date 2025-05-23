import db from "../config/pgDB.js";
const getAllPets=async(req,res)=>{
    try{
    const pets=await db.query("SELECT * FROM pets");
   return res.status(200).json(pets.rows);
}
catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
}

}
const getPetById=async(req,res)=>{
    const { petid } = req.params;
    try {
      const pet  = await db.query('SELECT * FROM pets WHERE pet_id = $1', [petid]);
      if (pet.rows.length === 0) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      res.json(pet.rows[0]);
    } catch (err) {
      console.error('Error fetching pet:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getAvailablePets=async(req,res)=>{
    try{
       const pets=await db.query("SELECT * FROM pets WHERE status='available'");
       res.status(200).json(pets.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const createNewPet=async(req,res)=>{
    const {species,breed,age,age_unit,arrival_date,status,description,image_url,name,gender}=req.body;
    if(!species||!breed||!age||!age_unit||!arrival_date||!status||!description||!image_url||!name||!gender)
    {return res.status(400).json({ error: 'All fields are required!' });}
    try{
        await db.query("INSERT INTO pets (species, breed, age,age_unit, arrival_date, status,description, image_url, name, gender) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[species,breed,age,age_unit,arrival_date,status,description,image_url,name,gender]);
        res.status(200).json({ message: 'pet registered successfully!' });}
        catch(err){
            console.error(err);
        res.status(500).json({ message: 'Server error' });
        }
    }

export {getAllPets,getPetById,getAvailablePets,createNewPet}