import db from "../config/pgDB.js";
const createMedicalRecord=async(req,res)=>{
   const {pet_id,vet_id,checkup_date,followup_date,notes}=req.body
   if(!pet_id||!vet_id||!checkup_date||!followup_date||!notes){
    return res.status(400).send({ error: 'All fields are required!' });
   }
   try{
    const pet_exists=await db.query("SELECT * FROM pets WHERE pet_id=$1",[pet_id])
        if(pet_exists.rows.length==0){
            return res.status(401).send({ message: 'Entered pet id does not exist. Please enter valid pet id' });
        }
        const vet_exists=await db.query("SELECT * FROM staff WHERE staff_id=$1",[vet_id])
        if(vet_exists.rows.length==0){
            return res.status(401).send({ message: 'Entered adopter id does not exist. Please enter valid adopter id' });
        }
    const record_id=await db.query("INSERT INTO medical_records(vet_id, pet_id, check_up_date, follow_up_date, notes) VALUES ($1, $2, $3, $3::date + INTERVAL '7 days', $4) RETURNING record_id",[vet_id, pet_id, checkup_date, notes])
    res.status(200).json({
        message: "Medical record created successfully",
        data: {
          record_id: record_id
          
        }
      });
      
}
catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
}
}

const createDiagnosisAndTreatment=async(req,res)=>{
    const { record_id, diagnoses, treatments } = req.body;

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const diagnosisInsertPromises = diagnoses.map(diagnosis => {
      return client.query(
        'INSERT INTO diagnoses (record_id, diagnosis) VALUES ($1, $2)',
        [record_id, diagnosis]
      );
    });

    const treatmentInsertPromises = treatments.map(treatment => {
      return client.query(
        'INSERT INTO treatments (record_id, treatment) VALUES ($1, $2)',
        [record_id, treatment]
      );
    });

    await Promise.all([...diagnosisInsertPromises, ...treatmentInsertPromises]);

    await client.query('COMMIT');
    res.status(201).json({ message: 'Details inserted successfully.' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  } finally {
    client.release();
  }
}

const getMedicalRecordsByID=async (req,res)=>{
    const {pet_id}=req.params;
    if(!pet_id){
        return res.status(400).send({ error: 'Pet-ID field is empty. Please enter a Pet-ID.' });
    }
    try{
        const pet_exists=await db.query("SELECT * FROM pets WHERE pet_id=$1",[pet_id])
        if(pet_exists.rows.length==0){
            return res.status(401).send({ message: 'Entered adopter id does not exist. Please enter valid adopter id' });
        }
       const medical_records= await db.query("SELECT * FROM medical_records WHERE pet_id=$1",[pet_id]);
       res.status(200).json(medical_records.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
      } 
}
const getDiagnosisAndTreatmentByPetID=async (req,res)=>{
      const {record_id}=req.params
      if(!pet_id){
        return res.status(400).send({ error: 'Pet-ID field is empty. Please enter a Pet-ID.' });
    }
    try{
        const record_exists=await db.query("SELECT * FROM medical_records WHERE record_id=$1",[record_id])
        if(record_exists.rows.length==0){
            return res.status(401).send({ message: 'Entered record id does not exist. Please enter valid record id' });
        }
       const diagnoses= await db.query("SELECT * FROM diagnoses WHERE record_id=$1",[record_id]);
       const treatments= await db.query("SELECT * FROM treatment WHERE record_id=$1",[record_id]);
       res.status(200).json(diagnoses.rows,treatments.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
      } 
}



export {createDiagnosisAndTreatment,createMedicalRecord,getMedicalRecordsByID,getDiagnosisAndTreatmentByPetID}