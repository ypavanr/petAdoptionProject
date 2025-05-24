import db from "../config/pgDB.js";
const createNewDonor = async (req, res) => {
    const { first_name, middle_name, last_name, email, amount, note, phone1, phone2 } = req.body;

    if (!first_name || !last_name || !email || !amount || !note || !phone1) {
        return res.status(400).json({ error: 'Please fill all the necessary fields' });
    }

    try {
        let donorResult = await db.query("SELECT donor_id FROM donors WHERE email = $1", [email]);
        let donor_id;

        if (donorResult.rows.length === 0) {
            const fullName = `(${first_name},${middle_name || ''},${last_name})`; 

            const insertDonor = await db.query(
                "INSERT INTO donors (donor_name, email) VALUES ($1::name, $2) RETURNING donor_id",
                [fullName, email]
            );
            donor_id = insertDonor.rows[0].donor_id;
        } else {
            donor_id = donorResult.rows[0].donor_id;
        }

        await db.query("INSERT INTO phone_numbers (phone_number, donor_id) VALUES ($1, $2)", [phone1, donor_id]);
        if (phone2) {
            await db.query("INSERT INTO phone_numbers (phone_number, donor_id) VALUES ($1, $2)", [phone2, donor_id]);
        }

        await db.query(
            "INSERT INTO donations (donor_id, amount, donation_date, note) VALUES ($1, $2, CURRENT_DATE, $3)",
            [donor_id, amount, note]
        );

        return res.status(201).json({ message: 'Donation successful!' });
    } catch (err) {
        console.error("createNewDonor error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getAllDonors = async (req, res) => {
    try {
       const result = await db.query(`
      SELECT 
        d.donor_id,
        d.donor_name::text AS donor_name_text,  -- Just cast the whole donor_name to text
        d.email,
        array_agg(DISTINCT pn.phone_number) AS phone_numbers,
        array_agg(DISTINCT jsonb_build_object(
          'amount', dn.amount,
          'note', dn.note,
          'date', dn.donation_date
        )) AS donations
      FROM donors d
      LEFT JOIN phone_numbers pn ON d.donor_id = pn.donor_id
      LEFT JOIN donations dn ON d.donor_id = dn.donor_id
      GROUP BY d.donor_id, d.donor_name, d.email
    `);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error("getAllDonors error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

export { createNewDonor, getAllDonors};
