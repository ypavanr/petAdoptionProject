import React from "react";
import Grid from "./Grid";
import About from "../aboutUs/About";
import { Route,Routes } from "react-router-dom";
import Apply from "../Application/Apply";
import Detail from "../description/detail"
import Donate from "../Donation/donate"


function App() {
return (
<div>
   <Routes>
     <Route path="/" element={<Grid/>}/>
     <Route path="/description" element={<Detail/>}/>
     <Route path="/about" element={<About/>}/>
     <Route path="/apply" element={<Apply/>}/>   
     <Route path="/donate" element={<Donate/>}/>   
   </Routes>
</div>);
}

export default App;
