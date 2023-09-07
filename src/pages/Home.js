import React from "react";
import "../css/home.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [wage, setWage] = useState(0.0);
  const [hour, setHour] = useState(0);
  const [date, setDate] = useState();
  const [allJobs, setAllJobs] = useState([]);

  let response;
  let navigate = useNavigate();

  const addJob = () => {
    setToggle(true);
    console.log(toggle);
  };
  const updateJobs = async () => {
    response = await Axios.get(
      `http://localhost:5000/getJob/${sessionStorage.getItem("id")}`
    );
    const newData = response.data;
    setAllJobs(newData);
  };
  const showJob = async () => {
    navigate("/showjobs");
  };
  const submitJob = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/addJob", {
        userId: sessionStorage.getItem("id"),
        jobTitle: title,
        weeklyHours: hour,
        hourlyWage: wage,
        date: date,
      });
      console.log(response.data);
      if (response.data) {
        setToggle(false);
        updateJobs();
        alert("job added successfully");
      }
      //console.log(response));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="homeContainer">
      <img src={Logo} alt="Logo" />
      
      {!toggle && (
        <div className="homeContainerButton">
          <div className="homeContainerAddJob">
            <button className="primaryBtn" onClick={addJob}>
              Add New Job
            </button>
          </div>
          <div className="homeContainerShowJob">
            <button className="primaryBtn" onClick={showJob}>
              Show My Jobs
            </button>
          </div>
        </div>
      )}
      {toggle && (
        <div className="homeContainerForm">
          <div className="homeContainerFormJobTitle">
            <label htmlFor="title">Job Title</label>
            <input
              id="title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>

          <div className="homeContainerFormDate">
            <label htmlFor="date">Select Day</label>
            <input
              id="date"
              type="date"
              max={new Date().toJSON().slice(0, 10)}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </div>

          <div className="homeContainerFormHours">
            <label htmlFor="hours">Hours of That Day</label>
            <input
              id="hours"
              type="number"
              min={0}
              onChange={(e) => {
                setHour(e.target.value);
              }}
            ></input>
          </div>
          <div className="homeContainerFormWages">
            <label htmlFor="wage">Hourly Rate</label>
            <input
              id="wage"
              type="number"
              min={0}
              step={0.01}
              onChange={(e) => {
                setWage(e.target.value);
              }}
            ></input>
          </div>
          <button className="primaryBtn" onClick={submitJob}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
