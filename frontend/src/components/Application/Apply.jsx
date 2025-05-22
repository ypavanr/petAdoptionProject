import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Apply.css";

function Apply() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone1: "",
    phone2: "",
  });

  const [email, setEmail] = useState(localStorage.getItem("adopterEmail") || "");
  const [status, setStatus] = useState("");
  const [adopterId, setAdopterId] = useState(null);
  const [canProceed, setCanProceed] = useState(false);
  const [petId, setPetId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  useEffect(() => {
    if (email) {
      handleCheckStatus(); 
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/adopters/application", formData);
      setMessage(res.data.message);
      setMessageType("success");
      setEmail(formData.email);
      localStorage.setItem("adopterEmail", formData.email);
      handleCheckStatus(); 
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting application.");
      setMessageType("error");
    }
  };

  const handleCheckStatus = async () => {
    try {
      setMessage(""); 
      const res = await axios.post("http://localhost:3000/adopters/application/status", {
        email,
      });
      setStatus(res.data.application_status);
      setCanProceed(res.data.canProceed);
      setAdopterId(res.data.adopter_id);
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error checking status.");
      setMessageType("error");
    }
  };

  const handleAdoption = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/adopters/application/status/${adopterId}`,
        { adopter_id: adopterId, pet_id: petId }
      );
      setMessage(res.data.message);
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error proceeding with adoption.");
      setMessageType("error");
    }
  };

  return (
    <div className="form-container">
      <h2>Adoption Application</h2>

      <form onSubmit={handleSubmitApplication}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="street" placeholder="Street" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input name="phone1" placeholder="Primary Phone" onChange={handleChange} required />
        <input name="phone2" placeholder="Alternate Phone (optional)" onChange={handleChange} />
        <button type="submit">Submit Application</button>
      </form>

      <hr />

      <h3>Check Application Status</h3>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          localStorage.setItem("adopterEmail", e.target.value);
        }}
        placeholder="Enter your email"
        required
      />
      <button onClick={handleCheckStatus}>Check Status</button>

      {status && (
        <p>
          Application Status: <strong>{status}</strong>
        </p>
      )}

      {canProceed && (
        <div>
          <input
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            placeholder="Enter Pet ID"
            required
          />
          <button onClick={handleAdoption}>Confirm Adoption</button>
        </div>
      )}

      {message && (
        <p className={messageType === "success" ? "message-success" : "message-error"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Apply;
