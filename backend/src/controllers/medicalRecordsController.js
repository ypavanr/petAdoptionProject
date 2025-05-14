import db from "../config/pgDB.js";
const createMedicalRecord=async(req,res)=>{
   const {pet_id,vet_id,checkup_date,followup_date,notes}=req.body
   if(!pet_id||!vet_id||!checkup_date||!followup_date||!notes){
    return res.status(400).json({ error: 'All fields are required!' });
   }
   try{
    const pet_exists=await db.query("SELECT * FROM pets WHERE pet_id=$1",[pet_id])
        if(pet_exists.rows.length==0){
            return res.status(401).json({ message: 'Entered pet id does not exist. Please enter valid pet id' });
        }
        const vet_exists=await db.query("SELECT * FROM staff WHERE staff_id=$1",[vet_id])
        if(vet_exists.rows.length==0){
            return res.status(401).json({ message: 'Entered adopter id does not exist. Please enter valid adopter id' });
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

const getMedicalRecordsByPetID=async (req,res)=>{
    const {pet_id}=req.params;
    if(!pet_id){
        return res.status(400).json({ error: 'Pet-ID field is empty. Please enter a Pet-ID.' });
    }
    try{
        const pet_exists=await db.query("SELECT * FROM pets WHERE pet_id=$1",[pet_id])
        if(pet_exists.rows.length==0){
            return res.status(401).json({ message: 'Entered adopter id does not exist. Please enter valid adopter id' });
        }
       const medical_records= await db.query("SELECT * FROM medical_records WHERE pet_id=$1",[pet_id]);
       res.status(200).json(medical_records.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
      } 
}
const getDiagnosisAndTreatmentByMedicalRecordID=async (req,res)=>{
      const {record_id}=req.params
      if(!record_id){
        return res.status(400).json({ error: 'Pet-ID field is empty. Please enter a Pet-ID.' });
    }
    try{
        const record_exists=await db.query("SELECT * FROM medical_records WHERE record_id=$1",[record_id])
        if(record_exists.rows.length==0){
            return res.status(401).json({ message: 'Entered record id does not exist. Please enter valid record id' });
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
const GetDiagnosisTreatmentWithMedicalRecordByPetID = async (req, res) => {
  const { pet_id } = req.params;
  if (!pet_id) {
    return res.status(400).json({ error: 'Pet-ID field is empty. Please enter a Pet-ID.' });
  }
  try {
    const pet = await db.query('SELECT * FROM pets WHERE pet_id = $1', [pet_id]);
    if (pet.rows.length === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const response = await db.query(`
      SELECT 
        mr.record_id, 
        mr.pet_id,
        mr.vet_id,
        mr.check_up_date,
        mr.follow_up_date,
        mr.notes,
        array_agg(DISTINCT d.diagnosis) FILTER (WHERE d.diagnosis IS NOT NULL) AS diagnoses,
        array_agg(DISTINCT t.treatment) FILTER (WHERE t.treatment IS NOT NULL) AS treatments
      FROM medical_records mr
      LEFT JOIN diagnoses d ON mr.record_id = d.record_id
      LEFT JOIN treatments t ON mr.record_id = t.record_id
      WHERE mr.pet_id = $1
      GROUP BY mr.record_id
    `, [pet_id]);

    return res.status(200).json(response.rows);
  } catch (err) {
    console.error('Error fetching pet:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

  


export {createDiagnosisAndTreatment,createMedicalRecord,getMedicalRecordsByPetID,getDiagnosisAndTreatmentByMedicalRecordID,GetDiagnosisTreatmentWithMedicalRecordByPetID}