import db from "../config/pgDB.js";
import bcrypt from 'bcryptjs';

const authenticate = async (req, res) => {
  const { staff_id, role, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM staff WHERE staff_id = $1", [staff_id]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Staff-ID does not exist. Please register' });
    }

    const staff = result.rows[0];

    // Check if role matches what the user claims
    if (staff.staff_role !== role) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    bcrypt.compare(password, staff.password_hash, (err, isMatch) => {
      if (err) {
        console.log("Error comparing password:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({
        message: `${role} authenticated`,
        staff_id: staff.staff_id,
        role: staff.staff_role
      });
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { authenticate };
