import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Detail() {
  const location = useLocation();
  const { pet } = location.state || {};
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    if (pet?.pet_id) {
      axios.get(`http://localhost:3000/pets/medicaldata/${pet.pet_id}`)
        .then(res => {
          setMedicalRecords(res.data);
        })
        .catch(err => {
          console.error("Failed to fetch medical records:", err);
        });
    }
  }, [pet]);

    if (!pet) return <div>No pet selected</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{pet.name}</h2>
      <img src={pet.image_url} alt={pet.name} width="300" />
      <p><strong>Pet ID:</strong> {pet.pet_id}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age} {pet.age_unit}</p>
      <p><strong>Description:</strong> {pet.description}</p>

      <h3>Medical Records</h3>
      {medicalRecords.length === 0 ? (
        <p>No medical records available.</p>
      ) : (
        medicalRecords.map(record => (
          <div key={record.record_id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>Check-up Date:</strong> {record.check_up_date}</p>
            <p><strong>Follow-up Date:</strong> {record.follow_up_date}</p>
            <p><strong>Notes:</strong> {record.notes}</p>
            <p><strong>Diagnoses:</strong> {record.diagnoses?.join(", ") || "None"}</p>
            <p><strong>Treatments:</strong> {record.treatments?.join(", ") || "None"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Detail;

