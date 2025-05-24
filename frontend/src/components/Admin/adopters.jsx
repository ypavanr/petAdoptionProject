import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminInterface.css';

function Adopters() {
  const [adopters, setAdopters] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchAdopters();
  }, []);

  const fetchAdopters = async () => {
    try {
      const res = await axios.get('http://localhost:3000/auth/admin/alladopters');
      setAdopters(res.data);
    } catch (err) {
      console.error('Error fetching adopters:', err);
      setMessage('Failed to load adopters.');
      setMessageType('error');
    }
  };

  const handleApprove = async (adopter_id) => {
    try {
      const res = await axios.patch(`http://localhost:3000/auth/admin/approveapplication/${adopter_id}`);
      setMessage(res.data.message);
      setMessageType('success');
      fetchAdopters();
    } catch (err) {
      console.error('Error approving application:', err);
      setMessage(err.response?.data?.message || 'Error approving application.');
      setMessageType('error');
    }
  };

  const handleDeny = async (adopter_id) => {
    try {
      const res = await axios.patch(`http://localhost:3000/auth/admin/denyapplication/${adopter_id}`);
      setMessage(res.data.message);
      setMessageType('success');
      fetchAdopters();
    } catch (err) {
      console.error('Error denying application:', err);
      setMessage(err.response?.data?.message || 'Error denying application.');
      setMessageType('error');
    }
  };

  const pendingAdopters = adopters.filter(a => a.application_status === 'pending');
  const allOthers = adopters.filter(a => a.application_status !== 'pending');

  const renderTable = (data, showActions = false, showPetInfo = true) => (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Adopter ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone(s)</th>
          {showPetInfo && <th>Pet ID</th>}
          {showPetInfo && <th>Pet Name</th>}
          <th>Status</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((a) => (
          <tr key={a.adopter_id}>
            <td>{a.adopter_id}</td>
            <td>{`${a.first_name} ${a.middle_name || ''} ${a.last_name}`}</td>
            <td>{a.email}</td>
            <td>{`${a.street}, ${a.city}, ${a.state} - ${a.pincode}`}</td>
            <td>{a.phone_numbers.join(', ')}</td>
            {showPetInfo && <td>{a.pet_id || 'N/A'}</td>}
            {showPetInfo && <td>{a.pet_name || 'N/A'}</td>}
            <td>{a.application_status}</td>
            {showActions && (
              <td>
                <button onClick={() => handleApprove(a.adopter_id)} className="approve-btn">Approve</button>
                <button onClick={() => handleDeny(a.adopter_id)} className="deny-btn">Deny</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="admin-container">
      <h1 className="admin-title">Manage Adopter Applications</h1>

      {message && (
        <p className={messageType === 'success' ? 'message-success' : 'message-error'}>
          {message}
        </p>
      )}

      <div className="admin-section">
        <h2>Pending Approvals</h2>
        {renderTable(pendingAdopters, true, false)} {/* Hide pet info */}
      </div>

      <div className="admin-section">
        <h2>All Other Adopters</h2>
        {renderTable(allOthers, false, true)} {/* Show pet info */}
      </div>
    </div>
  );
}

export default Adopters;
