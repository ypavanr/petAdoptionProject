import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminInterface.css";

const Donations = () => {
  const [donors, setDonors] = useState([]);
  const [totalDonation, setTotalDonation] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonors();
    fetchTotalDonation();
  }, []);

  const parseDonorName = (nameStr) => {
    if (!nameStr) return { first_name: "", middle_name: "", last_name: "" };
    const parts = nameStr.replace(/[()]/g, "").split(",");
    return {
      first_name: parts[0] || "",
      middle_name: parts[1] || "",
      last_name: parts[2] || "",
    };
  };

  const fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/admin/alldonors");
      const donorsWithNames = response.data.map((donor) => {
        const { first_name, middle_name, last_name } = parseDonorName(donor.donor_name_text);
        return { ...donor, first_name, middle_name, last_name };
      });
      setDonors(donorsWithNames);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalDonation = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/admin/totaldonation");
      setTotalDonation(response.data.total_donations || 0);
    } catch (error) {
      console.error("Error fetching total donation:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Donations Overview</h1>

      <div className="admin-section">
        <h2>Total Donation</h2>
        <div className="donation-amount">₹ {totalDonation}</div>
      </div>

      <div className="admin-section">
        <h2>Donor Details</h2>

        {loading ? (
          <p>Loading donors...</p>
        ) : donors.length === 0 ? (
          <p>No donors available.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone(s)</th>
                <th>Donations</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.donor_id}>
                  <td>
                    {donor.first_name} {donor.middle_name ? donor.middle_name + " " : ""}{donor.last_name}
                  </td>
                  <td>{donor.email}</td>
                  <td>{donor.phone_numbers?.join(", ") || "N/A"}</td>
                  <td>
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                      {donor.donations?.map((donation, idx) => (
                        <li key={idx}>
                          ₹ {donation.amount} on {new Date(donation.date).toLocaleDateString()} - "{donation.note}"
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Donations;
