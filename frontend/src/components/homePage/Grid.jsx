import React, { useEffect, useState } from 'react';
import Card from "./Card.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Grid() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/pets/available')
      .then(response => {
        setPets(response.data);
      })
      .catch(error => console.error("Error fetching pets:", error));
  }, []);

  const handleCardClick = (pet) => {
    navigate("/description", { state: { pet } });
  };

  return (
    <div className="card-container">
      {pets.map(pet => (
        <div key={pet.pet_id} onClick={() => handleCardClick(pet)} style={{ cursor: "pointer" }}>
          <Card
            name={pet.name}
            imgURL={pet.image_url}
            des={pet.description}
          />
        </div>
      ))}
    </div>
  );
}

export default Grid;
