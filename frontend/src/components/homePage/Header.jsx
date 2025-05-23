import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
        <div className="info">
          <h2 className="phrase">Become Their Forever Friend — Adopt a Pet Today!</h2>
          <h4>Tel:080 1234 5678 | Email:PyaariPets@gmail.com</h4>
        </div>
         <h2 className="centre">Pyaari Pets</h2>
        <div className="navigation">
           <a href="/">Home</a>
           <Link to="/about">About Us</Link>
           <a href="/Login">Management-Login</a>
           <a href="/Apply">Apply</a>
           <Link to="/Donate" className="donate-btn">DONATE!!!</Link>         
      </div>
    </header>
  );
}

export default Header;
