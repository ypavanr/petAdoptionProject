import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function applicationForm(){
    const [firstname, setfirtname] = useState('');
    const [middlename, setmiddlename] = useState('null');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [street, setstreet] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [pincode, setpincode] = useState('');
    const [phone1, setphone1] = useState('');
    const [phone2, setphone2] = useState('null');
    const [message, setMessage] = useState('');
     const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); 
    axios
      .post('http://localhost:3000/application', {
        firstName, middleName, lastName, email,street,city,state,pincode,phone1,phone2
      })
      .then((response) => {
        setMessage(response.message)
        console.log(setMessage);
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message || 'Login failed');
        } else {
          setMessage('Server/network error');
        }
      });
  };

function Apply(){
    return(<div>
   <h1>yessssssssssssssssssssssssss</h1></div>
);
}
}

export default Apply;