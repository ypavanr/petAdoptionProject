import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VetInterface() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem("staff_id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get('http://localhost:3000/auth/vet/allMedicalRecords');
        setRecords(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load medical records.');
      }
    };

    fetchRecords();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={handleLogout}
        style={{
          float: 'right',
          backgroundColor: '#ff5c5c',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>

      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome, Veterinarian!</h1>
      <p style={{ textAlign: 'center', fontSize: '18px' }}>Below are all pet health records:</p>

      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>
      )}

      {records.length > 0 && (
        <div style={{ marginTop: '30px', padding: '0 40px' }}>
          {records.map((record) => (
            <div key={record.record_id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <p><strong>Record ID:</strong> {record.record_id}</p>
              <p><strong>Pet ID:</strong> {record.pet_id}</p>
              <p><strong>Vet ID:</strong> {record.vet_id}</p>
              <p><strong>Check-up Date:</strong> {new Date(record.check_up_date).toLocaleDateString()}</p>
              <p><strong>Follow-up Date:</strong> {record.follow_up_date ? new Date(record.follow_up_date).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
              <p><strong>Diagnoses:</strong> {record.diagnoses?.filter(Boolean).join(', ') || 'None'}</p>
              <p><strong>Treatments:</strong> {record.treatments?.filter(Boolean).join(', ') || 'None'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VetInterface;