import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminInterface.css';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    staff_role: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    salary: '',
    password: '',
    phone1: '',
    phone2: ''
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:3000/auth/admin/allstaff');
      setStaff(res.data);
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/admin/createstaff', form);
      setForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        staff_role: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        email: '',
        salary: '',
        password: '',
        phone1: '',
        phone2: ''
      });
      fetchStaff();
    } catch (err) {
      console.error('Error creating staff:', err);
    }
  };

  const handleDelete = async (staff_id) => {
    try {
      await axios.delete('http://localhost:3000/auth/admin/deletestaff', { data: { staff_id } });
      fetchStaff();
    } catch (err) {
      console.error('Error deleting staff:', err);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Manage Staff</h1>

      <form className="admin-section" onSubmit={handleCreate}>
        <h2>Create New Staff</h2>
        <div className="form-grid">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              placeholder={key.replace('_', ' ').toUpperCase()}
              value={form[key]}
              onChange={handleChange}
              required={key !== 'middle_name' && key !== 'phone2'}
            />
          ))}
        </div>
        <button className="logout-btn" type="submit">Create Staff</button>
      </form>

      <div className="admin-section">
        <h2>All Staff</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone(s)</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.staff_id}>
                <td>{`${s.first_name} ${s.middle_name || ''} ${s.last_name}`}</td>
                <td>{s.staff_role}</td>
                <td>{s.email}</td>
                <td>{s.phone_numbers.join(', ')}</td>
                <td>{`${s.street}, ${s.city}, ${s.state} - ${s.pincode}`}</td>
                <td>
                  <button onClick={() => handleDelete(s.staff_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;
