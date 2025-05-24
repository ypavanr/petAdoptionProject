import db from "../config/pgDB.js";
const getAllAdopters = async (req, res) => {
  try {
    const adopters = await db.query(`
      SELECT 
        a.adopter_id, 
        a.adopter_name::text AS adopter_name_text,
        a.email, 
        a.application_status,
        ad.street,
        ad.city,
        ad.state,
        ad.pincode,
        array_agg(DISTINCT pn.phone_number) AS phone_numbers,
        p.pet_id,
        p.name AS pet_name
      FROM adopters a
      LEFT JOIN address ad ON a.adopter_id = ad.adopter_id
      LEFT JOIN phone_numbers pn ON a.adopter_id = pn.adopter_id
      LEFT JOIN adoptions adopt ON a.adopter_id = adopt.adopter_id
      LEFT JOIN pets p ON adopt.pet_id = p.pet_id
      GROUP BY a.adopter_id, a.adopter_name, a.email, a.application_status, ad.street, ad.city, ad.state, ad.pincode, p.pet_id, p.name
    `);

    const formattedAdopters = adopters.rows.map(row => {
      const nameParts = row.adopter_name_text
        .replace(/^\(/, '')   
        .replace(/\)$/, '')    
        .split(',')
        .map(s => s.trim().replace(/^"|"$/g, '') || '');

      const [first_name, middle_name, last_name] = nameParts;

      return {
        adopter_id: row.adopter_id,
        first_name,
        middle_name,
        last_name,
        email: row.email,
        application_status: row.application_status,
        street: row.street,
        city: row.city,
        state: row.state,
        pincode: row.pincode,
        phone_numbers: row.phone_numbers,
        pet_id: row.pet_id,
        pet_name: row.pet_name
      };
    });

    res.status(200).json(formattedAdopters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const denyAdopterApplicationStatus=async (req,res)=>{
    const {adopter_id}=req.params;
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
const approveAdopterApplicationStatus=async (req,res)=>{
    const {adopter_id}=req.params;
    if(!adopter_id){
        return res.status(400).json({ error: 'Adopter-ID not found. Please enter an Adopter-ID ' });
    }
    try{
        const adopter=await db.query("SELECT * FROM adopters WHERE adopter_id=$1",[adopter_id,]);
        if(adopter.rows.length===0){
            return res.status(404).json({ message: 'adopter not found' });
        }
        await db.query("UPDATE adopters SET application_status='approved' WHERE adopter_id=$1", [adopter_id]);
        res.status(200).json({ message: 'Application status approved successfully' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const createAdopter = async (req, res) => {
    const { firstName, middleName, lastName, email, street, city, state, pincode, phone1, phone2 } = req.body;

    if (!firstName || !lastName || !email || !street || !city || !state || !pincode || !phone1) {
        return res.status(400).json({ error: 'Fill all the necessary fields (first name, last name, email, etc.)' });
    }

    try {
        const mailExists = await db.query("SELECT * FROM adopters WHERE email = $1", [email]);
        if (mailExists.rows.length > 0) {
            return res.status(401).json({ message: "Email already exists. Adopter is already registered." });
        }

        const fullName = `(${firstName},${middleName || ''},${lastName})`;

        const adopterResult = await db.query(
            "INSERT INTO adopters (adopter_name, email, application_status) VALUES ($1::name, $2, 'pending') RETURNING adopter_id",
            [fullName, email]
        );

        if (adopterResult.rows.length === 0) {
            console.error("Insertion failed, no adopter_id returned");
            return res.status(500).json({ error: "Could not create adopter" });
        }

        const adopterId = adopterResult.rows[0].adopter_id;

        await db.query(
            "INSERT INTO address (street, city, state, pincode, adopter_id) VALUES ($1, $2, $3, $4, $5)",
            [street, city, state, pincode, adopterId]
        );

        await db.query(
            "INSERT INTO phone_numbers (phone_number, adopter_id) VALUES ($1, $2)",
            [phone1, adopterId]
        );

        if (phone2) {
            await db.query(
                "INSERT INTO phone_numbers (phone_number, adopter_id) VALUES ($1, $2)",
                [phone2, adopterId]
            );
        }

        return res.status(201).json({ message: 'Adopter registered successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

export {getAllAdopters,denyAdopterApplicationStatus,approveAdopterApplicationStatus,createAdopter};