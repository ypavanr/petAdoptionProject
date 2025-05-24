import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './AdminInterface.css';

function Pets() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    species: '',
    breed: '',
    age: '',
    age_unit: '',
    arrival_date: '',
    status: '',
    description: '',
    image_url: '',
    name: '',
    gender: '',
    image:null,
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:3000/auth/admin/allpets');
      setPets(res.data);
    } catch (err) {
      console.error('Error fetching pets:', err);
    }
  };

  const handleChange=(e) => {
  const {name, value, files}=e.target;
  if (name==='image') {
    setForm({ ...form, image: files[0] });
  } else {
    setForm({ ...form, [name]: value });
  }
};


  const handleCreate=async (e) => {
    e.preventDefault();
    for (const key in form) {
      if (!form[key]&&key!=='image'&&key!='image_url') {
        alert(`Please fill the ${key.replace('_', ' ')} field`);
        return;
      }
    }
    const imageFile=form.image;
  const imageName=`${uuidv4()}.${imageFile.name.split('.').pop()}`;
  const { data, error }=await supabase.storage
    .from('pet-image')
    .upload(imageName, imageFile);
if (error){
    console.error('Image upload error:', error);
    alert('Failed to upload image.');
    return;
  }

  const imageUrl=`${supabase.storage.from('pet-image').getPublicUrl(imageName).data.publicUrl}`;
    try {
       const petData={ ...form, image_url: imageUrl };
    delete petData.image;
      await axios.post('http://localhost:3000/auth/admin/createpet', petData);
      setForm({
        species: '',
        breed: '',
        age: '',
        age_unit: '',
        arrival_date: '',
        status: '',
        description: '',
        image_url: '',
        name: '',
        gender: '',
        image:null,
      });
      fetchPets();
    } catch (err) {
      console.error('Error creating pet:', err);
      alert('Failed to create pet. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Manage Pets</h1>

      <form className="admin-section" onSubmit={handleCreate}>
        <h2>Register New Pet</h2>
        <div className="form-grid">
          <input
            type="text"
            name="species"
            placeholder="Species"
            value={form.species}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={form.breed}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
            min="0"
          />
          <select
            name="age_unit"
            value={form.age_unit}
            onChange={handleChange}
            required
          >
            <option value="">Age Unit</option>
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
          <input
            type="date"
            name="arrival_date"
            placeholder="Arrival Date"
            value={form.arrival_date}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="">Status</option>
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
            <option value="pending">Pending</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
         
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
           <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button className="logout-btn" type="submit">Register Pet</button>
      </form>

      <div className="admin-section">
        <h2>All Pets</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Arrival Date</th>
              <th>Status</th>
              <th>Gender</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.pet_id}>
                <td>{pet.name}</td>
                <td>{pet.species}</td>
                <td>{pet.breed}</td>
                <td>{pet.age} {pet.age_unit}</td>
                <td>{new Date(pet.arrival_date).toLocaleDateString()}</td>
                <td>{pet.status}</td>
                <td>{pet.gender}</td>
                <td>{pet.description}</td>
                <td>
                  <img
                    src={pet.image_url}
                    alt={pet.name}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pets;
