import React from "react";
import "../css/showJobs.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import JobTable from "../components/JobTable";

const ShowJobs = () => {
  const [totalSalary, setTotalSalary] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [wage, setWage] = useState(0.0);
  const [hour, setHour] = useState(0);
  const [date, setDate] = useState();
  let response;

  useEffect(() => {
    setJobs();
  }, [month, week]);
  useEffect(() => {
    updateJobs();
  }, []);

  const totalSalaryCalculate = () => {
    let total = 0;
    console.log(allJobs);
    allJobs.forEach((item1) => {
      item1.forEach((item) => {
        console.log(item.hourlyWage);
        total += item.hourlyWage * item.weeklyHours;
      });
    });

    setTotalSalary(total);
  };

  const updateJobs = async () => {
    response = await Axios.get(
      `http://localhost:5000/getJob/${sessionStorage.getItem("id")}`
    );
    const newData = response.data;
    splitData(newData);
  };

  const splitData = (newData) => {
    let categorizedJobs = [];

    let temp = [];
    let temp1 = [];
    for (let i = 0; i < newData.length; i++) {
      let check = newData[i].jobTitle;
      temp = newData.filter((job) => job.jobTitle == check);
      temp1.push(temp);

      categorizedJobs = newData.filter(
        (job) => job.jobTitle != temp[0].jobTitle
      );
    }
    let final = [];

    //console.log(JSON.stringify(temp1[3]) === JSON.stringify(temp1[4]));
    for (let i = 0; i < temp1.length; i++) {
      let checker = false;
      for (let j = i + 1; j < temp1.length; j++) {
        if (JSON.stringify(temp1[i]) === JSON.stringify(temp1[j])) {
          checker = true;
        }
      }
      if (!checker) {
        final.push(temp1[i]);
      }
    }

    setAllJobs(final);
    //console.log(final);
  };

  const setJobs = async () => {
    setTotalSalary("");
    let updatedData;
    response = await Axios.get(
      `http://localhost:5000/getJob/${sessionStorage.getItem("id")}`
    );
    const newData = response.data;

    let result = newData.filter((job) => job.date.slice(5, 7) == month);
    if (week != 0) {
      if (week == 1) {
        updatedData = result.filter(
          (job) => job.date.slice(8, 10) >= 1 && job.date.slice(8, 10) < 8
        );
      }
      if (week == 2) {
        updatedData = result.filter(
          (job) => job.date.slice(8, 10) >= 8 && job.date.slice(8, 10) < 15
        );
      }
      if (week == 3) {
        updatedData = result.filter(
          (job) => job.date.slice(8, 10) >= 15 && job.date.slice(8, 10) < 22
        );
      }
      if (week == 4) {
        updatedData = result.filter(
          (job) => job.date.slice(8, 10) >= 22 && job.date.slice(8, 10) < 29
        );
      }
      //setAllJobs(updatedData);
      splitData(updatedData);
    } else {
      // console.log(result);
      //setAllJobs(result);
      splitData(result);
    }
  };

  const addNewHour = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/addJob", {
        userId: sessionStorage.getItem("id"),
        jobTitle: title,
        weeklyHours: hour,
        hourlyWage: wage,
        date: date,
      });

      updateJobs();
      let timeout = setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    // console.log(date, hour, title, wage);
  };

  return (
    <div>
      {isOpen && (
        <div className="homeContainerForm">
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
          <button onClick={addNewHour}>Add</button>
        </div>
      )}

      {!isOpen && (
        <div className="homeContainerShowJobs">
          <div className="homeContainerShowJobsOptions">
            <div className="homeContainerShowJobsOptionsMonth">
              <label htmlFor="month">Choose a month:</label>

              <select
                name="month"
                id="month"
                onChange={(e) => {
                  setMonth(e.target.value);
                  //setJobs();
                }}
              >
                <option value="00">Select One</option>
                <option value="01">Jan</option>
                <option value="02">Feb</option>
                <option value="03">March</option>
                <option value="04">Apr</option>
                <option value="05">May</option>
                <option value="06">Jun</option>
                <option value="07">Jul</option>
                <option value="08">Aug</option>
                <option value="09">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>

              <label htmlFor="week">Select a week of the month</label>
              <select
                id="week"
                name="week"
                onChange={(e) => {
                  setWeek(e.target.value);
                  //setJobs();
                }}
              >
                <option value="0">Select One</option>
                <option value="1">
                  From 2023-{month}-01 to 2023-{month}-07
                </option>
                <option value="2">
                  From 2023-{month}-08 to 2023-{month}-14
                </option>
                <option value="3">
                  From 2023-{month}-15 to 2023-{month}-21
                </option>
                <option value="4">
                  From 2023-{month}-21 to 2023-{month}-28
                </option>
              </select>
            </div>
          </div>
          {allJobs.map((job, j) => {
            return (
              <div key={j}>
                <h3 className="jobTitle">Job Title: {job[0].jobTitle}</h3>

                <JobTable props={job} />

                <br />
                <button
                  className="secondaryBtn"
                  onClick={() => {
                    setTitle(job[0].jobTitle);
                    setWage(job[0].hourlyWage);
                    setIsOpen(!isOpen);
                  }}
                >
                  Add Hours
                </button>
                <br />
              </div>
            );
          })}

          <div className="homeContainerShowJobsButton">
            <button className="primaryBtn" onClick={totalSalaryCalculate}>
              Calculate Your Total Salary
            </button>
          </div>
          {totalSalary && <p>Your Total salary is {totalSalary}</p>}
        </div>
      )}
    </div>
  );
};

export default ShowJobs;
