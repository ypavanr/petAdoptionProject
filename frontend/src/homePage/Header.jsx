import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
        <div className="info">
           <h2>PawFamily</h2>
           <h4>Tel:080 1234 5678 | Email:PawFamily@gmail.com</h4>
        </div>
        <div className="navigation">
           <a href="/">Home</a>
           <Link to="/about">About Us</Link>
           <a href="/Login">Management-Login</a>
           <a href="/Apply">Apply</a>
           <button className="donate-btn">DONATE!!!</button>
      </div>
    </header>
  );
}

export default Header;
