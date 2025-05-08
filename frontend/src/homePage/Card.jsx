import React from "react";

function Card(props) {
  return (
    <div className="card">
      <dt>
      <img className="circle-img" src={props.imgURL} alt="avatar_img" />
        <span>{props.name}</span>
      </dt>
      <dd>{props.des}</dd>
  </div>
  );
}

export default Card;