import React from "react";
import details from "./Details.jsx";
import Card from "./Card.jsx"

function createGrid(details) {
    return (
      <Card
        key={details.id}
        name={details.name}
        imgURL={details.imgURL}
        des={details.des}
      />
    );
  }

  function Grid() {
    return (
      <div className="card-container">
        {details.map(createGrid)}
        </div>
    )};
    export default Grid;