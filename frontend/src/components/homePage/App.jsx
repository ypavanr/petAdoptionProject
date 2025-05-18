import React from "react";
import Header from "./Header";
import Grid from "./Grid";
import Footer from "./Footer";
import About from "../aboutUs/About";
import { Route,Routes } from "react-router-dom";
import Apply from "../Application/Apply";
import Detail from "../description/detail"


function App() {
return (
<div>
   <Header />
   <h2 className="phrase">Become Their Forever Friend — Adopt a Pet Today!</h2>
   <Routes>
     <Route path="/" element={<Grid/>}/>
     <Route path="/description" element={<Detail/>}/>
     <Route path="/about" element={<About/>}/>
     <Route path="/apply" element={<Apply/>}/>
     
   </Routes>
   <Footer />
</div>);
}

export default App;
