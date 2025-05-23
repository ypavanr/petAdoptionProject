import React, { useState } from "react";
import axios from "axios";
import Header from "../homePage/Header";
import Footer from "../homePage/Footer";

function Donate() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    amount: "",
    note: "",
    phone1: "",
    phone2: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/donation/newDonation", {
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        email: formData.email,
        amount: formData.amount,
        note: formData.note,
        phone1: formData.phone1,
        phone2: formData.phone2 || null,
      });
      setMessage(res.data.message);
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error submitting donation.");
      setMessageType("error");
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Make a Donation</h2>
        <form onSubmit={handleSubmitDonation}>
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="amount" placeholder="Donation Amount" type="number" onChange={handleChange} required />
          <input name="note" placeholder="Note" onChange={handleChange} required />
          <input name="phone1" placeholder="Primary Phone" onChange={handleChange} required />
          <input name="phone2" placeholder="Alternate Phone (optional)" onChange={handleChange} />
          <button type="submit">Donate</button>
        </form>

        {message && (
          <p className={messageType === "success" ? "message-success" : "message-error"}>
            {message}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Donate;
