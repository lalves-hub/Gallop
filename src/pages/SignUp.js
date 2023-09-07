import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";
import React from "react";
import Axios from "axios";
import  Alert from "../components/Alert";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [showAlertFName, setShowAlertFName] = useState(false);
  const [showAlertLName, setShowAlertLName] = useState(false);
  const [showAlertPassw, setShowAlertPassw] = useState(false);
  const [showAlertCPassw, setShowAlertCPassw] = useState(false);
  let navigate = useNavigate();

  const createAccount = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/addUser", {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  function validateForm(){
    if (!email && !firstName && !lastName && !password && !cPassword) {
      setShowAlertEmail(true);
      setShowAlertFName(true);
      setShowAlertLName(true);
      setShowAlertPassw(true);
      setShowAlertCPassw(true);
      return false; // Prevent form submission
    } if (!email) {
        setShowAlertEmail(true);
        return false; // Prevent form submission
      } else{
        setShowAlertEmail(false);
      } if(!firstName){
        setShowAlertFName(true);
        return false;
      } else{
        setShowAlertFName(false);
      }  if(!lastName){
        setShowAlertLName(true);
        return false;
      } else{
        setShowAlertLName(false);
      }  if(!password){
        setShowAlertPassw(true);
        return false;
      }else{
        setShowAlertPassw(false);
      }  if(!cPassword || cPassword !== password){
        console.log('wtf');
        setShowAlertCPassw(true);
        return false;
      }else{
        setShowAlertCPassw(false);
        return true;
      }
    }


  return (
    <div className="signUpContainer">
      <div className="signUpContainerEmployeeEmail">
        <label htmlFor="email">Employee Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {showAlertEmail && <Alert message="Please fill in the required Email field." />}
      </div>
      
      <div className="signUpContainerEmployeeFirstName">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        {showAlertFName && <Alert message="Please fill in the required First Name field." />}
      </div>
      <div className="signUpContainerEmployeeLastName">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        {showAlertLName && <Alert message="Please fill in the required Last Name field." />}
      </div>
      <div className="signUpContainerEmployeePassword">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {showAlertPassw && <Alert message="Please choose a password." />}
      </div>
      <div className="signUpContainerEmployeeCPassword">
        <label htmlFor="cPassword">Confirm Password</label>
        <input
          type="password"
          id="cPassword"
          onChange={(e) => setCPassword(e.target.value)}
        />
        {showAlertCPassw && <Alert message="The passwords do not match! Please, try again." />}
      </div>
      <div className="signUpContainerSubmit">
        <button className="primaryBtn" onClick={()=>{
          if(validateForm()){
            createAccount() 
          }else(
            validateForm()
          )}}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
