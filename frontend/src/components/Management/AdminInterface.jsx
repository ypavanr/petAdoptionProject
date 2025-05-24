import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminInterface() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("staff_id");
    localStorage.removeItem("role");
    navigate("/login");
  };

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

      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome, Admin!</h1>
      <p style={{ textAlign: 'center', fontSize: '18px' }}>You can manage the adoption system here.</p>
    </div>
  );
}

export default AdminInterface;
