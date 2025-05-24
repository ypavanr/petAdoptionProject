import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../homePage/Header';
import Footer from '../homePage/Footer';
import './Login.css';
import '../Application/apply.css';

function Login() {
  const [staffId, setStaffId] = useState('');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:3000/auth', {
        staff_id: staffId,
        role,
        password
      });

      console.log("Login response:", res.data);

      const { staff_id, role: userRole, message } = res.data;
      setMessage(message);
      setSuccess(true);

      localStorage.setItem("staff_id", staff_id);
      localStorage.setItem("role", userRole);

      if (userRole === 'admin') {
        navigate('/adminInterface');
      } else if (userRole === 'veterinarian') {
        navigate('/vetInterface');
      } else {
        setMessage("Unauthorized role");
        setSuccess(false);
      }

    } catch (err) {
      console.error("Login error:", err.response);
      setMessage(err.response?.data?.message || 'Login failed');
      setSuccess(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Staff Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Staff ID:</label>
            <input
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="veterinarian">Veterinarian</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>

          {message && (
            <p className={`login-message ${success ? 'success' : 'error'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
