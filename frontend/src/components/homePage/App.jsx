import React from "react";
import { Route, Routes } from "react-router-dom";
import Grid from "./Grid";
import About from "../aboutUs/About";
import Apply from "../Application/Apply";
import Detail from "../description/detail";
import Donate from "../Donation/donate";
import Login from "../ManagmentLogin/Login";
import AdminInterface from "../Admin/AdminInterface";
import VetInterface from "../Vet/VetInterface";
import ProtectedRoute from "../ManagmentLogin/ProtectedRoute"; 
import Staff from "../Admin/staff";
import Donations from "../Admin/donations";
import Pets from "../Admin/pets"

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
          path="/adminInterface/staff"
          element={
         <ProtectedRoute allowedRoles={["admin"]}>
         <Staff />
         </ProtectedRoute>
        }
        />
        <Route
          path="/adminInterface/donations"
          element={
         <ProtectedRoute allowedRoles={["admin"]}>
         <Donations />
         </ProtectedRoute>
        }
        />
        <Route
          path="/adminInterface/pets"
          element={
         <ProtectedRoute allowedRoles={["admin"]}>
         <Pets />
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
