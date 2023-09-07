import React from "react";
import Axios from "axios";
import { useState } from "react";
import "../css/showJobs.css";
const JobTable = (props) => {
  const [allJobs, setAllJobs] = useState([...props.props]);
  const [individualSalary, setIndividualSalary] = useState("");

  const jobSalary = () => {
    // console.log(job);
    let totalSalary = 0.0;
    for (let i = 0; i < allJobs.length; i++) {
      totalSalary += allJobs[i].weeklyHours * allJobs[i].hourlyWage;
    }
    console.log(totalSalary);
    setIndividualSalary(totalSalary);
  };

  const deleteJob = async (id) => {
    await Axios.delete(`http://localhost:5000/deleteJob/${id}`)
      .then(() => {
        for (let i = 0; i < allJobs.length; i++) {
          if (allJobs[i]._id == id) {
            setAllJobs(allJobs.filter((job) => job._id != id));
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <table className="homeContainerShowJobsTable">
        <tbody>
          <tr>
            <th>Date</th>
            <th>hours</th>
            <th>Daily Wage</th>
          </tr>

          {allJobs.map((job, i) => {
            return (
              <tr key={i}>
                <td>{job.date}</td>
                <td>{job.weeklyHours}</td>
                <td>{job.hourlyWage * job.weeklyHours}</td>

                <td>
                  <button
                    className="primaryBtn"
                    onClick={() => {
                      deleteJob(job._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>
        {individualSalary && (
          <p>Your salary from this job is {individualSalary}</p>
        )}
      </div>
      <button
        className="primaryBtn"
        id="jobSalaryIndividual"
        onClick={jobSalary}
      >
        Calculate Salary
      </button>
      <br />
    </div>
  );
};

export default JobTable;
