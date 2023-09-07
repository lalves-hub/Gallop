const schemas = require("../models/userModel");

//delete single shift
const deleteJob = (req, res) => {
  schemas.job
    .deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

//add new job as well as new shift
const addJob = (req, res) => {
  let newJob = new schemas.job(req.body);
  newJob
    .save()
    .then(() => {
      res.send(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

//creating new user from signup page
const addNewUser = (req, res) => {
  console.log(req.body);
  let newUser = new schemas.user(req.body);

  newUser
    .save()
    .then((user) => {
      console.log("Data saved successfully");
      res.send(user);
      console.log(user);
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
};

//email and password verification for login page
const fetchAllData = (req, res) => {
  schemas.user
    .findOne({ email: req.params.email, password: req.params.password })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

//Fetch all the jobs of particular user
const fetchJobs = (req, res) => {
  schemas.job
    .find({ userId: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send("error");
      console.log(error);
    });
};

module.exports = {
  addNewUser,
  fetchAllData,
  addJob,
  fetchJobs,
  deleteJob,
};
