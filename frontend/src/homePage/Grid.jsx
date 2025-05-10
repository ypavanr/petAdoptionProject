import React, { useEffect, useState } from 'react';
import Card from "./Card.jsx";
import axios from "axios";

function Grid() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/pets/available')
      .then(response => {
        console.log(response.data);
        setPets(response.data);})
      .catch(error => console.error("Error fetching pets:", error));
  }, []);

  return (
    <div className="card-container">
      {pets.map(pet => (
        <Card
          key={pet.pet_id}
          name={pet.name}
          imgURL={pet.image_url}
          des={pet.description}
        />
      ))}
    </div>
  );
}

export default Grid;
