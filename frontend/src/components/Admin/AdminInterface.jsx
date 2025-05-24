import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminInterface.css';

function AdminInterface() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("staff_id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-section">
        <div className="admin-nav-buttons">
          <button className="admin-nav-btn" onClick={() => navigate("/adminInterface/staff")}>
            Manage Staff
          </button>
          <button className="admin-nav-btn" onClick={() => navigate("/adminInterface/adoptions")}>
            Manage Adopters
          </button>
          <button className="admin-nav-btn" onClick={() => navigate("/adminInterface/pets")}>
            Manage Pets
          </button>
          <button className="admin-nav-btn" onClick={() => navigate("/adminInterface/donations")}>
            View Donations
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminInterface;
