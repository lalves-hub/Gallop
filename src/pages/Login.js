import React from "react";
import "../css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import  Alert from "../components/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlertPassw, setShowAlertPassw] = useState(false);
  const navigate = useNavigate();

  const submitLogin = async () => {
    const userData = await Axios.get(
      `http://localhost:5000/fetchAllData/${email}/${password}`
    ).then((res) => {
      return res.data;
    });

    if (userData) {
      console.log(userData._id);
      sessionStorage.setItem("id", userData._id);
      navigate("/home");
    } else {
      setShowAlertPassw(true); // Display the warning if userData is not valid
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginContainerEmail">
        <label htmlFor="email">Employee Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="loginContainerPassword">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {showAlertPassw && <Alert message="Wrong password! Please, try again." />}
      </div>
      <div className="loginContainerSubmit">
        <button className="primaryBtn" onClick={submitLogin}>
          Login
        </button>
      </div>
      <div className="loinContainerCreateAccount">
        <Link to="/signup">Create New Account</Link>
      </div>
    </div>
  );
};

export default Login;
