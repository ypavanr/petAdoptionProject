import React from "react";
import { Route, Routes } from "react-router-dom";
import Grid from "./Grid";
import About from "../aboutUs/About";
import Apply from "../Application/Apply";
import Detail from "../description/detail";
import Donate from "../Donation/donate";
import Login from "../Management/Login";
import AdminInterface from '../Management/AdminInterface';
import VetInterface from '../Management/VetInterface';
import ProtectedRoute from "../Management/ProtectedRoute"; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/description" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/adminInterface"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminInterface />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vetInterface"
          element={
            <ProtectedRoute allowedRoles={["veterinarian"]}>
              <VetInterface />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
